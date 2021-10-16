import {combineReducers, createStore} from "redux";
import counter from "./reducer";

const rootReducer = combineReducers({
    counter
})

export const store = createStore(rootReducer)

const state = store.getState()
export type AllStateType = typeof state