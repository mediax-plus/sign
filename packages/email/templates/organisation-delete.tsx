import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

import { TemplateMxLetter } from '../template-components/template-mx-letter';
import { keepTogether } from '../template-components/template-mx-styles';

export type OrganisationDeleteEmailProps = {
  assetBaseUrl: string;
  organisationName: string;
  /**
   * Whether the deletion was performed by an administrator (as opposed to the owner).
   * Slightly changes the wording in the email.
   */
  deletedByAdmin?: boolean;
};

export const OrganisationDeleteEmailTemplate = ({
  assetBaseUrl = 'http://localhost:3002',
  organisationName = 'Organisation Name Placeholder',
  deletedByAdmin = false,
}: OrganisationDeleteEmailProps) => {
  const { _ } = useLingui();

  const previewText = msg`Your organisation has been deleted`;

  const title = msg`Your organisation has been deleted`;

  const description = deletedByAdmin
    ? msg`The following organisation has been deleted by an administrator. You and your members will no longer be able to access this organisation, its teams, or its associated data.`
    : msg`The following organisation has been deleted. You and your members will no longer be able to access this organisation, its teams, or its associated data.`;

  return (
    <TemplateMxLetter
      assetBaseUrl={assetBaseUrl}
      previewText={_(previewText)}
      heading={_(title)}
      lines={[_(description)]}
      chip={{ title: keepTogether(organisationName), picture: false }}
      footer={{ isDocument: false }}
    />
  );
};

export default OrganisationDeleteEmailTemplate;
