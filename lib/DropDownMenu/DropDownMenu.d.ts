import * as React from "react";
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
    position: "right" | "left" | "center";
    title?: string;
    items: Array<itemsProps>;
};
declare type DropDownMenuState = {
    showItems: boolean;
    highlightIndex: number;
    gravity: string;
};
export declare class DropDownMenu extends React.PureComponent<DropDownMenuProps, DropDownMenuState> {
    private id;
    private searchField;
    private clearSearchTimeout;
    static defaultProps: {
        items: never[];
        position: string;
    };
    constructor(props: DropDownMenuProps);
    componentWillUnmount(): void;
    onTrigger: (e: any) => void;
    onClickOut: () => void;
    onSearch: () => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    moveHighlight: (step: number) => void;
    clearSearch: () => void;
    handleItemOnClick: (item: itemsProps) => (e: React.SyntheticEvent<Element, Event>) => void;
    render(): JSX.Element;
}
export default DropDownMenu;
