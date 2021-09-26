import React, {useEffect, useState} from 'react';
import './App.css';
import Counter from "./Counter";
import {Settings} from "./Settings";


function App() {
    const [min, setMin] = useState<number>(0)
    const [max, setMax] = useState<number>(5)
    const [currentValue, setCurrentValue] = useState<number>(min)
    const [error, setError] = useState<string>('')
    const [editMode, setEditMode] = useState<boolean>(false)


    const changeMin = (newValue: number) => {
        setMin(newValue)
        setEditMode(true)
    }

    const changeMax = (newValue: number) => {
        setMax(newValue)
        setEditMode(true)
    }

    const checkError = () => {
        setCurrentValue(min)
        if (currentValue > max) {
            setError('max')
        }
        else if (currentValue < min) {
            setError('min')
        }
        else setError('')
    }

    const onSetPressed = (value:boolean) => {
        setEditMode(value)
        checkError()
    }

    return (
        <div className={'App'}>
            <Settings min={min} setMin={changeMin} max={max} setMax={changeMax} buttonCallBack={onSetPressed}/>
            <Counter min={min} max={max} error={error} currentValue={currentValue} setCurrentValue={setCurrentValue} />
        </div>
    );
}

export default App;
