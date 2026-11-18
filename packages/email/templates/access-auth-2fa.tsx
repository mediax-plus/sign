import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Plural, Trans } from '@lingui/react/macro';

import { TemplateMxLetter } from '../template-components/template-mx-letter';
import { MX_COLORS, mxLegacyAttrs, mxTableAttrs, mxText } from '../template-components/template-mx-styles';

export type AccessAuth2FAEmailTemplateProps = {
  documentTitle: string;
  code: string;
  userEmail: string;
  userName: string;
  expiresInMinutes: number;
  assetBaseUrl?: string;
};

export const AccessAuth2FAEmailTemplate = ({
  documentTitle,
  code,
  userName,
  expiresInMinutes,
  assetBaseUrl = 'http://localhost:3002',
}: AccessAuth2FAEmailTemplateProps) => {
  const { _ } = useLingui();

  const previewText = msg`Your verification code is ${code}`;

  return (
    <TemplateMxLetter
      assetBaseUrl={assetBaseUrl}
      previewText={_(previewText)}
      heading={<Trans>Verification Code Required</Trans>}
      lines={[
        <Trans>
          Hi {userName}, you need to enter a verification code to complete the document "{documentTitle}".
        </Trans>,
      ]}
      extra={
        <table {...mxTableAttrs} width="100%" style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
          <tbody>
            <tr>
              <td
                {...mxLegacyAttrs({ bgcolor: MX_COLORS.panel })}
                style={{ backgroundColor: MX_COLORS.panel, borderRadius: '6px', padding: '16px 20px' }}
              >
                <div style={mxText(14, 20, 600, MX_COLORS.slate)}>
                  <Trans>Your verification code:</Trans>
                </div>
                <div style={{ marginTop: '4px', letterSpacing: '0.12em', ...mxText(28, 36, 700, MX_COLORS.navy) }}>
                  {code}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      }
      notes={[
        <Plural
          value={expiresInMinutes}
          one="This code will expire in # minute."
          other="This code will expire in # minutes."
        />,
        <Trans>If you didn't request this verification code, you can safely ignore this email.</Trans>,
      ]}
      footer={{ isDocument: false }}
    />
  );
};

export default AccessAuth2FAEmailTemplate;
