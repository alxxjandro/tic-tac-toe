
function createTile(){
    let value = null;
    const getValue = () => value;
    const setValue = (_value) => value = _value;
    return {value, getValue, setValue};
}

function newPlayer(name, marker){
    let playerName = name;
    let playerMarker = marker;

    const tickTile = (t) => t.setValue(playerMarker);
    return {playerName, playerMarker, tickTile};
}

const gameBoard = function () {

    const playerA = newPlayer("A","X");
    const playerB = newPlayer("B","O")

    //create a gameboard with 9 empty tiles;
    const tiles = [];
    for (let i = 0; i < 9; i++){
        tiles.push(createTile());
    }

    playerA.tickTile(tiles[0]);
    playerB.tickTile(tiles[1]);
    
    for (let i = 0; i < 9; i++){
        console.log(tiles[i].getValue());
    }

} ();



