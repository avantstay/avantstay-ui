import { Component } from 'react';
interface DayCellProps {
    dayMoment: any;
    onSelect: (date: Date | string) => void;
    isSelected: boolean;
    isInRange: boolean;
    isFromPreviousMonth?: boolean;
    isPassive: boolean;
    isSpecialDay: boolean;
    isStartEdge: boolean;
    isEndEdge: boolean;
    isSunday: boolean;
    isToday: boolean;
    classNames: {
        [name: string]: boolean;
    };
}
declare class DayCell extends Component<DayCellProps & any> {
    constructor(props: DayCellProps, context: any);
    handleMouseEvent: (event: MouseEvent) => null | undefined;
    handleSelect: (event: MouseEvent) => null | undefined;
    getClassNames(classes: any): string;
    render(): JSX.Element;
}
export default DayCell;
