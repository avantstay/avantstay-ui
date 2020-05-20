import styled from 'styled-components'

export const Background = styled.div<{ src?: string }>`
  background-image: url("${(p) => p.src}");
  background-position: center;
  background-size: cover;
  transition: background 0ms;
`

export const Image = styled.img`
  object-fit: cover;
  transition: background 0ms;
`
