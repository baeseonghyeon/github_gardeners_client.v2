import React from 'react';
import './InternalLink.scss';
import { Link } from 'react-router-dom';

interface IInternalLinkProps {
    to: string,
    className?: string,
    text: string,
}
const ExternalLink = (props: IInternalLinkProps) => {
    return <Link
        className={`__int_link__ ${props.className} `}
        to={props.to}>
        {props.text}
    </Link>
}

export default ExternalLink;