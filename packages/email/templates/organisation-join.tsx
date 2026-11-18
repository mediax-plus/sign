import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';

import { TemplateMxLetter } from '../template-components/template-mx-letter';
import { keepTogether } from '../template-components/template-mx-styles';

export type OrganisationJoinEmailProps = {
  assetBaseUrl: string;
  baseUrl: string;
  memberName: string;
  memberEmail: string;
  organisationName: string;
  organisationUrl: string;
};

export const OrganisationJoinEmailTemplate = ({
  assetBaseUrl = 'http://localhost:3002',
  memberName = 'John Doe',
  memberEmail = 'johndoe@documenso.com',
  organisationName: organisationNameProp = 'Organisation Name',
}: OrganisationJoinEmailProps) => {
  const { _ } = useLingui();

  const organisationName = keepTogether(organisationNameProp);

  const previewText = msg`A member has joined your organisation on Documenso`;

  return (
    <TemplateMxLetter
      assetBaseUrl={assetBaseUrl}
      previewText={_(previewText)}
      heading={<Trans>A new member has joined your organisation {organisationName}</Trans>}
      chip={{ title: memberName || memberEmail, picture: false }}
      footer={{ isDocument: false }}
    />
  );
};

export default OrganisationJoinEmailTemplate;
