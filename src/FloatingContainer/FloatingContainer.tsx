import { debounce } from 'lodash'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { getPortalElement } from '../utils/getPortalElement'
import isDescendant from '../utils/isDescendant'
import { offsetLeft, offsetRight, offsetTop } from '../utils/offset'
import console = require('console');

export const FloatingContainerRoot = styled.div<{ top: number; left?: number; right?: number }>`
  z-index: 99;
  position: absolute;
  top: ${(p: any) => p.top}px;
  ${(p: any) => p.left ? `left: ${p.left}px` : ''};
  ${(p: any) => p.right ? `right: ${p.right}px` : ''};
  box-sizing: border-box;

  & * {
    box-sizing: border-box;
  }
`

export interface FloatingContainerProps {
  className?: string
  show?: boolean
  horizontalAlignment?: 'left' | 'right'
  onClickOut?: (e: MouseEvent) => void
  windowResizeDebounceDelay?: number
}

export interface FloatingContainerState {
  portalElement: HTMLElement | null
}

class FloatingContainer extends Component<FloatingContainerProps, FloatingContainerState> {
  static defaultProps = {
    show: true,
    horizontalAlignment: 'left',
    windowResizeDebounceDelay: 100,
  }

  floatingContainerRef = React.createRef<HTMLDivElement>()
  positioningRef = React.createRef<HTMLDivElement>()

  state = {
    portalElement: null,
  }

  componentDidMount() {
    if (this.props.show)
      this.addWindowListeners()

    this.setState({
      portalElement: getPortalElement(this.positioningRef.current as any),
    })
  }

  componentWillReceiveProps(nextProps: FloatingContainerProps) {
    if (nextProps.show && !this.props.show) {
      this.addWindowListeners()
    } else if (!nextProps.show && this.props.show) {
      this.removeWindowListeners()
    }
  }

  componentWillUnmount() {
    this.removeWindowListeners()
  }

  addWindowListeners = () => {
    setTimeout(() => {
      window.addEventListener('click', this.onClickOut)
      window.addEventListener('resize', this.onWindowResize)
    }, 10)
  }

  removeWindowListeners = () => {
    window.removeEventListener('click', this.onClickOut)
    window.removeEventListener('resize', this.onWindowResize)
  }

  onWindowResize = debounce(() => {
    this.forceUpdate()
  }, this.props.windowResizeDebounceDelay)

  onClickOut = (e: MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()

    if (this.props.show &&
      !isDescendant(this.floatingContainerRef.current, e.target)) {
      this.props.onClickOut && this.props.onClickOut(e)
    }
  }

  get positioning(): { top: number; left?: number; right?: number } {
    const portalParent = this.state.portalElement &&
      (this.state.portalElement! as HTMLElement).parentNode
    const top = offsetTop(this.positioningRef.current) - offsetTop(portalParent)

    if (this.props.horizontalAlignment === 'right') {
      return {
        top,
        right: offsetRight(this.positioningRef.current) -
          offsetRight(portalParent),
      }
    }

    return {
      top,
      left: offsetLeft(this.positioningRef.current) - offsetLeft(portalParent),
    }
  }

  render() {
    const { show, children } = this.props
    const { portalElement } = this.state

    return (
      <div ref={this.positioningRef}>
        {show &&
        portalElement &&
        ReactDOM.createPortal(
          <FloatingContainerRoot
            className={this.props.className}
            ref={this.floatingContainerRef} 
            {...this.positioning}
            onClick={e => e.stopPropagation()}
          >
            {children}
          </FloatingContainerRoot>,
          portalElement,
        )}
      </div>
    )
  }
}

export default FloatingContainer
