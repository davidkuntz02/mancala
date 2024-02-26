window.onload = function(){
    //initial board
    var boardInit = [0,4,4,4,4,4,4,0,4,4,4,4,4,4];

    var marbles = []; //idk if i need this or not
    
    //marble object functions
    //take marbles from pit and deposit marbles
    //if last pit is not empty or is store end turn
    //if last pit is empty capture adjacent marbles and end turn
    
    //pit object array?
    
    
    //board object
    var Board = {
        board : boardInit,
        score : {player1: 0, player2: 0},
        playerTurn : 1
    }
}