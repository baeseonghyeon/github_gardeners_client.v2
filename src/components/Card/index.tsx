import React, { ReactNode } from 'react';
import './Card.scss';

interface CardProps {
    className? : string,
    header? : {
        title: string,
        desc: string,
        className?: string,
    },
    footer? : ReactNode,
    children : ReactNode,
    onClick?:Function,
}

const Card = (props :CardProps)=>{
    return (<div className={ "__card-container " + (props.className) } onClick={ ()=>{ if(props.onClick){ props.onClick() } } }>
        {
            props.header ? 
            <div className={ "__card-header " + (props.header?.className) }>
                <p className="__card-header-title">
                    { props.header.title }
                </p>
                <p className="__card-header-desc">
                    { props.header.desc }
                </p>
            </div> : <></>
        }
        <div className="__card-wrapper">
            { props.children }
        </div>
        {
            props.footer ? 
            <div className="__card-footer">
                { props.footer }    
            </div>: <></>
        }
    </div>);
}

export default Card;