function userChangesInput() {
    console.log("I feel that some great change is coming !")
    let checkboxes = document.querySelectorAll('input:checked')

    let checkListElem = document.getElementById("checkList")

    // Check if the div is found before attempting to replace contents
    if (checkListElem) {
        checkListElem.innerHTML = ""
    }

    let nosaukums
    checkboxes.forEach((box) => {

        nosaukums=box.parentNode.textContent.trim()
        checkListElem.innerHTML += `
        <label for="quantity">${nosaukums}:</label>
        <input type="number" id="quantity" name="quantity" min="1" max="100">
        <br>
        `
        console.log(nosaukums)
    });
}