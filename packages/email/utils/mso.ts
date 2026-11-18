/**
 * Outlook for Windows (the Word engine) ignores max-width, so the letter layout wraps its 600 px
 * column in a fixed-width "ghost" table that only Outlook sees, inside conditional comments. React
 * cannot write HTML comments, so the layout (template-mx-letter.tsx) leaves two empty marker divs
 * and this swaps them for the comments after rendering. It also adds Outlook's 96 dpi setting, which
 * keeps the 2x pictures at their set sizes on scaled Windows screens.
 *
 * HTML without the markers (and plain-text output) is returned unchanged.
 */
const GHOST_OPEN =
  '<!--[if mso]><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" align="center"><tr><td><![endif]-->';

const GHOST_CLOSE = '<!--[if mso]></td></tr></table><![endif]-->';

const OFFICE_SETTINGS =
  '<!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->';

const GHOST_OPEN_MARKER = /<div data-mx-mso="ghost-open"\s*(?:\/>|><\/div>)/g;
const GHOST_CLOSE_MARKER = /<div data-mx-mso="ghost-close"\s*(?:\/>|><\/div>)/g;

export const applyMsoConditionals = (html: string): string => {
  if (!html.includes('data-mx-mso="ghost-open"')) {
    return html;
  }

  return html
    .replace(GHOST_OPEN_MARKER, GHOST_OPEN)
    .replace(GHOST_CLOSE_MARKER, GHOST_CLOSE)
    .replace('</head>', `${OFFICE_SETTINGS}</head>`)
    .replace(/<html(?=[\s>])/, '<html xmlns:o="urn:schemas-microsoft-com:office:office"');
};
