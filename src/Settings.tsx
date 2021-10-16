import React, {ChangeEvent} from "react";
import {Button} from "./Button";
import {Dispatch} from "redux";
import {setLimitsAC, setMaxCurrentValueAC, setMinCurrentValueAC, SettingsActionTypes} from "./reducer";
import {connect} from "react-redux";
import {AllStateType} from "./store";


type statePropsType = ReturnType<typeof mapStateToProps>
type dispatchPropsType = ReturnType<typeof mapDispatchToProps>
type SettingsPropsType = statePropsType & dispatchPropsType

const mapStateToProps = (state: AllStateType) => ({
    min: state.counter.limits.min,
    max: state.counter.limits.max,
    error: state.counter.error,
})
const mapDispatchToProps = (dispatch: Dispatch<SettingsActionTypes>) => ({
    setMin: (newValue: number) => dispatch(dispatch(setMinCurrentValueAC(newValue))),
    setMax: (newValue: number) => dispatch(setMaxCurrentValueAC(newValue)),
    setLimits: () => dispatch(setLimitsAC()),
})

export const Settings =
    connect(mapStateToProps, mapDispatchToProps)
    (React.memo(({
                     min,
                     max,
                     setLimits,
                     setMin,
                     setMax,
                     error,
                 }: SettingsPropsType) => {

            const onButtonSetPress = () => {
                setLimits()
            }

            const onMinChange = (e: ChangeEvent<HTMLInputElement>) => {
                e.currentTarget && setMin(+e.currentTarget.value)
            }

            const onMAxChange = (e: ChangeEvent<HTMLInputElement>) => {
                e.currentTarget && setMax(+e.currentTarget.value)
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
        , (prevProps, nextProps) => {
            return prevProps.max === nextProps.max
                && prevProps.min === nextProps.min
        }))