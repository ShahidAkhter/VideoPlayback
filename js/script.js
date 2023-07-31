
videoBufferingLoader.classList.add('control_animation')
video.addEventListener('loadedmetadata', () => {
    videoDuration = video.duration;
    document.getElementById('videoTitleID').innerText = getVideoName(video);
    durRemainstoWatch.innerText = timeRemainsToEnd(video.currentTime, videoDuration);
    videoBufferingLoader.style.opacity = 0;
    videoBufferingLoader.classList.remove('control_animation')
});

video.addEventListener('waiting', () => {
    videoBufferingLoader.classList.add('control_animation')
    videoBufferingLoader.style.opacity = 1;
})

video.addEventListener('playing', () => {
    videoBufferingLoader.style.opacity = 0;
    videoBufferingLoader.classList.remove('control_animation')
})

videoMiddleComponent.addEventListener('click', () => {
    masterPlay.click();
})

video.addEventListener('timeupdate', () => {
    durRemainstoWatch.innerText = timeRemainsToEnd(video.currentTime, videoDuration);
    BufferedDuration(video)
    currentDurationTime(video, video.currentTime)
    if (video.ended) {
        masterPlay.src = playSVG;
    }
});

time_backward.addEventListener('click', () => {
    backCurrentTime(video)
});

time_forward.addEventListener('click', () => {
    forCurrentTime(video)
});

masterPlay.addEventListener('click', () => {
    masterPlayFunc(video)
});


seek.addEventListener('click', (event) => {
    if (event.target.id == 'indicationVideoRunningPoint') {
        return
    }
    userEventCurrentDurationTime(event, video, videoPitch)
});

screenMode.addEventListener('click', () => {
    try {
        if (isFullScreen) {
            exitFullscreen()
            screenModeImg.src = fullScreenSVG
            isFullScreen = false
        } else {
            openFullscreen()
            screenModeImg.src = normalScreenSVG
            isFullScreen = true
        }
    } catch (error) {
        console.log("Some Error Occured " + error)
    }
});

video.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' || event.key === 'F11') {
        event.preventDefault();
        screenMode.click();
    }
    if (event.code === 'KeyF') {
        screenMode.click();
    } else if (event.code === 'Space') {
        masterPlay.click();
    } else if (event.code === 'ArrowLeft') {
        time_backward.click();
    } else if (event.code === 'ArrowRight') {
        time_forward.click();
    }
})