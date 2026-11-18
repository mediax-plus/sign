import { NEXT_PUBLIC_WEBAPP_URL } from '@documenso/lib/constants/app';
import { i18n, type MessageDescriptor } from '@lingui/core';

export const appMetaTags = (title?: MessageDescriptor) => {
  const description = 'Documents sent for signature by Media eXperience d.o.o., Belgrade.';

  return [
    {
      title: title ? `${i18n._(title)} | Media eXperience` : 'Media eXperience',
    },
    {
      name: 'description',
      content: description,
    },
    {
      name: 'author',
      content: 'Media eXperience',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
    {
      property: 'og:title',
      content: 'Document signing | Media eXperience',
    },
    {
      property: 'og:description',
      content: description,
    },
    {
      property: 'og:image',
      content: `${NEXT_PUBLIC_WEBAPP_URL()}/opengraph-image.jpg`,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:description',
      content: description,
    },
    {
      name: 'twitter:image',
      content: `${NEXT_PUBLIC_WEBAPP_URL()}/opengraph-image.jpg`,
    },
  ];
};
