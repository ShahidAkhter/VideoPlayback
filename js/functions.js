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

function BufferedDuration(mediaElement) {
    loadedDurTime.style.width = (mediaElement.buffered.end(mediaElement.buffered.length - 1) / videoDuration) * 100 + '%';
}

function currentDurationTime(mediaElement, currentTime) {
    let currentTimingWidth = (currentTime / videoDuration) * 100;
    let seekIndicatorPosWidth = (currentTime / videoDuration) * 100 - 0.5;

    currentTimingWidth = Math.max(0, Math.min(100, currentTimingWidth));
    seekIndicatorPosWidth = Math.max(0, Math.min(99.5, seekIndicatorPosWidth));


    currentTiming.style.width = currentTimingWidth + '%';
    seekIndicatorPos.style.left = seekIndicatorPosWidth + '%';
}

function backCurrentTime(mediaElement, timeToSkip) {
    mediaElement.currentTime -= timeToSkip
}

function forCurrentTime(mediaElement, timeToSkip) {
    mediaElement.currentTime += timeToSkip
}

function masterPlayFunc(mediaElement) {
    if (mediaElement.paused || mediaElement.currentTime <= 0) {
        mediaElement.play();
        masterPlay.src = pauseSVG;
    }
    else {
        mediaElement.pause();
        masterPlay.src = playSVG;
    }
}

function userEventCurrentDurationTime(event, mediaElement, pitch) {
    const progressPercentage = event.offsetX / pitch.clientWidth;
    let calculatedTime = progressPercentage * videoDuration;

    calculatedTime = Math.max(0, Math.min(videoDuration, calculatedTime));

    currentDurationTime(mediaElement, calculatedTime)
    durRemainstoWatch.innerText = timeRemainsToEnd(calculatedTime, videoDuration);
    loadedDurTime.style.width = '0%';

    mediaElement.currentTime = calculatedTime;
    if (mediaElement.ended) {
        masterPlay.src = play;
    }
}
function userEventPreviewDurationTime(event, mediaElement, pitch) {
    const progressPercentage = event.offsetX / pitch.clientWidth;
    let calculatedTime = progressPercentage * videoDuration;

    calculatedTime = Math.max(0, Math.min(videoDuration, calculatedTime));

    let previewerWidth = (calculatedTime / videoDuration) * 100;

    previewerWidth = Math.max(0, Math.min(100, previewerWidth));

    previewer.style.width = previewerWidth + '%';

    if (event.target.id === 'indicationVideoRunningPoint') {
        previewerTime.innerText = getStandardTime(mediaElement.currentTime);
        if (parseFloat(seekIndicatorPos.style.left) < 1) {
            previewerTime.style.left = "2%";
            return;
        }
        previewerTime.style.left = ((90 * parseFloat(previewer.style.width) / 100) + (94 * parseFloat(seekIndicatorPos.style.left) / 100) - 0.5) + "%";
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