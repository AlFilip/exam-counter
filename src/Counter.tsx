import React from 'react';
import './App.css';
import {Button} from "./Button";
import {Display} from "./Display";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {CounterTypes, setCurrentValueAC} from "./reducer";
import {AllStateType} from "./store";


type statePropsType = ReturnType<typeof mapStateToProps>
type dispatchPropsType = ReturnType<typeof mapDispatchToProps>
type CounterPropsType = statePropsType & dispatchPropsType

const mapStateToProps = (state: AllStateType) => ({
    min: state.counter.limits.min,
    max: state.counter.limits.max,
    error: state.counter.error,
    currentValue: state.counter.currentValue,
    editMode: state.counter.editMode,
})
const mapDispatchToProps = (dispatch: Dispatch<CounterTypes>) => ({
    setCurrentValue: (value: number) => dispatch(setCurrentValueAC(value))
})

const Counter =
    connect(mapStateToProps, mapDispatchToProps)
    (React.memo(({
                     min,
                     max,
                     currentValue,
                     setCurrentValue,
                     ...props

                 }: CounterPropsType) => {

            const incValue = () => {
                if (currentValue < max) {
                    const newValue: (v: number) => number = (currentValue) => currentValue + 1
                    setCurrentValue(newValue(currentValue))
                }
            }
            const resetValue = () => setCurrentValue(min)
            const incDisabled = (currentValue === max) || props.error
            const resetDisabled = (currentValue === min) || props.error

            return (
                <div className={'counter'}>
                    <Display value={currentValue}
                             alert={currentValue === max}
                             error={props.error}
                             editMode={props.editMode}/>

                    <div className={'buttons'}>
                        <Button title={'Inc'} callback={incValue} disabled={incDisabled}/>
                        <Button title={'Reset'} callback={resetValue} disabled={resetDisabled}/>
                    </div>
                </div>
            );
        }
        , ((prevProps, nextProps) => {
                return prevProps.currentValue === nextProps.currentValue
                    && prevProps.error === nextProps.error
                    && prevProps.editMode === nextProps.editMode
            }
        ))
    )

export default Counter;
