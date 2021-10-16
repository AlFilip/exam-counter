import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import counter from "./reducer";

const rootReducer = combineReducers({
    counter
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AllStateType = ReturnType<typeof rootReducer>