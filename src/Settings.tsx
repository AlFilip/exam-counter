import React from "react";
import {Button} from "./Button";

type SettingsPropsType = {
    min: number
    max: number
    callBack: () => void
}

export const Settings: React.FC<SettingsPropsType> = (props) => {
    const callBack = ()  => {
        props.callBack()
    }

    return <div className={'counter'}>
        <div className={'settingsInputsField'}>
            <div>
                <span>min</span>
                <input value={props.min}/>
            </div>
            <div>
                <span>max</span>
                <input value={props.max}/>
            </div>
        </div>
        <div className={'buttons'}>
            <Button title={'Set'} callback={callBack}/>
        </div>
    </div>
}