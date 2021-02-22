import React, {Component} from 'react'
import SelectElement from "./SelectElement";
import InputElement from "./InputElement";


class Form extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            formInfo: props.formInfo
        };
    }

    onClickEvent = () => {
        console.log("Clicked");
    }

    render() {
        return <div className="container mb-3">
            <div className="row">
                <div className = 'col-md-4'>
                    {this.state.formInfo.formElements.map( item => item.elementType === 'select'
                        ? <SelectElement key={item.id} formElementInfo={item}/>
                        : <InputElement key={item.id} formElementInfo={item}/>)}
                </div>
                <button onClick={this.onClickEvent}>Submit</button>
            </div>
        </div>;
    }
}
const Form1 = (props) => {

    console.log("Generating form. Form info: " + props)
    return



}

export default Form;