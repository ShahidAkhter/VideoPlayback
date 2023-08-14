document.getElementById('videoFile').addEventListener('change', function () {
    if (videoFilePicker.classList.contains('displayNone')) {
        return;
    }
    let file = this.files[0];
    if (file) {
        fileName = file.name.split('.')
        fileName.pop()

        let videoName = ""
        let fileLength = fileName.length
        for (let i = 0; i < fileLength; i++) {
            videoName += fileName[i]
            if (i < (fileLength - 1)) {
                videoName += '.'
            }
        }

        videoTitle.innerText = videoName;
        video.src = URL.createObjectURL(file);
        videoComponent.classList.remove('displayNone');
        videoFilePicker.classList.add('displayNone');
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
    video.src = VideoLink.value;
    videoComponent.classList.remove('displayNone');
    videoFilePicker.classList.add('displayNone');
});