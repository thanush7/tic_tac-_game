const boxs = document.querySelectorAll('.box');
const statues = document.querySelector('#statues');
const btnrest = document.querySelector('#restart');
let x = "<img src='cross.jpg'>";
let o = "<img src='circle.jpg'>";


const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentplayer = x;
let player = 'X';
let running = false;
init();

function init() {
    boxs.forEach(box => box.addEventListener('click', boxclick));
    btnrest.addEventListener('click', restart);
    statues.textContent = `${player} your turn`;
    running = true;

}

function boxclick() {
    const index = this.dataset.index;
    if (options[index] != "" || !running) {
        return;
    }
    updatebox(this, index);
    checkwinner();

}

function updatebox(box, index) {
    options[index] = player;
    box.innerHTML = currentplayer;
    changeplayer();
}

function checkwinner() {
    let iswin = false;
    for (let i = 0; i < win.length; i++) {
        const condition = win[i];
        const box1 = options[condition[0]];
        const box2 = options[condition[1]];
        const box3 = options[condition[2]];
        if (box1 == "" || box2 == "" || box3 == "") {
            continue;
        }
        if (box1 == box2 && box2 == box3) {
            iswin = true;
            boxs[condition[0]].classList.add('win');
            boxs[condition[1]].classList.add('win');
            boxs[condition[2]].classList.add('win');
        }

    }
    if (iswin) {
        player = (player == 'X') ? "O" : "X";
        statues.textContent = `${player} won `;
        running = false;
    } else if (!options.includes("")) {
        statues.textContent = "Game over";
        running = false;
    }

}

function changeplayer() {
    player = (player == 'X') ? "O" : "X";
    currentplayer = (currentplayer == x) ? o : x;
    statues.textContent = `${player} your turn`;
}

function restart() {
    options = ["", "", "", "", "", "", "", "", ""];
    currentplayer = x;
    player = "X";
    running = true;
    statues.textContent = `${player} your turn`;
    boxs.forEach(box => {
        box.innerHTML = "";
        box.classList.remove('win');
    })
}