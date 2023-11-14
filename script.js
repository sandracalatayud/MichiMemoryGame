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
    let arrayImagenes = cardsContainer.querySelectorAll('img');
    let arrCardsGame = [];
    let arrCardsDome = [];
    let reloadButton = document.querySelector('#reload');
    let clock = document.querySelector('#clock');
    let secods = 0;
    let secondsFormat;
    let minutesFormat;
    let minutes = 0;
    let intervaloTemp;
    let arrGameTime = [];       //Array con los tiempos de las partidas
    let nPartida=1;
    let gameList = document.querySelector('#gameList');

    cardsContainer.addEventListener('click', turninImgs);
    pointsContainer.innerHTML = points;

    intervaloTemp = setInterval(function () {
        if (points < 3) {
            secods++
            if (secods == 60) {
                secods = 0;
                minutes++;
            }
            secondsFormat = secods.toLocaleString('en-US', { minimumIntegerDigits: 2 })
            minutesFormat = minutes.toLocaleString('en-US', { minimumIntegerDigits: 2 })
            updateClock();
        }
    }, 1000)

    reloadButton.addEventListener('click', reloadGame);


    function turninImgs(event) {

        if (event.target.tagName === "IMG" && event.target.src.includes('back')) {           //Solo si se trata de imágenes 
            event.target.src = ruteImgs + ordenCartas[event.target.id] + ".jpg";  //muestra la carta que corresponda
            if (arrCardsGame.length < 2) {        //Si hay menos de dos cartas en el array
                arrCardsGame.push(event.target); // Se almacena en el array

            }
            if (arrCardsGame.length == 2) {
                checkImgs(arrCardsGame);
                cardsContainer.style.pointerEvents = 'none';
            }

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
                pointsContainer.innerHTML = points;
                if (points == 3) {
                    arrGameTime.push({nPartida: nPartida, minutes:minutesFormat, secods:secondsFormat});
                    alert('Enhorabuena, has ganado.');
                    nPartida++;

                    let newGame = document.createElement('li');
                    newGame.innerHTML = 'Partida Nº ' + arrGameTime[arrGameTime.length-1].nPartida + '. Tiempo: '+ arrGameTime[arrGameTime.length-1].minutes + ':' + arrGameTime[arrGameTime.length-1].secods;
                    gameList.appendChild(newGame);
                }
            }
            cardsContainer.style.pointerEvents = 'auto';


        }, 500);

    }

    function reloadGame() {
        ordenCartas = arrNums.sort(randomCompare);
        for (let i = 0; i < arrayImagenes.length; i++) {
            arrayImagenes[i].src = './assets/imgs/back.jpg';

        }
        arrCardsGame = [];
        arrCardsDome = [];
        points = 0;
        secods = 0;
        minutes = 0;
        pointsContainer.innerHTML = points;
    }

    function updateClock() {


        clock.innerHTML = minutesFormat + ':' + secondsFormat;

    }

}







function randomCompare() {      //Función para la ordenación aleatoria de las cartas
    return Math.random() - 0.5;
}