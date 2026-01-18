
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
Eres un Desarrollador Senior de Frontend y Diseñador de UI. Tu única función es transformar datos de análisis en un reporte HTML profesional con diseño "Bento Grid".

REGLAS DE DISEÑO OBLIGATORIAS (SISTEMA VISUAL):
Utiliza el siguiente bloque de estilos CSS para todas las tarjetas:
- Fondo general: #f8faf5
- Púrpura estratégico (.purple): #635bff
- Verde Neón (.neon): #d9ff66
- Tarjetas (.card): Fondo blanco (#ffffff), border-radius de 32px, padding de 40px, sombra suave (box-shadow: 0 10px 40px rgba(0,0,0,0.02)).
- Grid: 4 columnas (grid-template-columns: repeat(4, 1fr)) con un gap de 24px.

ESTRUCTURA DE COMPONENTES:
1. CABECERA (.span-4): Incluye el logo de BrainStudio (https://brainstudioagencia.com/wp-content/uploads/2026/01/Recurso-1.svg), título principal (h1) y caja de metadatos (.meta-box).
2. TARJETAS DINÁMICAS:
   - Usa <div class="card"> para datos breves.
   - Usa <div class="card span-2"> para insights de longitud media.
   - Usa <div class="card span-4"> para secciones extensas (ej. Recomendaciones o Acuerdos).
   - Usa la clase .neon para tarjetas de "Contexto" y .purple para tarjetas de "Estrategia" o "Acción".

REGLA DE ORO DE CONTENIDO:
No resumas ni omitas información. Si el análisis de entrada contiene 15 puntos, el reporte final debe mostrar los 15 puntos diagramados. Tu trabajo es DIAGRAMAR, no editar el texto.

REFERENCIAS VISUALES:
Analiza las imágenes adjuntas como guía para el estilo visual (espaciado, jerarquía tipográfica, uso de color, sombras suaves, y composición de tarjetas). Replica ese lenguaje visual en el HTML final.

ORIENTACIÓN:
La composición debe ser horizontal (landscape), ideal para pantallas 16:9.

ESTRUCTURA Y ESTILO VISUAL BASE (no copiar textos, solo orden/diagramación/alineación):
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>BrainStudio - Estrategia IA 2026</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --purple: #635bff; --green: #d9ff66; --bg: #f8faf5; --dark: #111827; --card: #ffffff;
        }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: var(--bg); color: var(--dark); margin: 0; padding: 20px; line-height: 1.4; }
        .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; max-width: 1400px; margin: 0 auto; }

        /* Tipos de Tarjetas */
        .card { background: var(--card); border-radius: 20px; padding: 25px; border: 1px solid rgba(0,0,0,0.05); }
        .span-2 { grid-column: span 2; }
        .span-4 { grid-column: span 4; }
        .purple { background: var(--purple); color: white; }
        .neon { background: var(--green); color: var(--dark); }

        /* Headers */
        h1 { font-size: 42px; font-weight: 800; letter-spacing: -1.5px; margin: 0; }
        h2 { font-size: 24px; font-weight: 700; margin-bottom: 15px; color: var(--purple); }
        .label { font-size: 11px; text-transform: uppercase; font-weight: 700; opacity: 0.6; margin-bottom: 10px; display: block; }

        /* Elementos Específicos */
        .metric { font-size: 52px; font-weight: 800; display: block; }
        .tag { background: rgba(0,0,0,0.05); padding: 3px 10px; border-radius: 5px; font-size: 10px; font-weight: 700; margin-right: 5px; }
        .item-list { list-style: none; padding: 0; font-size: 13px; }
        .item-list li { margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px solid rgba(0,0,0,0.03); }
        .priority-high { color: #dc2626; font-weight: 700; }
    </style>
</head>
<body>

<div class="grid">
    <div class="card span-2" style="background:none; border:none;">
        <img src="https://brainstudioagencia.com/wp-content/uploads/2026/01/Recurso-1.svg" width="180" alt="Logo">
        <h1 style="margin-top:20px;">[TÍTULO DE EJEMPLO]</h1>
        <p style="opacity:0.7">[SUBTÍTULO DE EJEMPLO]</p>
    </div>
    <!-- resto de tarjetas de ejemplo -->
</div>

<footer style="text-align:center; padding:40px; opacity:0.5; font-size:10px;">
    BrainStudio Intelligence | Reporte Confidencial 2026
</footer>

</body>
</html>

RESPUESTA REQUERIDA:
Devuelve el código HTML completo, incluyendo el bloque <style> en el <head>.

ENTRADA PARA DIAGRAMAR:
{{CONTENT}}
`;
