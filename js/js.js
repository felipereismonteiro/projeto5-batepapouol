/*    tags    */
// entrou, todos, reservado

function alerta() {
    const input = document.querySelector("footer input").value;
    console.log(input);
}

function displayShow() {
    const element = document.querySelector(".telaDeTras")
    element.classList.remove("display")
}

function displayHidden() {
    const element = document.querySelector(".telaDeTras")
    element.classList.add("display")
}