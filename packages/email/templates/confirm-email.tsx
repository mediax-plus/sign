import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';

import { TemplateMxLetter } from '../template-components/template-mx-letter';

export type TemplateConfirmationEmailProps = {
  confirmationLink: string;
  assetBaseUrl: string;
};

export const ConfirmEmailTemplate = ({
  confirmationLink,
  assetBaseUrl = 'http://localhost:3002',
}: TemplateConfirmationEmailProps) => {
  const { _ } = useLingui();

  const previewText = msg`Please confirm your email address`;

  return (
    <TemplateMxLetter
      assetBaseUrl={assetBaseUrl}
      previewText={_(previewText)}
      heading={<Trans>Welcome to Media eXperience document signing</Trans>}
      lines={[<Trans>Before you get started, please confirm your email address by clicking the button below:</Trans>]}
      button={{ label: <Trans>Confirm email</Trans>, href: confirmationLink }}
      notes={[
        <Trans>
          You can also copy and paste this link into your browser: {confirmationLink} (link expires in 1 hour)
        </Trans>,
      ]}
      footer={{ isDocument: false }}
    />
  );
};

export default ConfirmEmailTemplate;
