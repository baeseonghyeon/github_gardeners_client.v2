import { CSSProperties } from "react";
const LanguageColors = require("language-colors");

export const getAvatarUrl = (id: Number | number, size?: number)=>{
    const _size = size || 150
    return `https://avatars1.githubusercontent.com/u/${id}?s=${_size * 2}`.toString();
}

export const lanColor = <CSSProperties>(name:string)=>{
    let current_rgb = LanguageColors[name.toLowerCase()];
    if (name.toLowerCase() === "c++") { current_rgb = LanguageColors['cpp']; }
    if (current_rgb) {
        return { backgroundColor: current_rgb };
    }
    else { return { backgroundColor:"#fff" } }
}