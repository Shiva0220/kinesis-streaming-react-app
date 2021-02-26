import React from 'react';
import '../loader.css';

export const VideoComp = (props) => {
    return <div className="col-md-8">
        <div id="playerContainer">

            <video id="hlsjs" className="player" controls autoPlay/>
            {/*<script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>*/}

            <video id="videojs" className="player video-js vjs-default-skin" controls autoPlay/>
            <link rel="stylesheet" href="https://vjs.zencdn.net/6.6.3/video-js.css"/>
            {/*<script src="https://vjs.zencdn.net/6.6.3/video.js"></script>*/}
            {/*<script*/}
            {/*    src="https://cdnjs.cloudflare.com/ajax/libs/videojs-contrib-hls/5.14.1/videojs-contrib-hls.js"></script>*/}

            <video id="shaka" className="player" controls autoPlay/>
            {/*<script src="https://cdnjs.cloudflare.com/ajax/libs/shaka-player/2.4.1/shaka-player.compiled.js">*/}
            {/*</script>*/}

            <video id="dashjs" className="player" controls autoPlay=""/>
            {/*<script src="https://cdn.dashjs.org/latest/dash.all.min.js"/>*/}
        </div>

        <h3 style={{"marginTop": "20px"}}>Logs</h3>
        <div className="card bg-light mb-3">
            <pre id="logs" className="card-body text-monospace"
                 style={{"fontFamily": "monospace", "whiteSpace": "pre-wrap", "textAlign": "left"}}/>
        </div>
    </div>;
}