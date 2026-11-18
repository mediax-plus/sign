import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';

import { TemplateMxLetter } from '../template-components/template-mx-letter';
import { breakableTitle } from '../template-components/template-mx-styles';

type DocumentRejectedEmailProps = {
  recipientName: string;
  documentName: string;
  documentUrl: string;
  rejectionReason: string;
  assetBaseUrl?: string;
};

export function DocumentRejectedEmail({
  recipientName,
  documentName,
  documentUrl,
  rejectionReason,
  assetBaseUrl = 'http://localhost:3002',
}: DocumentRejectedEmailProps) {
  documentName = breakableTitle(documentName);

  const { _ } = useLingui();

  const previewText = _(msg`${recipientName} has rejected the document “${documentName}”`);

  const signerName = recipientName;

  return (
    <TemplateMxLetter
      assetBaseUrl={assetBaseUrl}
      previewText={previewText}
      heading={<Trans>Document Rejected</Trans>}
      lines={[
        <Trans>
          {signerName} has rejected the document “{documentName}”.
        </Trans>,
        <Trans>You can view the document and its status by clicking the button below.</Trans>,
      ]}
      chip={{ title: documentName }}
      message={rejectionReason ? <Trans>Reason for rejection: {rejectionReason}</Trans> : null}
      button={{ label: <Trans>View Document</Trans>, href: documentUrl }}
    />
  );
}

export default DocumentRejectedEmail;
