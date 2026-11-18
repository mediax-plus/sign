import { RECIPIENT_ROLES_DESCRIPTION } from '@documenso/lib/constants/recipient-roles';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { OrganisationType, RecipientRole } from '@prisma/client';
import { match, P } from 'ts-pattern';

import { TemplateCustomMessageBody } from '../template-components/template-custom-message-body';
import { TemplateMxLetter } from '../template-components/template-mx-letter';
import { breakableTitle, keepTogether, MX_COLORS } from '../template-components/template-mx-styles';
import { TemplateNewAccountWarning } from '../template-components/template-new-account-warning';

export interface TemplateDocumentInviteProps {
  inviterName: string;
  inviterEmail: string;
  documentName: string;
  signDocumentLink: string;
  assetBaseUrl: string;
  role: RecipientRole;
  selfSigner: boolean;
  teamName?: string;
  includeSenderDetails?: boolean;
  organisationType?: OrganisationType;
}

export type DocumentInviteEmailTemplateProps = Partial<TemplateDocumentInviteProps> & {
  customBody?: string;
  role: RecipientRole;
  selfSigner?: boolean;
  teamName?: string;
  teamEmail?: string;
  includeSenderDetails?: boolean;
  organisationType?: OrganisationType;
  reportUrl?: string;

  /**
   * The user's own email, not a team email, so the recipient can verify who
   * actually contacted them.
   */
  newAccountWarningSenderEmail?: string;
};

export const DocumentInviteEmailTemplate = ({
  inviterName = 'Media eXperience',
  inviterEmail = 'lucas@documenso.com',
  documentName = 'Open Source Pledge.pdf',
  signDocumentLink = 'https://documenso.com',
  assetBaseUrl = 'http://localhost:3002',
  customBody,
  role,
  selfSigner = false,
  teamName: teamNameProp = '',
  includeSenderDetails,
  organisationType,
  reportUrl,
  newAccountWarningSenderEmail,
}: DocumentInviteEmailTemplateProps) => {
  documentName = breakableTitle(documentName);

  const { _ } = useLingui();

  // The team name never breaks across lines ("Media eXperience" stays together).
  const teamName = keepTogether(teamNameProp);

  const { actionVerb } = RECIPIENT_ROLES_DESCRIPTION[role];

  const action = _(RECIPIENT_ROLES_DESCRIPTION[role].actionVerb).toLowerCase();

  let previewText = msg`${inviterName} has sent you “${documentName}” to ${action}`;

  if (organisationType === OrganisationType.ORGANISATION) {
    previewText = includeSenderDetails
      ? msg`${inviterName} of ${teamName} has sent you “${documentName}” to ${action}`
      : msg`${teamName} has sent you “${documentName}” to ${action}`;
  }

  if (selfSigner) {
    previewText = msg`Please ${action} your document “${documentName}”`;
  }

  const heading = match({ selfSigner, organisationType, includeSenderDetails, teamName })
    .with({ selfSigner: true }, () => (
      <Trans>
        Please {_(actionVerb).toLowerCase()} your document “{documentName}”
      </Trans>
    ))
    .with(
      {
        organisationType: OrganisationType.ORGANISATION,
        includeSenderDetails: true,
        teamName: P.string,
      },
      () => (
        <Trans>
          {inviterName} of {teamName} has sent you “{documentName}” to {_(actionVerb).toLowerCase()}
        </Trans>
      ),
    )
    .with({ organisationType: OrganisationType.ORGANISATION, teamName: P.string }, () => (
      <Trans>
        {teamName} has sent you “{documentName}” to {_(actionVerb).toLowerCase()}
      </Trans>
    ))
    .otherwise(() => (
      <Trans>
        {inviterName} has sent you “{documentName}” to {_(actionVerb).toLowerCase()}
      </Trans>
    ));

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

  // A message made only of spaces or line breaks counts as no message.
  const hasCustomBody = Boolean(customBody?.trim());

  // Personal organisations show who sent the request, next to the sender's message.
  const senderDetails =
    organisationType === OrganisationType.PERSONAL ? (
      <div style={{ fontWeight: 600, marginBottom: hasCustomBody ? '8px' : '0' }}>
        <Trans>
          {inviterName}{' '}
          <a
            style={{ fontWeight: 400, color: MX_COLORS.slate, textDecoration: 'none' }}
            href={`mailto:${inviterEmail}`}
          >
            ({inviterEmail})
          </a>
        </Trans>
      </div>
    ) : null;

  const message =
    senderDetails || hasCustomBody ? (
      <>
        {senderDetails}
        {hasCustomBody && <TemplateCustomMessageBody text={customBody} />}
      </>
    ) : null;

  return (
    <TemplateMxLetter
      assetBaseUrl={assetBaseUrl}
      previewText={_(previewText)}
      aboveCard={
        newAccountWarningSenderEmail ? (
          <TemplateNewAccountWarning senderEmail={newAccountWarningSenderEmail} reportUrl={reportUrl} />
        ) : null
      }
      heading={heading}
      lines={[line]}
      chip={{ title: documentName, href: signDocumentLink }}
      message={message}
      button={buttonLabel ? { label: buttonLabel, href: signDocumentLink } : undefined}
      footer={{ reportUrl }}
    />
  );
};

export default DocumentInviteEmailTemplate;
