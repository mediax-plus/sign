import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';

import { TemplateMxLetter } from '../template-components/template-mx-letter';

export type TemplateForgotPasswordProps = {
  resetPasswordLink: string;
  assetBaseUrl: string;
};

export type ForgotPasswordTemplateProps = Partial<TemplateForgotPasswordProps>;

export const ForgotPasswordTemplate = ({
  resetPasswordLink = 'https://documenso.com',
  assetBaseUrl = 'http://localhost:3002',
}: ForgotPasswordTemplateProps) => {
  const { _ } = useLingui();

  const previewText = msg`Password Reset Requested`;

  return (
    <TemplateMxLetter
      assetBaseUrl={assetBaseUrl}
      previewText={_(previewText)}
      heading={<Trans>Forgot your password?</Trans>}
      lines={[<Trans>That's okay, it happens! Click the button below to reset your password.</Trans>]}
      button={{ label: <Trans>Reset Password</Trans>, href: resetPasswordLink }}
      footer={{ isDocument: false }}
    />
  );
};

export default ForgotPasswordTemplate;
