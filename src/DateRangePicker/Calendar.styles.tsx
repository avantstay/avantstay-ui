import { renderIf } from 'react-renderif-hoc'
import styled from 'styled-components'
import { lighten } from '../utils/cssUtils'
import AngleLeftIcon from './assets/AngleLeftIcon'
import AngleRightIcon from './assets/AngleRightIcon'
import CloseIcon from './assets/CloseIcon'
import {
  ACCENT_EXTREMELY_LIGHT,
  ACCENT_MEDIUM,
  ERROR,
  NEUTRAL_DARK,
  NEUTRAL_EXTREMELY_DARK,
  NEUTRAL_LIGHT,
  NEUTRAL_LIGHT_2,
  NEUTRAL_MEDIUM,
} from './colors'
import { MAXW_SM_SCREEN, MINW_SM_SCREEN, Z_INDEX_CALENDAR_CONTAINER } from './constants'

const daySize = 28

export const CalendarContainer = styled.div`
  box-sizing: border-box;

  & * {
    box-sizing: border-box;
  }

  ${MAXW_SM_SCREEN} {
    position: fixed;
    top: 0 !important;
    bottom: 0 !important;
    right: 0 !important;
    left: 0 !important;
    overflow: auto;
  }

  & .rdr-DateRange {
    padding: 20px;
    background: white;
    border: 1px solid ${NEUTRAL_MEDIUM};
    border-radius: 2px;
    box-shadow: 0 2px 30px 0 rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;

    & > div {
      display: inline-flex;

      ${MAXW_SM_SCREEN} {
        display: inline-flex;
        flex-direction: column;
        padding: 20px;
        min-height: 100%;
        justify-content: center;
      }

      & * {
        transition: all 0ms;
      }
    }
  }

  & .rdr-MonthAndYear-innerWrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    font-weight: 500;

    ${MAXW_SM_SCREEN} {
      font-size: 18px;
      margin-bottom: 20px;
    }
  }

  & .rdr-Calendar:last-child {
    margin-left: 30px;

    ${MAXW_SM_SCREEN} {
      margin-left: 0;
    }
  }

  & .rdr-WeekDays {
    margin-bottom: 10px;
  }

  & .rdr-WeekDay {
    display: inline-block;
    width: ${daySize}px;
    text-align: center;
    text-transform: capitalize;
    font-size: 10px;
    font-weight: 700;
    color: ${NEUTRAL_LIGHT};

    ${MAXW_SM_SCREEN} {
      font-size: 3vw;
      width: calc((100vw - 40px) / 7);
    }
  }

  & .rdr-MonthAndYear-month {
  }

  & .rdr-MonthAndYear-year {
    margin-left: 5px;
  }

  & .rdr-MonthAndYear-button {
    background: none;
    border: none;
    border-radius: 99px;
    height: 40px;
    width: 40px;
    outline: none;
    cursor: pointer !important;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    transition: all 0ms;

    & * {
      cursor: pointer !important;
    }

    &:hover {
      ${MINW_SM_SCREEN} {
        background: rgba(0, 0, 0, 0.1);
      }
    }
  }

  ${MINW_SM_SCREEN} {
    & .rdr-Calendar:first-child .rdr-MonthAndYear-button.next {
      visibility: hidden;
    }
    & .rdr-Calendar:last-child .rdr-MonthAndYear-button.prev {
      visibility: hidden;
    }
  }

  & .rdr-Days {
    display: flex;
    flex-wrap: wrap;
    width: ${daySize * 7}px;

    ${MAXW_SM_SCREEN} {
      width: 100%;
    }
  }

  & .rdr-DayWrapper {
    position: relative;
    margin-bottom: 2px;

    ${MAXW_SM_SCREEN} {
      margin-bottom: 4px;
    }

    &.is-fromPreviousMonth {
      visibility: hidden;
    }

    &.is-selected:not(.is-passive) {
      &::before {
        content: '';
        display: block;
        position: absolute;
        background: ${ACCENT_MEDIUM};
        top: 0;
        bottom: 0;
        width: 50%;
      }

      &.is-endEdge::before {
        left: 0;
      }

      &.is-startEdge::before {
        right: 0;
      }

      &.is-startEdge.is-endEdge::before {
        display: none;
      }
    }
  }

  & .rdr-Day,
  & .rdr-DayWrapper,
  & .rdr-DayWrapper::before {
    transition: all 0ms;
  }

  & .rdr-Day {
    display: flex;
    cursor: pointer;
    width: ${daySize}px;
    height: ${daySize}px;
    line-height: ${daySize}px;
    font-size: 12px;
    border: 2px solid transparent;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    font-weight: 400;
    z-index: 1;
    position: relative;

    ${MAXW_SM_SCREEN} {
      width: calc((100vw - 40px) / 7);
      height: calc((100vw - 40px) / 7);
      font-size: 4.3vw;
    }

    &:not(.is-passive) {
      color: ${NEUTRAL_EXTREMELY_DARK};
    }

    &.is-inRange:not(.is-passive) {
      background: ${ACCENT_EXTREMELY_LIGHT};
      border-radius: 0;
    }

    &.is-selected:not(.is-passive) {
      background: ${ACCENT_MEDIUM};
      color: white;
      border-radius: 2px;
    }

    &:hover {
      background: ${NEUTRAL_LIGHT_2};
    }
  }

  & .rdr-DayWrapper.is-passive {
    color: ${NEUTRAL_DARK};
  }

  & .rdr-DayWrapper:not(.is-passive) ~ .rdr-DayWrapper.is-passive {
    opacity: 0;
  }

  & .rdr-DayWrapper.is-inRange {
    color: ${ACCENT_MEDIUM};
    &:nth-child(7n),
    &:last-child {
      & .rdr-Day,
      &.is-startEdge::before {
        border-bottom-right-radius: 2px;
        border-top-right-radius: 2px;
      }
    }

    &:nth-child(7n-6),
    &:first-child {
      & .rdr-Day {
        border-bottom-left-radius: 2px;
        border-top-left-radius: 2px;
      }
    }
  }

  .rdr-DayWrapper.is-selected.is-endEdge:nth-child(7n-6)::before {
    display: none;
  }

  & .rdr-DayWrapper.is-passive + .rdr-DayWrapper.is-selected.is-endEdge::before {
    display: none;
  }

  & .rdr-DayWrapper.is-passive + .rdr-DayWrapper.is-inRange:not(.is-selected) {
    & .rdr-Day,
    &.is-startEdge::before {
      border-bottom-left-radius: 2px;
      border-top-left-radius: 2px;
    }
  }
`

export const FieldsContainer = styled('div')`
  display: flex;
  width: 100%;

  & > * {
    width: 50%;
  }
`

export const ClearButtonContainer = styled('div')`
  height: 60px;
  justify-content: center;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;

  ${MINW_SM_SCREEN} {
    position: absolute;
    width: 80px;
    left: calc(50% - 40px);
    height: 40px;
  }

  &::before {
    content: '';
    width: 100%;
    position: absolute;
    left: 0;
    top: 50%;
    display: block;
    border-top: 1px solid #ddd;
    z-index: ${Z_INDEX_CALENDAR_CONTAINER + 1};

    ${MINW_SM_SCREEN} {
      display: none;
    }
  }
`

interface ClearButtonProps {
  show: boolean
}

export const ClearButton = styled.button<ClearButtonProps>`
  width: 80px;
  border: none;
  background: white;
  height: 24px;
  line-height: 19px;
  font-weight: 500;
  text-transform: uppercase;
  color: ${ERROR};
  font-size: 13px;
  display: ${p => (p.show ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;
  position: relative;
  z-index: ${Z_INDEX_CALENDAR_CONTAINER + 2};
`

export const CloseButton = styled('button')`
  display: none;
  position: absolute;
  border: none;
  right: 0;
  z-index: ${Z_INDEX_CALENDAR_CONTAINER + 1};
  background: ${ERROR};
  border-radius: 99px;
  height: 24px;
  width: 40px;
  align-items: center;
  justify-content: center;
  top: calc(50% - 12px);
  outline: none;

  ${MAXW_SM_SCREEN} {
    display: flex;
  }

  &:active {
    background: ${lighten(ERROR, 10)};
  }
`

export const IconClose = styled(CloseIcon)`
  width: 20px;
  height: 20px;

  & path {
    fill: white;
  }
`

export const IconAngleRight = styled(AngleRightIcon)`
  width: 24px;
  height: 24px;
`

export const IconAngleLeft = styled(AngleLeftIcon)`
  width: 24px;
  height: 24px;
`

export const ApplyButton = renderIf('show')(styled.button`
  text-align: center;
  padding: 10px 20px;
  cursor: pointer;
  color: #ffffff;
  background-color: #0091e3;
  border: none;
  border-radius: 3px;
  outline: none;
  margin: 15px 0 0 auto;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    background-color: rgba(0, 145, 227, 0.67);
  }

  &:active {
    background-color: rgb(0, 100, 177);
  }
`)
