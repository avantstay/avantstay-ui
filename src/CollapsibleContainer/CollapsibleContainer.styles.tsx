import styled from '@emotion/styled'

export const Root = styled.div<{ height: number }>`
  ${(p) => (p.height === 0 ? 'padding-bottom: 0 !important' : '')};
  ${(p) => (p.height === 0 ? 'padding-top: 0 !important' : '')};
  box-sizing: content-box;
  max-height: ${(p) => p.height}px;
  overflow: hidden;
  transition: max-height 250ms, padding-bottom 250ms, padding-top 250ms;
`
