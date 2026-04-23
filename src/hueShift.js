const container = document.querySelector(".hue-shift-container");
const list = [];
let amount = 15;
const baseHue = 0;
const baseSaturation = 100;
const baseLightness = 50;
// amount of iterations performed in total

let iterations = 0;
let speedModifier = 1;

function setup(){
    // Create X amount of circles (div element)
    for (let i = 0; i < amount; i++) {
        createCircle(i);
    }
    updateSpeedDisplay();
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
    

function onClickCircle(element){
    //remove element from DOM
    element.remove();

    const index = list.indexOf(element);
    list.splice(index, 1);
    amount--;
}


function createCircle(id){
    const element = document.createElement("div");
    // give element an id
    element.id = "circle-" + id;

    //give element a common class
    element.classList.add("circle");
    element.setAttribute("draggable", true);
    //add element to a list to keep track of it
    //TODO: maybe just store id instead of entire DOM node?
    list.push(element);

    container.appendChild(element);
}

function updateSpeedDisplay(){
    const display = document.getElementById("speed-display");
    display.innerText = "Current Speed: " + speedModifier;
}


function calculateHue(iterations, index){
    // change this value to offset the hue shift
    const offset = 10;
    return baseHue + (iterations + (index * offset));
}


function loop(){
    for (let i = 0; i < amount; i++) {
        list[i].style.backgroundColor = hsl(iterations % 360, i);
    }
    
    iterations += 1 * speedModifier;
    requestAnimationFrame(loop);
}


document.addEventListener("DOMContentLoaded", () => {
    setup();

    document.addEventListener("click", (e) => {
        const target = e.target;
        if(target.classList.contains("circle") && target.id !== "draggable"){
            onClickCircle(e.target);
        }
        
        if(target.id === "speed-up"){
            speedModifier++;
            updateSpeedDisplay();
        }

        if(target.id === "speed-down"){
            if(speedModifier > 0)
                speedModifier--;
            updateSpeedDisplay();
        }

        if(target.id === "reset"){
            speedModifier = 1;
            updateSpeedDisplay();
        }

        if(target.id === "add-circle"){
            createCircle(list.length);
            amount++;
        }

    });
    requestAnimationFrame(loop);
});