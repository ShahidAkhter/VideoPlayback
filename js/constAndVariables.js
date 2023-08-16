// Constants
const videoFilePicker = document.getElementById('videoFilePickerID');
const VideoLink = document.getElementById('VideoLink');
const submitLink = document.getElementById('submitLink');
const videoComponent = document.getElementById('videoComponentID');
const videoControls = document.getElementById('videoControlsID');
const video = document.getElementById('myVideo');
const durRemainstoWatch = document.getElementById('durRemainstoWatch');
const screenMode = document.getElementById('screen_mode');
const currentTiming = document.getElementById('currentTiming');
const loadedDurTime = document.getElementById('loadedDurTime');
const videoPitch = document.getElementById('pitchVideoDur');
const seek = document.getElementById('seekID');
const seekIndicatorPos = document.getElementById('indicationVideoRunningPoint');
const time_backward = document.getElementById('time_backward');
const time_forward = document.getElementById('time_forward');
const screenModeImg = document.querySelector('#screen_mode img');
const masterPlay = document.querySelector('#masterPlay img');
const currentVolume = document.getElementById('currentVolume');
const volIndicatorPos = document.getElementById('indicatorCurrentVolPos');
const volPitch = document.getElementById('pitchVideoVol');
const volumeSeekID = document.getElementById('volumeSeekID');
const videoMiddleComponent = document.getElementById('videoMiddleComponent');
const videoBufferingLoader = document.getElementById('videoBufferingLoader');
const titleBar = document.getElementById('titleBarID');
const videoTitle = document.getElementById('videoTitleID');
const previewer = document.getElementById('previewer');
const previewerTime = document.getElementById('previewerTimeID');
const errorComponent = document.getElementById('errorComponentID');
const errorsConetentComponent = document.getElementById('errorsID');
const fileRepicker = document.getElementById('file_repicker');
const closeFilePicker = document.getElementById('closeFilePicker');
const closeFilePickerComponent = document.getElementById('closeFilePickerComponentID');


// Variables
let videoDuration = 0;
let timeSkipBackForward = 10;
let isFullScreen = false;
let errorState=false;

// image Variables
let fullScreenSVG = 'assets\\appImgs\\full_screen.svg'
let normalScreenSVG = 'assets\\appImgs\\normal_screen.svg'
let playSVG = 'assets\\appImgs\\play-solid.svg'
let pauseSVG = 'assets\\appImgs\\pause-solid.svg'

currentVolume.style.width = '100%'
volIndicatorPos.style.left = '99.5%'
previewerTime.style.opacity='0';