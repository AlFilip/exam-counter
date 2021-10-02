import React, {ChangeEvent} from "react";
import {Button} from "./Button";

type SettingsPropsType = {
    min: number
    max: number
    buttonCallBack: (editMode: boolean) => void
    setMin: (min: number) => void
    setMax: (max: number) => void
    error?: boolean
}

export const Settings: React.FC<SettingsPropsType> = (props) => {
    const onButtonSetPress = () => {
        props.buttonCallBack(false)
    }


    const onMinChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.currentTarget && props.setMin(+e.currentTarget.value)
    }

    const onMAxChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.currentTarget && props.setMax(+e.currentTarget.value)
    }
    const inputMaxClassName = props.max <= props.min ? 'inputError' : ''
    const inputMinClassName = props.max <= props.min || props.min < 0 ? 'inputError' : ''


    return <div className={'counter'}>
        <div className={'settingsInputsField'}>
            <div>
                <span>max</span>
                <input className={inputMaxClassName} type={'number'} onChange={onMAxChange} value={props.max}/>
            </div>
            <div>
                <span>start</span>
                <input className={inputMinClassName} type={'number'} onChange={onMinChange} value={props.min}/>
            </div>
        </div>
        <div className={'buttons'}>
            <Button title={'Set'} callback={onButtonSetPress}/>
        </div>
    </div>
}