import React from 'react';
declare type ImgLiteCrop = 'attention' | 'center' | 'entropy';
interface ImgLiteOwnProps {
    className?: string;
    crop?: ImgLiteCrop;
    density?: number;
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
