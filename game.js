//NMSU CS382 Simple Multiplayer Game Project Mancala
//David Kuntz
//design inspiration taken from HTML5 Checkers on jasonlawrencewong.com/checkers

window.onload = function(){
    //initial state
    // var gameState = [0,4,4,4,4,4,4,0,4,4,4,4,4,4];
    var gameState = [0,1,2,3,4,5,6,7,8,9,10,11,12,13]; //test state

    // var marbles = []; //idk if i need this or not
    var pits = [];
    
    //marble object functions (or are these pit functions?)
    function Pit (element,position,marbs){
        this.element = element;
        this.position = position;
        this.marbs = marbs;
        //walk marbles
        this.walk = function(){
            //take all marbles from pit
            //for (marbs) traverse pits clockwise depositing marbles
            for(let i=1;i<=marbs;i++){
                if(i==marbs){
                    //if last pit is not empty or is store end turn
                    //if last pit is empty capture adjacent marbles and end turn
                    //adjacent pit position = 14 - position 
                };
                //remove a marble element
                this.element.removeChild(element.firstChild);
                //place a marble in the next pit
                //position of the next pit = (position + i) % 14
                let marble = document.createElement("div");
                marble.setAttribute('class', "marble");
                console.log(position+" append marble to "+(position+i)%14);
                pits[(position+i)%14].element.append(marble);
                pits[(position+i)%14].setMarbs(pits[(position+i)%14].marbs+1);
                console.log(pits[(position+i)%14]);
            };
            this.setMarbs(0);
        }
        this.isEmpty = function(){
            if(this.element.hasChildNodes()) return false;
            return true;
        }
        this.getMarbs = function(){
            return this.marbs;
        }
        this.setMarbs = function(newMarbs){
            this.marbs = newMarbs;
        }
    //capture marbles (marbles source, marbles destination)
    }

    
    
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
            // p2marbs = this.board.slice(8,14);
            // p1marbs = this.board.slice(1,7);
            console.log("begin");
            
            //insert pits and stores into board
            //player 2 store
            let store2 = document.createElement("div");
            store2.setAttribute('class', "player2 pit store");
            store2.setAttribute('id', "store0");
            //insert marbles (is this one unnecessary?)
            for(let i=0; i<this.board[0];i++){
                let marble = document.createElement("div");
                marble.setAttribute('class', "marble");
                store2.append(marble);
                //add marble function
            }
            this.p2store.append(store2);
            //add pit function
            pits[0] = new Pit(store2,0,this.board[0]); 
            console.log(pits[0]);

            //player 2 row
            for(let i=13; i>7; i--){
                let pit = document.createElement("div");
                pit.setAttribute('class', "player2 pit");
                pit.setAttribute('id', "pit"+i);
                //insert marbles
                for(let j=0; j<this.board[i];j++){
                    let marble = document.createElement("div");
                    marble.setAttribute('class', "marble");
                    pit.append(marble);
                    //add marble function?
                }
                this.p2row.append(pit);
                
                //add pit function
                pits[i] = new Pit(pit,i,this.board[i]); 
                console.log(pits[i]);
            }

            //player 1 row
            for(let i=1; i<7; i++){
                let pit = document.createElement("div");
                pit.setAttribute('class', "player1 pit");
                pit.setAttribute('id', "pit"+i);
                //insert 4 marbles
                for(let j=0; j<this.board[i]; j++){
                    let marble = document.createElement("div");
                    marble.setAttribute('class', "marble");
                    pit.append(marble);
                    //add marble function
                }
                this.p1row.append(pit);
                
                //add pit function
                pits[i] = new Pit(pit,i,this.board[i]); 
                console.log(pits[i]);
            }
            //player 1 store
            let store1 = document.createElement("div");
            store1.setAttribute('class', "player1 pit store");
            store1.setAttribute('id', "store0");
            //insert marbles
            for(let i=0; i<this.board[7];i++){
                let marble = document.createElement("div");
                marble.setAttribute('class', "marble");
                store1.append(marble);
                //add marble function
            }
            this.p1store.append(store1);
            //add pit function
            pits[7] = new Pit(store1,7,this.board[7]); 
            console.log(pits[7]);

            // let pitone = document.getElementById('pit1');
            // pitone.removeChild(pitone.firstChild);
            // pitone.removeChild(pitone.firstChild);
            // pitone.removeChild(pitone.firstChild);
            // pitone.removeChild(pitone.firstChild);
            // if(!pitone.hasChildNodes()){console.log("empty");};
            // console.log(pits[1].isEmpty());
            pits[1].walk();
            
        },//init
        checkIfAnybodyWon : function(){
            //check if p1row and p2row are empty
            // if()
            return false;
        }
    }

    Board.initialize();

    // Events go here

    //reset game listener

    //pit mouseover listener?
    
    //pit onclick listener
        //call the walk marbles function
        //highlighting pits
        // document.getElementById("store"+0).style.backgroundColor = "lightblue";
        //switch turns
        // document.getElementById("p1row").classList.remove("yourturn");
        // document.getElementById("p2row").classList.add("yourturn");

    console.log("end");
}