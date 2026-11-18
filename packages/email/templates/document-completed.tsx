import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';

import { TemplateMxLetter } from '../template-components/template-mx-letter';
import { breakableTitle } from '../template-components/template-mx-styles';

export interface TemplateDocumentCompletedProps {
  downloadLink: string;
  documentName: string;
  assetBaseUrl: string;
  customBody?: string;
}

export type DocumentCompletedEmailTemplateProps = Partial<TemplateDocumentCompletedProps> & {
  customBody?: string;
  reportUrl?: string;
};

export const DocumentCompletedEmailTemplate = ({
  downloadLink = 'https://documenso.com',
  documentName = 'Open Source Pledge.pdf',
  assetBaseUrl = 'http://localhost:3002',
  customBody,
}: DocumentCompletedEmailTemplateProps) => {
  documentName = breakableTitle(documentName);

  const { _ } = useLingui();

  const previewText = msg`Signed by all parties`;

  return (
    <TemplateMxLetter
      assetBaseUrl={assetBaseUrl}
      previewText={_(previewText)}
      status={{ picture: 'completed.png', label: <Trans>Completed</Trans> }}
      heading={customBody || <Trans>“{documentName}” is signed by all parties</Trans>}
      lines={[<Trans>The signed document is attached to this email.</Trans>]}
      chip={{ title: documentName }}
      button={{ label: <Trans>Download</Trans>, href: downloadLink }}
      footer={{}}
    />
  );
};

export default DocumentCompletedEmailTemplate;
