import React, { CSSProperties } from 'react';

const NotFoundScene = () =>{
    return (<div style={ styles.container }>
        <p style={styles.text}>Sorry :-(</p>
        <p style={styles.text}>Page is not found</p>
    </div>);
}

const styles : { [name:string] : CSSProperties } ={
    container : {
        padding : '50px 50px 0 50px',
    },
    text:{
        color:'white',
        fontWeight:100,
        fontSize:'2em',
        margin:0,
        padding:0,
    }
}

export default NotFoundScene;