import React from "react";
import {useSelector} from "react-redux";
import {AllStateType} from "./store";
import {stateType} from "./reducer";

export const Display = React.memo(() => {
    const {error, currentValue, editMode, limits: {max}} = useSelector<AllStateType, stateType>(state => state.counter)


    const alert = currentValue === max ? 'alert' : ''
    const spanValue = error ? 'Incorrect input' : 'Enter values and press "Set"'
    const editModeSpanClassName = `display spanText ${error ? 'error' : ''} ${editMode ? 'editMode' : ''}`

    return editMode
        ? <span className={editModeSpanClassName}>{spanValue}</span>
        : <span className={`display ${alert}`}>{currentValue}</span>
})