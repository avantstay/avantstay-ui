import React, { Component } from 'react';
export declare type AnyDate = Date | string | number;
export declare type DateMaker = (() => AnyDate);
export declare type DateRange<T = AnyDate> = {
    startDate: AnyDate | T;
    endDate: AnyDate | T;
};
export interface DateRangePickerProps {
    className?: string;
    clearButtonLabel?: string;
    firstDayOfWeek?: number;
    calendars?: string | number;
    startDate?: AnyDate | DateMaker;
    endDate?: AnyDate | DateMaker;
    minDate?: AnyDate | DateMaker;
    maxDate?: AnyDate | DateMaker;
    dateLimit?: DateMaker;
    linkedCalendars?: boolean;
    twoStepChange?: boolean;
    onInit?: (range: DateRange<undefined>) => void;
    onChange?: (range: DateRange<undefined>, source?: any) => void;
    specialDays?: Array<any>;
    offsetPositive?: boolean;
    classNames?: {
        [name: string]: boolean;
    };
    rangedCalendars?: boolean;
    format?: any;
    lang?: any;
    show: boolean;
    disableDaysBeforeToday?: any;
    shownDate?: any;
    showMonthArrow?: any;
    onClose?: any;
}
export interface DateRangePickerState {
    range: DateRange<undefined>;
    link: any;
    linkStepsCount: number;
}
declare class DateRangePicker extends Component<DateRangePickerProps, DateRangePickerState> {
    static defaultProps: {
        linkedCalendars: boolean;
        format: string;
        calendars: number;
        offsetPositive: boolean;
        classNames: {};
        specialDays: never[];
        rangedCalendars: boolean;
        twoStepChange: boolean;
        clearButtonLabel: string;
    };
    step: number;
    calendarContainerRef: React.RefObject<any>;
    positioningRef: React.RefObject<any>;
    constructor(props: DateRangePickerProps);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: DateRangePickerProps): void;
    componentWillUnmount(): void;
    onClickOut: (e: MouseEvent) => void;
    orderRange: (range: DateRange<undefined>) => DateRange<undefined>;
    setRange: (range: DateRange<undefined>, source?: any, triggerChange?: boolean | undefined) => void;
    handleSelect: (date: string | number | Date | DateRange<AnyDate>, source: any) => void;
    moveCalendarDisplay: (direction: number) => void;
    clearRange: () => void;
    resetPosition: () => void;
    readonly offsetTop: number;
    readonly offsetLeft: number;
    render(): JSX.Element;
}
export default DateRangePicker;
