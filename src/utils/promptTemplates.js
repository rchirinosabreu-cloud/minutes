
// Centralized storage for AI prompts to ensure consistency and transparency

export const SUMMARY_PROMPT_TEMPLATE = `
Analiza el siguiente contenido integrado de múltiples fuentes y genera un resumen ejecutivo visualmente estructurado.

Responde estrictamente en formato JSON.

Estructura requerida:
{
  "meeting_title": "Título breve de la reunión o documento",
  "meeting_date": "Fecha relevante si se menciona",
  "meeting_duration": "Duración estimada o reportada",
  "participants": ["Nombre: Rol o área", "Nombre: Rol o área"],
  "meeting_topics": ["Tema tratado 1", "Tema tratado 2"],
  "discussion_details": ["Punto clave 1", "Punto clave 2"],
  "agreements": ["Acuerdo o compromiso 1", "Acuerdo o compromiso 2"],
  "action_items": [
    {"task": "Acción inmediata requerida", "priority": "Alta", "owner": "Nombre", "due_date": "Fecha si aplica"},
    {"task": "Seguimiento posterior", "priority": "Media", "owner": "Nombre", "due_date": "Fecha si aplica"}
  ]
}

{{CONTENT}}
`;

export const ANALYSIS_PROMPT_TEMPLATE = `
Realiza un análisis consultivo profundo y estructurado basado en la información disponible.

Responde estrictamente en formato JSON.

Estructura requerida:
{
  "meeting_topics": ["Tema 1", "Tema 2"],
  "consulting_insights": ["Insight consultivo 1", "Insight consultivo 2"],
  "observations": ["Observación crítica 1", "Observación crítica 2"],
  "recommendations": [
     {"title": "Estrategia Recomendada", "description": "Pasos tácticos.", "priority": "Alta"},
     {"title": "Estrategia Recomendada", "description": "Pasos tácticos.", "priority": "Media"}
  ],
  "opportunities": [
     {"title": "Oportunidad Detectada", "description": "Descripción del potencial."}
  ]
}

INSTRUCCIONES DE GENERACIÓN:
1. Enfócate únicamente en la información contenida en el contenido provisto.
2. No inventes títulos o frases tomadas de ejemplos o referencias visuales anteriores.

{{CONTENT}}
`;

export const GEMINI_BENTO_PROMPT_TEMPLATE = `
Eres un experto en Desarrollo Frontend y Diseño de Interfaces (UI). Tu única tarea es transformar textos de análisis de reuniones en documentos HTML estructurados con un sistema visual "Bento Grid".

REGLAS CRÍTICAS DE PROCESAMIENTO:
1. INTEGRIDAD TOTAL: No resumas, no recortes, no omitas y no modifiques absolutamente ningún texto, título o viñeta del contenido proporcionado. Tu trabajo es DIAGRAMAR, no editar.
2. SISTEMA VISUAL: Debes usar exclusivamente el estilo Bento Grid con tarjetas (.card) y clases de expansión (.span-2, .span-4).
3. PALETA DE COLORES: 
   - Fondo: #f8faf5
   - Púrpura estratégico: #635bff
   - Verde Neón: #d9ff66
   - Texto oscuro: #111827
4. TIPOGRAFÍA: Usa 'Plus Jakarta Sans' vía Google Fonts.

ESTRUCTURA HTML REQUERIDA:
- Usa una cuadrícula de 4 columnas (grid-template-columns: repeat(4, 1fr)).
- Cada tarjeta debe tener bordes redondeados de 32px y un padding de 40px.
- Incluye el CSS embebido en la etiqueta <style>.

DIAGRAMA EL SIGUIENTE CONTENIDO EN FORMATO BENTO GRID HTML:

{{CONTENT}}

INSTRUCCIONES ADICIONALES:
- Genera el código HTML completo y listo para guardar como archivo .html.
- Asegúrate de que las secciones más largas usen la clase .span-4 para que ocupen todo el ancho y no se amontone el texto.
- Respeta cada viñeta y sub-punto del análisis.
`;
