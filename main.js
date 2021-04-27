const ths = document.querySelectorAll('.th');
const msg = document.querySelector('.turn');
const gameReset = document.querySelector('#reset-btn');
const gameNext = document.querySelector('#next-btn');
let player1Score = document.querySelector('.score1');
let player2Score = document.querySelector('.score2');
let player = 1;
let lastGameFirstMove = 1;
let box_array = [];
for (let i = 0; i < 9; i++) {
    box_array.push('');
}
let flag = true;
let score1 = 0;
let score2 = 0;

player1Score.textContent = `Player 1 : ${score1}`;
player2Score.textContent = `Player 2 : ${score2}`;

ths.forEach(function (th) {
    th.addEventListener('click', (e) => {
        if (th.textContent === '' && flag) {
            const btn = e.currentTarget.classList;
            let turn = player % 2 === 1 ? 'X' : 'O';
            let new_move = update_table(btn,th,turn);
            won(new_move,turn);
            player++;
        }
    })
})

gameReset.addEventListener('click', (e) => {
    player = 1; 
    for (let i = 0; i < 9; i++) {
        box_array[i] = '';
    }
    clear_box('reset');
})

gameNext.addEventListener('click', (e) => {
    if (!flag) {
        for (let i = 0; i < 9; i++) {
            box_array[i] = '';
        }
        clear_box('next');
    }
})

function update_table(btn,th,turn) {
    let new_move;
    for (let i = 1; i < 10; i++) {
        if (btn.contains(`${i}`)) {
            th.textContent = turn;
            new_move = i-1;
        }
    }    
    let player_turn = turn === 'X' ? 2 : 1;
    msg.textContent = `Player ${player_turn} turn!`;
    return new_move;
}

function clear_box(btn_clicked) {
    ths.forEach(function (th) {
        for (let i = 0; i < 9; i++) {
            th.textContent = "";
        }
    })
    flag = true;
    if (btn_clicked === "reset") {
        score1 = 0;
        score2 = 0;
    } else {
        lastGameFirstMove = lastGameFirstMove === 1 ? 2 : 1;
    }
    player1Score.textContent = `Player 1 : ${score1}`;
    player2Score.textContent = `Player 2 : ${score2}`;
    msg.textContent = `Player ${lastGameFirstMove} turn!`;
}

function won(new_move,turn) {
    box_array[new_move] = turn;
    if(box_array[0] !== '' && box_array[0] === box_array[3] && box_array[3] === box_array[6]){
        flag = false;
    } else if (box_array[1] !== '' && box_array[1] === box_array[4] && box_array[4] === box_array[7]) {
        flag = false;
    } else if (box_array[2] !== '' && box_array[2] === box_array[5] && box_array[5] === box_array[8]) {
        flag = false;
    } else if (box_array[0] !== '' && box_array[0] === box_array[1] && box_array[1] === box_array[2]) {
        flag = false;
    } else if (box_array[3] !== '' && box_array[3] === box_array[4] && box_array[4] === box_array[5]) {
        flag = false;
    } else if (box_array[6] !== '' && box_array[6] === box_array[7] && box_array[7] === box_array[8]) {
        flag = false;
    } else if (box_array[0] !== '' && box_array[0] === box_array[4] && box_array[4] === box_array[8]) {
        flag = false;
    } else if (box_array[2] !== '' && box_array[2] === box_array[4] && box_array[4] === box_array[6]) {
        flag = false;
    }
    if (!flag) {
        let player_turn = turn === 'X' ? 1 : 2;
        player_turn === 1 ? score1++ : score2++;
        player1Score.textContent = `Player 1 : ${score1}`;
        player2Score.textContent = `Player 2 : ${score2}`;
        msg.textContent = `Player ${player_turn} WIN!`;
    } else {
        let count = 0;
        for (let i = 0; i < 9; i++) {
            if (box_array[i] !== '') {
                count++;
            }
        }
        if (count === 9) {
            flag = false;
            msg.textContent = `It's a DRAW!`;
        }
    }
    console.log(box_array);
}