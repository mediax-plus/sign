import { Button } from '@documenso/ui/primitives/button';
import type { MessageDescriptor } from '@lingui/core';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

type ErrorCodeMap = Record<
  number,
  { subHeading?: MessageDescriptor; heading: MessageDescriptor; message: MessageDescriptor }
>;

export type GenericErrorLayoutProps = {
  children?: React.ReactNode;
  errorCode?: number;
  errorCodeMap?: ErrorCodeMap;
  /**
   * The primary button to display. If left as undefined, the default home link will be displayed.
   *
   * Set to null if you want no button.
   */
  primaryButton?: React.ReactNode | null;

  /**
   * The secondary button to display. If left as undefined, the default back button will be displayed.
   *
   * Set to null if you want no button.
   */
  secondaryButton?: React.ReactNode | null;
};

export const defaultErrorCodeMap: ErrorCodeMap = {
  404: {
    subHeading: msg`Page not found`,
    heading: msg`This page doesn't exist`,
    message: msg`The address may be mistyped, or the page has moved.`,
  },
  500: {
    subHeading: msg`500 Internal Server Error`,
    heading: msg`Something went wrong`,
    message: msg`Please try again in a moment.`,
  },
};

export const GenericErrorLayout = ({
  children,
  errorCode,
  errorCodeMap = defaultErrorCodeMap,
  primaryButton,
  secondaryButton,
}: GenericErrorLayoutProps) => {
  const navigate = useNavigate();
  const { _ } = useLingui();

  const { subHeading, heading, message } = errorCodeMap[errorCode || 500] ?? defaultErrorCodeMap[500];

  return (
    <div className="fixed inset-0 z-0 flex h-screen w-screen items-center justify-center">
      <div className="inset-0 mx-auto flex h-full flex-grow items-center justify-center px-6 py-32">
        <div>
          {subHeading && <p className="mb-3 font-semibold text-muted-foreground">{_(subHeading)}</p>}

          <h1 className="font-bold text-2xl md:text-3xl">{_(heading)}</h1>

          <p className="mt-4 text-muted-foreground text-sm">{_(message)}</p>

          <div className="mt-6 flex gap-x-2.5 gap-y-4 md:items-center">
            {secondaryButton ||
              (secondaryButton !== null && (
                <Button
                  variant="ghost"
                  className="w-32"
                  onClick={() => {
                    void navigate(-1);
                  }}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  <Trans>Go back</Trans>
                </Button>
              ))}

            {primaryButton ||
              (primaryButton !== null && (
                <Button asChild>
                  <Link to={'/'}>
                    <Trans>Home</Trans>
                  </Link>
                </Button>
              ))}

            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
