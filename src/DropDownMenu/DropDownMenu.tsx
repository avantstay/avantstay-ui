import * as React from 'react'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import keycode from 'keycode'

import FloatingContainer from '../FloatingContainer/FloatingContainer'
import {
  DropDownMenuRoot,
  HiddenLabel,
  MenuItemLink,
  MenuItemList,
  MenuTitle,
  SearchField,
  TriggerContainer,
} from './DropDownMenu.styles'

export type ItemProps = {
  icon?: React.ReactNode
  label: string
  route?: string
  searchable?: string
  disabled?: boolean
  action?: () => void
}

type DropDownMenuProps = {
  className?: string
  trigger?: React.ReactNode
  children?: React.ReactNode
  title?: React.ReactNode
  position: 'right' | 'left'
  items: Array<ItemProps>
  onTrigger?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  disableSearch?: boolean
}

export function _DropDownMenu(props: DropDownMenuProps) {
  const { disableSearch, items, className, onTrigger, position, title, children, trigger } = props

  const id = useMemo(() => Math.random().toString(36).substr(2), [])
  const [showItems, setShowItems] = useState(false)
  const [searchTimeout, setSearchTimeout] = useState(0)
  const [highlightIndex, setHighlightIndex] = useState(-1)

  const searchField = useRef(null)
  const _onTrigger = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (onTrigger) {
      onTrigger(event)
    }

    const becomeVisible = !showItems

    setShowItems(becomeVisible)
  }, [])

  useEffect(() => {
    if (showItems && searchField.current) {
      searchField.current.focus()
    }
  }, [showItems])

  const onClickOut = useCallback(() => {
    setShowItems(false)
    setHighlightIndex(-1)
  }, [])

  const clearSearch = useCallback(() => {
    if (searchField.current) {
      searchField.current.value = ''
    }
  }, [])

  const onSearch = useCallback(() => {
    const query = searchField.current.value.toLowerCase()

    const foundIndex = items.findIndex(it => {
      const searchable = it.searchable || it.label
      return searchable.toLowerCase().includes(query)
    })

    setHighlightIndex(foundIndex)

    clearTimeout(searchTimeout)
    setSearchTimeout(window.setTimeout(clearSearch, 1000))
  }, [])

  const moveHighlight = useCallback((step: number) => {
    const numberOfItems = items.length
    const newSelectedIndex = (highlightIndex + step + numberOfItems) % numberOfItems

    setHighlightIndex(newSelectedIndex)
  }, [])

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case keycode('ENTER'):
        const item = items[highlightIndex]

        setTimeout(() => {
          item.action()
        }, 100)

        onClickOut()
        break

      case keycode('TAB'):
        e.preventDefault()
        break

      case keycode('ESC'):
        onClickOut()
        break

      case keycode('DOWN'):
        moveHighlight(1)
        break

      case keycode('UP'):
        moveHighlight(-1)
        break
    }
  }, [])

  const handleItemOnClick = useCallback(
    (item: ItemProps) => (e: React.SyntheticEvent) => {
      if (item.action) {
        e.preventDefault()
        e.stopPropagation()

        item.action()
        onClickOut()
      }
    },
    []
  )

  return (
    <DropDownMenuRoot className={className}>
      {!disableSearch ? (
        <>
          <HiddenLabel htmlFor={id}>Dropdown search</HiddenLabel>
          <SearchField id={id} ref={searchField} onKeyDown={onKeyDown} onChange={onSearch} type="text" />
        </>
      ) : null}
      {typeof (children || trigger) === 'function' ? (
        children || (trigger && _onTrigger)
      ) : (
        <TriggerContainer onClick={_onTrigger}>{children || trigger}</TriggerContainer>
      )}
      <FloatingContainer show={showItems} onClickOut={onClickOut} horizontalAlignment={position}>
        <MenuItemList>
          {title && (typeof title === 'string' ? <MenuTitle>{title}</MenuTitle> : title)}
          {items.map(
            (it, i) =>
              !it.disabled && (
                <MenuItemLink
                  key={it.searchable || it.label}
                  highlight={i === highlightIndex ? 'true' : 'false'}
                  onClick={handleItemOnClick(it)}
                  to={it.route}
                >
                  {it.icon}
                  {it.label}
                </MenuItemLink>
              )
          )}
        </MenuItemList>
      </FloatingContainer>
    </DropDownMenuRoot>
  )
}

const DropDownMenu = memo(_DropDownMenu)

export default DropDownMenu
