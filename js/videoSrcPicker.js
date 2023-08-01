document.getElementById('videoFile').addEventListener('change', function () {
    let file = this.files[0];
    if (file) {
        fileName = file.name.split('.')
        fileName.pop()

        videoName = ""
        for (let i = 0; i < fileName.length; i++) {
            videoName += fileName[i]
            if (fileName[i + 1]) {
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
    if (VideoLink.value==="") {
        return;
    }
    
    videoTitle.innerText = '';
    video.src = VideoLink.value;
    videoComponent.classList.remove('displayNone');
    videoFilePicker.classList.add('displayNone');
});