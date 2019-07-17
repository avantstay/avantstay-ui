import * as React from 'react';
export declare type itemsProps = {
    label: string;
    route?: string;
    searchable: string;
    disabled: boolean;
    action: () => void;
};
declare type DropDownMenuProps = {
    className?: string;
    trigger?: React.ReactNode;
    children?: React.ReactNode;
    position: 'right' | 'left';
    title?: string;
    items: Array<itemsProps>;
    stopPropagation?: boolean;
};
declare type DropDownMenuState = {
    showItems: boolean;
    highlightIndex: number;
};
export declare class DropDownMenu extends React.PureComponent<DropDownMenuProps, DropDownMenuState> {
    private readonly id;
    private searchField;
    private clearSearchTimeout;
    static defaultProps: DropDownMenuProps;
    constructor(props: DropDownMenuProps);
    onTrigger: (event: React.MouseEvent<HTMLDivElement, MouseEvent> | undefined) => void;
    onClickOut: () => void;
    onSearch: () => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    moveHighlight: (step: number) => void;
    clearSearch: () => void;
    handleItemOnClick: (item: itemsProps) => (e: React.SyntheticEvent<Element, Event>) => void;
    render(): JSX.Element;
}
export default DropDownMenu;
