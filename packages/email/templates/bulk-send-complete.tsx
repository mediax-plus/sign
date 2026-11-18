import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import { TemplateMxLetter } from '../template-components/template-mx-letter';
import { MX_COLORS, mxText } from '../template-components/template-mx-styles';

export interface BulkSendCompleteEmailProps {
  userName: string;
  templateName: string;
  totalProcessed: number;
  successCount: number;
  failedCount: number;
  errors: string[];
  assetBaseUrl?: string;
}

const subheadingStyle = mxText(16, 24, 600, MX_COLORS.navy);

const listStyle = { margin: '4px 0 0 0', padding: '0 0 0 20px' };

export const BulkSendCompleteEmail = ({
  userName,
  templateName,
  totalProcessed,
  successCount,
  failedCount,
  errors,
  assetBaseUrl = 'http://localhost:3002',
}: BulkSendCompleteEmailProps) => {
  const { _ } = useLingui();

  const previewText = msg`Bulk send operation complete for template "${templateName}"`;

  return (
    <TemplateMxLetter
      assetBaseUrl={assetBaseUrl}
      previewText={_(previewText)}
      heading={<Trans>Your bulk send operation for template "{templateName}" has completed.</Trans>}
      lines={[<Trans>Hi {userName},</Trans>]}
      extra={
        <>
          <div style={subheadingStyle}>
            <Trans>Summary:</Trans>
          </div>

          <ul style={listStyle}>
            <li>
              <Trans>Total rows processed: {totalProcessed}</Trans>
            </li>
            <li style={{ marginTop: '4px' }}>
              <Trans>Successfully created: {successCount}</Trans>
            </li>
            <li style={{ marginTop: '4px' }}>
              <Trans>Failed: {failedCount}</Trans>
            </li>
          </ul>

          {errors && errors.length > 0 && (
            <>
              <div style={{ marginTop: '16px', ...subheadingStyle }}>
                <Trans>The following errors occurred:</Trans>
              </div>

              <ul style={listStyle}>
                {errors.map((error, index) => (
                  <li
                    key={index}
                    style={{ marginTop: index > 0 ? '4px' : '0', ...mxText(14, 20, 400, MX_COLORS.error) }}
                  >
                    {error}
                  </li>
                ))}
              </ul>
            </>
          )}

          <div style={{ marginTop: '16px' }}>
            <Trans>
              You can view the created documents in your dashboard under the "Documents created from template"
              section.
            </Trans>
          </div>
        </>
      }
      footer={{ isDocument: false }}
    />
  );
};
