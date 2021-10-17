import React from 'react';
import './App.css';
import {Button} from "./Button";
import {Display} from "./Display";
import {useDispatch, useSelector} from "react-redux";
import {resetValueTC, setCurrentValueTC, stateType} from "./reducer";
import {AllStateType} from "./store";


const Counter = React.memo(() => {
    const {error, currentValue, limits: {max, min}} = useSelector<AllStateType, stateType>(state => state.counter)

    const dispatch = useDispatch()

    const incValue = () => dispatch(setCurrentValueTC())
    const resetValue = () => dispatch(resetValueTC())
    const incDisabled = (currentValue === max) || error
    const resetDisabled = (currentValue === min) || error

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
