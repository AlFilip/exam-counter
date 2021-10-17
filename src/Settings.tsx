import React, {ChangeEvent} from "react";
import {Button} from "./Button";
import {setLimitsTC, setMaxCurrentValueAC, setMinCurrentValueAC, stateType} from "./reducer";
import {useDispatch, useSelector} from "react-redux";
import {AllStateType} from "./store";


export const Settings = () => {
    const {error, limits: {max, min}} = useSelector<AllStateType, stateType>(state => state.counter)

    const dispatch = useDispatch()
    const onButtonSetPress = () => dispatch(setLimitsTC())

    const onMinChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.currentTarget && dispatch(setMinCurrentValueAC(+e.currentTarget.value))
    }

    const onMAxChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.currentTarget && dispatch(setMaxCurrentValueAC(+e.currentTarget.value))
    }
    const inputMaxClassName = max <= min ? 'input inputError' : 'input'
    const inputMinClassName = max <= min || min < 0 ? 'input inputError' : 'input'


    return <div className={'counter'}>
        <div className={'settingsInputsField'}>
            <div>
                <span>max</span>
                <input className={inputMaxClassName} type={'number'} onChange={onMAxChange}
                       value={max}/>
            </div>
            <div>
                <span>start</span>
                <input className={inputMinClassName} type={'number'} onChange={onMinChange}
                       value={min}/>
            </div>
        </div>
        <div className={'buttons'}>
            <Button title={'Set'} disabled={error} callback={onButtonSetPress}/>
        </div>
    </div>
}