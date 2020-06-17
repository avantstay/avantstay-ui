import styled from 'styled-components'
import { renderIf } from 'react-renderif-hoc'

export const AvatarRoot = styled.div`
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 300ms;
  flex-grow: 0;
  flex-shrink: 0;
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1);
`

export const Initials = renderIf('show')(styled.span<{ size: number }>`
  font-weight: bold;
  color: white;
  font-size: ${p => p.size * 0.35};
  line-height: ${p => p.size}px;
`)
