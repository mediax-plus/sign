import { env } from '@documenso/lib/utils/env';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';

import { TemplateMxLetter } from '../template-components/template-mx-letter';
import { mxInlineLink } from '../template-components/template-mx-styles';

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

  const NEXT_PUBLIC_WEBAPP_URL = env('NEXT_PUBLIC_WEBAPP_URL');

  const signUpUrl = `${NEXT_PUBLIC_WEBAPP_URL ?? 'http://localhost:3000'}/signup`;

  const previewText = msg`Completed Document`;

  // The buttons lead to an account, not to the document, so the chip below is not a link.
  return (
    <TemplateMxLetter
      assetBaseUrl={assetBaseUrl}
      previewText={_(previewText)}
      status={{ picture: 'completed.png', label: <Trans>Completed</Trans> }}
      heading={<Trans>You have signed “{documentName}”</Trans>}
      lines={[
        <Trans>
          Create a{' '}
          <a href={signUpUrl} target="_blank" style={{ ...mxInlineLink, whiteSpace: 'nowrap' }}>
            free account
          </a>{' '}
          to access your signed documents at any time.
        </Trans>,
      ]}
      chip={{ title: documentName, href: null }}
      button={{ label: <Trans>Create account</Trans>, href: signUpUrl }}
      secondaryButton={{ label: <Trans>View plans</Trans>, href: 'https://documenso.com/pricing' }}
    />
  );
};

export default DocumentSelfSignedEmailTemplate;
