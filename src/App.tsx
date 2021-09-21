import React, {useState} from 'react';
import './App.css';
import Counter from "./Counter";
import {Settings} from "./Settings";


function App() {
    const [min, setMin] = useState<number>(0)
    const [max, setMax] = useState<number>(5)
    const [error, setError] = useState<string>('')
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const callBack = () => {

    }



    return (
        <div className={'App'}>
            <Settings min={min} max={max} callBack={callBack}/>
            <Counter min={min} max={max} error={error} />
        </div>
    );
}

export default App;
