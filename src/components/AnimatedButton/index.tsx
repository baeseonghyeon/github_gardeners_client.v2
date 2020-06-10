import React from 'react';
import './AnimatedButton.scss';
import Indicator from '../Indicator';

interface IAnimatedButtonProps {
    className?: string,
    text: string,
    isRequested: boolean,
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
}
const AnimatedButton = (props: IAnimatedButtonProps) => {
    return <div
        className={`__animated_btn__ ${props.className}`}
        onClick={props.onClick}
    >
        {
            !props.isRequested ?
                <p className="__animated_btn_text__">{props.text}</p> :
                <Indicator className="__animated_btn__indicator__" />
        }
    </div>
}

export default AnimatedButton