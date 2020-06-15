import React from 'react';
import './CustomButton.scss';

interface ICustomButtonProps {
    className?: string,
    text: string,
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
}
const CustomButton = (props: ICustomButtonProps) => {
    return <div
        className={`__custom_btn__ ${props.className}`}
        onClick={props.onClick}
    >
        <p className="__custom_btn_text__">{props.text}</p>
    </div>
}

export default CustomButton;