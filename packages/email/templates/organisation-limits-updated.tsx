import { SUPPORT_EMAIL } from '@documenso/lib/constants/app';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';

import { TemplateMxLetter } from '../template-components/template-mx-letter';
import { keepTogether } from '../template-components/template-mx-styles';

export type OrganisationLimitsUpdatedEmailProps = {
  assetBaseUrl: string;
  organisationName: string;
};

export const OrganisationLimitsUpdatedEmailTemplate = ({
  assetBaseUrl = 'http://localhost:3002',
  organisationName = 'Organisation Name',
}: OrganisationLimitsUpdatedEmailProps) => {
  const { _ } = useLingui();

  return (
    <TemplateMxLetter
      assetBaseUrl={assetBaseUrl}
      previewText={_(ORGANISATION_LIMITS_UPDATED_SUBJECT)}
      heading={_(ORGANISATION_LIMITS_UPDATED_SUBJECT)}
      chip={{ title: keepTogether(organisationName), picture: false }}
      linesAfterChip={[
        <Trans>We've updated the usage limits for your organisation.</Trans>,
        <Trans>
          If you recently received an email regarding your usage limits, this change was made in response to that.
        </Trans>,
        <Trans>If you have any questions, please contact support at {SUPPORT_EMAIL}.</Trans>,
      ]}
      footer={{ isDocument: false }}
    />
  );
};

export const ORGANISATION_LIMITS_UPDATED_SUBJECT = msg`Your organisation limits have been updated`;

export default OrganisationLimitsUpdatedEmailTemplate;
