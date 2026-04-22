const container = document.querySelector(".container");
const list = [];
const amount = 15;

const baseHue = 0;
const baseSaturation = 100;
const baseLightness = 50;

document.addEventListener("DOMContentLoaded", () => {
    for (let i = 0; i < amount; i++) {
        const element = document.createElement("div");
        element.id = "circle-" + i;
        element.classList.add("circle");
        element.addEventListener("click", (e) => {
            e.remove();
        });

        list.push(element);

        container.appendChild(element);
    }
    loop();
});


let iterations = 0;
function loop(){
    for (let i = 0; i < amount; i++) {
        list[i].style.backgroundColor = hsl(iterations, i);
    }
    
    iterations++;
    
    if(iterations >= 256){
        iterations = 0;
    }
    requestAnimationFrame(loop);
}

function hsl(iterations, index){
    return `
    hsl(
        ${calculateHue(iterations, index)},
        ${baseSaturation}%, 
        ${baseLightness}%
        )`;
}
    
function calculateHue(iterations, index){
    // change this value to offset the hue shift
    const offset = 10;
    return baseHue + (iterations + (index * offset));
}