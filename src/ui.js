const weatherComponent = document.querySelector(".weather-component");
const temp = weatherComponent.querySelector(".temp");
const feels_like = weatherComponent.querySelector(".feels-like");
const refreshBtn = document.getElementById("refresh");
const speedDisplay  = document.getElementById("speed-display");
const speedUp = document.getElementById("speed-up");
const speedDown = document.getElementById("speed-down");
const resetBtn = document.getElementById("reset");
const addCircleBtn = document.getElementById("add-circle");

document.addEventListener("DOMContentLoaded", configureUI);


export function configureUI(){
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

    refreshBtn.addEventListener("click", () => {
        document.dispatchEvent(new CustomEvent("refresh-weather"));
    });
}


export function setTemperature(data){
    if(data.temperature == null || data.feels_like == null){
        throw new Error("setTemperature requires a 'temperature' and 'feels-like' field");
    }
    temp.textContent = data.temperature  + "°C";
    feels_like.textContent = data.feels_like+ "°C";
}


export function updateSpeedDisplay(value){
    speedDisplay.innerText = "Current Speed: " + value;
}