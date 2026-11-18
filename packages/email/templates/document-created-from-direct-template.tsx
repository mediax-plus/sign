import { RECIPIENT_ROLES_DESCRIPTION } from '@documenso/lib/constants/recipient-roles';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { RecipientRole } from '@prisma/client';

import { TemplateMxLetter } from '../template-components/template-mx-letter';
import { breakableTitle } from '../template-components/template-mx-styles';

export type DocumentCompletedEmailTemplateProps = {
  recipientName?: string;
  recipientRole?: RecipientRole;
  documentLink?: string;
  documentName?: string;
  assetBaseUrl?: string;
};

export const DocumentCreatedFromDirectTemplateEmailTemplate = ({
  recipientName = 'John Doe',
  recipientRole = RecipientRole.SIGNER,
  documentLink = 'http://localhost:3000',
  documentName = 'Open Source Pledge.pdf',
  assetBaseUrl = 'http://localhost:3002',
}: DocumentCompletedEmailTemplateProps) => {
  documentName = breakableTitle(documentName);

  const { _ } = useLingui();

  const action = _(RECIPIENT_ROLES_DESCRIPTION[recipientRole].actioned).toLowerCase();

  const previewText = msg`Document created from direct template`;

  return (
    <TemplateMxLetter
      assetBaseUrl={assetBaseUrl}
      previewText={_(previewText)}
      heading={
        <Trans>
          {recipientName} {action} a document by using one of your direct links
        </Trans>
      }
      chip={{ title: documentName }}
      button={{ label: <Trans>View document</Trans>, href: documentLink }}
    />
  );
};

export default DocumentCreatedFromDirectTemplateEmailTemplate;
