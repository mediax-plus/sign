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
3. Logo and pictures: the MX logo (apps/remix/public/mx-logo-tile.png) replaces the Documenso logo
   in the app header, the mobile menu and the signing header. The favicons, the link-preview image,
   the web manifest and the email pictures in apps/remix/public are MX files (the email pictures
   are 2x files drawn on the pixel grid and carry fixed width and height in the templates),
   robots.txt is the upstream one, and Documenso's security.txt is removed together with the
   commit hook and script that copied it back into the app.
4. Sign-in page: a heading and a line for Media eXperience staff, the MX logo above the card, and no
   background pattern.
5. Error pages: plain wording for missing pages and for signing links that are no longer valid, with
   one button to www.mediax.plus on the latter, and no background pattern.
6. Emails: new subjects, headings and text for the signing request, reminder, waiting and completed
   emails; a footer that asks partners to reply; logo and image alt texts and fixed image sizes; MX
   navy and slate text colours; the organisation invitation and the welcome email for accounts made
   by an administrator no longer name Documenso.
7. File names: completed-email attachments no longer end in ".pdf.pdf", and new documents take the
   file name without a trailing ".pdf" as their title.
8. Signing certificate and audit log pages in the sealed PDF: 48 px top, side and bottom margins,
   names wrapped between words and emails after "@", MX colours, 24-hour times, and the
   reason "I am the sender of this document" for the document owner.
9. The page after signing has no Share button.
10. Other partner-facing text: the signature disclosure, the cancelled-document page, the passkey and
    authenticator names and the web manifest name Media eXperience.
11. A "Source code" link to https://github.com/mediax-plus/sign on the recipient pages and the
    signed-out pages, as section 13 of the AGPL requires.
12. CI: the upstream workflows are removed. .github/workflows/mx-image.yml builds docker/Dockerfile
    and publishes the image to ghcr.io/mediax-plus/sign.
13. Email layout: every email is built from one letter layout
    (packages/email/template-components/template-mx-letter.tsx). A white card with a light grey
    frame, at most 600 px wide with a 16 px margin at every width, carries the MX logo, a status
    line where the email had one, the heading and text, the document title in a framed chip with a
    page picture (a link to the same address as the button), the sender's message in a grey panel
    and one navy button; the footer lines sit under the card. Phones get a full-width button and
    smaller margins, and Outlook for Windows gets a fixed 600 px column. Long titles, names and
    links wrap instead of widening the email, and "Media eXperience" never breaks across lines. The
    words of the emails are unchanged. New pictures in apps/remix/public/static: email-logo.png
    (the wordmark on a white rounded plate, 2x) and doc-chip.png (the page picture, 2x). The
    signing certificate and audit log pages print body text in slate instead of Documenso grey and
    break email addresses only after "@". The signature disclosure page always shows in the light
    theme, with the MX logo at the top. .github/workflows/mx-email-previews.yml renders every email
    with sample data on each push to an mx/ branch, or when started by hand, uploads the result as
    the email-previews artifact and runs the type checks of the email package and the app.
