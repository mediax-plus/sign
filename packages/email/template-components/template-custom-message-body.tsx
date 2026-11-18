import React from 'react';

import { MX_COLORS, mxText, mxWrap } from './template-mx-styles';

export type TemplateCustomMessageBodyProps = {
  text?: string;
};

/**
 * The sender's own message, for the message panel of the letter layout. Blank lines start a new
 * paragraph and single line breaks are kept, so the note reads the way the sender typed it.
 */
export const TemplateCustomMessageBody = ({ text }: TemplateCustomMessageBodyProps) => {
  if (!text) {
    return null;
  }

  const normalized = text
    .trim()
    .replace(/\r\n?/g, '\n')
    .replace(/\n\s*\n+/g, '\n\n')
    .replace(/\n{2,}/g, '\n\n');

  const paragraphs = normalized.split('\n\n');

  return paragraphs.map((paragraph, i) => (
    <p
      key={`p-${i}`}
      style={{
        margin: i === 0 ? '0' : '16px 0 0 0',
        whiteSpace: 'pre-line',
        ...mxText(15, 24, 400, MX_COLORS.navy),
        ...mxWrap,
      }}
    >
      {paragraph.split('\n').map((line, j) => (
        <React.Fragment key={`line-${i}-${j}`}>
          {j > 0 && <br />}
          {line}
        </React.Fragment>
      ))}
    </p>
  ));
};

export default TemplateCustomMessageBody;
