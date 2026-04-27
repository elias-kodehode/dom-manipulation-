const speedDisplay  = document.getElementById("speed-display");
const speedUp = document.getElementById("speed-up");
const speedDown = document.getElementById("speed-down");
const resetBtn = document.getElementById("reset");
const addCircleBtn = document.getElementById("add-circle");

document.addEventListener("DOMContentLoaded", configureUI);


export function configureUI(){
    registerEventHandlers();
}

function registerEventHandlers(){
    speedUp.addEventListener("click", () => {
        document.dispatchEvent(new CustomEvent("increase-speed"));
    });
    speedDown.addEventListener("click", () => {
        document.dispatchEvent(new CustomEvent("decrease-speed"));
    });
    resetBtn.addEventListener("click", () => {
        document.dispatchEvent(new CustomEvent("reset-speed"));
    });
    speedDown.addEventListener("click", () => {
        document.dispatchEvent(new CustomEvent("decrease-speed"));
    });
    addCircleBtn.addEventListener("click", () => {
        document.dispatchEvent(new CustomEvent("add-circle"));
    });
}

export function updateSpeedDisplay(value){
    speedDisplay.innerText = "Current Speed: " + value;
}