const weatherComponent = document.querySelector(".weather-component");
const p = weatherComponent.querySelectorAll("p")[0];
const p_feelsLike = weatherComponent.querySelectorAll("p")[1];

document.addEventListener("DOMContentLoaded", async () => {
    getWeather();
});

async function getWeather(){

    const url = "https://api.open-meteo.com/v1/forecast?latitude=62.1998&longitude=6.129&current=temperature_2m,apparent_temperature&timezone=auto&past_days=0&forecast_days=1";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    p.textContent = data.current.temperature_2m  + "°C";
    p_feelsLike.textContent = data.current.apparent_temperature + "°C";
}
