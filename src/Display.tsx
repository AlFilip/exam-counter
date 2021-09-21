import React from "react";

type DisplayPropsType = {
    value: number
    alert: boolean
}
export const Display: React.FC<DisplayPropsType> = (props) => {
    const alert = props.alert ? 'alert' : ''
    return <span className={`display ${alert}`}>{props.value}</span>
}