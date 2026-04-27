import * as ui from "./ui.js";

document.addEventListener("refresh-weather", async () => {
    await getWeather();
});

async function fetchWeather(){

    const url = "https://api.open-meteo.com/v1/forecast?latitude=62.1998&longitude=6.129&current=temperature_2m,apparent_temperature&timezone=auto&past_days=0&forecast_days=1";
    const response = await fetch(url);
    const data = await response.json();

    return {
        temperature: data.current.temperature_2m,
        feels_like: data.current.apparent_temperature
    }
}


export async function getWeather(){
        console.log("fetching weather...");
        const weather = await fetchWeather();
    
        console.log(weather);
        ui.setTemperature(weather);
}