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
    currentTiming.style.width = (currentTime / videoDuration) * 100 + '%';
    seekIndicatorPos.style.left = ((currentTime / videoDuration) * 100) - 0.5 + '%';
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
    const calculatedTime = progressPercentage * videoDuration;

    currentDurationTime(videoElement, calculatedTime)
    durRemainstoWatch.innerText = timeRemainsToEnd(calculatedTime, videoDuration);
    loadedDurTime.style.width = '0%';

    videoElement.currentTime = calculatedTime;
    if (videoElement.ended) {
        masterPlay.src = play;
    }
}

function openFullscreen() {
    if (videoComponent.requestFullscreen) {
        videoComponent.requestFullscreen();
    } else if (videoComponent.webkitRequestFullscreen) { /* Safari */
        videoComponent.webkitRequestFullscreen();
    } else if (videoComponent.msRequestFullscreen) { /* IE11 */
        videoComponent.msRequestFullscreen();
    }
}


function exitFullscreen() {
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