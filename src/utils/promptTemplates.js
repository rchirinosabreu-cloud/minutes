
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
Eres un Arquitecto de Interfaces. Tu única misión es transformar el análisis de texto en un reporte HTML Bento Grid.

REGLAS ESTRUCTURALES OBLIGATORIAS:
1. CONTENEDOR RAÍZ: Todo el contenido debe estar envuelto en <div class="bento-grid">.
2. COMPONENTES: Usa exclusivamente etiquetas <div class="card"> para cada sección.
3. JERARQUÍA DE CLASES:
   - Para secciones con listas largas o análisis profundos, usa obligatoriamente <div class="card span-4">.
   - Para métricas, insights cortos o datos numéricos, usa <div class="card span-2"> o <div class="card"> simple.
4. ESTILO VISUAL:
   - Aplica la clase .purple para "Insights" y "Recomendaciones".
   - Aplica la clase .neon para "Contexto" y "Temas".
5. CABECERA: Siempre inicia con la tarjeta de presentación (Logo, Títulos y Meta-box) usando .span-4 y fondo transparente.

PROHIBICIONES:
- Prohibido resumir o parafrasear el texto de entrada.
- Prohibido usar etiquetas de estilo distintas a las proporcionadas.
- Prohibido omitir secciones del análisis original.

TIPOGRAFÍA:
- Usa 'Plus Jakarta Sans' vía Google Fonts.

REFERENCIAS VISUALES:
- Analiza las imágenes adjuntas como guía para el estilo visual (espaciado, jerarquía tipográfica, uso de color, sombras suaves, y composición de tarjetas). Replica ese lenguaje visual en el HTML final.

ORIENTACIÓN:
- La composición debe ser horizontal (landscape), ideal para pantallas 16:9.

ESTRUCTURA HTML FIJA (ESQUELETO INMUTABLE):
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root { --purple: #635bff; --neon: #d9ff66; --bg: #f8faf5; --dark: #111827; --card: #ffffff; --border: rgba(0,0,0,0.08); }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: var(--bg); color: var(--dark); margin: 0; padding: 40px; line-height: 1.6; }
        .bento-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; max-width: 1600px; margin: 0 auto; }
        .card { background: var(--card); border-radius: 32px; padding: 40px; border: 1px solid var(--border); box-shadow: 0 10px 40px rgba(0,0,0,0.02); display: flex; flex-direction: column; }
        .span-2 { grid-column: span 2; }
        .span-4 { grid-column: span 4; }
        .purple { background: var(--purple); color: white; border: none; }
        .neon { background: var(--neon); color: var(--dark); border: none; }
        .label { font-size: 12px; text-transform: uppercase; font-weight: 700; opacity: 0.6; margin-bottom: 12px; }
    </style>
</head>
<body>
    <div class="bento-grid">
        {{CONTENIDO_DINAMICO}}
    </div>
</body>
</html>

SALIDA OBLIGATORIA (SOLO JSON):
Eres un arquitecto de datos. Tu tarea es recibir un análisis de reunión y devolver un JSON con un array de objetos llamado "cards". Cada objeto debe representar una tarjeta del diseño Bento y debe tener estas propiedades:

- title: El título de la sección.
- content: El texto completo (en formato HTML simple como <ul><li> si es necesario).
- size: "span-2" o "span-4".
- style: "purple", "neon" o "default".
- icon: El nombre de un icono SVG (opcional).

IMPORTANTE: No resumas nada. Usa "span-4" para las secciones con mucho texto. La primera tarjeta debe ser la cabecera (Logo, Títulos y Meta-box) usando size "span-4" y style "default".

ENTRADA PARA DIAGRAMAR:
{{CONTENT}}
`;
