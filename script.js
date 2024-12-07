
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

const startGame = function () {
    const game = createBoard();
    console.log(game)
    const players = [newPlayer("p1","X"),newPlayer("p2","O")];
    players[0].turn = true;

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button =>{
        button.addEventListener('click', () =>{
            if (game.tiles[button.textContent].getValue() != null){
                alert("Already filled");
            } else{
                if(players[0].turn){ //if true
                    players[0].tickTile(game.tiles[button.textContent]);
                    switchTurns(players);
                    printBoard(game);
                } else {
                    players[1].tickTile(game.tiles[button.textContent]);
                    switchTurns(players);
                    printBoard(game);
                }
            }
        })
    })  
} ();

