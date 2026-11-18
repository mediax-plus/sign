import { SUPPORT_EMAIL } from '@documenso/lib/constants/app';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';

import { TemplateMxLetter } from '../template-components/template-mx-letter';
import { mxInlineLink } from '../template-components/template-mx-styles';

export type TemplateAdminUserCreatedProps = {
  resetPasswordLink: string;
  assetBaseUrl: string;
};

export const AdminUserCreatedTemplate = ({
  resetPasswordLink,
  assetBaseUrl = 'http://localhost:3002',
}: TemplateAdminUserCreatedProps) => {
  const { _ } = useLingui();

  const previewText = msg`Set your password for Media eXperience document signing`;

  return (
    <TemplateMxLetter
      assetBaseUrl={assetBaseUrl}
      previewText={_(previewText)}
      heading={<Trans>Welcome to Media eXperience document signing</Trans>}
      lines={[
        <Trans>An administrator has created an account for you.</Trans>,
        <Trans>To get started, please set your password by clicking the button below:</Trans>,
      ]}
      button={{ label: <Trans>Set Password</Trans>, href: resetPasswordLink }}
      notes={[
        <Trans>
          You can also copy and paste this link into your browser: {resetPasswordLink} (link expires in 24 hours)
        </Trans>,
        <Trans>
          If you didn't expect this account or have any questions, please{' '}
          <a href={`mailto:${SUPPORT_EMAIL}`} style={mxInlineLink}>
            contact support
          </a>
          .
        </Trans>,
      ]}
      footer={{ isDocument: false }}
    />
  );
};

export default AdminUserCreatedTemplate;
