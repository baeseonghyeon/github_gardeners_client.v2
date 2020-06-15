import React, { CSSProperties } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import 'moment/locale/ko';
import './AnimatedDateInput.scss';
import { isNullOrUndefined } from 'util';

interface AnimatedDateInputProps {
    onChange: Function,
    value: string,
    style?: CSSProperties,
    className?: string,
    title: string,
    isDisabled?: boolean,
    index?:number,
}

const AnimatedDateInput = (props: AnimatedDateInputProps) => {
    const _id = "__date_picker_instance__" + (new Date()).getTime() + ( isNullOrUndefined(props.index) ? "" : "__" + props.index );
    let _datepicker : React.RefObject<DatePicker> | null | undefined = undefined;

    return (
        <div className="__animated-date-container">
            <div
                className={"__animated-date-input-container " + (props.className !== undefined ? props.className : "")}
                style={props.style !== undefined ? props.style : {}}
            >
                <input
                    type='text'
                    className="__animated-date-input"
                    placeholder=" "
                    value={moment(props.value).format("YYYY-MM-DD")}
                    readOnly={true}
                    disabled={props.isDisabled !== undefined ? props.isDisabled : false}
                    onClick={ ()=>{ 
                        // console.log('clicked');
                        (window.document.querySelector(`.${_id} input`) as HTMLElement).click(); 
                    } }
                ></input>

                <label className="__animated-date-label">
                    <span>
                        {props.title}
                    </span>
                </label>
            </div>
            {/* 안보이게 처리됨 */}
            <DatePicker
                ref={_datepicker}
                selected={props.value !== "" ? moment(props.value).toDate() : new Date()}
                onChange={(val) => props.onChange(moment(val).format("YYYY-MM-DD"))}
                dateFormat="yyyy-MM-dd"
                wrapperClassName={ "__date__picker__custom " + _id }
            />
        </div>
    );
}

export default AnimatedDateInput;