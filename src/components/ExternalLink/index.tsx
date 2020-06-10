import React from 'react';
import './ExternalLink.scss';

interface IExternalLinkProps {
    to: string,
    className?: string,
    text: string,
}
const ExternalLink = (props:IExternalLinkProps)=>{
    return <a className={ `__ext_link__ ${ props.className }` } href={ props.to } target="_blank" rel="noopener noreferrer">
        { props.text }
    </a>;
}

export default ExternalLink;