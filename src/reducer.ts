import {saveState} from "./localStorage";

export const SET_LIMITS = 'SET_BUTTON'
export const SET_CURRENT_VALUE = 'SET_CURRENT_VALUE'
export const SET_CURRENT_MIN_VALUE = 'SET_CURRENT_MIN_VALUE'
export const SET_CURRENT_MAX_VALUE = 'SET_CURRENT_MAX_VALUE'

export type limitsType = {
    min: number
    max: number
}
type StateType = {
    limits: limitsType
    currentValue: number
    error: boolean
    editMode: boolean
}

export const reducer = (state: StateType, action: ActionType) => {
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

type ActionType = setLimitsACType | setCurrentValueACType | SetCurrentMinValueType | setMaxCurrentValueType

type SetCurrentMinValueType = ReturnType<typeof setMinCurrentValueAC>
export const setMinCurrentValueAC = (newValue: number) => ({
    type: SET_CURRENT_MIN_VALUE,
    currentMinValue: newValue
} as const)

type setMaxCurrentValueType = ReturnType<typeof setMaxCurrentValueAC>
export const setMaxCurrentValueAC = (newValue: number) => ({
    type: SET_CURRENT_MAX_VALUE,
    currentMaxValue: newValue
} as const)

type setLimitsACType = ReturnType<typeof setLimitsAC>
export const setLimitsAC = () => ({type: SET_LIMITS} as const)

type setCurrentValueACType = ReturnType<typeof setCurrentValueAC>
export const setCurrentValueAC = (value: number) => ({type: SET_CURRENT_VALUE, currentValue: value} as const)
