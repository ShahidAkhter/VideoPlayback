let timer;

function hideControlsAndTitleBar() {
    videoControls.classList.remove('videoControlsOpacity');
    titleBar.classList.remove('titleBarOpacity');
    videoComponent.classList.add('cursor-none');
}

function handleMouseMove() {
    clearTimeout(timer);

    if (!videoControls.classList.contains('videoControlsOpacity')) {
        videoControls.classList.add('videoControlsOpacity');
        titleBar.classList.add('titleBarOpacity');
        videoComponent.classList.remove('cursor-none');
    }

    timer = setTimeout(hideControlsAndTitleBar, 3000);
}

function showControlsAndTitleBar() {
    if (videoControls.classList.contains('videoControlsOpacity')) {
        videoControls.classList.remove('videoControlsOpacity');
        titleBar.classList.remove('titleBarOpacity');
        videoComponent.classList.add('cursor-none');
    }

    clearTimeout(timer);
}

function handleVideoEnd() {
    videoControls.classList.add('videoControlsOpacity');
    titleBar.classList.add('titleBarOpacity');
    videoComponent.classList.remove('cursor-none');
}

function handleVideoPause() {
    videoControls.classList.add('videoControlsOpacity');
    titleBar.classList.add('titleBarOpacity');
    videoComponent.classList.remove('cursor-none');
}

function handleVideoPlay() {
    videoControls.classList.remove('videoControlsOpacity');
    titleBar.classList.remove('titleBarOpacity');
    videoComponent.classList.add('cursor-none');
}

window.addEventListener('mousemove', handleMouseMove);
video.addEventListener('ended', handleVideoEnd);
video.addEventListener('pause', handleVideoPause);
video.addEventListener('play', handleVideoPlay);
videoControls.addEventListener('mouseenter', showControlsAndTitleBar);
videoControls.addEventListener('mouseleave', handleMouseMove);
titleBar.addEventListener('mouseenter', showControlsAndTitleBar);
titleBar.addEventListener('mouseleave', handleMouseMove);