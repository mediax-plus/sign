import { useLingui } from '@lingui/react';
import type { CSSProperties, ReactNode } from 'react';

import { Body, Head, Html, Preview } from '../components';
import { useBranding } from '../providers/branding';
import { getEmailAssetUrl } from '../utils/asset-url';
import { getSafeBrandingUrl } from '../utils/branding-url';
import { TemplateFooter, type TemplateFooterProps } from './template-footer';
import {
  MX_COLORS,
  mxLegacyAttrs,
  mxMsoStyle,
  mxTableAttrs,
  mxText,
  mxWrap,
} from './template-mx-styles';

export type TemplateMxLetterLink = {
  label: ReactNode;
  href: string;
};

export type TemplateMxLetterStatus = {
  /** A 2x picture in static/, shown at 28 x 28 (the files are 56 x 56) with an empty alt text. */
  picture: 'completed.png' | 'clock.png';
  label: ReactNode;
};

export type TemplateMxLetterChip = {
  title: ReactNode;
  /** The page picture in front of the title. Off for names that are not documents. */
  picture?: boolean;
  /** Where the chip links to. Left out, it links to the button's address; null turns the link off. */
  href?: string | null;
};

export type TemplateMxLetterProps = {
  assetBaseUrl: string;
  previewText: string;
  /** A block above the card, used for the new-account warning. */
  aboveCard?: ReactNode;
  status?: TemplateMxLetterStatus;
  heading: ReactNode;
  /** Paragraphs under the heading. The first one is the line of the design; empty items are left out. */
  lines?: ReactNode[];
  /** The document chip: the page picture and the title in a frame. */
  chip?: TemplateMxLetterChip;
  /** Paragraphs that belong under the chip, such as "by <name>" under an organisation name. */
  linesAfterChip?: ReactNode[];
  /** Blocks that are not plain paragraphs, such as a verification code or a list. */
  extra?: ReactNode;
  /** The grey panel with the sender's own words. */
  message?: ReactNode;
  button?: TemplateMxLetterLink;
  /** A lighter second button next to the first one (stacked under it on phones). */
  secondaryButton?: TemplateMxLetterLink;
  /** Small print under the button, inside the card. */
  notes?: ReactNode[];
  footer?: TemplateFooterProps;
};

const LOGO_WIDTH = 101;
const LOGO_HEIGHT = 35;

// Direction A puts the heading 56 px under the top of a 28 px logo (28 px logo + 28 px gap). The
// email logo is 35 px tall, so the gap is 21 px and the heading stays where it was.
const LOGO_GAP = 56 - LOGO_HEIGHT;

const LOGO_ALT = 'Media eXperience';

/**
 * Head styles. Everything else is inline; this block only carries resets and the phone layout,
 * so an email still reads well in a mail app that drops it.
 */
const MX_LETTER_CSS = `body{margin:0;padding:0;width:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}
table{border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt}
img{border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic}
a{text-decoration:none}
@media only screen and (max-width:599px){
.mxl-wrap{padding:16px 16px 24px !important}
.mxl-pad{padding:24px 20px 28px 14px !important}
.mxl-fpad{padding-left:21px !important;padding-right:21px !important}
.mxl-h1{font-size:18px !important;line-height:26px !important}
.mxl-btn{width:100% !important}
.mxl-btn a{display:block !important}
.mxl-btnrow{width:100% !important}
.mxl-btncell,.mxl-btncell2{display:block !important;width:100% !important}
.mxl-btncell2{padding:12px 0 0 0 !important}
}`;

type RowKind =
  | 'logo'
  | 'status'
  | 'heading'
  | 'line'
  | 'chip'
  | 'lineAfterChip'
  | 'extra'
  | 'message'
  | 'button'
  | 'note';

/** Space above a row, from the kind of row above it. */
const gapBefore = (kind: RowKind, previous: RowKind): number => {
  switch (kind) {
    case 'status':
      return LOGO_GAP;
    case 'heading':
      return previous === 'status' ? 12 : LOGO_GAP;
    case 'line':
      return previous === 'heading' ? 8 : 12;
    case 'chip':
      return 24;
    case 'lineAfterChip':
      return previous === 'chip' ? 16 : 12;
    case 'extra':
      return previous === 'chip' ? 16 : 24;
    case 'message':
      return previous === 'chip' ? 16 : 24;
    case 'button':
      return 28;
    case 'note':
      if (previous === 'note') {
        return 8;
      }

      return previous === 'button' ? 24 : 16;
    default:
      return 0;
  }
};

const isShown = (node: ReactNode) => node !== undefined && node !== null && node !== false && node !== '';

const MxButton = ({ link, secondary = false }: { link: TemplateMxLetterLink; secondary?: boolean }) => {
  const background = secondary ? MX_COLORS.panel : MX_COLORS.navy;
  const color = secondary ? MX_COLORS.navy : MX_COLORS.white;
  // The light secondary button gets the chip's 1 px frame; its padding shrinks by 1 px to keep 48 px.
  const padding = secondary ? '11px 27px' : '12px 28px';

  return (
    <table {...mxTableAttrs} className="mxl-btn" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
      <tbody>
        <tr>
          <td
            align="center"
            {...mxLegacyAttrs({ bgcolor: background })}
            style={mxMsoStyle({
              backgroundColor: background,
              border: secondary ? `1px solid ${MX_COLORS.edge}` : undefined,
              borderRadius: '6px',
              textAlign: 'center',
              msoPaddingAlt: padding,
            })}
          >
            <a
              href={link.href}
              target="_blank"
              style={mxMsoStyle({
                display: 'inline-block',
                padding,
                ...mxText(16, 24, 600, color),
                msoPaddingAlt: '0',
                textDecoration: 'none',
                borderRadius: '6px',
              })}
            >
              {link.label}
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

/**
 * The Media eXperience letter layout (direction A, 18 November 2026) that every email uses.
 *
 * A white card with a 1 px frame, max 600 px wide, inside a 16 px side gutter at every width;
 * the logo at the top, then the slots in this order: status, heading, lines, chip, lines after the
 * chip, extra blocks, message, buttons and notes. The card's left padding is 6 px smaller than its
 * right one and every row except the logo is indented 6 px, so the wordmark (6 px inside its white
 * plate) lines up with the text. The footer lines sit under the card on the same text column.
 */
export const TemplateMxLetter = ({
  assetBaseUrl,
  previewText,
  aboveCard,
  status,
  heading,
  lines = [],
  chip,
  linesAfterChip = [],
  extra,
  message,
  button,
  secondaryButton,
  notes = [],
  footer = {},
}: TemplateMxLetterProps) => {
  const { i18n } = useLingui();
  const branding = useBranding();

  const logoHref =
    branding.brandingEnabled && Boolean(branding.brandingLogo) ? getSafeBrandingUrl(branding.brandingUrl) : null;

  const logo = (
    <img
      src={getEmailAssetUrl(assetBaseUrl, 'static/email-logo.png')}
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      alt={LOGO_ALT}
      style={{
        display: 'block',
        width: `${LOGO_WIDTH}px`,
        height: `${LOGO_HEIGHT}px`,
        border: 0,
        ...mxText(16, LOGO_HEIGHT, 700, MX_COLORS.navy),
      }}
    />
  );

  const rows: ReactNode[] = [];
  let previous: RowKind = 'logo';

  const addRow = (kind: RowKind, content: ReactNode, style?: CSSProperties, className?: string) => {
    rows.push(
      <tr key={rows.length}>
        <td className={className} style={{ padding: `${gapBefore(kind, previous)}px 0 0 6px`, ...style }}>
          {content}
        </td>
      </tr>,
    );

    previous = kind;
  };

  const lineStyle: CSSProperties = { ...mxText(16, 24, 400, MX_COLORS.slate), ...mxWrap };

  if (status) {
    addRow(
      'status',
      <table {...mxTableAttrs}>
        <tbody>
          <tr>
            <td width="28" valign="middle" style={{ width: '28px' }}>
              <img
                src={getEmailAssetUrl(assetBaseUrl, `static/${status.picture}`)}
                width={28}
                height={28}
                alt=""
                style={{ display: 'block', width: '28px', height: '28px', border: 0 }}
              />
            </td>
            <td valign="middle" style={{ paddingLeft: '8px', ...mxText(14, 20, 600, MX_COLORS.navy) }}>
              {status.label}
            </td>
          </tr>
        </tbody>
      </table>,
    );
  }

  addRow('heading', heading, { ...mxText(20, 28, 600, MX_COLORS.navy), ...mxWrap }, 'mxl-h1');

  for (const line of lines.filter(isShown)) {
    addRow('line', line, lineStyle);
  }

  if (chip) {
    const chipHref = chip.href === null ? undefined : (chip.href ?? button?.href);
    const chipPicture = chip.picture !== false;
    const chipLinkStyle: CSSProperties = { color: MX_COLORS.navy, textDecoration: 'none' };

    const picture = (
      <img
        src={getEmailAssetUrl(assetBaseUrl, 'static/doc-chip.png')}
        width={24}
        height={28}
        alt=""
        style={{ display: 'block', width: '24px', height: '28px', border: 0 }}
      />
    );

    addRow(
      'chip',
      <table {...mxTableAttrs} style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
        <tbody>
          <tr>
            <td
              {...mxLegacyAttrs({ bgcolor: MX_COLORS.white })}
              style={{
                backgroundColor: MX_COLORS.white,
                border: `1px solid ${MX_COLORS.edge}`,
                borderRadius: '6px',
                // The page picture has 2 px of air on its left, so 18 px puts its edge on the
                // message panel's text, 20 px inside the panel.
                padding: chipPicture ? '10px 16px 10px 18px' : '10px 16px',
              }}
            >
              <table {...mxTableAttrs}>
                <tbody>
                  <tr>
                    {chipPicture && (
                      <td width="24" valign="middle" style={{ width: '24px' }}>
                        {chipHref ? (
                          <a
                            href={chipHref}
                            target="_blank"
                            aria-hidden="true"
                            tabIndex={-1}
                            data-skip-in-text="true"
                            style={{ display: 'block', ...chipLinkStyle }}
                          >
                            {picture}
                          </a>
                        ) : (
                          picture
                        )}
                      </td>
                    )}
                    <td
                      valign="middle"
                      style={{
                        paddingLeft: chipPicture ? '12px' : '0',
                        ...mxText(15, 22, 600, MX_COLORS.navy),
                        ...mxWrap,
                      }}
                    >
                      {chipHref ? (
                        <a href={chipHref} target="_blank" style={chipLinkStyle}>
                          {chip.title}
                        </a>
                      ) : (
                        chip.title
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>,
    );
  }

  for (const line of linesAfterChip.filter(isShown)) {
    addRow('lineAfterChip', line, lineStyle);
  }

  if (isShown(extra)) {
    addRow('extra', extra, lineStyle);
  }

  if (isShown(message)) {
    addRow(
      'message',
      <table {...mxTableAttrs} width="100%" style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
        <tbody>
          <tr>
            <td
              {...mxLegacyAttrs({ bgcolor: MX_COLORS.panel })}
              style={{
                backgroundColor: MX_COLORS.panel,
                borderRadius: '6px',
                padding: '16px 20px',
                ...mxText(15, 24, 400, MX_COLORS.navy),
                ...mxWrap,
              }}
            >
              {message}
            </td>
          </tr>
        </tbody>
      </table>,
    );
  }

  if (button) {
    addRow(
      'button',
      secondaryButton ? (
        <table {...mxTableAttrs} className="mxl-btnrow" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
          <tbody>
            <tr>
              <td className="mxl-btncell" valign="top">
                <MxButton link={button} />
              </td>
              <td className="mxl-btncell2" valign="top" style={{ paddingLeft: '12px' }}>
                <MxButton link={secondaryButton} secondary />
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <MxButton link={button} />
      ),
    );
  }

  for (const note of notes.filter(isShown)) {
    addRow('note', note, { ...mxText(14, 20, 400, MX_COLORS.slate), ...mxWrap });
  }

  return (
    <Html lang={i18n.locale || 'en'}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="x-apple-disable-message-reformatting" />
        <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no" />
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
        <style dangerouslySetInnerHTML={{ __html: MX_LETTER_CSS }} />
      </Head>

      <Body style={{ margin: 0, padding: 0, width: '100%', backgroundColor: MX_COLORS.white }}>
        <Preview>{previewText}</Preview>

        <table
          {...mxTableAttrs}
          width="100%"
          {...mxLegacyAttrs({ bgcolor: MX_COLORS.white })}
          style={{ width: '100%', backgroundColor: MX_COLORS.white }}
        >
          <tbody>
            <tr>
              <td align="center" className="mxl-wrap" style={{ padding: '32px 16px 40px' }}>
                {/* Replaced by Outlook's fixed 600 px ghost table when the email is rendered (utils/mso.ts). */}
                <div data-mx-mso="ghost-open" />

                <table
                  {...mxTableAttrs}
                  width="100%"
                  style={{
                    width: '100%',
                    maxWidth: '600px',
                    margin: '0 auto',
                    borderCollapse: 'separate',
                    borderSpacing: 0,
                  }}
                >
                  <tbody>
                    {isShown(aboveCard) && (
                      <tr>
                        <td style={{ padding: '0 0 16px 0' }}>{aboveCard}</td>
                      </tr>
                    )}

                    <tr>
                      <td
                        className="mxl-pad"
                        {...mxLegacyAttrs({ bgcolor: MX_COLORS.white })}
                        style={{
                          backgroundColor: MX_COLORS.white,
                          border: `1px solid ${MX_COLORS.edge}`,
                          borderRadius: '8px',
                          padding: '36px 40px 40px 34px',
                        }}
                      >
                        <table {...mxTableAttrs} width="100%" style={{ width: '100%' }}>
                          <tbody>
                            <tr>
                              <td style={{ padding: 0 }}>
                                {logoHref ? (
                                  <a
                                    href={logoHref}
                                    target="_blank"
                                    style={{ display: 'block', width: `${LOGO_WIDTH}px` }}
                                  >
                                    {logo}
                                  </a>
                                ) : (
                                  logo
                                )}
                              </td>
                            </tr>

                            {rows}
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    <TemplateFooter {...footer} />
                  </tbody>
                </table>

                <div data-mx-mso="ghost-close" />
              </td>
            </tr>
          </tbody>
        </table>
      </Body>
    </Html>
  );
};

export default TemplateMxLetter;
