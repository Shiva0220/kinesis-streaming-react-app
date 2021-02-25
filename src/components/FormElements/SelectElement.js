import React from 'react';
import '../../loader.css';


const SelectElement = (props) => {
    console.log('Select element: ' + props.formElementInfo.label);
    return (
        <div className = "form-group">
            <label>{props.formElementInfo.label}</label>
            <select id={props.formElementInfo.id} defaultValue={props.formElementInfo.selectedOption} className="form-control form-control-sm">
                {props.formElementInfo.options.map(option => <option key={option}>{option}</option>)}
            </select>
        </div>
    )
}

export default SelectElement;