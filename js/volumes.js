function volumemeter(event, videoElement, pitch) {
    const calculatedVol = event.offsetX / pitch.clientWidth;

    videoElement.volume = calculatedVol;

    let progress = (calculatedVol * 100)
    currentVolume.style.width = progress + '%';
    volIndicatorPos.style.left = progress - 5 + '%';
}


volumeSeekID.addEventListener('click', (event) => {
    if (event.target.id == 'indicatorCurrentVolPos') {
        return
    }
    volumemeter(event, video, volPitch)
})