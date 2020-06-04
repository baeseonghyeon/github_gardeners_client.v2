import React from 'react';
const logo = require('./logo.svg');
interface LogoProps {
    width? :number,
    height? : number,
}

const Logo = (props:LogoProps) =>{
    return <img alt="홈페이지 로고 이미지" src={logo} style={{ width: props.width + "px", height: props.height + "px" }} />
}

export default Logo;
