import { Trans } from '@lingui/react/macro';
import type { ReactNode } from 'react';
import { Fragment } from 'react';

import { useBranding } from '../providers/branding';
import { getSafeBrandingUrl } from '../utils/branding-url';
import { keepBrandTogether, MX_COLORS, mxText, mxWrap } from './template-mx-styles';

export type TemplateFooterProps = {
  isDocument?: boolean;
  reportUrl?: string;
};

const footerLinkStyle = {
  color: MX_COLORS.slate,
  textDecoration: 'underline',
};

/**
 * The lines under the card, written as table rows for the letter layout (template-mx-letter.tsx).
 * They start on the card's text column: 1 px frame, 34 px card padding and the 6 px row indent make
 * 41 px (21 px on phones, through the mxl-fpad class). 24 px under the card, then 8 px between lines.
 */
export const TemplateFooter = ({ isDocument = true, reportUrl }: TemplateFooterProps) => {
  const branding = useBranding();

  const safeBrandingUrl = branding.brandingEnabled ? getSafeBrandingUrl(branding.brandingUrl) : null;

  const lines: ReactNode[] = [];

  if (reportUrl) {
    lines.push(<Trans>Not expecting this email? Do not sign it, and reply to let us know.</Trans>);
  }

  if (isDocument && !branding.brandingHidePoweredBy) {
    lines.push(
      <Trans>
        This document was sent using{' '}
        <a style={footerLinkStyle} href="https://documen.so/mail-footer">
          Documenso
        </a>
        .
      </Trans>,
    );
  }

  if (branding.brandingEnabled && branding.brandingCompanyDetails) {
    lines.push(
      branding.brandingCompanyDetails.split('\n').map((line, idx) => {
        return (
          <Fragment key={idx}>
            {idx > 0 && <br />}
            {keepBrandTogether(line)}
          </Fragment>
        );
      }),
    );
  }

  if (branding.brandingEnabled && safeBrandingUrl) {
    lines.push(
      <a style={footerLinkStyle} href={safeBrandingUrl} target="_blank">
        {safeBrandingUrl}
      </a>,
    );
  }

  if (!branding.brandingEnabled) {
    lines.push(
      <>
        Documenso, Inc.
        <br />
        2261 Market Street, #5211, San Francisco, CA 94114, USA
      </>,
    );
  }

  return (
    <>
      {lines.map((line, index) => (
        <tr key={index}>
          <td
            className="mxl-fpad"
            style={{
              padding: `${index === 0 ? 24 : 8}px 8px 0 41px`,
              ...mxText(14, 20, 400, MX_COLORS.slate),
              ...mxWrap,
            }}
          >
            {line}
          </td>
        </tr>
      ))}
    </>
  );
};

export default TemplateFooter;
