import React from 'react';
declare type CollapsibleContainerProps = React.HTMLAttributes<HTMLDivElement> & {
    delay?: number;
    isCollapsed?: boolean;
};
declare function CollapsibleContainer({ children, delay, isCollapsed, ...restProps }: CollapsibleContainerProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof CollapsibleContainer>;
export default _default;
