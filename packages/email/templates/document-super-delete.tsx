import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';

import { TemplateMxLetter } from '../template-components/template-mx-letter';

export interface TemplateDocumentDeleteProps {
  reason: string;
  documentName: string;
  assetBaseUrl: string;
}

export type DocumentDeleteEmailTemplateProps = Partial<TemplateDocumentDeleteProps>;

export const DocumentSuperDeleteEmailTemplate = ({
  documentName = 'Open Source Pledge.pdf',
  assetBaseUrl = 'http://localhost:3002',
  reason = 'Unknown',
}: DocumentDeleteEmailTemplateProps) => {
  const { _ } = useLingui();

  const previewText = msg`An admin has deleted your document "${documentName}".`;

  return (
    <TemplateMxLetter
      assetBaseUrl={assetBaseUrl}
      previewText={_(previewText)}
      heading={<Trans>Your document has been deleted by an admin!</Trans>}
      lines={[
        <Trans>"{documentName}" has been deleted by an admin.</Trans>,
        <Trans>
          This document can not be recovered, if you would like to dispute the reason for future documents please
          contact support.
        </Trans>,
        <Trans>The reason provided for deletion is the following:</Trans>,
      ]}
      message={reason}
    />
  );
};

export default DocumentSuperDeleteEmailTemplate;
