import React from 'react';
import './Indicator.scss';
import { AiOutlineLoading } from 'react-icons/ai';

interface IIndicatorProps{
    className?:string,
}

const Indicator = (props:IIndicatorProps)=>{
    return <div className={ `__indicator__ ${props.className}` }>
        <AiOutlineLoading/>
    </div>
}

export default Indicator;