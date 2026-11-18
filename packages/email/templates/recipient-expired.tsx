import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';

import { TemplateMxLetter } from '../template-components/template-mx-letter';
import { breakableTitle } from '../template-components/template-mx-styles';

export type TemplateRecipientExpiredProps = {
  documentName: string;
  recipientName: string;
  recipientEmail: string;
  documentLink: string;
  assetBaseUrl: string;
};

export type RecipientExpiredEmailTemplateProps = Partial<TemplateRecipientExpiredProps>;

export const RecipientExpiredTemplate = ({
  documentName = 'Open Source Pledge.pdf',
  recipientName = 'John Doe',
  recipientEmail = 'john@example.com',
  documentLink = 'https://documenso.com',
  assetBaseUrl = 'http://localhost:3002',
}: RecipientExpiredEmailTemplateProps) => {
  documentName = breakableTitle(documentName);

  const { _ } = useLingui();

  const previewText = msg`The signing window for "${recipientName}" on document "${documentName}" has expired.`;

  const displayName = recipientName || recipientEmail;

  return (
    <TemplateMxLetter
      assetBaseUrl={assetBaseUrl}
      previewText={_(previewText)}
      heading={
        <Trans>
          Signing window expired for "{displayName}" on "{documentName}"
        </Trans>
      }
      lines={[
        <Trans>
          The signing window for {displayName} on document "{documentName}" has expired. You can resend the document
          to extend their deadline or cancel the document.
        </Trans>,
      ]}
      chip={{ title: documentName }}
      button={{ label: <Trans>View Document</Trans>, href: documentLink }}
    />
  );
};

export default RecipientExpiredTemplate;
