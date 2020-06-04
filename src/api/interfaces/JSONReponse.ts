export interface IJSONResponse{
    status : String,
    code : Number,
    message : String,
    error? : any,
    data?: Object,
}

export default IJSONResponse;