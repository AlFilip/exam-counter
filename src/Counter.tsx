import React from 'react';
import './App.css';
import {Button} from "./Button";
import {Display} from "./Display";
import {useDispatch, useSelector} from "react-redux";
import {limitsType, setCurrentValueAC} from "./reducer";
import {AllStateType} from "./store";


const Counter = React.memo(() => {
    const limits = useSelector<AllStateType, limitsType>(state => state.counter.limits)
    const currentValue = useSelector<AllStateType, number>(state => state.counter.currentValue)
    const error = useSelector<AllStateType, boolean>(state => state.counter.error)
    const dispatch = useDispatch()

    const incValue = () => {
        if (currentValue < limits.max) {
            const newValue: (v: number) => number = (currentValue) => currentValue + 1
            dispatch(setCurrentValueAC(newValue(currentValue)))
        }
    }
    const resetValue = () => dispatch(setCurrentValueAC(limits.min))
    const incDisabled = (currentValue === limits.max) || error
    const resetDisabled = (currentValue === limits.min) || error

    return (
        <div className={'counter'}>
            <Display/>

            <div className={'buttons'}>
                <Button title={'Inc'} callback={incValue} disabled={incDisabled}/>
                <Button title={'Reset'} callback={resetValue} disabled={resetDisabled}/>
            </div>
        </div>
    );
})

export default Counter;
