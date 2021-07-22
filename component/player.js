import React, {Component} from "react";
import * as ReactDOM from "react-dom";

class Player extends Component {

    constructor(props, context) {
        super(props, context);
        this.mediaRef = React.createRef();
        this.state =
            {
                move_position: 0,
                jumpstep: 0,
                speed: 1.0,
                muted: false,
                inactiveTime: 0,
                playback_rates: [],
                videovisibility : true,
            }
        this.controller = null;
        this.playerOnload = this.playerOnload.bind(this);
        this.playClicked = this.playClicked.bind(this);
        this.rwClicked = this.rwClicked.bind(this);
        this.pauseClicked = this.pauseClicked.bind(this);
        this.ffClicked = this.ffClicked.bind(this);
        this.repeatStartClicked = this.repeatStartClicked.bind(this);
        this.repeatEndClicked = this.repeatEndClicked.bind(this);
        this.unsetRepeatClicked = this.unsetRepeatClicked.bind(this);
        this.movePositionClicked = this.movePositionClicked.bind(this);
        this.jumpstepClicked = this.jumpstepClicked.bind(this);
        this.setSpeedClicked = this.setSpeedClicked.bind(this);
        this.muteClicked = this.muteClicked.bind(this);
        this.setRatioClicked = this.setRatioClicked.bind(this);
        this.setControlVisibilityClicked = this.setControlVisibilityClicked.bind(this);
        this.setControlsInactiveTimeClicked = this.setControlsInactiveTimeClicked.bind(this);
        this.setControlbarProgressOnlyClicked = this.setControlbarProgressOnlyClicked.bind(this);
        this.setPlaybackRatesClicked = this.setPlaybackRatesClicked.bind(this);
        this.setVideoVisibilityClicked = this.setVideoVisibilityClicked.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    componentDidMount() {
        let jsVg = document.createElement("script");
        jsVg.setAttribute('src', 'https://file.kollus.com/vgcontroller/vg-controller-client.latest.min.js');
        document.head.appendChild(jsVg);
    };


    playerOnload() {
        try {
            this.controller = new window.VgControllerClient({
                target_window: this.mediaRef.current.contentWindow
            });
            let self = this;
            self.setState({jumpstep: self.controller.get_jumpstep()});
            self.setState({speed: self.controller.get_speed()});
            self.setState({inactiveTime: self.controller.get_controls_inactive_time()});
            self.setState({playback_rates: self.controller.get_playback_rates()})
            this.controller.on('loaded', function () {
                console.log('info', 'loadded', 'loadded');
            })
                .on('ready', function () {
                    let time = parseInt(self.controller.get_current_time());
                    console.log('info', `Ready at ${time}s`, 'play', self.controller.get_progress());
                })
                .on('play', function () {
                    let time = parseInt(self.controller.get_current_time());
                    console.log('info', `Start at ${time}s`, 'play', self.controller.get_progress());
                })
                .on('progress', function (percent, position, duration) {
                    // let time = parseInt(position);
                    // console.log('info', `Start at ${time}s`, 'play', self.controller.get_progress());
                })
                .on('pause', function () {
                    let time = parseInt(self.controller.get_current_time());
                    console.log('info', `Paused at ${time}s`, 'pause', self.controller.get_progress());
                })
                .on('done', function () {
                    let time = parseInt(self.controller.get_current_time());
                    console.log('info', `Stop at ${time}s`, 'done', self.controller.get_progress());
                })
                .on('muted', function (is_muted) {
                    let time = parseInt(self.controller.get_current_time());
                    console.log('info', `Muted Change : ${is_muted} at ${time}s`, 'mute', self.controller.get_progress());
                    this.state.setState({muted: is_muted});
                })
                .on('close', function () {
                    let time = parseInt(self.controller.get_current_time());
                    console.log('info', `Player Closed at ${time}s`, 'close', self.controller.get_progress());
                })
                .on('seeking', function () {
                    let time = parseInt(self.controller.get_current_time());
                    console.log('info', `Starting seek at ${time}s`, 'seeking', self.controller.get_progress());
                })
                .on('seeked', function () {
                    let time = parseInt(self.controller.get_current_time());
                    console.log('info', `Completed seek at ${time}s`, 'seeking', self.controller.get_progress());
                })
                .on('scalemodechange', function (scalemode) {
                    let time = parseInt(self.controller.get_current_time());
                    console.log('info', `Change scalemode  ${scalemode} at ${time}s`, 'scalemode', self.controller.get_progress());
                })
                .on('topmostchange', function (is_topmost) {
                    let time = parseInt(self.controller.get_current_time());
                    console.log('info', `Change topmost  ${is_topmost} at ${time}s`, 'topmost', self.controller.get_progress());
                })
                .on('screenchange', function (screen) {
                    let time = parseInt(self.controller.get_current_time());
                    console.log('info', `Change screen  ${screen} at ${time}s`, 'screen', self.controller.get_progress());
                })
                .on('volumechange', function (volume) {
                    let time = parseInt(self.controller.get_current_time());
                    console.log('info', `Change volume  ${volume} at ${time}s`, 'volume', self.controller.get_progress());
                })
                .on('speedchange', function (speed) {
                    let time = parseInt(self.controller.get_current_time());
                    console.log('info', `Change speed  ${speed} at ${time}s`, 'speed', self.controller.get_progress());
                })
                .on('playbackrateschange', function (playback_rates) {
                    let time = parseInt(self.controller.get_current_time());
                    console.log('info', `Change playback_rates  ${playback_rates} at ${time}s`, 'playback_rates', self.controller.get_progress());
                })
                .on('videosettingchange', function (videosetting) {
                    let prev = {
                        brightness: self.playerInfo.brightness,
                        contrast: self.playerInfo.contrast,
                        saturation: self.playerInfo.saturation
                    }
                    let time = parseInt(self.controller.get_current_time());
                    console.log('info', `Change videosetting  ${JSON.stringify(videosetting)} at ${time}s`, 'videosetting', self.controller.get_progress());
                })
                .on('jumpstepchange', function (jumpstep) {
                    let time = parseInt(self.controller.get_current_time());
                    console.log('info', `Change jumpstep  ${jumpstep} at ${time}s`, 'jumpstep', self.controller.get_progress());
                })
                .on('subtitlevisibilitychange', function (visible) {
                    let time = parseInt(self.controller.get_current_time());
                    console.log('info', `Change subtitle_visibility  ${visible} at ${time}s`, 'subtitle_visibility', self.controller.get_progress());
                })
                .on('hlsfragchange', function () {
                    let time = parseInt(self.controller.get_current_time());
                    console.log('info', `Change hlsfrag at ${time}s`, 'hlsfrag', self.controller.get_progress());
                })
                .on('html5_video_supported', function (html5_video_supported) {
                    console.log('info', `html5 video supported : ${html5_video_supported}`, 'html5videosupported', html5_video_supported);
                })
                .on('device_orientation_changed', function (orientation) {
                    let time = parseInt(self.controller.get_current_time());
                    console.log('info', `Change orientation  ${orientation} at ${time}s`, 'orientation', self.controller.get_progress());
                })
                .on('error', function (error_code) {
                    console.log('info', `Raised Error : ${error_code}`, 'error', error_code);
                });
        } catch (e) {
            console.log(e)
        }
    };

    playClicked() {
        this.controller.play();
    };

    rwClicked() {
        this.controller.rw();
    };

    pauseClicked() {
        this.controller.pause();
    };

    ffClicked() {
        this.controller.ff();
    };

    repeatStartClicked() {
        this.controller.set_repeat_start();
    };

    repeatEndClicked() {
        this.controller.set_repeat_end();
    };

    unsetRepeatClicked() {
        this.controller.unset_repeat();
    };

    movePositionClicked() {
        if (this.controller !== null)
            this.controller.play(this.state.move_position);
    };

    jumpstepClicked() {
        if (this.controller !== null)
            this.controller.set_jumpstep(this.state.jumpstep);
    };

    setSpeedClicked() {
        if (this.controller !== null)
            this.controller.set_speed(this.state.speed);
    };

    muteClicked() {
        if (this.controller !== null)
            this.controller.mute();
    };

    setRatioClicked(event) {

        if (this.controller !== null)
            this.controller.set_ratio(event.target.name);
    };

    setControlVisibilityClicked() {
        if (this.controller !== null) {
            let control_visibility = this.controller.get_control_visibility();
            this.controller.set_control_visibility(!control_visibility);
        }
    };

    setControlsInactiveTimeClicked() {
        if (this.controller !== null)
            this.controller.set_controls_inactive_time(this.state.inactiveTime);
    };

    setControlbarProgressOnlyClicked() {
        if (this.controller !== null) {
            let controlbar_progress_only = this.controller.get_controlbar_progress_only();
            this.controller.set_controlbar_progress_only(!controlbar_progress_only);
        }
    };

    setPlaybackRatesClicked() {
        if (this.controller !== null)
            this.controller.set_playback_rates(JSON.stringify(this.state.playback_rates));
    };

    setVideoVisibilityClicked() {
        if (this.controller !== null) {
            let video_visibility = this.controller.get_video_visibility();
            this.controller.set_video_visibility(!video_visibility);
        }
    };

    handleInput(event) {

        const {name, value} = event.target;

        if(name==='playback_rates'){
            this.setState({[name]: value.split(',')});
        }
        else {
        this.setState({[name]: value});
        }
        event.preventDefault();
    }

    render() {
        const {playerUrl, ...restProps} = this.props;
        const containerStyle = {
            margin: "0 auto",
            padding: "0",
            width: "100%",
            height: "0",
            position:"relative",
            overflow:"hidden",
            paddingBottom: "56.25%"
        }
        const iframStyle = {
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            border:'none'
        }
        const controlStyle ={
            position: "absolute"
        }

        return (
            <div style={containerStyle}>
                <iframe ref={this.mediaRef} src={playerUrl} allow="autoplay; encrypted-media" allowFullScreen
                        onLoad={this.playerOnload} {...restProps} style={iframStyle}></iframe>
                <div style={controlStyle}>

                    <div>
                        <button onClick={this.playClicked}>재생</button>
                        <button onClick={this.rwClicked}>앞으로</button>
                        <button onClick={this.pauseClicked}>일시정지</button>
                        <button onClick={this.ffClicked}>뒤로</button>
                        <button onClick={this.muteClicked}>음소거</button>
                        <button onClick={this.setVideoVisibilityClicked}>영상 감추기</button>
                    </div>
                    <div>
                        <button onClick={this.repeatStartClicked}>구간반복설정시작</button>
                        <button onClick={this.repeatEndClicked}>구간반복설정종료</button>
                        <button onClick={this.unsetRepeatClicked}>구간반복해제</button>
                    </div>
                    <div>
                        <input type="number" min="0" max="30" value={this.state.move_position}
                               onChange={this.handleInput}
                               name="move_position"/>
                        <button onClick={this.movePositionClicked}>이동</button>
                    </div>
                    <div>
                        <input type="number" min="0" max="30" value={this.state.jumpstep} onChange={this.handleInput}
                               name="jumpstep"/>
                        <button onClick={this.jumpstepClicked}>이동단위설정</button>
                    </div>
                    <div>
                        <input type="number" min="0.5" max="2.0" step="0.1" value={this.state.speed}
                               onChange={this.handleInput}
                               name="speed"/>
                        <button onClick={this.setSpeedClicked}>배속설정</button>
                    </div>
                    <div>
                        <button onClick={this.setRatioClicked} name="contain">원본비율</button>
                        <button onClick={this.setRatioClicked} name="fill">꽉찬화면(가로)</button>
                        <button onClick={this.setRatioClicked} name="enlargement">꽉찬화면(세로)</button>
                    </div>
                    <div>
                        <button onClick={this.setControlVisibilityClicked}>재생 메뉴바 숨김/표시</button>
                        <input type="number" min="0" max="30" value={this.state.inactiveTime}
                               onChange={this.handleInput}
                               name="inactiveTime"/>
                        <button onClick={this.setControlsInactiveTimeClicked}>재생 메뉴바 대기시간</button>
                        <button onClick={this.setControlbarProgressOnlyClicked}>재생 메뉴바선택(All/Progress)</button>
                    </div>
                    <div>
                        <input type="text" value={this.state.playback_rates}
                               onChange={this.handleInput}
                               name="playback_rates"/>
                        <button onClick={this.setPlaybackRatesClicked}>배속설정</button>
                    </div>
                </div>
            </div>

        )
    };


}

export default Player;