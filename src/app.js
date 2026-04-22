const container = document.querySelector(".container");
const list = [];
let amount = 15;

const baseHue = 0;
const baseSaturation = 100;
const baseLightness = 50;

document.addEventListener("DOMContentLoaded", () => {


    // Create X amount of circles (div element)
    for (let i = 0; i < amount; i++) {
        const element = document.createElement("div");
        // give element an id
        element.id = "circle-" + i;

        //give element a common class
        element.classList.add("circle");


        //add element to a list to keep track of it
        //TODO: maybe just store id instead of entire DOM node?
        list.push(element);

        container.appendChild(element);
    }


    document.addEventListener("click", (e) => {
        if(!e.classList.contains("circle")){
            return;
        }

        const element = e.target;

        //remove element from DOM
        element.remove();

        const index = list.indexOf(element);
        list.splice(index, 1);
        amount--;
    });

    loop();
});




// amount of iterations performed in total
let iterations = 0;

function loop(){
    for (let i = 0; i < amount; i++) {
        list[i].style.backgroundColor = hsl(iterations, i);
    }
    
    iterations++;
    requestAnimationFrame(loop);
}


//calculate HSL to perform hue shift
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