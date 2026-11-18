import Konva from 'konva';

type BreakTextForWidthOptions = {
  text: string;
  width: number;
  fontSize: number;
  fontStyle?: string;
};

/**
 * Konva wraps either at any character or at spaces and dashes, which splits names mid-word and
 * emails at random points. This inserts line breaks after spaces and "@" only, so names wrap
 * between words and an email address breaks only after its "@" ("partner.name@" then
 * "example.com", never "example." then "com"). Only a part that is still wider than the column on a line
 * of its own is broken at the last character that fits. Call after the fonts are registered so the
 * widths are measured in Inter.
 */
export const breakTextForWidth = ({ text, width, fontSize, fontStyle }: BreakTextForWidthOptions) => {
  const measure = (value: string) =>
    new Konva.Text({
      text: value,
      fontFamily: 'Inter',
      fontSize,
      fontStyle,
    }).width();

  const parts = text.match(/[^\s@]+[\s@]*|[\s@]+/g) ?? [text];

  const lines: string[] = [];
  let line = '';

  for (const part of parts) {
    const candidate = line + part;

    if (line && measure(candidate.trimEnd()) > width) {
      lines.push(line.trimEnd());
      line = part;
    } else {
      line = candidate;
    }

    // Fallback for a part that does not fit even on a line of its own: break it anywhere.
    while (line.trimEnd().length > 1 && measure(line.trimEnd()) > width) {
      let cut = line.trimEnd().length - 1;

      while (cut > 1 && measure(line.slice(0, cut)) > width) {
        cut--;
      }

      lines.push(line.slice(0, cut));
      line = line.slice(cut);
    }
  }

  lines.push(line.trimEnd());

  return lines.join('\n');
};
