
// Utilities for HTML and PDF Report Styling

export const COLORS = {
  primary: '#4F46E5',
  primaryLight: '#E4E7FF',
  secondary: '#F6F7FB',
  secondaryLight: '#EEF1FF',
  dark: '#111827',
  textDark: '#111827',
  text: '#1F2937',
  textLight: '#6B7280',
  border: '#E5E7EB',
  bg: '#F7F7FB',
  white: '#FFFFFF',
  accentLavender: '#E9E7FF',
  accentPurple: '#6D5CE7',
  accentLime: '#C7F9CC',
  title: '#111827',
  cardGradient: '#ECEBFF',
};

export const GRADIENTS = {
  header: COLORS.white,
  primary: COLORS.primary,
  secondary: COLORS.secondary,
  limeSoft: `linear-gradient(135deg, ${COLORS.accentLime} 0%, ${COLORS.bg} 85%)`,
  purpleSoft: `linear-gradient(135deg, ${COLORS.cardGradient} 0%, ${COLORS.bg} 85%)`,
  graySoft: `linear-gradient(135deg, ${COLORS.bg} 0%, ${COLORS.white} 100%)`,
  cover: `linear-gradient(135deg, #F6F4FF 0%, ${COLORS.cardGradient} 55%, #F2F4FF 100%)`,
  canvas: `linear-gradient(135deg, #F6F4FF 0%, ${COLORS.cardGradient} 55%, #F2F4FF 100%)`,
};

export const TYPOGRAPHY = {
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  h1: `font-size: 32px; font-weight: 700; letter-spacing: -0.02em; line-height: 1.2; color: ${COLORS.title};`,
  h2: `font-size: 20px; font-weight: 700; letter-spacing: -0.01em; line-height: 1.3; color: ${COLORS.title};`,
  h3: `font-size: 16px; font-weight: 600; line-height: 1.4; color: ${COLORS.title};`,
  body: `font-size: 14px; line-height: 1.6; color: ${COLORS.text};`,
  small: `font-size: 12px; line-height: 1.6; color: ${COLORS.textLight};`
};

export const SPACING = {
  xs: '8px',
  sm: '16px',
  md: '24px',
  lg: '28px',
  xl: '40px',
  xxl: '56px'
};

export const STYLES = {
  // Global
  body: `font-family: ${TYPOGRAPHY.fontFamily}; background: ${GRADIENTS.canvas}; margin: 0; padding: 32px; color: ${COLORS.text}; -webkit-font-smoothing: antialiased; print-color-adjust: exact; -webkit-print-color-adjust: exact;`,
  container: "width: 100%; max-width: 1400px; margin: 0 auto; background: #F7F7FB; border-radius: 28px; border: 1px solid #E5E7EB; overflow: hidden; position: relative; box-shadow: 0 24px 48px rgba(17, 24, 39, 0.08);",
  
  // Header / Cover
  coverPage: `min-height: 520px; padding: ${SPACING.xxl}; display: flex; flex-direction: column; justify-content: space-between; background: ${GRADIENTS.cover}; position: relative;`,
  coverHeader: "display: flex; justify-content: space-between; align-items: flex-start;",
  coverTitle: `${TYPOGRAPHY.h1} margin-top: ${SPACING.lg}; max-width: 85%;`,
  coverMeta: `display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: ${SPACING.lg}; margin-top: ${SPACING.lg}; border-top: 1px solid ${COLORS.border}; padding-top: ${SPACING.md};`,
  
  // Standard Header
  header: `background: ${COLORS.white}; padding: ${SPACING.lg} ${SPACING.xl}; border-bottom: 1px solid ${COLORS.border}; display: flex; justify-content: space-between; align-items: center;`,
  reportBadge: `background: ${COLORS.accentLavender}; color: ${COLORS.primary}; font-size: 10px; font-weight: 700; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px;`,
  
  // Sections
  content: `padding: ${SPACING.xl}; background: ${COLORS.secondary};`,
  section: `margin-bottom: ${SPACING.xl}; padding: ${SPACING.lg}; background: ${COLORS.white}; border-radius: 16px; border: 1px solid ${COLORS.border}; box-shadow: 0 12px 22px rgba(17, 24, 39, 0.06); page-break-inside: avoid; break-inside: avoid;`,
  sectionTitleBox: `margin-bottom: ${SPACING.md}; display: inline-flex; align-items: center; gap: ${SPACING.sm}; padding: ${SPACING.xs} ${SPACING.sm}; background: ${COLORS.white}; border-radius: 999px; border: 1px solid ${COLORS.border};`,
  sectionTitle: `${TYPOGRAPHY.h2} margin: 0;`,
  
  // Cards
  cardGrid: "display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 22px;",
  card: `background: ${COLORS.white}; border-radius: 16px; padding: ${SPACING.lg}; box-shadow: 0 12px 24px rgba(17, 24, 39, 0.08); border: 1px solid ${COLORS.border}; transition: all 0.2s; page-break-inside: avoid; break-inside: avoid;`,
  cardSoft: `background: ${COLORS.bg}; border-radius: 16px; box-shadow: 0 10px 22px rgba(17, 24, 39, 0.06); border: 1px solid ${COLORS.accentLavender}; page-break-inside: avoid; break-inside: avoid;`,
  cardLime: `background: ${GRADIENTS.limeSoft}; border: 1px solid ${COLORS.accentLime};`,
  cardPurple: `background: ${GRADIENTS.purpleSoft}; color: ${COLORS.text}; border: 1px solid ${COLORS.accentLavender};`,
  listGrid: `display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 22px;`,
  listCard: `border-radius: 16px; padding: ${SPACING.lg}; box-shadow: 0 12px 24px rgba(17, 24, 39, 0.08); border: 1px solid ${COLORS.border}; background: ${COLORS.white}; page-break-inside: avoid; break-inside: avoid;`,
  
  // Typography helpers
  cardTitle: `${TYPOGRAPHY.h3} margin-bottom: ${SPACING.xs}; display: block;`,
  cardText: `${TYPOGRAPHY.body} margin: 0;`,
  
  // Footer
  footer: `background: ${COLORS.white}; border-top: 1px solid ${COLORS.border}; padding: ${SPACING.md} ${SPACING.xl}; display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: ${COLORS.textLight};`,
};

export const formatList = (items) => {
  if (!items) return '';
  const listItems = Array.isArray(items) ? items : [items];
  
  return `
    <ul class="two-column-list" style="list-style: disc; padding-left: 20px; margin: 0; column-count: 2; column-gap: 22px;">
      ${listItems.map(item => `
        <li style="margin-bottom: 8px; font-size: 14px; color: ${COLORS.text}; break-inside: avoid;">
          ${item}
        </li>
      `).join('')}
    </ul>
  `;
};

export const formatListAsCards = (items) => {
  if (!items) return '';
  const listItems = Array.isArray(items) ? items : [items];

  return `
    <div style="${STYLES.listGrid}" class="list-grid">
      ${listItems.map((item, index) => `
        <div style="${STYLES.listCard} ${index % 2 === 0 ? STYLES.cardSoft : STYLES.cardLime}" class="list-card">
          <div style="${TYPOGRAPHY.body}">${item}</div>
        </div>
      `).join('')}
    </div>
  `;
};

export const getBrainStudioLogoSVG = () => `
<svg width="164" height="48" viewBox="0 0 164 48" xmlns="http://www.w3.org/2000/svg" style="display:block;">
  <defs>
    <linearGradient id="brainGradient" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#4F46E5"/>
      <stop offset="100%" stop-color="#6D5CE7"/>
    </linearGradient>
  </defs>
  <g fill="none" fill-rule="evenodd">
    <rect x="0" y="6" width="36" height="36" rx="18" fill="url(#brainGradient)"/>
    <path d="M14 18c-3.3 0-6 2.4-6 5.6 0 2.2 1.1 4.1 3.2 4.9.2 2.8 2.6 5 5.5 5h4.6c3 0 5.5-2.3 5.6-5.3 1.6-.9 2.6-2.6 2.6-4.6 0-3.2-2.7-5.6-6-5.6-.8-2.5-3.1-4.2-5.8-4.2-2.6 0-4.8 1.6-5.7 4.2z" fill="#FFFFFF" opacity="0.9"/>
    <text x="48" y="21" font-family="Helvetica Neue, Arial, sans-serif" font-size="14" fill="#6B7280" letter-spacing="1">BRAIN</text>
    <text x="48" y="38" font-family="Helvetica Neue, Arial, sans-serif" font-size="16" fill="#111827" font-weight="700">STUDIO</text>
  </g>
</svg>
`;

export const ICONS = {
  logoSmall: `<div style="width:24px; height:24px; background:${COLORS.primary}; border-radius:4px;"></div>`, // Placeholder if needed
  target: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${COLORS.primary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>`,
  chart: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${COLORS.primary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`,
  bulb: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${COLORS.primary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="18" x2="15" y2="18"></line><line x1="10" y1="22" x2="14" y2="22"></line><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 9.5 6 4.65 4.65 0 0 0 8 11.5c0 1.4 1 2.35 1.5 3"></path></svg>`,
  users: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${COLORS.primary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
  calendar: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${COLORS.textLight}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`,
  lightning: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${COLORS.dark}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
  settings: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${COLORS.dark}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,
};
