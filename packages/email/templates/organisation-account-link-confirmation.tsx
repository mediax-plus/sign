import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';

import { TemplateMxLetter } from '../template-components/template-mx-letter';
import { keepTogether, mxStrong } from '../template-components/template-mx-styles';

type OrganisationAccountLinkConfirmationTemplateProps = {
  type: 'create' | 'link';
  confirmationLink: string;
  organisationName: string;
  assetBaseUrl: string;
};

export const OrganisationAccountLinkConfirmationTemplate = ({
  type = 'link',
  confirmationLink = '<CONFIRMATION_LINK>',
  organisationName: organisationNameProp = '<ORGANISATION_NAME>',
  assetBaseUrl = 'http://localhost:3002',
}: OrganisationAccountLinkConfirmationTemplateProps) => {
  const { _ } = useLingui();

  const organisationName = keepTogether(organisationNameProp);

  const previewText =
    type === 'create'
      ? msg`A request has been made to create an account for you`
      : msg`A request has been made to link your Documenso account`;

  return (
    <TemplateMxLetter
      assetBaseUrl={assetBaseUrl}
      previewText={_(previewText)}
      heading={type === 'create' ? <Trans>Account creation request</Trans> : <Trans>Link your Documenso account</Trans>}
      lines={[
        type === 'create' ? (
          <Trans>
            <span style={mxStrong}>{organisationName}</span> has requested to create an account on your behalf.
          </Trans>
        ) : (
          <Trans>
            <span style={mxStrong}>{organisationName}</span> has requested to link your current Documenso account to
            their organisation.
          </Trans>
        ),
      ]}
      button={{ label: <Trans>Review request</Trans>, href: confirmationLink }}
      notes={[<Trans>Link expires in 30 minutes.</Trans>]}
      footer={{ isDocument: false }}
    />
  );
};

export default OrganisationAccountLinkConfirmationTemplate;
