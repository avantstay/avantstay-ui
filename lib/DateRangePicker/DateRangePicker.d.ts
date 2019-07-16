import { Component } from 'react';
export declare type AnyDate = Date | string | number;
export declare type DateFactory = () => AnyDate;
export declare type DateRange<T = AnyDate> = {
    startDate: AnyDate | T;
    endDate: AnyDate | T;
};
export interface DateRangePickerProps {
    className?: string;
    clearButtonLabel?: string;
    firstDayOfWeek?: number;
    startDate?: AnyDate | DateFactory;
    endDate?: AnyDate | DateFactory;
    minDate?: AnyDate | DateFactory;
    maxDate?: AnyDate | DateFactory;
    dateLimit?: DateFactory;
    linkedCalendars?: boolean;
    twoStepChange?: boolean;
    onInit?: (range: DateRange<undefined>) => void;
    onChange?: (range: DateRange<undefined>, source?: any) => void;
    specialDays?: Array<any>;
    format?: any;
    lang?: any;
    show: boolean;
    showApply?: boolean;
    horizontalAlignment?: 'left' | 'right';
    applyLabel?: string;
    disableDaysBeforeToday?: any;
    shownDate?: any;
    showMonthArrow?: any;
    onClose?: () => void;
    onClickOut?: () => void;
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
        specialDays: never[];
        twoStepChange: boolean;
        clearButtonLabel: string;
        showApply: boolean;
        applyLabel: string;
        horizontalAlignment: string;
    };
    step: number;
    constructor(props: DateRangePickerProps);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: DateRangePickerProps): void;
    onClickOut: () => void;
    orderRange: (range: DateRange<undefined>) => DateRange<undefined>;
    setRange: (range: DateRange<undefined>, source?: any, triggerChange?: boolean | undefined) => void;
    handleSelect: (date: string | number | Date | DateRange<AnyDate>, source: any) => void;
    moveCalendarDisplay: (direction: number) => void;
    clearRange: () => void;
    resetPosition: () => void;
    render(): JSX.Element;
}
export default DateRangePicker;
