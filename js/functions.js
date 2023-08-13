const getStandardTime = (timerLength) => {
    let timerLen = Number.parseInt(timerLength);
    let hours = Math.floor(timerLen / 3600);
    let minutes = Math.floor((timerLen % 3600) / 60);
    let seconds = timerLen % 60;

    // Add leading zeros if necessary
    let minutesStr = minutes.toString().padStart(2, '0');
    let secondsStr = seconds.toString().padStart(2, '0');

    if (hours <= 0) {
        return `${minutesStr}:${secondsStr}`;
    }

    let hoursStr = hours.toString().padStart(2, '0');
    return `${hoursStr}:${minutesStr}:${secondsStr}`;
}


const timeRemainsToEnd = (timerLength, durationOfContent) => {
    let timeRemainsIs = durationOfContent - timerLength;
    if (timeRemainsIs <= 0) {
        timeRemainsIs = 0
    }
    let standardTime = getStandardTime(timeRemainsIs);
    return standardTime;
}


function getVideoName(videoElement) {
    let videoName = '';
    let tmpVideoName = videoElement.querySelector("source").getAttribute("src").split("/").pop().split("\\").pop().split(".");
    tmpVideoName.pop();

    for (let i = 0; i < tmpVideoName.length; i++) {
        videoName += tmpVideoName[i]
        if (tmpVideoName[i + 1]) {
            videoName += '.'
        }
    }

    return videoName;
}

function BufferedDuration(videoElement) {
    loadedDurTime.style.width = (videoElement.buffered.end(videoElement.buffered.length - 1) / videoDuration) * 100 + '%';
}

function currentDurationTime(videoElement, currentTime) {
    let currentTimingWidth = (currentTime / videoDuration) * 100;
    let seekIndicatorPosWidth = (currentTime / videoDuration) * 100 - 0.5;

    currentTimingWidth = Math.max(0, Math.min(100, currentTimingWidth));
    seekIndicatorPosWidth = Math.max(0, Math.min(99.5, seekIndicatorPosWidth));


    currentTiming.style.width = currentTimingWidth + '%';
    seekIndicatorPos.style.left = seekIndicatorPosWidth + '%';
}

function backCurrentTime(videoElement) {
    videoElement.currentTime -= timeSkipBackForward
}

function forCurrentTime(videoElement) {
    videoElement.currentTime += timeSkipBackForward
}

function masterPlayFunc(videoElement) {
    if (videoElement.paused || videoElement.currentTime <= 0) {
        videoElement.play();
        masterPlay.src = pauseSVG;
    }
    else {
        videoElement.pause();
        masterPlay.src = playSVG;
    }
}

function userEventCurrentDurationTime(event, videoElement, pitch) {
    const progressPercentage = event.offsetX / pitch.clientWidth;
    let calculatedTime = progressPercentage * videoDuration;

    calculatedTime = Math.max(0, Math.min(videoDuration, calculatedTime));

    currentDurationTime(videoElement, calculatedTime)
    durRemainstoWatch.innerText = timeRemainsToEnd(calculatedTime, videoDuration);
    loadedDurTime.style.width = '0%';

    videoElement.currentTime = calculatedTime;
    if (videoElement.ended) {
        masterPlay.src = play;
    }
}
function userEventPreviewDurationTime(event, videoElement, pitch) {
    const progressPercentage = event.offsetX / pitch.clientWidth;
    let calculatedTime = progressPercentage * videoDuration;

    calculatedTime = Math.max(0, Math.min(videoDuration, calculatedTime));
    
    let previewerWidth = (calculatedTime / videoDuration) * 100;
    
    previewerWidth = Math.max(0, Math.min(100, previewerWidth));

    previewer.style.width = previewerWidth + '%';

    if (event.target.id === 'indicationVideoRunningPoint') {
        previewerTime.innerText = getStandardTime(videoElement.currentTime);
        if (parseFloat(seekIndicatorPos.style.left) < 1) {
            previewerTime.style.left = "2%";
            return;
        }
        previewerTime.style.left = (86 * parseFloat(previewer.style.width) / 100) + (92 * parseFloat(seekIndicatorPos.style.left) / 100) + "%";
        return;
    }

    previewerTime.innerText = getStandardTime(calculatedTime);
    previewerTime.style.left = ((90 * parseFloat(previewer.style.width) / 100) + 1.5) + "%";
    previewerTime.style.opacity = '1';
}

function openFullscreen() {
    try {
        if (videoComponent.requestFullscreen) {
            videoComponent.requestFullscreen();
        } else if (videoComponent.webkitRequestFullscreen) { /* Safari */
            videoComponent.webkitRequestFullscreen();
        } else if (videoComponent.msRequestFullscreen) { /* IE11 */
            videoComponent.msRequestFullscreen();
        }
    } catch (error) {
        console.log("Some Error Occured " + error)
    }
}


function exitFullscreen() {
    try {
        if (document.fullscreenElement) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    } catch (error) {
        console.log("Some Error Occured " + error)
    }
}