import * as ui from "./ui.js";

const container = document.querySelector(".hue-shift-container");
let circles = [];
// amount of iterations performed in total
let iterations = 0;

let speedModifier = 1;

const baseHue = 0;
const baseSaturation = 100;
const baseLightness = 50;

//Used to track if the UI should be updated
let isDirty = false;
//how often to check for dirty UI
let cleanup_delay = 1000;


// 
export function setupCircles(amount){
    for (let i = 0; i < amount; i++) {
        appendCircle(createCircle(i));
    }
    ui.updateSpeedDisplay(speedModifier);

    document.addEventListener("increase-speed", () => {
        speedModifier++;
        ui.updateSpeedDisplay(speedModifier);
    });
    document.addEventListener("decrease-speed", () => {
        if(speedModifier > 0)
            speedModifier--;
        ui.updateSpeedDisplay(speedModifier);
    });

    document.addEventListener("reset-speed", () => {
        speedModifier = 1;
        console.log(speedModifier);
        ui.updateSpeedDisplay(speedModifier);
    });

    document.addEventListener("add-circle", () => {
        appendCircle(createCircle(circles.length));
    });

    setInterval(() => {
        if(isDirty){
            recalculateIds();
        }
    }, (cleanup_delay));
    
    
    requestAnimationFrame(loop);
}



export function appendCircle(circle){

    if(isDirty){
        recalculateIds();
    }
    circles.push(circle);        
    container.appendChild(circle);
}

// Expensive operation, dont do this often
function recalculateIds(){
    for (let i = 0; i < circles.length; i++) {
        circles[i].id = "circle-" + i;
    }
    isDirty = false;
}




export function removeCircle(circle){
    console.log(circle);
    circles.splice(circles.indexOf(circle), 1);
    circle.remove();
    isDirty = true;
}

function loop(){
    for (let i = 0; i < circles.length; i++) {
        circles[i].style.backgroundColor = hsl(iterations % 360, i);
    }
    
    iterations += 1 * speedModifier;
    requestAnimationFrame(loop);
}

export function createCircle(id){
    const element = document.createElement("div");
    // give element an id
    element.id = "circle-" + id;

    //give element a common class
    element.classList.add("circle");
    element.setAttribute("draggable", true);
    element.addEventListener("click", (e) => removeCircle(e.target));
    return element;
}



function calculateHue(iterations, index){
    // change this value to offset the hue shift
    const offset = 10;
    return baseHue + (iterations + (index * offset));
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
