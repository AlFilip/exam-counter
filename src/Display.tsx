import React from "react";
import {useSelector} from "react-redux";
import {AllStateType} from "./store";

export const Display = React.memo(() => {
    const editMode = useSelector<AllStateType, boolean>(state => state.counter.editMode)
    const error = useSelector<AllStateType, boolean>(state => state.counter.error)
    const value = useSelector<AllStateType, number>(state => state.counter.currentValue)
    const max = useSelector<AllStateType, number>(state => state.counter.limits.max)

    const alert = value === max ? 'alert' : ''
    const spanValue = error ? 'Incorrect input' : 'Enter values and press "Set"'
    const editModeSpanClassName = `display spanText ${error ? 'error' : ''} ${editMode ? 'editMode' : ''}`

    return editMode
        ? <span className={editModeSpanClassName}>{spanValue}</span>
        : <span className={`display ${alert}`}>{value}</span>
})