import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';

import { TemplateMxLetter } from '../template-components/template-mx-letter';
import { keepBrandTogether } from '../template-components/template-mx-styles';
import type { TemplateDocumentCancelProps } from './document-cancel';

export type DocumentCancelEmailTemplateProps = Partial<TemplateDocumentCancelProps>;

export const RecipientRemovedFromDocumentTemplate = ({
  inviterName: inviterNameProp = 'Media eXperience',
  documentName = 'Open Source Pledge.pdf',
  assetBaseUrl = 'http://localhost:3002',
}: DocumentCancelEmailTemplateProps) => {
  const { _ } = useLingui();

  // The sender is often the team, so "Media eXperience" is kept on one line.
  const inviterName = keepBrandTogether(inviterNameProp);

  const previewText = msg`${inviterName} has removed you from the document ${documentName}.`;

  return (
    <TemplateMxLetter
      assetBaseUrl={assetBaseUrl}
      previewText={_(previewText)}
      heading={
        <Trans>
          {inviterName} has removed you from the document
          <br />"{documentName}"
        </Trans>
      }
      chip={{ title: documentName }}
    />
  );
};

export default RecipientRemovedFromDocumentTemplate;
