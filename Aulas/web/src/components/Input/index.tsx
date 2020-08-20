import React, { InputHTMLAttributes } from 'react';

import './style.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    name: string;
    label: string;
}

//:React.FC is the object Input type (types like, string or integer)
//<InputProps> are parameters
//({label}) destruct the function return 
const Input:React.FC<InputProps> = ({label, name, ...rest}) => {
    return (
        <div className="input-block">
            <label htmlFor={name}>{label}</label>
            <input type="text" id={name} {...rest}/>
        </div>
    );
}

export default Input;