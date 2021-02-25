import logo from './logo.svg';
import './App.css';
import Form from "./components/FormElements/Form";
import {VideoComp} from "./components/VideoComp";
import {HeaderComp} from "./components/HeaderComp";
import React from "react";

function App() {
    const formInfo = {
        formElements: [
            {
                elementType: 'select',
                label: 'Streaming Protocol',
                id: 'protocol',
                options: ['HLS', 'DASH']
            },
            {
                elementType: 'select',
                label: 'Player',
                id: 'player',
                options: []
            },
            {
                elementType: 'select',
                label: 'Region',
                id: 'region',
                options: ['ap-east-1', 'ap-northeast-1', 'ap-northeast-2', 'ap-south-1', 'ap-southeast-1',
                    'ap-southeast-2', 'ca-central-1', 'eu-central-1', 'eu-west-1', 'eu-west-2', 'eu-west-3',
                    'sa-east-1', 'us-east-1', 'us-east-2', 'us-west-2'],
                selectedOption: 'us-east-1'
            },
            {
                elementType: 'input',
                label: 'AWS Access Key',
                id: 'accessKeyId',
                textType: 'password'
            },
            {
                elementType: 'input',
                label: 'AWS Secret Key',
                id: 'secretAccessKey',
                textType: 'password'
            },
            {
                elementType: 'input',
                label: 'AWS Session Toeken',
                id: 'sessionToken',
                textType: 'password'
            },
            {
                elementType: 'input',
                label: 'Endpoint (Optional)',
                id: 'endpoint',
                textType: 'text'
            },
            {
                elementType: 'input',
                label: 'Stream name',
                id: 'streamname',
                textType: 'text'
            },
            {
                elementType: 'select',
                label: 'Playback Mode',
                id: 'playbackMode',
                options: ['LIVE', 'LIVE_REPLAY', 'ON_DEMAND'],
                selectedOption: 'LIVE'
            },
            {
                elementType: 'input',
                label: 'Start Timestamp',
                id: 'startTimestamp',
                textType: 'datetime-local'
            },
            {
                elementType: 'input',
                label: 'End Timestamp',
                id: 'endTimestamp',
                textType: 'datetime-local'
            },
            {
                elementType: 'select',
                label: 'Fragment Selector Type',
                id: 'fragmentSelectorType',
                options: ['SERVER_TIMESTAMP', 'PRODUCER_TIMESTAMP'],
                selectedOption: 'SERVER_TIMESTAMP'
            },
            {
                elementType: 'select',
                label: 'Container Format',
                id: 'containerFormat',
                options: ['FRAGMENTED_MP4', 'MPEG_TS'],
                selectedOption: 'FRAGMENTED_MP4'
            },
            {
                elementType: 'select',
                label: 'Discontinuity Mode',
                id: 'discontinuityMode',
                options: ['ALWAYS', 'NEVER', 'ON_DISCONTINUITY'],
                selectedOption: 'ALWAYS'
            },
            {
                elementType: 'select',
                label: 'Display Fragment Timestamp',
                id: 'displayFragmentTimestamp',
                options: ['ALWAYS', 'NEVER'],
                selectedOption: 'NEVER'
            },
            {
                elementType: 'select',
                label: 'Display Fragment Number',
                id: 'displayFragmentNumber',
                options: ['ALWAYS', 'NEVER'],
                selectedOption: 'NEVER'
            },
            {
                elementType: 'input',
                label: 'Max Manifest/Playlist Fragment Results',
                id: 'maxResults',
                textType: 'text'
            },
            {
                elementType: 'input',
                label: 'Expires (seconds)',
                id: 'expires',
                textType: 'text'
            }
        ]
    };
    console.log("Started rendering")
    return (
    <div className="App">
        <div className="container mb-3">
            <HeaderComp/>
            <div className="row"></div>
            <div className="row">
                <Form formInfo={formInfo}/>
                <VideoComp/>
            </div>
        </div>
    </div>
  );
}

export default App;
