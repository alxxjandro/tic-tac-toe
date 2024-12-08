
function createTile(){
    let value = null;
    const getValue = () => value;
    const setValue = (_value) => value = _value;
    return {value, getValue, setValue};
}

function newPlayer(name, marker){
    let playerName = name;
    let playerMarker = marker;
    let turn = false;

    const tickTile = (t) => t.setValue(playerMarker);
    return {playerName, playerMarker, tickTile, turn};
}

const createBoard = function () {
    const tiles = [];
    for (let i = 0; i < 9; i++){
        tiles.push(createTile());
    }
    return {tiles};
}

const printBoard = function (game){
    console.log(game.tiles[0].getValue(), game.tiles[1].getValue(), game.tiles[2].getValue());
    console.log(game.tiles[3].getValue(), game.tiles[4].getValue(), game.tiles[5].getValue());
    console.log(game.tiles[6].getValue(), game.tiles[7].getValue(), game.tiles[8].getValue());
}

const switchTurns = function (players){
    players.forEach(player =>{
        player.turn = !player.turn;
    })
}

const checkWin = function (game){
    const tiles = game.tiles;

    //check for a row win
    for (let i = 0; i < 9; i += 3) {
        if (tiles[i].getValue() && 
            tiles[i].getValue() === tiles[i + 1].getValue() && 
            tiles[i + 1].getValue() === tiles[i + 2].getValue()) {
            return true;
        }
    }

    //check for a column win
    for (let i = 0; i < 3; i++) {
        if (tiles[i].getValue() && 
            tiles[i].getValue() === tiles[i + 3].getValue() && 
            tiles[i + 3].getValue() === tiles[i + 6].getValue()) {
            return true;
        }
    }

    //diagonal wins
    if (tiles[0].getValue() && 
        tiles[0].getValue() === tiles[4].getValue() && 
        tiles[4].getValue() === tiles[8].getValue()) {
        return true;
    }

    if (tiles[2].getValue() && 
        tiles[2].getValue() === tiles[4].getValue() && 
        tiles[4].getValue() === tiles[6].getValue()) {
        return true;
    }

    return false; 
}

const startGame = function () {
    const game = createBoard();
    const buttons = document.querySelectorAll('.btn');
    const players = [newPlayer("p1", "X"), newPlayer("p2", "O")];
    let amountOfTurns = 0;
    players[0].turn = true;


    game.tiles.forEach(tile => tile.setValue(null));
    buttons.forEach(button => {
        button.textContent = ""; 
    });


    buttons.forEach((button, index) => {
        button.onclick = () => {

            if (game.tiles[index].getValue() != null) {
                alert("Already filled");
            } else {

                const currentPlayer = players.find(players => players.turn);
                console.log(currentPlayer);
                currentPlayer.tickTile(game.tiles[index]);
                button.textContent = currentPlayer.playerMarker; 
                amountOfTurns++;
                switchTurns(players);
                printBoard(game);

                if (amountOfTurns >= 5) {
                    if (amountOfTurns == 9 && !checkWin(game)) {
                        console.log("It's a tie!");
                        resetGame();
                    }
                    if (checkWin(game)) {
                        console.log("Game Over!");
                        resetGame();
                    }
                }
            }
        };
    });
};


const resetGame = function (){
    const resetBtn = document.getElementById("resetBtn");
    resetBtn.classList.remove("hidden");

    resetBtn.addEventListener('click', () =>{
        startGame();
        resetBtn.classList.add("hidden");
    })
}

startGame();