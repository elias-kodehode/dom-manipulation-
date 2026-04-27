const cities = [
    {
        "name":"ørsta",
        "longitude":"6.129",
        "latitude":"62.1998"
    },
    {
        "name":"ulsteinvik",
        "longitude":"5.8487",
        "latitude":"62.3432"
    },
    {
        "name":"ålesund",
        "longitude":"6.1549",
        "latitude":"62.4723"
    }
];

async function fetchWeather(city){
    const baseUrl = new URL("https://api.open-meteo.com/v1/forecast?");
    baseUrl.searchParams.set("longitude", city.longitude);
    baseUrl.searchParams.set("latitude", city.latitude);
    baseUrl.searchParams.set("current", "temperature_2m,apparent_temperature");
    baseUrl.searchParams.set("timezone", "auto");
    baseUrl.searchParams.set("past_days", 0);
    baseUrl.searchParams.set("forecast_days", 1);


    // const url = "https://api.open-meteo.com/v1/forecast?latitude=62.1998&longitude=6.129&current=temperature_2m,apparent_temperature&timezone=auto&past_days=0&forecast_days=1";
    const response = await fetch(baseUrl);

    const data = await response.json();

    return {
        name: city.name,
        temperature: data.current.temperature_2m,
        feels_like: data.current.apparent_temperature
    }
}


export async function getWeather(city){
    if(cities.some(x => x.name.toLowerCase() === city.toLowerCase())){

        const cityIndex = cities.map(x => x.name).indexOf(city.toLowerCase());
        const weather = await fetchWeather(cities[cityIndex]);
        return weather;
    }

}