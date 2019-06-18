/// <reference types="lodash" />
import React, { Component } from 'react';
export declare const FloatingContainerRoot: import("styled-components").StyledComponent<"div", any, {
    top: number;
    left?: number | undefined;
    right?: number | undefined;
}, never>;
export interface FloatingContainerProps {
    className?: string;
    show?: boolean;
    horizontalAlignment?: 'left' | 'right';
    onClickOut?: (e: MouseEvent) => void;
}
export interface FloatingContainerState {
    portalElement: HTMLElement | null;
}
declare class FloatingContainer extends Component<FloatingContainerProps, FloatingContainerState> {
    static defaultProps: {
        show: boolean;
        horizontalAlignment: string;
    };
    floatingContainerRef: React.RefObject<HTMLDivElement>;
    positioningRef: React.RefObject<HTMLDivElement>;
    state: {
        portalElement: null;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    onWindowResize: (() => void) & import("lodash").Cancelable;
    onClickOut: (e: MouseEvent) => void;
    readonly positioning: {
        top: number;
        left?: number;
        right?: number;
    };
    render(): JSX.Element;
}
export default FloatingContainer;
