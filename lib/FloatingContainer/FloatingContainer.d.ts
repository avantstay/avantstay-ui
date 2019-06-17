/// <reference types="lodash" />
import React, { Component } from 'react';
export declare const FloatingContainerRoot: import("styled-components").StyledComponent<"div", any, {
    top: number;
    left: number;
}, never>;
export interface FloatingContainerProps {
    className?: string;
    show?: boolean;
    onClickOut?: (e: MouseEvent) => void;
}
export interface FloatingContainerState {
    portalElement: HTMLElement | null;
}
declare class FloatingContainer extends Component<FloatingContainerProps, FloatingContainerState> {
    static defaultProps: {
        show: boolean;
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
    readonly offsetTop: number;
    readonly offsetLeft: number;
    render(): JSX.Element;
}
export default FloatingContainer;
