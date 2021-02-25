import React, {Component} from 'react'
import SelectElement from "./SelectElement";
import InputElement from "./InputElement";
import '../../../node_modules/aws-sdk'
import '../../../node_modules/jquery'
import '../../../node_modules/hls'
import '../../../node_modules/shaka-player'
// import '../../../node_modules/video'
import '../../../node_modules/videojs-contrib-hls'
import '../../ui'
// import '../../dash.all.min'

class Form extends Component{

    constructor(props) {
        super(props);
        this.state = {
            formInfo: props.formInfo
        };
    }

    onSubmit = () => {
        console.log("Submitted");
    };

    render() {
        return <div className="container mb-3">
            <div className="row">
                <div className = 'col-md-4 alignLeft'>
                    {this.state.formInfo.formElements.map( item => item.elementType === 'select'
                        ? <SelectElement onSelect={(value)=> this.state.formInfo.value = value} key={item.id} formElementInfo={item}/>
                        : <InputElement onChange={(value)=> this.state.formInfo.value = value} key={item.id} formElementInfo={item}/>)}
                    <button id="start" type="submit" onClick={this.onSubmit}>Start Playback</button>
                </div>
            </div>
        </div>;
    }
}


export default Form;