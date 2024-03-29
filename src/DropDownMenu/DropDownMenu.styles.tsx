import styled from '@emotion/styled'
import { COLOR_NEUTRAL_EXTREMELY_DARK, COLOR_NEUTRAL_EXTRA_LIGHT } from './colors'
import { Link } from 'react-router-dom'

type MenuItemProps = {
  highlight: string
}

export const DropDownMenuRoot = styled('div')`
  position: relative;
  display: inline-block;
`

export const HiddenLabel = styled('label')`
  display: none;
`

export const SearchField = styled('input')`
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  color: transparent;
  text-shadow: 0 0 0 black;
  -webkit-text-fill-color: transparent;
`

export const TriggerContainer = styled('div')`
  cursor: pointer;
`

export const MenuItemList = styled('div')`
  position: relative;
  display: block;
  background: white;
  border-radius: 2px;
  box-shadow: 0 2px 30px 0 rgba(0, 0, 0, 0.05), 0 2px 15px 0 rgba(0, 0, 0, 0.05);
  max-height: 400px;
  min-width: 200px;
  overflow-y: auto;
  margin-top: 10px;
  z-index: 9999;
  padding: 5px 0;
`

export const MenuItemLink = styled(Link)<MenuItemProps>`
  white-space: nowrap;
  padding: 10px 20px;
  cursor: pointer;
  background: ${p => (p.highlight === 'true' ? COLOR_NEUTRAL_EXTRA_LIGHT : 'transparent')};
  color: ${COLOR_NEUTRAL_EXTREMELY_DARK};
  display: flex;
  font-size: 14px;
  align-items: center;
  text-transform: capitalize;
  margin-right: 0;
  font-weight: normal;
  text-decoration: none;
  border-left: 4px solid transparent;

  &:hover {
    background: ${COLOR_NEUTRAL_EXTRA_LIGHT};
    color: ${COLOR_NEUTRAL_EXTREMELY_DARK} !important;
  }
`

export const MenuTitle = styled('div')`
  padding: 10px 20px;
  margin-bottom: 7px;
`
