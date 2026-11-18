import { formatTeamUrl } from '@documenso/lib/utils/teams';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

import { TemplateMxLetter } from '../template-components/template-mx-letter';

export type TeamDeleteEmailProps = {
  assetBaseUrl: string;
  baseUrl: string;
  teamUrl: string;
};

export const TeamDeleteEmailTemplate = ({
  assetBaseUrl = 'http://localhost:3002',
  baseUrl = 'https://documenso.com',
  teamUrl = 'demo',
}: TeamDeleteEmailProps) => {
  const { _ } = useLingui();

  const previewText = msg`A team you were a part of has been deleted`;

  const title = msg`A team you were a part of has been deleted`;

  const description = msg`The following team has been deleted. You will no longer be able to access this team and its documents`;

  return (
    <TemplateMxLetter
      assetBaseUrl={assetBaseUrl}
      previewText={_(previewText)}
      heading={_(title)}
      lines={[_(description)]}
      chip={{ title: formatTeamUrl(teamUrl, baseUrl), picture: false }}
      footer={{ isDocument: false }}
    />
  );
};

export default TeamDeleteEmailTemplate;
