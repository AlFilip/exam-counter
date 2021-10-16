import {restoreState, saveState} from "./localStorage";

export const SET_LIMITS = 'SET_BUTTON'
export const SET_CURRENT_VALUE = 'SET_CURRENT_VALUE'
export const SET_CURRENT_MIN_VALUE = 'SET_CURRENT_MIN_VALUE'
export const SET_CURRENT_MAX_VALUE = 'SET_CURRENT_MAX_VALUE'

export type limitsType = {
    min: number
    max: number
}
export type StateType = {
    limits: limitsType
    currentValue: number
    error: boolean
    editMode: boolean
}

const initState: StateType = {
    limits: restoreState('limits', {min: 0, max: 5}),
    currentValue: restoreState('startValue', 0),
    error: false,
    editMode: false,
}

const reducer = (state = initState, action: ActionTypes
) => {
    switch (action.type) {
        case SET_LIMITS:
            saveState('limits', state.limits)
            saveState('startValue', state.limits.min)
            return {
                ...state,
                currentValue: state.limits.min,
                editMode: false
            }
        case SET_CURRENT_MIN_VALUE:
            return {
                ...state,
                limits: {...state.limits, min: action.currentMinValue},
                editMode: true,
                error: action.currentMinValue < 0 || action.currentMinValue >= state.limits.max
            }
        case SET_CURRENT_MAX_VALUE:
            return {
                ...state,
                limits: {...state.limits, max: action.currentMaxValue},
                editMode: true,
                error: action.currentMaxValue < state.limits.min
                    || action.currentMaxValue <= state.limits.min
            }
        case SET_CURRENT_VALUE:
            return {...state, currentValue: action.currentValue}
        default:
            return state
    }
}

export type ActionTypes = CounterTypes | SettingsActionTypes
export type CounterTypes = setCurrentValueACType
export type SettingsActionTypes = setLimitsACType | SetCurrentMinValueType | setCurrentMaxValueType

type SetCurrentMinValueType = ReturnType<typeof setMinCurrentValueAC>
export const setMinCurrentValueAC = (newValue: number) => ({
    type: SET_CURRENT_MIN_VALUE,
    currentMinValue: newValue
} as const)

type setCurrentMaxValueType = ReturnType<typeof setMaxCurrentValueAC>
export const setMaxCurrentValueAC = (newValue: number) => ({
    type: SET_CURRENT_MAX_VALUE,
    currentMaxValue: newValue
} as const)

type setLimitsACType = ReturnType<typeof setLimitsAC>
export const setLimitsAC = () => ({type: SET_LIMITS} as const)

type setCurrentValueACType = ReturnType<typeof setCurrentValueAC>
export const setCurrentValueAC = (value: number) => ({type: SET_CURRENT_VALUE, currentValue: value} as const)


export default reducer