window.onload = function(){
    //initial state
    var gameState = [0,4,4,4,4,4,4,0,4,4,4,4,4,4];

    var marbles = []; //idk if i need this or not
    
    //marble object functions (or are these pit functions?)

    //walk marbles
        //take all marbles from pit
        //for(#marbles) traverse pits clockwise depositing marbles
            //if last pit is not empty or is store end turn
            //if last pit is empty capture adjacent marbles and end turn
    
    //capture marbles (marbles source, marbles destination)

    
    
    //pit functions?
    //function that returns how many marbles are in the pit
    
    
    //board object
    var Board = {
        board : gameState,
        score : {player1: 0, player2: 0},
        playerTurn : 1,
        p1row : document.getElementById('p1row'),
        p2row : document.getElementById('p2row'),
        p1store : document.getElementById('p1store'),
        p2store : document.getElementById('p2store'),
        initialize : function(){
            console.log("initializing");
            //insert pits and stores into board
            //player 2 store
            let store2 = document.createElement("div");
            store2.setAttribute('class', "player2 pit store");
            store2.setAttribute('id', "store0");
            this.p2store.append(store2);
            //add pit function
            //player 2 row
            for(let i=8; i<14; i++){
                let pit = document.createElement("div");
                pit.setAttribute('class', "player2 pit");
                pit.setAttribute('id', "pit"+i);
                //insert 4 marbles (consider making this a function??)
                for(let j=0; j<4; j++){
                    let marble = document.createElement("div");
                    marble.setAttribute('class', "marble");
                    pit.append(marble);
                    //add marble function
                }
                this.p1row.append(pit);
                //add pit function obj
            }
            //player 1 row
            for(let i=6; i>0; i--){
                let pit = document.createElement("div");
                pit.setAttribute('class', "player1 pit");
                pit.setAttribute('id', "pit"+i);
                //insert 4 marbles
                for(let j=0; j<4; j++){
                    let marble = document.createElement("div");
                    marble.setAttribute('class', "marble");
                    pit.append(marble);
                    //add marble function
                }
                this.p2row.append(pit);
                //add pit function obj
            }
            //player 1 store
            let store1 = document.createElement("div");
            store1.setAttribute('class', "player1 pit store");
            store1.setAttribute('id', "store0");
            this.p1store.append(store1);
            //add pit function
        }
    }

    Board.initialize();

    // Events go here

    
    //pit onclick (hover?) listener
        //call the walk marbles function

    console.log("end");
}