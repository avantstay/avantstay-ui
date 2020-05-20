import React from 'react';
declare type ImgLiteGravity = 'attention' | 'center' | 'centre' | 'east' | 'entropy' | 'north' | 'northeast' | 'northwest' | 'south' | 'southeast' | 'southwest' | 'west';
declare type ImgLiteCrop = ImgLiteGravity;
declare type ImgLiteFit = 'contain' | 'cover' | 'fill' | 'inside' | 'outside';
export interface ImgLiteOwnProps {
    className?: string;
    crop?: ImgLiteCrop;
    density?: number;
    fit?: ImgLiteFit;
    gravity?: ImgLiteGravity;
    height?: number;
    lowResQuality?: number;
    lowResWidth?: number;
    quality?: number;
    sharpen?: string;
    sizingStep?: number;
    src: string;
    width?: number;
}
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<(React.ImgHTMLAttributes<HTMLImageElement> & ImgLiteOwnProps & React.RefAttributes<HTMLImageElement>) | (React.HTMLAttributes<HTMLDivElement> & ImgLiteOwnProps & {
    children: React.ReactNode;
} & React.RefAttributes<HTMLImageElement>)>>;
export default _default;
