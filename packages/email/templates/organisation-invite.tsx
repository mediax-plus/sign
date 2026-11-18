import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';

import { TemplateMxLetter } from '../template-components/template-mx-letter';
import { keepTogether, mxStrong } from '../template-components/template-mx-styles';

export type OrganisationInviteEmailProps = {
  assetBaseUrl: string;
  baseUrl: string;
  senderName: string;
  organisationName: string;
  token: string;
};

export const OrganisationInviteEmailTemplate = ({
  assetBaseUrl = 'http://localhost:3002',
  baseUrl = 'https://documenso.com',
  senderName = 'John Doe',
  organisationName: organisationNameProp = 'Organisation Name',
  token = '',
}: OrganisationInviteEmailProps) => {
  const { _ } = useLingui();

  const organisationName = keepTogether(organisationNameProp);

  const previewText = msg`Accept invitation to join an organisation`;

  return (
    <TemplateMxLetter
      assetBaseUrl={assetBaseUrl}
      previewText={_(previewText)}
      heading={<Trans>Join {organisationName}</Trans>}
      lines={[<Trans>You have been invited to join the following organisation</Trans>]}
      chip={{ title: organisationName, picture: false, href: null }}
      linesAfterChip={[
        <Trans>
          by <span style={mxStrong}>{senderName}</span>
        </Trans>,
      ]}
      button={{ label: <Trans>Accept</Trans>, href: `${baseUrl}/organisation/invite/${token}` }}
      secondaryButton={{ label: <Trans>Decline</Trans>, href: `${baseUrl}/organisation/decline/${token}` }}
      footer={{ isDocument: false }}
    />
  );
};

export default OrganisationInviteEmailTemplate;
