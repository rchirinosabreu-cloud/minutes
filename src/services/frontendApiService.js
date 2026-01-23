import axios from 'axios';

const DEFAULT_API_BASE_URL = 'https://delightful-nourishment-production.up.railway.app';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (typeof window !== 'undefined' && import.meta.env.DEV
    ? window.location.origin
    : DEFAULT_API_BASE_URL);
const OPENAI_API_URL = `${API_BASE_URL}/api/openai/v1/chat/completions`;
const getFirefliesApiUrl = (baseUrl) => `${baseUrl}/api/fireflies/graphql`;
const GEMINI_API_URL = `${API_BASE_URL}/api/gemini/v1beta/models/gemini-3-pro-preview:generateContent`;
// Helper for delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const parseReferenceImages = () =>
  GEMINI_REFERENCE_IMAGES.split(',').map((value) => value.trim()).filter(Boolean);

const blobToBase64 = async (blob) => {
  const buffer = await blob.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
};

const frontendApiService = {
  // OpenAI API Call with retry logic
  generateCompletion: async (prompt, systemMessage = "You are a helpful assistant.") => {
    // Add Spanish instruction to system message
    const languageInstruction = " Responde SIEMPRE en español. Todos los textos, títulos, labels deben estar en español.";
    const finalSystemMessage = systemMessage + languageInstruction;

    let retries = 3;
    let attempt = 0;

    while (attempt < retries) {
      try {
        const response = await axios.post(OPENAI_API_URL, {
          model: "gpt-5.1",
          messages: [
            { role: "system", content: finalSystemMessage },
            { role: "user", content: prompt }
          ],
          response_format: { type: "json_object" }, // Enforce JSON mode
          temperature: 0.7
        });

        return response.data.choices[0].message.content;
      } catch (error) {
        if (error.response && error.response.status === 429) {
          // Rate limited
          attempt++;
          const waitTime = Math.pow(2, attempt) * 1000; // Exponential backoff
          console.warn(`Rate limited by OpenAI. Retrying in ${waitTime}ms...`);
          await delay(waitTime);
        } else {
          console.error("OpenAI API Error:", error);
          if (error.message === 'Network Error' && !error.response) {
            throw new Error("Network Error: La llamada a OpenAI necesita un proxy/servidor para evitar CORS. Configura el backend /api/openai o VITE_API_BASE_URL.");
          }
          throw new Error(error.response?.data?.error?.message || "Failed to generate completion from OpenAI");
        }
      }
    }
    throw new Error("Failed to connect to OpenAI after multiple attempts due to rate limiting.");
  },

  // Batch Analysis Helper
  // Takes an array of file objects { title, text, type } and prepares a combined context
  generateBatchAnalysis: async (files, analysisType) => {
    if (!files || files.length === 0) throw new Error("No files provided for analysis");

    // Concatenate contents
    let combinedContext = "A continuación se presentan los contenidos de múltiples fuentes para su análisis integrado:\n\n";
    
    files.forEach((file, index) => {
      combinedContext += `--- FUENTE ${index + 1}: ${file.title} (${file.type}) ---\n`;
      combinedContext += `${file.text.substring(0, 20000)} \n\n`; // Limit per file to avoid context window explosion
    });

    return combinedContext;
  },

  generateGeminiHtmlReport: async (prompt) => {
    try {
      const response = await axios.post(GEMINI_API_URL, {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.2
        }
      });

      const text = response.data?.candidates?.[0]?.content?.parts?.map((part) => part.text).join('')?.trim();
      if (!text) {
        throw new Error("Gemini response was empty.");
      }
      return text;
    } catch (error) {
      console.error("Gemini API Error:", error);
      if (error.message === 'Network Error' && !error.response) {
        throw new Error("Network Error: La llamada a Gemini necesita un proxy/servidor para evitar CORS. Configura el backend /api/gemini o VITE_API_BASE_URL.");
      }
      throw new Error(error.response?.data?.error?.message || error.message || "Failed to generate HTML from Gemini");
    }
  },

  // Fireflies GraphQL Call
  fetchFirefliesData: async (query, variables = {}) => {
    const postFireflies = async (baseUrl) => axios.post(
      getFirefliesApiUrl(baseUrl),
      { query, variables },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    try {
      const response = await postFireflies(API_BASE_URL);

      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }

      return response.data.data;
    } catch (error) {
      console.error("Fireflies API Error:", error);
      // CORS errors are common in frontend-only calls to some APIs.
      if (error.message === 'Network Error' && !error.response) {
        throw new Error(
          "Network Error: This may be due to CORS restrictions on the Fireflies API when called directly from the browser. In a production environment, a proxy server is required."
        );
      }

      if (error.response?.status === 504) {
        throw new Error(
          "El proxy de Fireflies no respondió (504). Verifica que el backend esté en línea y que VITE_API_BASE_URL apunte a tu servidor."
        );
      }

      if (error.response?.status === 401 || error.response?.status === 403) {
        throw new Error(
          "No autorizado para Fireflies. Revisa que FIREFLIES_API_KEY esté configurada en el backend."
        );
      }

      throw new Error(error.response?.data?.message || error.message || "Failed to fetch data from Fireflies");
    }
  },
  checkFirefliesConnection: async () => {
    const query = `
      query FirefliesHealth($limit: Int, $skip: Int) {
        transcripts(limit: $limit, skip: $skip) {
          id
        }
      }
    `;

    try {
      const response = await axios.post(
        getFirefliesApiUrl(API_BASE_URL),
        { query, variables: { limit: 1, skip: 0 } },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.errors) {
        return false;
      }

      return true;
    } catch (error) {
      console.warn("Fireflies Health Check Error:", error);
      return false;
    }
  },
  checkOpenAiConnection: async () => {
    try {
      await axios.get(`${API_BASE_URL}/api/openai/v1/models`);
      return true;
    } catch (error) {
      console.warn("OpenAI Health Check Error:", error);
      return false;
    }
  },

  // Specific Fireflies Queries
  getTranscripts: async (limit = 50, skip = 0) => {
    const query = `
      query Transcripts($limit: Int, $skip: Int) {
        transcripts(limit: $limit, skip: $skip) {
          id
          title
          date
          duration
          organizer_email
        }
      }
    `;
    return frontendApiService.fetchFirefliesData(query, { limit, skip });
  },

  getTranscriptDetails: async (id) => {
    const query = `
      query Transcript($id: String!) {
        transcript(id: $id) {
          id
          title
          date
          duration
          sentences {
            speaker_name
            text
            start_time
          }
        }
      }
    `;
    return frontendApiService.fetchFirefliesData(query, { id });
  }
};

export default frontendApiService;
