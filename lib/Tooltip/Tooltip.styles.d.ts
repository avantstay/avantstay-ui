import * as React from 'react';
import { HorizontalGravity, VerticalGravity } from './Tooltip';
interface TipContainerProps {
    maxWidth: number | string;
    top: number;
    left: number;
    backgroundColor: string;
    textColor: string;
    vGravity: VerticalGravity;
    hGravity: HorizontalGravity;
    padding: number | string;
    borderRadius: number | string;
    style: any;
    className?: string;
}
interface SimulatedTipContainerProps {
    maxWidth: number | string;
    padding: number | string;
}
export declare const arrowHeight = 8;
export declare const TipContainer: React.FC<TipContainerProps>;
export declare const SimulatedTipContainer: React.FC<SimulatedTipContainerProps & any>;
export {};
