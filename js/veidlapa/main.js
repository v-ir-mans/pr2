function userChangesInput(selCheckbox) {
    var label = selCheckbox.parentNode;

    if (selCheckbox.checked) {
        label.classList.add("checked")
    } else {
        label.classList.remove("checked")
    }

    renderOrder()
}

function markIfEmpty() {
    let labels = document.getElementById("orderList").querySelectorAll('label');
    let orderButton=document.getElementById("orderButton")
    if (labels.length==0) {
        orderButton.disabled = true;
    }else{
        orderButton.disabled = false;
    }
}

function renderOrder() {
    //Iegūst sarakstu ar jau esošajiem vienumiem
    let orderDiv = document.getElementById("orderList")
    let labelsInOrderDiv = orderDiv.querySelectorAll('label');


    let curIdsList = [];
    let curValueDict={};
    labelsInOrderDiv.forEach((div) => {
        let divId = div.id;
        curIdsList.push(divId);

        let numberInput = div.querySelector('input[type="number"]');

        if (numberInput) {
            let inputValue = numberInput.value;
            curValueDict[divId]=inputValue;
        } else {
            curValueDict[divId]=1;
        }
    });

    let cattegories= document.querySelectorAll('.cattegory')

    let checkboxDict={}
    cattegories.forEach((c)=>{
        checkboxDict[c.id]=c.querySelectorAll('.itemCheckbox:checked')
    })
    console.log(checkboxDict);

    let nosaukums
    let boxId

    orderDiv.innerHTML=''
    
    for (let c in checkboxDict) {
        let curCheckboxes=checkboxDict[c]

        let counter=0
        curCheckboxes.forEach((box) => {
            nosaukums=box.parentNode.textContent.trim()
            boxId=`orderItem_${box.id}`
                orderDiv.innerHTML+=(`
                <label class="orderItem" id="${boxId}" for="quantity">
                <li>
                ${nosaukums}:
                </li>
                <input class="shadow" type="number" name="quantity" min="1" max="8" value="1">
                </label>`)
            
                counter+=1
        });
        if (counter>0) {
            orderDiv.innerHTML+=`<div class="break"></div>`
        }
    }


    //Ievieto vecās liet. izvēlētās vērtības, kas kkādu html iemeslu dēļ pazūd
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

      markIfEmpty()
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



markIfEmpty()