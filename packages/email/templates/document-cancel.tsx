import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';

import { TemplateMxLetter } from '../template-components/template-mx-letter';
import { breakableTitle, keepBrandTogether } from '../template-components/template-mx-styles';

export interface TemplateDocumentCancelProps {
  inviterName: string;
  inviterEmail: string;
  documentName: string;
  assetBaseUrl: string;
  cancellationReason?: string;
}

export type DocumentCancelEmailTemplateProps = Partial<TemplateDocumentCancelProps>;

export const DocumentCancelTemplate = ({
  inviterName: inviterNameProp = 'Media eXperience',
  documentName = 'Open Source Pledge.pdf',
  assetBaseUrl = 'http://localhost:3002',
  cancellationReason,
}: DocumentCancelEmailTemplateProps) => {
  documentName = breakableTitle(documentName);

  const { _ } = useLingui();

  // The sender can be a team, so "Media eXperience" is kept on one line.
  const inviterName = keepBrandTogether(inviterNameProp);

  const previewText = msg`${inviterName} has cancelled the document ${documentName}, you don't need to sign it anymore.`;

  return (
    <TemplateMxLetter
      assetBaseUrl={assetBaseUrl}
      previewText={_(previewText)}
      heading={
        <Trans>
          {inviterName} has cancelled the document
          <br />"{documentName}"
        </Trans>
      }
      lines={[<Trans>All signatures have been voided.</Trans>, <Trans>You don't need to sign it anymore.</Trans>]}
      chip={{ title: documentName }}
      message={cancellationReason ? <Trans>Reason for cancellation: {cancellationReason}</Trans> : null}
    />
  );
};

export default DocumentCancelTemplate;
