import { RECIPIENT_ROLES_DESCRIPTION } from '@documenso/lib/constants/recipient-roles';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { RecipientRole } from '@prisma/client';
import { match } from 'ts-pattern';

import { Button, Section, Text } from '../components';
import { TemplateDocumentImage } from './template-document-image';

export interface TemplateDocumentReminderProps {
  recipientName: string;
  documentName: string;
  signDocumentLink: string;
  assetBaseUrl: string;
  role: RecipientRole;
}

export const TemplateDocumentReminder = ({
  recipientName,
  documentName,
  signDocumentLink,
  assetBaseUrl,
  role,
}: TemplateDocumentReminderProps) => {
  const { _ } = useLingui();

  const { actionVerb } = RECIPIENT_ROLES_DESCRIPTION[role];

  return (
    <>
      <TemplateDocumentImage className="mt-6" assetBaseUrl={assetBaseUrl} />

      <Section>
        <Text className="mx-auto mb-0 max-w-[80%] text-center font-semibold text-foreground text-lg">
          <Trans>
            Reminder: please {_(actionVerb).toLowerCase()}
            <br />“{documentName}”
          </Trans>
        </Text>

        <Text className="my-1 text-center text-base text-muted-foreground">
          <Trans>Hi {recipientName},</Trans>
        </Text>

        <Text className="my-1 text-center text-base text-muted-foreground">
          {match(role)
            .with(RecipientRole.SIGNER, () => <Trans>Please review the document and sign it online.</Trans>)
            .with(RecipientRole.VIEWER, () => <Trans>Please review the document online.</Trans>)
            .with(RecipientRole.APPROVER, () => <Trans>Please review the document and approve it online.</Trans>)
            .with(RecipientRole.CC, () => '')
            .with(RecipientRole.ASSISTANT, () => <Trans>Please review the document and assist with it online.</Trans>)
            .exhaustive()}
        </Text>

        <Section className="mt-8 mb-6 text-center">
          <Button
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-center font-medium text-primary-foreground text-sm no-underline"
            href={signDocumentLink}
          >
            {match(role)
              .with(RecipientRole.SIGNER, () => <Trans>Review and sign</Trans>)
              .with(RecipientRole.VIEWER, () => <Trans>Review document</Trans>)
              .with(RecipientRole.APPROVER, () => <Trans>Review and approve</Trans>)
              .with(RecipientRole.CC, () => '')
              .with(RecipientRole.ASSISTANT, () => <Trans>Review and assist</Trans>)
              .exhaustive()}
          </Button>
        </Section>
      </Section>
    </>
  );
};

export default TemplateDocumentReminder;
