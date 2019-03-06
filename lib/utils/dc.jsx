import * as React from 'react';
export function renderIf(condition) {
    var conditionEvaluator = typeof condition === 'string'
        ? function (props) { return !!props[condition]; }
        : function (props) { return !!condition(props); };
    return function (WrappedComponent) { return function (props) {
        return conditionEvaluator(props) ? <WrappedComponent {...props}/> : null;
    }; };
}
