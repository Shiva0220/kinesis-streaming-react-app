import React from 'react';
import '../../loader.css';

const InputElement = React.forwardRef((props, ref) => {
    console.log("Input element: " + props.formElementInfo.label)
    return (
        <div className="form-group">
            <label>{props.formElementInfo.label}</label>
            <input id={props.formElementInfo.id} type={props.formElementInfo.textType} ref={ref} className="form-control form-control-sm"/>
        </div>
    )
})

export default InputElement;