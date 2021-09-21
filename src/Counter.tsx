import React, {useState} from 'react';
import './App.css';
import {Button} from "./Button";
import {Display} from "./Display";

export type CounterPropsType = {
    min: number
    max: number
    error: string
}

function Counter({min,max}:CounterPropsType) {

    const [currentValue, setCurrentValue] = useState<number>(min)

    const incValue = () => {
        if (currentValue < max) {
            setCurrentValue(currentValue => currentValue + 1)
        }
    }

    const resetValue = () => setCurrentValue(min)

    const reachedMax = currentValue === max
    const reachedMin = currentValue === min

    return (
        <div className={'counter'}>
            <Display value={currentValue} alert={reachedMax}/>
            <div className={'buttons'}>
                <Button title={'Inc'} callback={incValue} disabled={reachedMax}/>
                <Button title={'Reset'} callback={resetValue} disabled={reachedMin}/>
            </div>
        </div>
    );
}

export default Counter;
