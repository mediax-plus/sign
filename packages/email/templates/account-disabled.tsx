import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';

import { TemplateMxLetter } from '../template-components/template-mx-letter';
import { mxInlineLink } from '../template-components/template-mx-styles';

export type TemplateAccountDisabledProps = {
  assetBaseUrl: string;
  supportEmail: string;
};

export type AccountDisabledEmailTemplateProps = Partial<TemplateAccountDisabledProps>;

export const AccountDisabledEmailTemplate = ({
  assetBaseUrl = 'http://localhost:3002',
  supportEmail = 'support@documenso.com',
}: AccountDisabledEmailTemplateProps) => {
  const { _ } = useLingui();

  const previewText = msg`Your Documenso account has been disabled`;

  return (
    <TemplateMxLetter
      assetBaseUrl={assetBaseUrl}
      previewText={_(previewText)}
      heading={<Trans>Your account has been disabled</Trans>}
      lines={[
        <Trans>
          One of your signing requests has been reported. As part of keeping signers safe, we've disabled your account
          for now.
        </Trans>,
        <Trans>You won't be able to sign in or send documents while it is disabled.</Trans>,
        <Trans>
          If you believe this was a mistake, contact us at{' '}
          <a href={`mailto:${supportEmail}`} style={mxInlineLink}>
            {supportEmail}
          </a>
          .
        </Trans>,
      ]}
      footer={{ isDocument: false }}
    />
  );
};

export default AccountDisabledEmailTemplate;
