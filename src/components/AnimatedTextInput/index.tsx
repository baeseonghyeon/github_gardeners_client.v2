import React, { CSSProperties} from 'react';

import './AnimatedTextInput.scss';

interface AnimatedTextInputProps{
    onChange : Function,
    value : string,
    style? : CSSProperties,
    className?: string,
    title : string,
    isDisabled? : boolean,
}

const AnimatedTextInput = (props:AnimatedTextInputProps) =>{
    const fn = {
        onChange : (e:React.ChangeEvent<HTMLInputElement>)=>{
            if(props.onChange !== null && props.onChange !== undefined){
                props.onChange(e.target.value);
            }
        }
    }
    return (
        <div 
            className={ "__animated-text-input-container " + (props.className !== undefined ? props.className : "")}
            style={ props.style !== undefined ? props.style : {} }
            >
            <input 
                type='text' 
                className="__animated-text-input"
                placeholder=" "
                value={ props.value !== undefined ? props.value : "" }
                onChange={ fn.onChange }
                disabled={ props.isDisabled !== undefined ? props.isDisabled : false }
            ></input>
            <label  className="__animated-text-label">
                <span>
                    { props.title }
                </span>
            </label>
        </div>
    );
}

export default AnimatedTextInput;