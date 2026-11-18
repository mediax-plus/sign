import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';

import { TemplateMxLetter } from '../template-components/template-mx-letter';

export interface DocumentRecipientSignedEmailTemplateProps {
  documentName?: string;
  recipientName?: string;
  recipientEmail?: string;
  assetBaseUrl?: string;
}

export const DocumentRecipientSignedEmailTemplate = ({
  documentName = 'Open Source Pledge.pdf',
  recipientName = 'John Doe',
  recipientEmail = 'lucas@documenso.com',
  assetBaseUrl = 'http://localhost:3002',
}: DocumentRecipientSignedEmailTemplateProps) => {
  const { _ } = useLingui();

  const recipientReference = recipientName || recipientEmail;

  const previewText = msg`${recipientReference} has signed ${documentName}`;

  return (
    <TemplateMxLetter
      assetBaseUrl={assetBaseUrl}
      previewText={_(previewText)}
      status={{ picture: 'completed.png', label: <Trans>Completed</Trans> }}
      heading={
        <Trans>
          {recipientReference} has signed "{documentName}"
        </Trans>
      }
      lines={[<Trans>{recipientReference} has completed signing the document.</Trans>]}
      chip={{ title: documentName }}
    />
  );
};

export default DocumentRecipientSignedEmailTemplate;
