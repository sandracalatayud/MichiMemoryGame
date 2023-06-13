window.addEventListener('DOMContentLoaded', start);

function start(){

    //Declaración de variables
    let arrNums = [1,2,3,4,5,6]; //Array de número de cartas
    let ordenCartas = arrNums.sort(randomCompare); //Ordenación aleatoria de las cartas
    let cardsContainer = document.querySelector('#cardsContainer'); //Se almacenan las imágenes

    cardsContainer.addEventListener('click', alerta);

    function alerta(event){
        if(event.target.tagName==="IMG"){
            alert("hola");
        }

        console.dir(event.target);
        }






}

function randomCompare() {      //Función para la ordenación aleatoria de las cartas
    return Math.random() - 0.5;
  }