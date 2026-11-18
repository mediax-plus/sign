/**
 * Sample emails for the MX email previews workflow (.github/workflows/mx-email-previews.yml).
 *
 * run.mjs loads this file through Vite, so the Lingui macros compile the way they do in the app,
 * and every email goes through the same renderEmailWithI18N call the server uses. The result is the
 * HTML and the plain text of each sample, plus a list of failed checks on the HTML.
 */
import { renderEmailWithI18N } from '@documenso/lib/utils/render-email-with-i18n';
import { OrganisationType, RecipientRole } from '@prisma/client';
import type { ReactElement } from 'react';

import type { BrandingSettings } from '../providers/branding';
import { AccessAuth2FAEmailTemplate } from '../templates/access-auth-2fa';
import { AccountDisabledEmailTemplate } from '../templates/account-disabled';
import { AdminUserCreatedTemplate } from '../templates/admin-user-created';
import { BulkSendCompleteEmail } from '../templates/bulk-send-complete';
import { ConfirmEmailTemplate } from '../templates/confirm-email';
import { ConfirmTeamEmailTemplate } from '../templates/confirm-team-email';
import { DocumentCancelTemplate } from '../templates/document-cancel';
import { DocumentCompletedEmailTemplate } from '../templates/document-completed';
import { DocumentCreatedFromDirectTemplateEmailTemplate } from '../templates/document-created-from-direct-template';
import { DocumentInviteEmailTemplate } from '../templates/document-invite';
import { DocumentPendingEmailTemplate } from '../templates/document-pending';
import { DocumentRecipientSignedEmailTemplate } from '../templates/document-recipient-signed';
import { DocumentRejectedEmail } from '../templates/document-rejected';
import { DocumentRejectionConfirmedEmail } from '../templates/document-rejection-confirmed';
import { DocumentReminderEmailTemplate } from '../templates/document-reminder';
import { DocumentSelfSignedEmailTemplate } from '../templates/document-self-signed';
import { DocumentSuperDeleteEmailTemplate } from '../templates/document-super-delete';
import { ForgotPasswordTemplate } from '../templates/forgot-password';
import { OrganisationAccountLinkConfirmationTemplate } from '../templates/organisation-account-link-confirmation';
import { OrganisationDeleteEmailTemplate } from '../templates/organisation-delete';
import { OrganisationInviteEmailTemplate } from '../templates/organisation-invite';
import { OrganisationJoinEmailTemplate } from '../templates/organisation-join';
import { OrganisationLeaveEmailTemplate } from '../templates/organisation-leave';
import { OrganisationLimitAlertEmailTemplate } from '../templates/organisation-limit-alert';
import { OrganisationLimitsUpdatedEmailTemplate } from '../templates/organisation-limits-updated';
import { RecipientExpiredTemplate } from '../templates/recipient-expired';
import { RecipientRemovedByAdminEmailTemplate } from '../templates/recipient-removed-by-admin';
import { RecipientRemovedFromDocumentTemplate } from '../templates/recipient-removed-from-document';
import { ResetPasswordTemplate } from '../templates/reset-password';
import { TeamDeleteEmailTemplate } from '../templates/team-delete';
import { TeamEmailRemovedTemplate } from '../templates/team-email-removed';

const assetBaseUrl = 'https://sign.mediax.plus';
const baseUrl = 'https://sign.mediax.plus';

/** run.mjs swaps this address for the branch's own pictures in a second copy of each email. */
export const previewAssetBaseUrl = assetBaseUrl;

const sender = 'Vladimir Arandjelovic';
const senderEmail = 'vladimir.arandjelovic@example.com';
const organisation = 'Media eXperience';
const documentName = 'Advertising Agreement 2027, SILMA';
const recipient = 'Ana';
const recipientEmail = 'ana@example.com';

const signLink = `${baseUrl}/sign/preview-token`;
const reportUrl = `${baseUrl}/report/preview-token`;

// 60 characters without a space, and a 40-character sender name.
const longTitle = 'Advertising_Agreement_2027_SILMA_final_signed_version_v3.pdf';
const longSender = 'Vladimir Arandjelovic Longname Testsender';

const twoParagraphMessage =
  'Hi Ana, here is the 2027 agreement we discussed on Tuesday.\n\nLet me know if anything needs a change.\nVladimir';

const longLinkMessage =
  'Hi Ana, the media plan is here: https://www.mediax.plus/briefs/2027/silma/advertising-agreement-annex-a-media-plan-and-flighting-schedule-final?ref=sign-request&utm_source=email\n\nVladimir';

/** The organisation's email branding as set up on sign.mediax.plus. */
const branding: BrandingSettings = {
  brandingEnabled: true,
  brandingUrl: '',
  brandingLogo: `${baseUrl}/api/branding/logo/team/1`,
  brandingCompanyDetails: 'Media eXperience d.o.o., Bulevar vojvode Bojovića 6-8, 11000 Belgrade, Serbia',
  brandingHidePoweredBy: true,
};

const request = {
  inviterName: sender,
  inviterEmail: senderEmail,
  documentName,
  signDocumentLink: signLink,
  assetBaseUrl,
  role: RecipientRole.SIGNER,
  organisationType: OrganisationType.ORGANISATION,
  teamName: organisation,
  includeSenderDetails: true,
  reportUrl,
};

export type MxPreview = {
  name: string;
  description: string;
  element: ReactElement;
};

export const previews: MxPreview[] = [
  {
    name: '01-request-with-message',
    description: 'Signing request with a two-paragraph personal message',
    element: <DocumentInviteEmailTemplate {...request} customBody={twoParagraphMessage} />,
  },
  {
    name: '02-request-without-message',
    description: 'Signing request without a message',
    element: <DocumentInviteEmailTemplate {...request} />,
  },
  {
    name: '03-request-long-title-long-sender',
    description: 'Signing request, 60-character title without spaces, 40-character sender name',
    element: (
      <DocumentInviteEmailTemplate
        {...request}
        inviterName={longSender}
        documentName={longTitle}
        customBody={twoParagraphMessage}
      />
    ),
  },
  {
    name: '04-request-long-link',
    description: 'Signing request whose message holds a long link',
    element: <DocumentInviteEmailTemplate {...request} customBody={longLinkMessage} />,
  },
  {
    name: '05-request-personal-sender',
    description: 'Signing request from a personal account (sender details next to the message)',
    element: (
      <DocumentInviteEmailTemplate
        {...request}
        organisationType={OrganisationType.PERSONAL}
        teamName=""
        customBody={twoParagraphMessage}
      />
    ),
  },
  {
    name: '06-request-new-account-warning',
    description: 'Signing request from a new account (warning above the card)',
    element: <DocumentInviteEmailTemplate {...request} newAccountWarningSenderEmail={senderEmail} />,
  },
  {
    name: '07-reminder',
    description: 'Reminder with the personal message',
    element: (
      <DocumentReminderEmailTemplate
        recipientName={recipient}
        documentName={documentName}
        signDocumentLink={signLink}
        assetBaseUrl={assetBaseUrl}
        customBody={twoParagraphMessage}
        role={RecipientRole.SIGNER}
        reportUrl={reportUrl}
      />
    ),
  },
  {
    name: '08-waiting-for-others',
    description: 'Signed, waiting for the other signers',
    element: <DocumentPendingEmailTemplate documentName={documentName} assetBaseUrl={assetBaseUrl} />,
  },
  {
    name: '09-signed-by-all-parties',
    description: 'Signed by all parties (the copy a partner receives)',
    element: (
      <DocumentCompletedEmailTemplate
        documentName={documentName}
        assetBaseUrl={assetBaseUrl}
        downloadLink={`${baseUrl}/sign/preview-token/complete`}
        reportUrl={reportUrl}
      />
    ),
  },
  {
    name: '10-rejected-with-reason',
    description: 'Rejected, with the reason',
    element: (
      <DocumentRejectedEmail
        recipientName={recipient}
        documentName={documentName}
        documentUrl={`${baseUrl}/t/mx/documents/1`}
        rejectionReason="The flighting dates in annex A need to move to March."
        assetBaseUrl={assetBaseUrl}
      />
    ),
  },
  {
    name: '11-cancelled',
    description: 'Cancelled, no reason, no button',
    element: (
      <DocumentCancelTemplate
        inviterName={sender}
        inviterEmail={senderEmail}
        documentName={documentName}
        assetBaseUrl={assetBaseUrl}
      />
    ),
  },
  {
    name: '12-cancelled-with-reason',
    description: 'Cancelled, with the reason',
    element: (
      <DocumentCancelTemplate
        inviterName={sender}
        inviterEmail={senderEmail}
        documentName={documentName}
        assetBaseUrl={assetBaseUrl}
        cancellationReason="A new version with the updated annex follows today."
      />
    ),
  },
  {
    name: '13-staff-confirm-email',
    description: 'Staff: confirm the email address',
    element: <ConfirmEmailTemplate confirmationLink={`${baseUrl}/verify-email/preview-token`} assetBaseUrl={assetBaseUrl} />,
  },
  {
    name: '14-staff-reset-password',
    description: 'Staff: reset the password',
    element: <ForgotPasswordTemplate resetPasswordLink={`${baseUrl}/reset-password/preview-token`} assetBaseUrl={assetBaseUrl} />,
  },
  {
    name: '15-staff-organisation-invite',
    description: 'Staff: invitation to the organisation',
    element: (
      <OrganisationInviteEmailTemplate
        assetBaseUrl={assetBaseUrl}
        baseUrl={baseUrl}
        senderName={sender}
        organisationName={organisation}
        token="preview-token"
      />
    ),
  },

  // Every other template once, with its own defaults where it has them.
  {
    name: '20-access-auth-2fa',
    description: 'Verification code for a document',
    element: (
      <AccessAuth2FAEmailTemplate
        documentTitle={documentName}
        code="482913"
        userEmail={recipientEmail}
        userName={recipient}
        expiresInMinutes={10}
        assetBaseUrl={assetBaseUrl}
      />
    ),
  },
  {
    name: '21-account-disabled',
    description: 'Account disabled (defaults)',
    element: <AccountDisabledEmailTemplate assetBaseUrl={assetBaseUrl} />,
  },
  {
    name: '22-admin-user-created',
    description: 'Account made by an administrator',
    element: (
      <AdminUserCreatedTemplate
        resetPasswordLink={`${baseUrl}/reset-password/preview-token`}
        assetBaseUrl={assetBaseUrl}
      />
    ),
  },
  {
    name: '23-bulk-send-complete',
    description: 'Bulk send finished, with two errors',
    element: (
      <BulkSendCompleteEmail
        userName={sender}
        templateName="Advertising Agreement 2027"
        totalProcessed={12}
        successCount={10}
        failedCount={2}
        errors={['Row 4: the email address is not valid', 'Row 9: the signer has no name']}
        assetBaseUrl={assetBaseUrl}
      />
    ),
  },
  {
    name: '24-confirm-team-email',
    description: 'Team email confirmation (defaults)',
    element: <ConfirmTeamEmailTemplate assetBaseUrl={assetBaseUrl} baseUrl={baseUrl} teamName="Team Name" teamUrl="demo" token="" />,
  },
  {
    name: '25-document-created-from-direct-template',
    description: 'Document created from a direct link (defaults)',
    element: <DocumentCreatedFromDirectTemplateEmailTemplate assetBaseUrl={assetBaseUrl} />,
  },
  {
    name: '26-document-recipient-signed',
    description: 'A recipient signed (defaults)',
    element: <DocumentRecipientSignedEmailTemplate assetBaseUrl={assetBaseUrl} />,
  },
  {
    name: '27-document-rejection-confirmed',
    description: 'Rejection confirmed to the partner',
    element: (
      <DocumentRejectionConfirmedEmail
        recipientName={recipient}
        documentName={documentName}
        documentOwnerName={sender}
        reason="The flighting dates in annex A need to move to March."
        assetBaseUrl={assetBaseUrl}
      />
    ),
  },
  {
    name: '28-document-self-signed',
    description: 'Signed your own document (defaults)',
    element: <DocumentSelfSignedEmailTemplate documentName="Open Source Pledge.pdf" assetBaseUrl={assetBaseUrl} />,
  },
  {
    name: '29-document-super-delete',
    description: 'Document deleted by an administrator (defaults)',
    element: <DocumentSuperDeleteEmailTemplate assetBaseUrl={assetBaseUrl} />,
  },
  {
    name: '30-organisation-account-link-confirmation',
    description: 'Account link request (defaults)',
    element: <OrganisationAccountLinkConfirmationTemplate type="link" confirmationLink="<CONFIRMATION_LINK>" organisationName="<ORGANISATION_NAME>" assetBaseUrl={assetBaseUrl} />,
  },
  {
    name: '31-organisation-delete',
    description: 'Organisation deleted (defaults)',
    element: <OrganisationDeleteEmailTemplate assetBaseUrl={assetBaseUrl} organisationName="Organisation Name Placeholder" />,
  },
  {
    name: '32-organisation-join',
    description: 'A member joined (defaults)',
    element: (
      <OrganisationJoinEmailTemplate
        assetBaseUrl={assetBaseUrl}
        baseUrl={baseUrl}
        memberName="John Doe"
        memberEmail="johndoe@documenso.com"
        organisationName="Organisation Name"
        organisationUrl="demo"
      />
    ),
  },
  {
    name: '33-organisation-leave',
    description: 'A member left (defaults)',
    element: (
      <OrganisationLeaveEmailTemplate
        assetBaseUrl={assetBaseUrl}
        baseUrl={baseUrl}
        memberName="John Doe"
        memberEmail="johndoe@documenso.com"
        organisationName="Organisation Name"
        organisationUrl="demo"
      />
    ),
  },
  {
    name: '34-organisation-limit-alert',
    description: 'Organisation limit alert (defaults)',
    element: (
      <OrganisationLimitAlertEmailTemplate
        assetBaseUrl={assetBaseUrl}
        organisationName="Organisation Name"
        counter="email"
        kind="quota"
        period="2026-05"
      />
    ),
  },
  {
    name: '35-organisation-limits-updated',
    description: 'Organisation limits updated (defaults)',
    element: <OrganisationLimitsUpdatedEmailTemplate assetBaseUrl={assetBaseUrl} organisationName="Organisation Name" />,
  },
  {
    name: '36-recipient-expired',
    description: 'Signing window expired (defaults)',
    element: <RecipientExpiredTemplate assetBaseUrl={assetBaseUrl} />,
  },
  {
    name: '37-recipient-removed-by-admin',
    description: 'Removed from a document by an administrator (defaults)',
    element: <RecipientRemovedByAdminEmailTemplate assetBaseUrl={assetBaseUrl} />,
  },
  {
    name: '38-recipient-removed-from-document',
    description: 'Removed from a document by the sender (defaults)',
    element: <RecipientRemovedFromDocumentTemplate assetBaseUrl={assetBaseUrl} />,
  },
  {
    name: '39-reset-password',
    description: 'Password changed (defaults)',
    element: <ResetPasswordTemplate assetBaseUrl={assetBaseUrl} />,
  },
  {
    name: '40-team-delete',
    description: 'Team deleted (defaults)',
    element: <TeamDeleteEmailTemplate assetBaseUrl={assetBaseUrl} baseUrl={baseUrl} teamUrl="demo" />,
  },
  {
    name: '41-team-email-removed',
    description: 'Team email removed (defaults)',
    element: (
      <TeamEmailRemovedTemplate
        assetBaseUrl={assetBaseUrl}
        baseUrl={baseUrl}
        teamEmail="example@documenso.com"
        teamName="Team Name"
        teamUrl="demo"
      />
    ),
  },
];

/** Checks on the rendered HTML. Each failure names the sample and what is missing. */
const checkHtml = (name: string, html: string): string[] => {
  const failures: string[] = [];

  const expect = (ok: boolean, what: string) => {
    if (!ok) {
      failures.push(`${name}: ${what}`);
    }
  };

  expect(html.includes('class="mxl-pad"'), 'the phone class names are missing (mxl-pad)');
  expect(html.includes('@media only screen and (max-width:599px)'), 'the phone styles are missing');
  expect(html.includes('<!--[if mso]><table'), 'the Outlook ghost table is missing');
  expect(!html.includes('data-mx-mso'), 'an Outlook marker was not replaced');
  expect(html.includes(`${assetBaseUrl}/static/email-logo.png`), 'the email logo is missing');
  expect(html.includes('Media eXperience'), 'the logo alt text with a non-breaking space is missing');
  expect(html.includes('name="viewport"'), 'the viewport meta is missing');
  expect(!html.includes('Documenso, Inc.'), 'the Documenso address shows in the footer');

  return failures;
};

export const renderAll = async () => {
  const results: { name: string; description: string; html: string; text: string }[] = [];
  const failures: string[] = [];

  for (const preview of previews) {
    const [html, text] = await Promise.all([
      renderEmailWithI18N(preview.element, { lang: 'en', branding }),
      renderEmailWithI18N(preview.element, { lang: 'en', branding, plainText: true }),
    ]);

    failures.push(...checkHtml(preview.name, html));
    results.push({ name: preview.name, description: preview.description, html, text });
  }

  return { results, failures };
};
