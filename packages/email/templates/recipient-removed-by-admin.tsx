import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';

import { TemplateMxLetter } from '../template-components/template-mx-letter';
import { breakableTitle } from '../template-components/template-mx-styles';

export type TemplateRecipientRemovedByAdminAudience = 'recipient' | 'owner';

export type TemplateRecipientRemovedByAdminProps = {
  audience: TemplateRecipientRemovedByAdminAudience;
  documentName: string;
  recipientName: string;
  recipientEmail: string;
  assetBaseUrl: string;
};

export type RecipientRemovedByAdminEmailTemplateProps = Partial<TemplateRecipientRemovedByAdminProps>;

export const RecipientRemovedByAdminEmailTemplate = ({
  audience = 'recipient',
  documentName = 'Open Source Pledge.pdf',
  recipientName = 'Media eXperience',
  recipientEmail = 'lucas@documenso.com',
  assetBaseUrl = 'http://localhost:3002',
}: RecipientRemovedByAdminEmailTemplateProps) => {
  documentName = breakableTitle(documentName);

  const { _ } = useLingui();

  const previewText =
    audience === 'recipient'
      ? msg`You have been removed from the document "${documentName}" by an administrator.`
      : msg`${recipientName} has been removed from the document "${documentName}" by an administrator.`;

  const recipientLabel =
    recipientName && recipientName !== recipientEmail ? `${recipientName} (${recipientEmail})` : recipientEmail;

  return (
    <TemplateMxLetter
      assetBaseUrl={assetBaseUrl}
      previewText={_(previewText)}
      heading={
        audience === 'recipient' ? (
          <Trans>You have been removed from a document</Trans>
        ) : (
          <Trans>A recipient has been removed from your document</Trans>
        )
      }
      lines={[
        audience === 'recipient' ? (
          <Trans>
            You have been removed from the document "{documentName}" by an administrator, typically at the request of
            the document sender.
          </Trans>
        ) : (
          <Trans>
            {recipientLabel} has been removed from the document "{documentName}" by an administrator, typically at the
            request of the document sender.
          </Trans>
        ),
        audience === 'recipient' ? (
          <Trans>
            There is no action required on your side. If you believe this was a mistake, please contact the document
            sender.
          </Trans>
        ) : (
          <Trans>
            There is no action required on your side. If you believe this was a mistake, please contact your
            administrator.
          </Trans>
        ),
      ]}
      chip={{ title: documentName }}
    />
  );
};

export default RecipientRemovedByAdminEmailTemplate;
