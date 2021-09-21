import React from "react";

export type ButtonPropsType = {
    callback: () => void
    title: string
    disabled?: boolean
}


export const Button: React.FC<ButtonPropsType> = (props) => {
    const onClick = () => props.callback()
    return <button className={'btn'} disabled={props.disabled} onClick={onClick}>{props.title}</button>
}