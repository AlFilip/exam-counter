import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import counter from "./reducer";

const rootReducer = combineReducers({
    counter
})
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
    rootReducer,
    composeEnhancers(
    applyMiddleware(thunk))
)


export type AllStateType = ReturnType<typeof rootReducer>