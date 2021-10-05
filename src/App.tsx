import React, {useReducer} from 'react';
import './App.css';
import Counter from "./Counter";
import {Settings} from "./Settings";
import {
    reducer,
    setCurrentValueAC,
    setLimitsAC,
    setMaxCurrentValueAC,
    setMinCurrentValueAC
} from "./reducer";
import useWindowDimensions from "./getWindowDimention";


function App() {
    const appStyles = useWindowDimensions();
    const [state, dispatch] = useReducer(reducer, {
        limits: {
            min: 0,
            max: 5
        },
        currentValue: 0,
        error: false,
        editMode: false,
    })

    const changeMin = (newValue: number) => {
        dispatch(setMinCurrentValueAC(newValue))
    }
    const changeMax = (newValue: number) => {
        dispatch(setMaxCurrentValueAC(newValue))
    }

    const onSetPressed = () => dispatch(setLimitsAC())

    const setCurrentValue = (value: number) => {
        dispatch(setCurrentValueAC(value))
    }

    return (
        <div className={'App'} style={appStyles}>
            <Settings min={state.limits.min}
                      max={state.limits.max}
                      setMin={changeMin}
                      setMax={changeMax}
                      buttonCallBack={onSetPressed}
                      error={state.error}/>

            <Counter min={state.limits.min}
                     max={state.limits.max}
                     error={state.error}
                     currentValue={state.currentValue}
                     setCurrentValue={setCurrentValue}
                     editMode={state.editMode}/>
        </div>
    );
}

export default App;
