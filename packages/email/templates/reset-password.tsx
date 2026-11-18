import { SUPPORT_EMAIL } from '@documenso/lib/constants/app';
import type { TPasswordChangeSource } from '@documenso/lib/jobs/definitions/emails/send-password-reset-success-email';
import { env } from '@documenso/lib/utils/env';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';

import { TemplateMxLetter } from '../template-components/template-mx-letter';
import { MX_COLORS, mxInlineLink } from '../template-components/template-mx-styles';

export interface TemplateResetPasswordProps {
  userName: string;
  userEmail: string;
  assetBaseUrl: string;
}

export type ResetPasswordTemplateProps = Partial<TemplateResetPasswordProps> & {
  source?: TPasswordChangeSource;
};

export const ResetPasswordTemplate = ({
  userName = 'Media eXperience',
  userEmail = 'name@example.com',
  assetBaseUrl = 'http://localhost:3002',
  source = 'RESET',
}: ResetPasswordTemplateProps) => {
  const { _ } = useLingui();

  const NEXT_PUBLIC_WEBAPP_URL = env('NEXT_PUBLIC_WEBAPP_URL');

  const previewText = source === 'RESET' ? msg`Password Reset Successful` : msg`Your password was changed`;

  const greeting = (
    <span style={{ fontWeight: 600, color: MX_COLORS.navy }}>
      <Trans>
        Hi, {userName}{' '}
        <a style={{ fontWeight: 400, color: MX_COLORS.slate, textDecoration: 'none' }} href={`mailto:${userEmail}`}>
          ({userEmail})
        </a>
      </Trans>
    </span>
  );

  const sourceLines =
    source === 'RESET'
      ? [
          <Trans>We've changed your password as you asked. You can now sign in with your new password.</Trans>,
          <Trans>
            Didn't request a password change? We are here to help you secure your account, just{' '}
            <a style={mxInlineLink} href={`mailto:${SUPPORT_EMAIL}`}>
              contact us
            </a>
            .
          </Trans>,
        ]
      : [
          <Trans>Your password was just changed from your account security settings.</Trans>,
          <Trans>
            If this was you, no action is needed. If it wasn't, reset your password immediately and{' '}
            <a style={mxInlineLink} href={`mailto:${SUPPORT_EMAIL}`}>
              contact us
            </a>
            .
          </Trans>,
        ];

  return (
    <TemplateMxLetter
      assetBaseUrl={assetBaseUrl}
      previewText={_(previewText)}
      heading={<Trans>Password updated!</Trans>}
      lines={[<Trans>Your password has been updated.</Trans>, greeting, ...sourceLines]}
      button={{
        label: <Trans>Sign In</Trans>,
        href: `${NEXT_PUBLIC_WEBAPP_URL ?? 'http://localhost:3000'}/signin`,
      }}
      footer={{ isDocument: false }}
    />
  );
};

export default ResetPasswordTemplate;
