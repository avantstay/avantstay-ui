import * as React from 'react'

export function renderIf(condition: string | ((props: any) => any)) {
  const conditionEvaluator = typeof condition === 'string'
    ? (props: any) => !!props[condition]
    : (props: any) => !!condition(props)

  return (WrappedComponent: any) => (props: any) => {
    return conditionEvaluator(props) ? <WrappedComponent { ...props }/> : null
  }
}