import React, {ChangeEvent} from "react";
import {Button} from "./Button";

type SettingsPropsType = {
    min: number
    max: number
    buttonCallBack: (editMode: boolean) => void
    setMin: (min: number) => void
    setMax: (max: number) => void
}

export const Settings: React.FC<SettingsPropsType> = (props) => {
    const onButtonSetPress = () => {
        props.buttonCallBack(false)
    }

    const checkInputValue = (value: string): boolean => !!+value && +value >= 0

    const onMinChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.currentTarget && checkInputValue(e.currentTarget.value) && props.setMin(+e.currentTarget.value)
    }

    const onMAxChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.currentTarget && checkInputValue(e.currentTarget.value) && props.setMax(+e.currentTarget.value)
    }


    return <div className={'counter'}>
        <div className={'settingsInputsField'}>
            <div>
                <span>min</span>
                <input type={'number'} onChange={onMinChange} value={props.min}/>
            </div>
            <div>
                <span>max</span>
                <input type={'number'} onChange={onMAxChange} value={props.max}/>
            </div>
        </div>
        <div className={'buttons'}>
            <Button title={'Set'} callback={onButtonSetPress}/>
        </div>
    </div>
}