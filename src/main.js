import * as sineWave from "./sineBall.js";
import * as weather from "./weather.js";
import * as circles from "./circles.js";
import * as draggableCircle from "./draggableCircle.js";


document.addEventListener("DOMContentLoaded", async () => {
    await OnLoad();
});

async function OnLoad(){
    sineWave.startSineWave();
    circles.setupCircles(15);
    await weather.getWeather();
}


