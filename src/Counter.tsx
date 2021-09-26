import React, {useState} from 'react';
import './App.css';
import {Button} from "./Button";
import {Display} from "./Display";

export type CounterPropsType = {
    min: number
    max: number
    error: string
    currentValue: number
    setCurrentValue: (newValue:number)=> void
}

function Counter({min,max,currentValue,setCurrentValue, ...props}:CounterPropsType) {

    const incValue = () => {
        if (currentValue < max) {
            const newValue:(v:number)=>number = (currentValue) => currentValue + 1
            setCurrentValue(newValue(currentValue))
        }
    }

    const resetValue = () => setCurrentValue(min)

    const reachedMax = currentValue === max
    const reachedMin = currentValue === min

    return (
        <div className={'counter'}>
            <Display value={currentValue} alert={reachedMax} error={props.error}/>
            <div className={'buttons'}>
                <Button title={'Inc'} callback={incValue} disabled={reachedMax}/>
                <Button title={'Reset'} callback={resetValue} disabled={reachedMin}/>
            </div>
        </div>
    );
}

export default Counter;
