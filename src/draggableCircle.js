const draggableCircle = document.getElementById("draggable");


document.addEventListener("dragend", e => {
    const destination = { 
        x: e.clientX,
        y: e.clientY
    };
    if(e.target.id === "draggable"){
        setPosition(
            destination.x - getSize().width / 2,
            destination.y - getSize().height / 2
        );
    }

});


function getSize(){
    const computedStyle = window.getComputedStyle(draggableCircle);
    return {
        width: parseInt(computedStyle.width),
        height: parseInt(computedStyle.height)
    };
};

function setPosition(x, y){
    draggableCircle.style.top = y + "px";
    draggableCircle.style.left = x + "px";
}

function getPosition(){
    return {
        x: draggableCircle.style.left,
        y: draggableCircle.style.top
    }
}