import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';

import { TemplateMxLetter } from '../template-components/template-mx-letter';

export interface TemplateDocumentSelfSignedProps {
  documentName: string;
  assetBaseUrl: string;
}

export type DocumentSelfSignedTemplateProps = TemplateDocumentSelfSignedProps;

export const DocumentSelfSignedEmailTemplate = ({
  documentName = 'Open Source Pledge.pdf',
  assetBaseUrl = 'http://localhost:3002',
}: DocumentSelfSignedTemplateProps) => {
  const { _ } = useLingui();

  const previewText = msg`Completed Document`;

  // MX build: no account or pricing offer here; sign-up is closed and the pricing page is Documenso's.
  return (
    <TemplateMxLetter
      assetBaseUrl={assetBaseUrl}
      previewText={_(previewText)}
      status={{ picture: 'completed.png', label: <Trans>Completed</Trans> }}
      heading={<Trans>You have signed “{documentName}”</Trans>}
      chip={{ title: documentName, href: null }}
    />
  );
};

export default DocumentSelfSignedEmailTemplate;
