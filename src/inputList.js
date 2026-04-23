
const inputField = document.getElementById("text-input");
const inputList = document.getElementById("input-list");

// store list-item elements
const listItems = [];


document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", (e) => {
        const target = e.target;


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

});

