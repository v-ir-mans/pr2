class NavBar extends HTMLElement {
    constructor(){
        super()
        this.innerHTML="Hi mom"
    }
}

customElements.define("navigation-bar", NavBar)