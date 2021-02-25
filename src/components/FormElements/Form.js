import React, {Component} from 'react'
import SelectElement from "./SelectElement";
import InputElement from "./InputElement";
// import '../../../node_modules/aws-sdk'
// import '../../../node_modules/jquery'
// import '../../../node_modules/hls'
// import '../../../node_modules/shaka-player'
// import '../../../node_modules/video'
// import '../../../node_modules/videojs-contrib-hls'
import '../../ui'
// import '../../dash.all.min'

class Form extends Component{

    constructor(props) {
        super(props);
        this.state = {
            formElements: props.formInfo.formElements
        };
        this.state.formElements.map(info => {
            this[info.id] = React.createRef()
        })
    }

    onSubmit = () => {
        this.state.formElements.map(info => {
            console.log("Ref: " + info.id + ": " + this[info.id].current.value)
        })
        console.log("Submitted");
    };

    render() {
        return <div className='col-md-4 alignLeft'>
            {this.state.formElements.map(item => item.elementType === 'select'
                ? <SelectElement ref={this[item.id]} key={item.id} formElementInfo={item}/>
                : <InputElement ref={this[item.id]} key={item.id} formElementInfo={item}/>)}
            <button id="start" type="submit" onClick={this.onSubmit}>Start Playback</button>
        </div>;
    }
}


export default Form;