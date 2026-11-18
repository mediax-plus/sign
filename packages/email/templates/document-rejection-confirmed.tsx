import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';

import { TemplateMxLetter } from '../template-components/template-mx-letter';
import { breakableTitle, mxStrong } from '../template-components/template-mx-styles';

export type DocumentRejectionConfirmedEmailProps = {
  recipientName: string;
  documentName: string;
  documentOwnerName: string;
  reason: string;
  assetBaseUrl?: string;
};

export function DocumentRejectionConfirmedEmail({
  documentName,
  documentOwnerName,
  reason,
  assetBaseUrl = 'http://localhost:3002',
}: DocumentRejectionConfirmedEmailProps) {
  documentName = breakableTitle(documentName);

  const { _ } = useLingui();

  const previewText = _(msg`You have rejected the document “${documentName}”`);

  return (
    <TemplateMxLetter
      assetBaseUrl={assetBaseUrl}
      previewText={previewText}
      heading={<Trans>Rejection Confirmed</Trans>}
      lines={[
        <Trans>
          This email confirms that you have rejected the document{' '}
          <strong style={mxStrong}>“{documentName}”</strong> sent by {documentOwnerName}.
        </Trans>,
        <Trans>
          The document owner has been notified of this rejection. No further action is required from you at this time.
          The document owner may contact you with any questions regarding this rejection.
        </Trans>,
      ]}
      chip={{ title: documentName }}
      message={reason ? <Trans>Rejection reason: {reason}</Trans> : null}
    />
  );
}

export default DocumentRejectionConfirmedEmail;
