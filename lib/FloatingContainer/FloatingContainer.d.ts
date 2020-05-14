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
    windowResizeDebounceDelay?: number;
}
export interface FloatingContainerState {
    portalElement?: HTMLElement;
}
declare class FloatingContainer extends Component<FloatingContainerProps, FloatingContainerState> {
    static defaultProps: {
        show: boolean;
        horizontalAlignment: string;
        windowResizeDebounceDelay: number;
    };
    floatingContainerRef: React.RefObject<HTMLDivElement>;
    positioningRef: React.RefObject<HTMLDivElement>;
    state: {
        portalElement: undefined;
    };
    componentDidMount(): void;
    UNSAFE_componentWillReceiveProps(nextProps: FloatingContainerProps): void;
    componentWillUnmount(): void;
    addWindowListeners: () => void;
    removeWindowListeners: () => void;
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
