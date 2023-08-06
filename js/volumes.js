function volumemeter(event, videoElement, pitch) {
    let calculatedVol = event.offsetX / pitch.clientWidth;

    calculatedVol = Math.max(0, Math.min(1, calculatedVol));

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