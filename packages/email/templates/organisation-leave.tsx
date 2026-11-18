import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';

import { TemplateMxLetter } from '../template-components/template-mx-letter';
import { keepTogether } from '../template-components/template-mx-styles';

export type OrganisationLeaveEmailProps = {
  assetBaseUrl: string;
  baseUrl: string;
  memberName: string;
  memberEmail: string;
  organisationName: string;
  organisationUrl: string;
};

export const OrganisationLeaveEmailTemplate = ({
  assetBaseUrl = 'http://localhost:3002',
  memberName = 'John Doe',
  memberEmail = 'johndoe@documenso.com',
  organisationName: organisationNameProp = 'Organisation Name',
}: OrganisationLeaveEmailProps) => {
  const { _ } = useLingui();

  const organisationName = keepTogether(organisationNameProp);

  const previewText = msg`A member has left your organisation on Documenso`;

  return (
    <TemplateMxLetter
      assetBaseUrl={assetBaseUrl}
      previewText={_(previewText)}
      heading={<Trans>A member has left your organisation {organisationName}</Trans>}
      chip={{ title: memberName || memberEmail, picture: false }}
      footer={{ isDocument: false }}
    />
  );
};

export default OrganisationLeaveEmailTemplate;
