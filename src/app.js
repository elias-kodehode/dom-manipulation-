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

