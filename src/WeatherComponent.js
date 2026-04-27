import * as weather from "./weather.js";

//WEB COMPONENTS SUCKSSS
class WeatherComponent extends HTMLElement{
    set temp(value){
        this.setAttribute("temp", value);
    }

    get temp() {
        return this.getAttribute("temp");
    }

    set feels_like(value){
        this.setAttribute("feels-like", value);
    }

    get feels_like(){
        return this.getAttribute("feels-like");
    }

    set city(value){
        this.setAttribute("city", value);
    }

    get city(){
        return this.getAttribute("city");
    }

    static get observedAttributes() {
        return ["city", "temp", "feels-like"];
    }
    constructor(){
        super();

        let template = document.getElementById("weather-component-template");
        let templateContent = template.content;

        const shadowRoot = this.attachShadow({mode: "open"});

        this.id = `weather-component-${this.getAttribute("city")}`
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    
    async connectedCallback(){
        this.shadowRoot.getElementById("refresh")
            .addEventListener("click", () => this.refresh());

        await this.refresh();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.updateDisplay();
        }
    }

    updateDisplay(){
        this.shadowRoot.getElementById("city").textContent = this.city;
        this.shadowRoot.getElementById("temp").textContent = `${this.temp}°C`;
        this.shadowRoot.getElementById("feels-like").textContent = `${this.feels_like}°C`;
    }

    async refresh(){
        const result = await weather.getWeather(this.city);
        this.temp = result.temperature;
        this.feels_like = result.feels_like;
        this.updateDisplay();
    }
}

customElements.define("weather-component", WeatherComponent);