function userChangesInput(selCheckbox) {
    var label = selCheckbox.parentNode;

    if (selCheckbox.checked) {
        label.classList.add("checked")
    } else {
        label.classList.remove("checked")
    }

    renderOrder()
}

function renderOrder() {
    let checkboxes = document.querySelectorAll('.itemCheckbox:checked')
    console.log(checkboxes);

    let orderDiv = document.getElementById("orderList")
    let divsInOrderDiv = orderDiv.querySelectorAll('label');


    let curIdsList = [];
    let curValueDict={};
    divsInOrderDiv.forEach((div) => {
        let divId = div.id;
        curIdsList.push(divId);

        let numberInput = div.querySelector('input[type="number"]');

        if (numberInput) {
            let inputValue = numberInput.value;
            curValueDict[divId]=inputValue;
        } else {
            // Handle the case where there is no number input inside the label
            curValueDict[divId]=1; // or any other default value
        }
    });

    console.log(curValueDict);


    let nosaukums
    let boxId

    var currentDate = new Date();

    checkboxes.forEach((box) => {
        
        nosaukums=box.parentNode.textContent.trim()
        boxId=`orderItem_${box.id}`

        if (curIdsList.includes(boxId)){
            curIdsList=curIdsList.filter(i => i !== boxId)
        }else{
            orderDiv.innerHTML+=(`
            <label class="orderItem" id="${boxId}" for="quantity">
            <li>
            ${nosaukums}:
            </li>
            <input class="shadow" type="number" name="quantity" min="1" max="8" value="1">
            </label>`)
        }
        console.log(curIdsList);
    });


    curIdsList.forEach(id => {
        var elementToRemove = document.getElementById(id);
        if (elementToRemove) {
            elementToRemove.remove();
        } else {
            console.log("Element with ID " + id + " not found");
        }
    });

    for (const inputId in curValueDict) {
        if (curValueDict.hasOwnProperty(inputId)) {
          // Get the input element using its ID
          const inputElement = document.querySelector(`#${inputId}>input`);
      
          // Check if the input element exists
          if (inputElement) {
            // Update the value of the input element
            inputElement.value = curValueDict[inputId];
          }
        }
      }

}

const params = new URLSearchParams(window.location.search)
console.log(params);

if (params.has('itemid') && params.has('itemtype')) {
    const itemId = params.get('itemid')
    const itemType = params.get('itemtype')

    let id=itemType+itemId
    console.log(id);
    let checkbox = document.getElementById(id)

    if (checkbox) {
        checkbox.checked = true;
        checkbox.parentNode.classList.add("checked")
        renderOrder()
    } else {
        console.log('Checkbox not found with the specified ID')
    }
}