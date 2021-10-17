import {restoreState, saveState} from "./localStorage";
import {Dispatch} from "redux";
import {AllStateType} from "./store";

export type limitsType = {
    min: number
    max: number
}

export enum COUNTER_REDUCER {
    SET_CURRENT_MIN_VALUE = 'SET_CURRENT_MIN_VALUE'
}

const initState = {
    limits: restoreState('limits', {min: 0, max: 5}) as limitsType,
    currentValue: restoreState('startValue', 0),
    error: false,
    editMode: false,
}
export type stateType = typeof initState

const reducer = (state = initState, action: actionTypes): stateType => {
    switch (action.type) {
        case 'SET_LIMITS':
            return {
                ...state,
                currentValue: state.limits.min,
                editMode: false
            }
        case 'SET_CURRENT_MIN_VALUE':
            return {
                ...state,
                limits: {...state.limits, min: action.currentMinValue},
                editMode: true,
                error: action.currentMinValue < 0 || action.currentMinValue >= state.limits.max
            }
        case 'SET_CURRENT_MAX_VALUE':
            return {
                ...state,
                limits: {...state.limits, max: action.currentMaxValue},
                editMode: true,
                error: action.currentMaxValue < state.limits.min
                    || action.currentMaxValue <= state.limits.min
            }
        case 'SET_CURRENT_VALUE':
            return {...state, currentValue: action.currentValue}
        default:
            return state
    }
}

export type actionTypes = counterTypes | settingsActionTypes
export type counterTypes = setCurrentValueACType
export type settingsActionTypes = setLimitsACType | setCurrentMinValueType | setCurrentMaxValueType

type setCurrentMinValueType = ReturnType<typeof setMinCurrentValueAC>
export const setMinCurrentValueAC = (currentMinValue: number) => ({
    type: 'SET_CURRENT_MIN_VALUE',
    currentMinValue
} as const)

type setCurrentMaxValueType = ReturnType<typeof setMaxCurrentValueAC>
export const setMaxCurrentValueAC = (currentMaxValue: number) => ({
    type: 'SET_CURRENT_MAX_VALUE',
    currentMaxValue
} as const)

type setLimitsACType = ReturnType<typeof setLimitsAC>
export const setLimitsAC = (limits: limitsType) => ({
    type: 'SET_LIMITS',
    limits
} as const)

type setCurrentValueACType = ReturnType<typeof setCurrentValueAC>
export const setCurrentValueAC = (value: number) => ({type: 'SET_CURRENT_VALUE', currentValue: value} as const)

export const setCurrentValueTC = () => (dispatch: Dispatch, getState: () => AllStateType) => {
    const {currentValue, limits} = getState().counter
    if (currentValue < limits.max) {
        const getValue: (v: number) => number = (value) => value + 1
        const value = getValue(currentValue)
        dispatch(setCurrentValueAC(value))
        saveState('startValue', value)
    }
}

export const resetValueTC = () => (dispatch: Dispatch, getState: () => AllStateType) => {
    const value = getState().counter.limits.min
    dispatch(setCurrentValueAC(value))
    saveState('limits', value)
}

export const setLimitsTC = () => (dispatch: Dispatch, getState: () => AllStateType) => {
    const limits = getState().counter.limits
    saveState('limits', limits)
    saveState('startValue', limits.min)
    dispatch(setLimitsAC(limits))
}

export default reducer