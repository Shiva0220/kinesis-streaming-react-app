import React from 'react';
import '../../loader.css';

const InputElement = (props) => {
    console.log("Input element: " + props.formElementInfo.label)
    return (
        <div className="form-group">
            <label>{props.formElementInfo.label}</label>
            <input id={props.formElementInfo.id} type={props.formElementInfo.textType} className="form-control form-control-sm"/>
        </div>
    )
}

export default InputElement;