import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';

import { TemplateMxLetter } from '../template-components/template-mx-letter';

export interface TemplateDocumentPendingProps {
  documentName: string;
  assetBaseUrl: string;
}

export type DocumentPendingEmailTemplateProps = Partial<TemplateDocumentPendingProps>;

export const DocumentPendingEmailTemplate = ({
  documentName = 'Open Source Pledge.pdf',
  assetBaseUrl = 'http://localhost:3002',
}: DocumentPendingEmailTemplateProps) => {
  const { _ } = useLingui();

  const previewText = msg`Waiting for the other signers`;

  return (
    <TemplateMxLetter
      assetBaseUrl={assetBaseUrl}
      previewText={_(previewText)}
      status={{ picture: 'clock.png', label: <Trans>Waiting for others</Trans> }}
      heading={<Trans>You signed “{documentName}”</Trans>}
      lines={[
        <Trans>
          We are waiting for the other signers. When everyone has signed, we will email you the signed document.
        </Trans>,
      ]}
      chip={{ title: documentName }}
    />
  );
};

export default DocumentPendingEmailTemplate;
