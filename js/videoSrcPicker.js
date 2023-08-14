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