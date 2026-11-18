import { formatTeamUrl } from '@documenso/lib/utils/teams';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';

import { TemplateMxLetter } from '../template-components/template-mx-letter';
import { keepTogether, MX_COLORS, mxInlineLink, mxStrong, mxText } from '../template-components/template-mx-styles';

export type ConfirmTeamEmailProps = {
  assetBaseUrl: string;
  baseUrl: string;
  teamName: string;
  teamUrl: string;
  token: string;
};

export const ConfirmTeamEmailTemplate = ({
  assetBaseUrl = 'http://localhost:3002',
  baseUrl = 'https://documenso.com',
  teamName: teamNameProp = 'Team Name',
  teamUrl = 'demo',
  token = '',
}: ConfirmTeamEmailProps) => {
  const { _ } = useLingui();

  const teamName = keepTogether(teamNameProp);

  const previewText = msg`Accept team email request for ${teamName} on Documenso`;

  const smallText = mxText(14, 20, 400, MX_COLORS.slate);

  return (
    <TemplateMxLetter
      assetBaseUrl={assetBaseUrl}
      previewText={_(previewText)}
      heading={<Trans>Verify your team email address</Trans>}
      lines={[
        <Trans>
          <span style={mxStrong}>{teamName}</span> has requested to use your email address for their team on
          Documenso.
        </Trans>,
      ]}
      chip={{ title: formatTeamUrl(teamUrl, baseUrl), picture: false, href: null }}
      extra={
        <>
          <div style={smallText}>
            <Trans>
              By accepting this request, you will be granting <strong style={mxStrong}>{teamName}</strong> access to:
            </Trans>
          </div>

          <ul style={{ margin: '8px 0 0 0', padding: '0 0 0 20px', ...smallText }}>
            <li>
              <Trans>View all documents sent to and from this email address</Trans>
            </li>
            <li style={{ marginTop: '4px' }}>
              <Trans>Allow document recipients to reply directly to this email address</Trans>
            </li>
            <li style={{ marginTop: '4px' }}>
              <Trans>Send documents on behalf of the team using the email address</Trans>
            </li>
          </ul>

          <div style={{ marginTop: '8px', ...smallText }}>
            <Trans>
              You can revoke access at any time in your team settings on Documenso{' '}
              <a href={`${baseUrl}/settings/teams`} style={mxInlineLink}>
                here
              </a>
              .
            </Trans>
          </div>
        </>
      }
      button={{ label: <Trans>Accept</Trans>, href: `${baseUrl}/team/verify/email/${token}` }}
      notes={[<Trans>Link expires in 1 hour.</Trans>]}
      footer={{ isDocument: false }}
    />
  );
};

export default ConfirmTeamEmailTemplate;
