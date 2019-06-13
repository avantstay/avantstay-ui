import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { getPortalElement } from '../utils/getPortalElement'
import isDescendant from '../utils/isDescendant'
import { offsetLeft, offsetTop } from '../utils/offset'

export const FloatingContainerRoot = styled.div<{ top: number; left: number }>`
  z-index: 99;
  position: absolute;
  top: ${(p: any) => p.top}px;
  left: ${(p: any) => p.left}px;
  box-sizing: border-box;

  & * {
    box-sizing: border-box;
  }
`

export interface FloatingContainerProps {
  className?: string
  show?: boolean
  onClickOut?: (e: MouseEvent) => void
}

export interface FloatingContainerState {
  portalElement: HTMLElement | null
}

class FloatingContainer extends Component<FloatingContainerProps, FloatingContainerState> {
  static defaultProps = {
    show: true,
  }

  floatingContainerRef = React.createRef<HTMLDivElement>()
  positioningRef = React.createRef<HTMLDivElement>()

  state = {
    portalElement: null,
  }

  componentDidMount() {
    window.addEventListener('click', this.onClickOut)

    this.setState({
      portalElement: getPortalElement(this.positioningRef.current as any),
    })
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onClickOut)
  }

  onClickOut = (e: MouseEvent) => {
    if (!isDescendant(this.floatingContainerRef.current, e.target)) {
      this.props.onClickOut && this.props.onClickOut(e)
    }
  }

  get offsetTop() {
    const portalParent = this.state.portalElement && (this.state.portalElement! as HTMLElement).parentNode
    return offsetTop(this.positioningRef.current) - offsetTop(portalParent)
  }

  get offsetLeft() {
    const portalParent = this.state.portalElement && (this.state.portalElement! as HTMLElement).parentNode
    return offsetLeft(this.positioningRef.current) - offsetLeft(portalParent)
  }

  render() {
    const { show, children } = this.props
    const { portalElement } = this.state

    return (
      <div ref={this.positioningRef}>
        {show &&
          portalElement &&
          ReactDOM.createPortal(
            <FloatingContainerRoot ref={this.floatingContainerRef} top={this.offsetTop} left={this.offsetLeft}>
              {children}
            </FloatingContainerRoot>,
            portalElement
          )}
      </div>
    )
  }
}

export default FloatingContainer
