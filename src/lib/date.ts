import moment from 'moment';
import 'moment/locale/ko';

export function getPeriodString (start_dt:string,finish_dt:string,format?:string) : string{
    const _mStartDt = moment(start_dt);
    const _mFinishDt = moment(finish_dt);
    const _realFormat = format ? format : "YYYY-MM-DD";
    if(!_mStartDt.isValid() || !_mFinishDt.isValid()){
        return "";
    }
    return `${ _mStartDt.format(_realFormat) } - ${ _mFinishDt.format(_realFormat) }`;  
}

export function fromNow(start_dt: string, finish_dt:string) :number{
    const _mStartDt = moment(start_dt);
    const _mFinishDt = moment(finish_dt);
    const _mNow = moment();
    // instance가 타겟보다 이전이면 -1, 같으면 0 , 크면 1
    if(_mNow.diff(_mStartDt) < 0){
        // 시작일보다 현재가 이전인 경우
        return -1;
    }
    else if(_mNow.diff(_mStartDt) >= 0 && _mNow.diff(_mFinishDt) < 0){
        // 시작일보다는 이후지만, 종료일보다는 이전인 경우
        return 0;
    }
    else{
        // 종료일보다도 현재가 나중인 경우
        return 1;
    }
}