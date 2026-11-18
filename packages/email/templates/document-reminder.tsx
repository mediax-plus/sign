import { RECIPIENT_ROLES_DESCRIPTION } from '@documenso/lib/constants/recipient-roles';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { RecipientRole } from '@prisma/client';
import { match } from 'ts-pattern';

import { TemplateCustomMessageBody } from '../template-components/template-custom-message-body';
import { TemplateMxLetter } from '../template-components/template-mx-letter';
import { TemplateNewAccountWarning } from '../template-components/template-new-account-warning';

export type DocumentReminderEmailTemplateProps = {
  recipientName: string;
  documentName: string;
  signDocumentLink: string;
  assetBaseUrl?: string;
  customBody?: string;
  role: RecipientRole;
  reportUrl?: string;
  newAccountWarningSenderEmail?: string;
};

export const DocumentReminderEmailTemplate = ({
  recipientName = 'John Doe',
  documentName = 'Open Source Pledge.pdf',
  signDocumentLink = 'https://documenso.com',
  assetBaseUrl = 'http://localhost:3002',
  customBody,
  role = RecipientRole.SIGNER,
  reportUrl,
  newAccountWarningSenderEmail,
}: DocumentReminderEmailTemplateProps) => {
  const { _ } = useLingui();

  const { actionVerb } = RECIPIENT_ROLES_DESCRIPTION[role];

  const action = _(RECIPIENT_ROLES_DESCRIPTION[role].actionVerb).toLowerCase();

  const previewText = msg`Reminder to ${action} ${documentName}`;

  const line = match(role)
    .with(RecipientRole.SIGNER, () => <Trans>Please review the document and sign it online.</Trans>)
    .with(RecipientRole.VIEWER, () => <Trans>Please review the document online.</Trans>)
    .with(RecipientRole.APPROVER, () => <Trans>Please review the document and approve it online.</Trans>)
    .with(RecipientRole.CC, () => '')
    .with(RecipientRole.ASSISTANT, () => <Trans>Please review the document and assist with it online.</Trans>)
    .exhaustive();

  const buttonLabel = match(role)
    .with(RecipientRole.SIGNER, () => <Trans>Review and sign</Trans>)
    .with(RecipientRole.VIEWER, () => <Trans>Review document</Trans>)
    .with(RecipientRole.APPROVER, () => <Trans>Review and approve</Trans>)
    .with(RecipientRole.CC, () => '')
    .with(RecipientRole.ASSISTANT, () => <Trans>Review and assist</Trans>)
    .exhaustive();

  return (
    <TemplateMxLetter
      assetBaseUrl={assetBaseUrl}
      previewText={_(previewText)}
      aboveCard={
        newAccountWarningSenderEmail ? (
          <TemplateNewAccountWarning senderEmail={newAccountWarningSenderEmail} reportUrl={reportUrl} />
        ) : null
      }
      heading={
        <Trans>
          Reminder: please {_(actionVerb).toLowerCase()}
          <br />“{documentName}”
        </Trans>
      }
      lines={[<Trans>Hi {recipientName},</Trans>, line]}
      chip={{ title: documentName, href: signDocumentLink }}
      message={customBody ? <TemplateCustomMessageBody text={customBody} /> : null}
      button={buttonLabel ? { label: buttonLabel, href: signDocumentLink } : undefined}
      footer={{ reportUrl }}
    />
  );
};

export default DocumentReminderEmailTemplate;
