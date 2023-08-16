document.getElementById('videoFile').addEventListener('change', function () {
    if (videoFilePicker.classList.contains('displayNone')) {
        return;
    }
    let file = this.files[0];
    if (file) {
        let fileNameIs = file.name.split('.')
        fileNameIs.pop()

        let videoName = ""
        let fileLength = fileNameIs.length
        for (let i = 0; i < fileLength; i++) {
            videoName += fileNameIs[i]
            if (i < (fileLength - 1)) {
                videoName += '.'
            }
        }

        videoTitle.innerText = videoName;

        video.src = URL.createObjectURL(file);
        videoComponent.classList.remove('displayNone');
        videoFilePicker.classList.add('displayNone');
        closeFilePickerComponent.classList.add('displayNone');
        document.getElementById('videoFile').value = "";
        errorState = false;
    }
});

submitLink.addEventListener('click', function () {
    if (videoFilePicker.classList.contains('displayNone')) {
        return;
    }
    if (VideoLink.value === "") {
        return;
    }

    videoTitle.innerText = '';
    if (errorState || video.src !== VideoLink.value) {
        video.src = VideoLink.value;
    }

    videoComponent.classList.remove('displayNone');
    videoFilePicker.classList.add('displayNone');
    closeFilePickerComponent.classList.remove('displayNone');
    errorState = false;
});

fileRepicker.addEventListener('click', function () {
    if (!video.paused || masterPlay.src === pauseSVG) {
        masterPlay.click();
    }
    if (isFullScreen) {
        exitFullscreen()
        screenModeImg.src = fullScreenSVG
        isFullScreen = false
    }
    videoComponent.classList.add('displayNone');
    videoFilePicker.classList.remove('displayNone');
    closeFilePickerComponent.classList.remove('displayNone');
    errorComponent.classList.add('error')
});

closeFilePicker.addEventListener('click', function () {
    if (!video.src || errorState) {
        return;
    }
    videoComponent.classList.remove('displayNone');
    videoFilePicker.classList.add('displayNone');
    errorState = false;
});