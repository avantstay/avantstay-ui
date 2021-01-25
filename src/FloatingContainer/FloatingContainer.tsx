//@ts-nocheck
import debounce from 'lodash/debounce'
import * as React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { getPortalElement } from '../utils/getPortalElement'
import isDescendant from '../utils/isDescendant'
import { offsetLeft, offsetRight, offsetTop } from '../utils/offset'

export const FloatingContainerRoot = styled.div<{ left?: number; right?: number; top?: number; transform?: string }>`
  z-index: 99;
  position: absolute;
  ${(p: any) => (p.transform ? `transform: ${p.transform}` : '')};
  ${(p: any) => (p.top ? `top: ${p.top}px` : '')};
  ${(p: any) => (p.left ? `left: ${p.left}px` : '')};
  ${(p: any) => (p.right ? `right: ${p.right}px` : '')};
  box-sizing: border-box;

  & * {
    box-sizing: border-box;
  }
`

export interface FloatingContainerProps {
  className?: string
  show?: boolean
  horizontalAlignment?: 'left' | 'right'
  verticalAlignment?: 'top' | 'bottom'
  onClickOut?: (e: MouseEvent) => void
  windowResizeDebounceDelay?: number
}

export interface FloatingContainerState {
  portalElement?: HTMLElement
}

class FloatingContainer extends React.PureComponent<FloatingContainerProps, FloatingContainerState> {
  static defaultProps = {
    show: true,
    horizontalAlignment: 'left',
    verticalAlignment: 'bottom',
    windowResizeDebounceDelay: 100,
  }

  floatingContainerRef = React.createRef<HTMLDivElement>()
  positioningRef = React.createRef<HTMLDivElement>()

  state = {
    portalElement: undefined,
  }

  componentDidMount() {
    if (this.props.show) this.addWindowListeners()

    this.setState({
      portalElement: getPortalElement(this.positioningRef.current as any),
    })
  }

  UNSAFE_componentWillReceiveProps(nextProps: FloatingContainerProps) {
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

    if (this.props.show && !isDescendant(this.floatingContainerRef.current, e.target)) {
      this.props.onClickOut && this.props.onClickOut(e)
    }
  }

  get positioning(): { left?: number; right?: number; top?: number; transform?: string } {
    const { horizontalAlignment, verticalAlignment } = this.props
    const portalParent = this.state.portalElement && (this.state.portalElement! as HTMLElement).parentNode

    return {
      top: offsetTop(this.positioningRef.current) - offsetTop(portalParent),
      right:
        horizontalAlignment === 'right'
          ? offsetRight(this.positioningRef.current) - offsetRight(portalParent)
          : undefined,
      left:
        horizontalAlignment === 'left' ? offsetLeft(this.positioningRef.current) - offsetLeft(portalParent) : undefined,
      transform: verticalAlignment === 'top' ? 'translate(0, -100%)' : undefined,
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
              onClick={(e: any) => e.stopPropagation()}
            >
              {children}
            </FloatingContainerRoot>,
            portalElement!
          )}
      </div>
    )
  }
}

export default FloatingContainer
