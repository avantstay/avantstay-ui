import styled from 'styled-components'
import { lighten } from '../utils/cssUtils'
import { renderIf } from '../utils/dc'
import AngleLeftIcon from './assets/AngleLeftIcon'
import AngleRightIcon from './assets/AngleRightIcon'
import CloseIcon from './assets/CloseIcon'
import { ERROR, NEUTRAL_LIGHT, PRIMARY_LIGHT } from './colors'
import {
  MAXW_SM_SCREEN,
  MINW_SM_SCREEN,
  Z_INDEX_CALENDAR_CONTAINER,
} from './constants'

const daySize = 36

export const CalendarContainer = styled.div<{ show: boolean, top: number, left: number }>`
  z-index: ${Z_INDEX_CALENDAR_CONTAINER};
  visibility: ${(p: any) => p.show ? 'visible' : 'hidden'};
  opacity: ${(p: any) => p.show ? 1 : 0};
  transform: translateY(${(p: any) => p.show ? 0 : 30}px);
  transition: all 100ms, top 0ms, left 0ms, right 0ms, bottom 0ms;
  position: ${(p: any) => p.position || 'absolute'};
  top: ${(p: any) => p.top}px;
  left: ${(p: any) => p.left}px;
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
    display: inline-flex;
    padding: 20px;
    background: white;
    box-shadow: 0 2px 30px 0 rgba(0, 0, 0, 0.08);
    
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
    text-transform: uppercase;
    font-size: 10px;
    font-weight: bold;
    color: ${NEUTRAL_LIGHT};
    
    ${MAXW_SM_SCREEN} {
      font-size: 3vw;  
      width: calc((100vw - 40px) / 7)
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
    text-align:center;
    align-items: center;
    justify-content: center;
    transition: all 0ms;

    
    & * {
      cursor: pointer !important;
    }
    
    &:hover {
      ${MINW_SM_SCREEN} {
        background: rgba(0,0,0,.1)
      }
    }
  }
  
  ${MINW_SM_SCREEN} {
    & .rdr-Calendar:first-child .rdr-MonthAndYear-button.next { visibility: hidden }
    & .rdr-Calendar:last-child .rdr-MonthAndYear-button.prev { visibility: hidden }
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
        background: #DFF2F7;
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
        display: none
      }
    }
  }
  
  & .rdr-Day, & .rdr-DayWrapper, & .rdr-DayWrapper::before {
    transition: all 0ms;
  }

  & .rdr-Day {
    display: flex;
    cursor: pointer;
    width: ${daySize}px;
    height: ${daySize}px;
    line-height: ${daySize}px;
    font-size: 15px;
    border: 2px solid transparent;
    justify-content: center;
    align-items: center;
    border-radius: 99px;
    font-weight: bold;
    z-index: 1;
    position: relative;
    
    ${MAXW_SM_SCREEN} {
      width: calc((100vw - 40px) / 7);
      height: calc((100vw - 40px) / 7);
      font-size: 4.3vw;
    }
    
    &.is-inRange:not(.is-passive) {
      background: #DFF2F7;
      border-radius: 0;
    }
    
    &.is-selected:not(.is-passive) {
      background: ${PRIMARY_LIGHT};
      color: white;
      border-radius: 99px;
    }
  }
  
  & .rdr-DayWrapper.is-passive {
    opacity: .3;
  }
  
  & .rdr-DayWrapper:not(.is-passive) ~ .rdr-DayWrapper.is-passive {
    opacity: 0
  }
  
  & .rdr-DayWrapper.is-inRange {
    &:nth-child(7n), &:last-child {
      & .rdr-Day, &.is-startEdge::before {
        border-bottom-right-radius: 99px;
        border-top-right-radius: 99px;
      }      
    }
    
    &:nth-child(7n-6), &:first-child {
      & .rdr-Day {
        border-bottom-left-radius: 99px;
        border-top-left-radius: 99px;
      }
    }
    
    
  }
  
  .rdr-DayWrapper.is-selected.is-endEdge:nth-child(7n-6)::before {
    display: none
  }
  
  & .rdr-DayWrapper.is-passive + .rdr-DayWrapper.is-selected.is-endEdge::before {
    display: none
  }
  
  & .rdr-DayWrapper.is-passive + .rdr-DayWrapper.is-inRange:not(.is-selected) {
    & .rdr-Day, &.is-startEdge::before {
      border-bottom-left-radius: 99px;
      border-top-left-radius: 99px;
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
    border-top: 1px solid #DDD;
    z-index: ${Z_INDEX_CALENDAR_CONTAINER + 1};
    
    ${MINW_SM_SCREEN} {
      display: none;
    }
  }
`

export const ClearButton = renderIf('show')(
  styled('button')`
    width: 80px;
    border: 2px solid ${ERROR};
    border-radius: 99px;
    background: white;
    height: 24px;
    line-height: 19px;
    font-weight: 500;
    text-transform: uppercase;
    color: ${ERROR};
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    outline: none;
    position: relative;
    z-index: ${Z_INDEX_CALENDAR_CONTAINER + 2}
  `)

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