import React from 'react';
import './TextHeader.scss';
import { isNullOrUndefined } from 'util';

interface TextHeaderProps {
    className? :string,
    title: string,
    desc: string,
    onClick?:Function,
}

const TextHeader = (props:TextHeaderProps)=>{
    return <div className={ `__text_header_container ${ props.className }` }>
        <p 
            className="__text_header_container_title"
            onClick={
                e=>{
                    if(!isNullOrUndefined(props.onClick)){
                        props.onClick(e);
                    }
                }
            }
        >
            { props.title }
        </p>
        <p className="__text_header_container_desc">
            { props.desc}
        </p>
    </div>;
}

export default TextHeader;