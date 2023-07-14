window.addEventListener('DOMContentLoaded', start);

function start() {

    //Declaración de variables
    let arrNums = [1, 2, 3, 1, 2, 3]; //Array de número de cartas
    let ordenCartas = arrNums.sort(randomCompare); //Ordenación aleatoria de las cartas
    let cardsContainer = document.querySelector('#cardsContainer'); //Se almacenan las imágenes
    let points = 0;
    let pointsContainer = document.querySelector('#points');
    let ruteImgs = "./assets/imgs/michi";
    let ruteImgBack = './assets/imgs/back.jpg';
    let arrCardsGame = [];
    let arrCardsDome = [];

    cardsContainer.addEventListener('click', turninImgs);
    pointsContainer.innerHTML=points;

    function turninImgs(event) {

        if (event.target.tagName === "IMG") {           //Solo si se trata de imágenes
            event.target.src = ruteImgs + ordenCartas[event.target.id] + ".jpg";  //muestra la carta que corresponda
            if (arrCardsGame.length < 2) {        //Si hay menos de dos cartas en el array
                arrCardsGame.push(event.target); // Se almacena en el array

            }
            if (arrCardsGame.length == 2) {
                checkImgs(arrCardsGame);
                cardsContainer.style.pointerEvents='none';
            }

            console.log(arrCardsGame)
        }
    }

    function checkImgs(arrayImgs) {
        setTimeout(() => {
            if (arrayImgs[0].src != arrayImgs[1].src) { //Si son distintas
                arrCardsGame[0].src = ruteImgBack;
                arrCardsGame[1].src = ruteImgBack;
                arrCardsGame = []; // Se vacía el array
            }
            else {
                arrCardsDome.push(arrCardsGame[0]);
                arrCardsDome.push(arrCardsGame[1]);
                arrCardsGame = []; // Se vacía el array
                points++;
                pointsContainer.innerHTML=points;
                if(points==3){
                    alert('Enhorabuena, has ganado.');
                }
            }
            cardsContainer.style.pointerEvents='auto';
            

        }, 2000);

    }

}







function randomCompare() {      //Función para la ordenación aleatoria de las cartas
    return Math.random() - 0.5;
}