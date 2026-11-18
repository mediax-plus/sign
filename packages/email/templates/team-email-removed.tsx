import { formatTeamUrl } from '@documenso/lib/utils/teams';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';

import { TemplateMxLetter } from '../template-components/template-mx-letter';
import { mxStrong } from '../template-components/template-mx-styles';

export type TeamEmailRemovedTemplateProps = {
  assetBaseUrl: string;
  baseUrl: string;
  teamEmail: string;
  teamName: string;
  teamUrl: string;
};

export const TeamEmailRemovedTemplate = ({
  assetBaseUrl = 'http://localhost:3002',
  baseUrl = 'https://documenso.com',
  teamEmail = 'example@documenso.com',
  teamName = 'Team Name',
  teamUrl = 'demo',
}: TeamEmailRemovedTemplateProps) => {
  const { _ } = useLingui();

  const previewText = msg`Team email removed for ${teamName} on Documenso`;

  return (
    <TemplateMxLetter
      assetBaseUrl={assetBaseUrl}
      previewText={_(previewText)}
      heading={<Trans>Team email removed</Trans>}
      lines={[
        <Trans>
          The team email <span style={mxStrong}>{teamEmail}</span> has been removed from the following team
        </Trans>,
      ]}
      chip={{ title: formatTeamUrl(teamUrl, baseUrl), picture: false }}
      footer={{ isDocument: false }}
    />
  );
};

export default TeamEmailRemovedTemplate;
