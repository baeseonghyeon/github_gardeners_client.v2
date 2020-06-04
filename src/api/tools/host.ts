const REACT_API_HOST = 'http://localhost:4000';

const getUrl = (path:string)=>{
    return `${REACT_API_HOST}/${path}`
}

export default REACT_API_HOST;

export {
    REACT_API_HOST,
    getUrl
};