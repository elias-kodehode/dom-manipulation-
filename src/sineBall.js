const sineBall = document.getElementById("sine");
// last recorded time
let last = 0;

// total accumulated time
let time = 0;

function sineWave(currentTime){
    // time between frame
    const delta = (currentTime - last) / 1000;
    last = currentTime;
    time += 1 * delta;

    const amplitude = 150;
    const frequency = 5;
    const heightOffset = 100;
    const y = amplitude * Math.sin(frequency * time);

    sineBall.style.top = `${y + heightOffset}px`;
    requestAnimationFrame(sineWave);
}


document.addEventListener("DOMContentLoaded", () => {
    requestAnimationFrame(sineWave);
});