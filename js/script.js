video.addEventListener('loadstart', () => {
    videoBufferingLoader.classList.add('control_animation')
});

video.addEventListener('loadedmetadata', () => {
    try {
        videoDuration = video.duration;
        // document.getElementById('videoTitleID').innerText = getVideoName(video);
        durRemainstoWatch.innerText = timeRemainsToEnd(video.currentTime, videoDuration);
        videoBufferingLoader.style.opacity = 0;
        videoBufferingLoader.classList.remove('control_animation')
    } catch (error) {
        console.log(error)
    }
});

video.addEventListener('error', function (event) {
    if (event.target.error) {
        console.log('Internal Server Error!');
    }
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
    if (videoComponent.classList.contains('displayNone')) {
        return;
    }
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
    if (videoComponent.classList.contains('displayNone')) {
        return;
    }
    backCurrentTime(video)
});

time_forward.addEventListener('click', () => {
    if (videoComponent.classList.contains('displayNone')) {
        return;
    }
    forCurrentTime(video)
});

masterPlay.addEventListener('click', () => {
    if (videoComponent.classList.contains('displayNone')) {
        return;
    }
    masterPlayFunc(video)
});


seek.addEventListener('click', (event) => {
    if (videoComponent.classList.contains('displayNone')) {
        return;
    }
    if (event.target.id == 'indicationVideoRunningPoint') {
        return
    }
    userEventCurrentDurationTime(event, video, videoPitch)
});

seek.addEventListener('mousemove', (event) => {
    if (videoComponent.classList.contains('displayNone')) {
        return;
    }
    userEventPreviewDurationTime(event, video, videoPitch)
});

seek.addEventListener('mouseleave', (event) => {
    if (videoComponent.classList.contains('displayNone')) {
        return;
    }
    previewer.style.width = '0%';
});

screenMode.addEventListener('click', () => {
    try {
        if (videoComponent.classList.contains('displayNone')) {
            return;
        }
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
    if (event.key === 'Enter') {
        event.preventDefault();
    } else if (event.key === 'Escape' || event.key === 'F11') {
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