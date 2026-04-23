const container = document.querySelector(".hue-shift-container");
const inputField = document.getElementById("text-input");
const inputList = document.getElementById("input-list");
const list = [];

// store list-item elements
const listItems = [];

let amount = 15;

const baseHue = 0;
const baseSaturation = 100;
const baseLightness = 50;

document.addEventListener("DOMContentLoaded", () => {
    // set everything up
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


        // add text input into unordered list
        if(target.id === "input-submit"){
            if(inputField.value === ""){
                return;
            }

            //get li element template
            const template = document.getElementById("list-item-template");

            const clone = document.importNode(template.content, true);
            const liElement = clone.querySelector("li");
            const button = liElement.querySelector("button");

            //change the text of the li element without removing its button child element
            liElement.childNodes[0].nodeValue = inputField.value;

            //push the instance into a list for state management
            listItems.push(clone);
            inputList.appendChild(clone);
            //reset input element's value
            inputField.value = "";
        }
        // delete input list item
        if(target.id === "delete-item"){
            target.parentElement.remove();
        }
    });

    loop();
});

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

function onClickCircle(element){
    //remove element from DOM
    element.remove();

    const index = list.indexOf(element);
    list.splice(index, 1);
    amount--;
}

function setup(){
    // Create X amount of circles (div element)
    for (let i = 0; i < amount; i++) {
        createCircle(i);
    }
    updateSpeedDisplay();
}

// amount of iterations performed in total
let iterations = 0;
let speedModifier = 1;

function loop(){
    for (let i = 0; i < amount; i++) {
        list[i].style.backgroundColor = hsl(iterations % 360, i);
    }
    
    iterations += 1 * speedModifier;
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



const draggableCircle = {
    element: document.getElementById("draggable"),
    // get the width and height of the draggable element
    getSize(){
        const computedStyle = window.getComputedStyle(this.element);
        return {
            width: parseInt(computedStyle.width),
            height: parseInt(computedStyle.height)
        };
    },
    // set the position of element
    setPosition(x, y){
        this.element.style.top = y + "px";
        this.element.style.left = x + "px";
    },
    // get position of draggable element
    getPosition(){
        return {
            x: this.element.style.left,
            y: this.element.style.top
        }
    }
};


document.addEventListener("dragend", (e) => {
    const destination = { 
        x: e.clientX,
        y: e.clientY
    };

    if(e.target.id === "draggable"){
        draggableCircle.setPosition(
            destination.x - draggableCircle.getSize().width / 2,
            destination.y - draggableCircle.getSize().height / 2
        );
    }

});

