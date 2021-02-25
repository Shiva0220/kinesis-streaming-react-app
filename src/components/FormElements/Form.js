import React, {Component} from 'react'
import SelectElement from "./SelectElement";
import InputElement from "./InputElement";
import AWS from 'aws-sdk'
import $ from 'jquery'
import Hls from 'hls.js'
import shaka from 'shaka-player'
import video from 'video.js'
import videojs from 'videojs-contrib-hls'
import '../../ui'
import dashjs from '@streamroot/dashjs-dna-wrapper'
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
        var protocol = this['protocol'].current.value;
        var streamName = this['streamName'].current.value;

        // Step 1: Configure SDK Clients
        var options = {
            accessKeyId: this['accessKeyId'].current.value,
            secretAccessKey: this['secretAccessKey'].current.value,
            sessionToken: this['sessionToken'].current.value || undefined,
            region: this['region'].current.value,
            endpoint: this['endpoint'].current.value || undefined
        }

        // var kinesisVideo = new AWS.KinesisVideo(options);

        var kinesisVideo = new AWS.KinesisVideo(options);
        var kinesisVideoArchivedContent = new AWS.KinesisVideoArchivedMedia(options);
        console.log('Fetching data endpoint');
        kinesisVideo.getDataEndpoint({
            StreamName: streamName,
            APIName: protocol === 'DASH' ? "GET_DASH_STREAMING_SESSION_URL" : "GET_HLS_STREAMING_SESSION_URL"
        }, function(err, response) {
            if (err) { return console.error(err); }
            console.log('Data endpoint: ' + response.DataEndpoint);
            kinesisVideoArchivedContent.endpoint = new AWS.Endpoint(response.DataEndpoint);

            // Step 3: Get a Streaming Session URL
            var consoleInfo = 'Fetching ' + protocol + ' Streaming Session URL';
            console.log(consoleInfo);

            if (protocol === 'DASH') {
                kinesisVideoArchivedContent.getDASHStreamingSessionURL({
                    StreamName: streamName,
                    PlaybackMode: $('#playbackMode').val(),
                    DASHFragmentSelector: {
                        FragmentSelectorType: $('#fragmentSelectorType').val(),
                        TimestampRange: $('#playbackMode').val() === "LIVE" ? undefined : {
                            StartTimestamp: new Date($('#startTimestamp').val()),
                            EndTimestamp: new Date($('#endTimestamp').val())
                        }
                    },
                    DisplayFragmentTimestamp: $('#displayFragmentTimestamp').val(),
                    DisplayFragmentNumber: $('#displayFragmentNumber').val(),
                    MaxManifestFragmentResults: parseInt($('#maxResults').val()),
                    Expires: parseInt($('#expires').val())
                }, function(err, response) {
                    if (err) { return console.error(err); }
                    console.log('DASH Streaming Session URL: ' + response.DASHStreamingSessionURL);

                    // Step 4: Give the URL to the video player.
                    var playerName = $('#player').val();

                    if (playerName === 'Shaka Player') {
                        var playerElement = $('#shaka');
                        playerElement.show();

                        var player = new shaka.Player(playerElement[0]);
                        console.log('Created Shaka Player');

                        player.load(response.DASHStreamingSessionURL).then(function() {
                            console.log('Starting playback');
                        });
                        console.log('Set player source');
                    } else if(playerName === 'DASH.js') {
                        var playerElement = $('#dashjs');
                        playerElement.show();

                        var player = dashjs.MediaPlayer().create();
                        console.log('Created DASH.js Player');

                        player.initialize(document.querySelector('#dashjs'), response.DASHStreamingSessionURL, true);
                        console.log('Starting playback');
                        console.log('Set player source');
                    }
                });
            } else {
                kinesisVideoArchivedContent.getHLSStreamingSessionURL({
                    StreamName: streamName,
                    PlaybackMode: $('#playbackMode').val(),
                    HLSFragmentSelector: {
                        FragmentSelectorType: $('#fragmentSelectorType').val(),
                        TimestampRange: $('#playbackMode').val() === "LIVE" ? undefined : {
                            StartTimestamp: new Date($('#startTimestamp').val()),
                            EndTimestamp: new Date($('#endTimestamp').val())
                        }
                    },
                    ContainerFormat: $('#containerFormat').val(),
                    DiscontinuityMode: $('#discontinuityMode').val(),
                    DisplayFragmentTimestamp: $('#displayFragmentTimestamp').val(),
                    MaxMediaPlaylistFragmentResults: parseInt($('#maxResults').val()),
                    Expires: parseInt($('#expires').val())
                }, function(err, response) {
                    if (err) { return console.error(err); }
                    console.log('HLS Streaming Session URL: ' + response.HLSStreamingSessionURL);

                    // Step 4: Give the URL to the video player.
                    var playerName = $('#player').val();
                    if (playerName === 'HLS') {
                        var playerElement = $('#hlsjs');
                        playerElement.show();
                        var player = new Hls();
                        console.log('Created HLS.js Player');
                        player.loadSource(response.HLSStreamingSessionURL);
                        player.attachMedia(playerElement[0]);
                        console.log('Set player source');
                        player.on(Hls.Events.MANIFEST_PARSED, function() {
                            video.play();
                            console.log('Starting playback');
                        });
                    } else if (playerName === 'VideoJS') {
                        var playerElement = $('#videojs');
                        playerElement.show();
                        var player = videojs('videojs');
                        console.log('Created VideoJS Player');
                        player.src({
                            src: response.HLSStreamingSessionURL,
                            type: 'application/x-mpegURL'
                        });
                        console.log('Set player source');
                        player.play();
                        console.log('Starting playback');
                    } else if (playerName === 'Shaka Player') {
                        var playerElement = $('#shaka');
                        playerElement.show();
                        var player = new shaka.Player(playerElement[0]);
                        console.log('Created Shaka Player');
                        player.load(response.HLSStreamingSessionURL).then(function() {
                            console.log('Starting playback');
                        });
                        console.log('Set player source');
                    }
                });
            }
        });

        $('.player').hide();
    }

        // console.log("Submitted");


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