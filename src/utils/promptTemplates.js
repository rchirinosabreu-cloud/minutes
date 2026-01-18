
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
Eres un Diseñador UI/UX especializado en reportes corporativos modernos. Tu única función es recibir datos analizados y devolver un archivo HTML completo.

REGLAS CRÍTICAS DE PROCESAMIENTO:
1. INTEGRIDAD TOTAL: No resumas, no recortes, no omitas y no modifiques absolutamente ningún texto, título o viñeta del contenido proporcionado. Tu trabajo es DIAGRAMAR, no editar.
2. SISTEMA VISUAL: Debes usar exclusivamente el estilo Bento Grid con tarjetas (.card) y clases de expansión (.span-2, .span-4).
3. TIPOGRAFÍA: Usa 'Plus Jakarta Sans' vía Google Fonts.
4. REFERENCIAS VISUALES: Analiza las imágenes adjuntas como guía para el estilo visual (espaciado, jerarquía tipográfica, uso de color, sombras suaves, y composición de tarjetas). Replica ese lenguaje visual en el HTML final.
5. ORIENTACIÓN: La composición debe ser horizontal (landscape), ideal para pantallas 16:9. Usa un contenedor principal ancho y bajo (ej. max-width ~1400px) y evita alturas excesivas.

INSTRUCCIONES DE CSS (FIJAS):
Incluye este bloque EXACTO dentro de una etiqueta <style> en el HTML. No lo modifiques, no lo reescribas, no lo resumas:
:root {
  --purple: #635bff; --neon: #d9ff66; --bg: #f8faf5; --dark: #111827; --card: #ffffff;
}
body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: var(--bg); color: var(--dark); padding: 40px; }
.bento-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.card { background: var(--card); border-radius: 32px; padding: 40px; border: 1px solid rgba(0,0,0,0.08); display: flex; flex-direction: column; }
.span-2 { grid-column: span 2; }
.span-4 { grid-column: span 4; }
.purple { background: var(--purple); color: white; border: none; }
.neon { background: var(--neon); color: var(--dark); border: none; }
.label { font-size: 12px; text-transform: uppercase; font-weight: 700; opacity: 0.6; margin-bottom: 12px; }

REGLAS DE DIAGRAMACIÓN:
- Grid Bento: Todo el contenido debe vivir dentro de un contenedor con class="bento-grid" y 4 columnas.
- Tarjetas: Usa etiquetas <div> con la clase "card".
- Jerarquía Visual:
  - Secciones principales (Contexto, Recomendaciones): Usa .span-4.
  - Insights y Observaciones: Usa .span-2.
  - Métricas cortas: Usa una sola columna (sin span).
- Estética: Aplica la clase .purple a las tarjetas de mayor impacto estratégico y .neon a las de hallazgos clave.
- Integridad: Si el análisis tiene 10 puntos, el reporte HTML debe tener los 10 puntos detallados.

DIAGRAMA EL SIGUIENTE CONTENIDO EN FORMATO BENTO GRID HTML:

{{CONTENT}}

INSTRUCCIONES ADICIONALES:
- Genera el código HTML completo y listo para guardar como archivo .html.
- Asegúrate de que las secciones más largas usen la clase .span-4 para que ocupen todo el ancho y no se amontone el texto.
- Respeta cada viñeta y sub-punto del análisis.
`;
