import type { ImgHTMLAttributes } from 'react';

export type LogoProps = ImgHTMLAttributes<HTMLImageElement>;

export const BrandingLogo = ({ ...props }: LogoProps) => {
  return <img src="/mx-logo-tile.png" alt="Media eXperience" {...props} />;
};
