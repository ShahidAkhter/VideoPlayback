video.addEventListener('loadedmetadata', () => {
    videoDuration = video.duration;
    document.getElementById('videoTitleID').innerText = getVideoName(video);
    durRemainstoWatch.innerText = timeRemainsToEnd(video.currentTime, videoDuration);
    videoBufferingLoader.style.opacity = 0;
});

video.addEventListener('waiting', () => {
    videoBufferingLoader.style.opacity = 1;
})

video.addEventListener('playing', () => {
    videoBufferingLoader.style.opacity = 0;
})

videoMiddleComponent.addEventListener('click',()=>{
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
    if (isFullScreen) {
        exitFullscreen()
        screenModeImg.src = fullScreenSVG
        isFullScreen = false
    } else {
        openFullscreen()
        screenModeImg.src = normalScreenSVG
        isFullScreen = true
    }
});


window.addEventListener('keydown', (event) => {
    event.preventDefault();
    
    if(event.code === 'KeyF'){
        screenMode.click();
    }else if(event.code === 'Space'){
        masterPlay.click();
    }else if(event.code === 'ArrowLeft'){
        time_backward.click();
    }else if(event.code === 'ArrowRight'){
        time_forward.click();
    }
})