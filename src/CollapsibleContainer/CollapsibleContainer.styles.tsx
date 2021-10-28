import styled from '@emotion/styled'

export const Root = styled.div<{ delay: number; height: number }>`
  ${p => (p.height === 0 ? 'padding-bottom: 0 !important' : '')};
  ${p => (p.height === 0 ? 'padding-top: 0 !important' : '')};
  box-sizing: content-box;
  max-height: ${p => p.height}px;
  overflow: hidden;
  transition: max-height ${p => p.delay}ms, padding-bottom ${p => p.delay}ms, padding-top ${p => p.delay}ms;
`
