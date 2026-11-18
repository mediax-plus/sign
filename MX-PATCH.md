# Media eXperience patch

This repository is Media eXperience d.o.o.'s modified copy of Documenso v2.22.0
(https://github.com/documenso/documenso), the software behind the signing service at
sign.mediax.plus. Documenso is licensed under the GNU Affero General Public License version 3 (see
LICENSE), and this modified copy is distributed under the same licence. The code under packages/ee
keeps its own licence (packages/ee/LICENSE) and is not changed. The changes below are made on top of
the v2.22.0 tag.

## Changes

1. Page titles and link previews name Media eXperience. The share route uses the same neutral tags
   and sends human visitors to www.mediax.plus.
2. Theme: MX navy (#0b2035), slate (#3b4659) and light grey (#e6e6e6) replace the Documenso green in
   the theme stylesheet, the Tailwind colour scale, the email colour defaults and the web manifest,
   with dark-mode colours where the old green was used for text or icons.
3. Logo: the MX logo (apps/remix/public/mx-logo-tile.png) replaces the Documenso logo in the app
   header, the mobile menu and the signing header.
4. Sign-in page: a heading and a line for Media eXperience staff, the MX logo above the card, and no
   background pattern.
5. Error pages: plain wording for missing pages and for signing links that are no longer valid, with
   one button to www.mediax.plus on the latter, and no background pattern.
6. Emails: new subjects, headings and text for the signing request, waiting and completed emails; a
   footer that asks partners to reply; logo and image alt texts; the organisation invitation no
   longer names Documenso.
7. File names: completed-email attachments no longer end in ".pdf.pdf", and new documents take the
   file name without a trailing ".pdf" as their title.
8. Signing certificate and audit log pages in the sealed PDF: 48 px side and bottom margins, names
   wrapped between words and emails after "@" or ".", MX colours, 24-hour times, and the reason
   "I am the sender of this document" for the document owner.
9. The page after signing has no Share button.
10. Other partner-facing text: the signature disclosure, the cancelled-document page, the passkey and
    authenticator names and the web manifest name Media eXperience.
11. A "Source code" link to https://github.com/mediax-plus/sign on the recipient pages and the
    signed-out pages, as section 13 of the AGPL requires.
12. CI: the upstream workflows are removed. .github/workflows/mx-image.yml builds docker/Dockerfile
    and publishes the image to ghcr.io/mediax-plus/sign.
