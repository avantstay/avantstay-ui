import React from 'react';
declare type CollapsibleContainerProps = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    isCollapsed?: boolean;
};
declare function CollapsibleContainer({ children, delay, isCollapsed, ...restProps }: CollapsibleContainerProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof CollapsibleContainer>;
export default _default;
