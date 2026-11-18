import { useAnalytics } from '@documenso/lib/client-only/hooks/use-analytics';
import { useOptionalSession } from '@documenso/lib/client-only/providers/session';
import { cn } from '@documenso/ui/lib/utils';
import { Button } from '@documenso/ui/primitives/button';
import { i18n } from '@lingui/core';
import { msg } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { useEffect } from 'react';
import { isRouteErrorResponse, Outlet } from 'react-router';
import { Header as AuthenticatedHeader } from '~/components/general/app-header';
import { defaultErrorCodeMap, GenericErrorLayout } from '~/components/general/generic-error-layout';
import type { Route } from './+types/_layout';

export function meta() {
  return [
    { title: i18n._(msg`Sign document | Media eXperience`) },
    { name: 'robots', content: 'noindex, nofollow, noarchive, nosnippet, noimageindex' },
  ];
}

/**
 * A layout to handle scenarios where the user is a recipient of a given resource
 * where we do not care whether they are authenticated or not.
 *
 * Such as direct template access, or signing.
 */
export default function RecipientLayout({ matches }: Route.ComponentProps) {
  const { sessionData } = useOptionalSession();

  // Hide the header for signing routes.
  const hideHeader = matches.some(
    (match) =>
      match?.id === 'routes/_recipient+/sign.$token+/_index' || match?.id === 'routes/_recipient+/d.$token+/_index',
  );

  return (
    <div className="min-h-screen">
      {!hideHeader && sessionData?.user && <AuthenticatedHeader />}

      <main
        className={cn({
          'mt-8 mb-8 px-4 md:mt-12 md:mb-12 md:px-8': !hideHeader,
        })}
      >
        <Outlet />
      </main>
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const analytics = useAnalytics();

  const errorCode = isRouteErrorResponse(error) ? error.status : 500;

  useEffect(() => {
    analytics.captureException(error, { source: 'signing', location: 'recipient_layout_boundary' });
  }, [error]);

  return (
    <GenericErrorLayout
      errorCode={errorCode}
      errorCodeMap={{
        ...defaultErrorCodeMap,
        404: {
          heading: msg`This link isn't valid`,
          message: msg`If you were asked to sign a document, the link may have expired, or the document may have been withdrawn or sent again with a new link. Reply to the email that brought you here, and Media eXperience will send you a current link.`,
        },
      }}
      secondaryButton={null}
      primaryButton={
        <Button asChild>
          <a href="https://www.mediax.plus">
            <Trans>Go to mediax.plus</Trans>
          </a>
        </Button>
      }
    />
  );
}
