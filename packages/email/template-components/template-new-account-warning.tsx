import { Trans } from '@lingui/react/macro';

import { MX_COLORS, mxLegacyAttrs, mxTableAttrs, mxText, mxWrap } from './template-mx-styles';

export type TemplateNewAccountWarningProps = {
  senderEmail: string;
  reportUrl?: string;
};

/** A yellow notice above the card of the letter layout, for requests sent from a new account. */
export const TemplateNewAccountWarning = ({ senderEmail, reportUrl }: TemplateNewAccountWarningProps) => {
  return (
    <table {...mxTableAttrs} width="100%" style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
      <tbody>
        <tr>
          <td
            {...mxLegacyAttrs({ bgcolor: MX_COLORS.warningPanel })}
            style={{
              backgroundColor: MX_COLORS.warningPanel,
              border: `1px solid ${MX_COLORS.warningEdge}`,
              borderLeft: `4px solid ${MX_COLORS.warningEdge}`,
              borderRadius: '8px',
              padding: '12px 16px',
              ...mxText(14, 20, 400, MX_COLORS.slate),
              ...mxWrap,
            }}
          >
            <div style={{ fontWeight: 600, color: MX_COLORS.navy }}>
              <Trans>Warning: This was sent from a new account ({senderEmail})</Trans>
            </div>

            <div style={{ marginTop: '4px' }}>
              {reportUrl ? (
                <Trans>
                  Only sign if you know and were expecting this sender.{' '}
                  <a style={{ color: MX_COLORS.navy, textDecoration: 'underline' }} href={reportUrl}>
                    Report sender
                  </a>
                </Trans>
              ) : (
                <Trans>Only sign if you know and were expecting this sender.</Trans>
              )}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
