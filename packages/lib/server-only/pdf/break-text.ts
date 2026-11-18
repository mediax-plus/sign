import Konva from 'konva';

type BreakTextForWidthOptions = {
  text: string;
  width: number;
  fontSize: number;
  fontStyle?: string;
};

/**
 * Konva wraps either at any character or at spaces and dashes, which splits names mid-word and
 * emails at random points. This inserts line breaks after spaces, "@" and "." only, so names wrap
 * between words and emails after a separator. A single part wider than the column is still broken
 * by Konva's own wrapping. Call after the fonts are registered so the widths are measured in Inter.
 */
export const breakTextForWidth = ({ text, width, fontSize, fontStyle }: BreakTextForWidthOptions) => {
  const parts = text.match(/[^\s@.]+[\s@.]*|[\s@.]+/g) ?? [text];

  const lines: string[] = [];
  let line = '';

  for (const part of parts) {
    const candidate = line + part;

    const candidateWidth = new Konva.Text({
      text: candidate.trimEnd(),
      fontFamily: 'Inter',
      fontSize,
      fontStyle,
    }).width();

    if (line && candidateWidth > width) {
      lines.push(line.trimEnd());
      line = part;
    } else {
      line = candidate;
    }
  }

  lines.push(line.trimEnd());

  return lines.join('\n');
};
