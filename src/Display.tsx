import React from "react";

type DisplayPropsType = {
    value: number
    alert: boolean
    error?: string
}
export const Display: React.FC<DisplayPropsType> = (props) => {
    const alert = props.alert ? 'alert' : ''
    debugger
    return props.error? <span>{props.error}</span> : <span className={`display ${alert}`}>{props.value}</span>
}