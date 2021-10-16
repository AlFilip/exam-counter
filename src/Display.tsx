import React from "react";

type DisplayPropsType = {
    value: number
    alert: boolean
    error?: boolean
    editMode: boolean
}
export const Display: React.FC<DisplayPropsType> = ({
                                                        value,
                                                        editMode,
                                                        error,
                                                        ...props
                                                    }) => {
    const alert = props.alert ? 'alert' : ''
    const spanValue = error ? 'Incorrect input' : 'Enter values and press "Set"'
    const editModeSpanClassName = `display spanText ${error ? 'error' : ''} ${editMode ? 'editMode' : ''}`

    return editMode
        ? <span className={editModeSpanClassName}>{spanValue}</span>
        : <span className={`display ${alert}`}>{value}</span>
}