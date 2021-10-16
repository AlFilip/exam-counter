import React from 'react';
import './App.css';
import useWindowDimensions from "./getWindowDimention";
import Counter from "./Counter";
import {Settings} from "./Settings";

function App() {
    const appStyles = useWindowDimensions();

    return (
        <div className={'App'} style={appStyles}>
            <Settings />

            <Counter />
        </div>
    );
}

export default App;
