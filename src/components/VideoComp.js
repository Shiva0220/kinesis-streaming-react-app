import React from 'react';
import '../loader.css';

export const VideoComp = (props) => {
    return <div className="row mt-3 mb-3">
        <div className="col-md-12">
            <h1>Amazon Kinesis Video Streams Media Viewer</h1>
            Documentation:
            <a href="https://docs.aws.amazon.com/kinesisvideostreams/latest/dg/API_reader_GetHLSStreamingSessionURL.html">HLS</a>
            -
            <a href="https://docs.aws.amazon.com/kinesisvideostreams/latest/dg/API_reader_GetDASHStreamingSessionURL.html">DASH</a>
        </div>
    </div>
}