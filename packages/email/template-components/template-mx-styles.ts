import type { CSSProperties } from 'react';

/**
 * Shared values for the Media eXperience letter layout (template-mx-letter.tsx).
 *
 * Every email is written with inline styles: mail apps drop or rewrite <style> blocks and class
 * names far more often than inline styles, so only the phone adjustments live in the <style> block.
 */
export const MX_COLORS = {
  navy: '#0b2035',
  slate: '#3b4659',
  edge: '#e6e6e6',
  panel: '#f5f5f5',
  white: '#ffffff',
  warningEdge: '#e1cb05',
  warningPanel: '#fdfae6',
  error: '#dc2626',
} as const;

export const MX_FONT = '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif';

/** Font, size, line height, weight and colour in one inline style. Sizes are in px. */
export const mxText = (size: number, lineHeight: number, weight: 400 | 600 | 700, color: string): CSSProperties => ({
  fontFamily: MX_FONT,
  fontSize: `${size}px`,
  lineHeight: `${lineHeight}px`,
  fontWeight: weight,
  color,
});

/** Long words, titles and links break instead of widening the layout on a narrow phone. */
export const mxWrap: CSSProperties = {
  overflowWrap: 'anywhere',
  wordBreak: 'break-word',
};

/** Links inside running text. */
export const mxInlineLink: CSSProperties = {
  color: MX_COLORS.navy,
  textDecoration: 'underline',
};

/** Words that stand out inside running text, such as a team name. */
export const mxStrong: CSSProperties = {
  fontWeight: 600,
  color: MX_COLORS.navy,
};

/** Inline styles that React does not type, such as Outlook's mso-padding-alt. */
export const mxMsoStyle = (style: CSSProperties & { msoPaddingAlt?: string }) => style as CSSProperties;

/**
 * Old HTML attributes that some mail apps still read (bgcolor on table cells). React writes them
 * out as given; the cast only keeps them out of the typed props.
 */
export const mxLegacyAttrs = (attrs: { bgcolor?: string }) => attrs as Record<never, never>;

/** Table attributes that stop mail apps from adding their own spacing. */
export const mxTableAttrs = {
  role: 'presentation',
  cellPadding: 0,
  cellSpacing: 0,
  border: 0,
} as const;

const NBSP = ' ';

/** Keeps an organisation or team name on one line. */
export const keepTogether = (name: string) => name.replace(/ /g, NBSP);

/**
 * Lets a document title made of a file name ("Agreement_2027_SILMA_final_v3.pdf") break after "_",
 * "-" and "/" and before "." instead of inside a word, with zero-width spaces. Display only: never
 * use it on links, subjects or attachment names.
 */
export function breakableTitle(title: string): string;
export function breakableTitle(title: string | undefined): string | undefined;
export function breakableTitle(title: string | undefined) {
  if (title === undefined) {
    return title;
  }

  return title.replace(/([_\/-])(?=\S)/g, '$1\u200B').replace(/(\S)(?=\.)/g, '$1\u200B');
}

/** Keeps "Media eXperience" on one line inside a longer text, such as the company details. */
export const keepBrandTogether = (text: string) => text.replace(/Media eXperience/g, `Media${NBSP}eXperience`);
