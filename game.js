//NMSU CS382 Simple Multiplayer Game Project Mancala
//David Kuntz
//design inspiration taken from HTML5 Checkers on jasonlawrencewong.com/checkers

window.onload = function(){
    //initial state
    var gameState = [0,4,4,4,4,4,4,0,4,4,4,4,4,4];
    // var gameState = [0,1,2,3,4,5,6,7,8,9,10,11,12,13]; //test state

    //objects array
    var pits = [];
    
    //marble object functions (or are these pit functions?)
    function Pit (element,position,marbsInit){
        this.element = element;
        this.position = position;
        this.marbs = marbsInit;
        //walk marbles
        this.walk = function(){
            //take all marbles from pit
            let marbsInHand = this.marbs;
            //for (marbs) traverse pits COUNTER-clockwise depositing marbles
            for(let i=1;i<=marbsInHand;i++){
                //position of the next pit = (position + i) % 14
                let thisPit = pits[(position+i)%14];
                //last pit
                if(i==marbsInHand){
                    console.log("last one "+thisPit.getID());

                    //if last pit lands on other side end turn
                    console.log("side "+thisPit.element.parentElement.getAttribute('id'));
                    if(thisPit.element.parentElement.className != "yourturn"){
                        Board.endTurn();
                    }else{
                        //if last pit is the store keep going
                        if(thisPit.getID() == Board.captureTarget){
                            console.log("Free turn!");
                        }else{
                            //if last pit is empty and not store capture adjacent marbles and end turn
                            if(thisPit.isEmpty()){
                                //adjacent pit position = 14 - position 
                                console.log("dude idk");
                                Board.endTurn();
                            };
                            //if last pit is not empty and not store keep going

                        }
                        //your side not store land
                    }
                };
                //skip opponent store
                console.log("next "+(position+i)%14);
                console.log(Board.skipTarget);
                if(thisPit.getID() === Board.skipTarget){
                    console.log("skip "+Board.skipTarget);
                    marbsInHand++;
                }else{
                    //remove a marble element
                    this.element.removeChild(element.firstChild);
                    this.marbs -= 1;
                    //place a marble in the next pit
                    addMarbles(thisPit.element,1);
                    thisPit.setMarbs(thisPit.getMarbs()+1);
                    console.log(thisPit);
                }
            };
            console.log("marbs "+marbsInit);
            console.log("old marbs "+marbsInHand);
            console.log("this marbs "+this.marbs);
        }
        this.isEmpty = function(){
            if(this.element.hasChildNodes()) return false;
            return true;
        }
        this.getID = function(){
            return this.element.getAttribute('id');
        }
        this.getMarbs = function(){
            return this.marbs;
        }
        this.setMarbs = function(newMarbs){
            this.marbs = newMarbs;
        }
        //capture marbles (marbles source, marbles destination)
        this.captureMarbs = function(src,dest){
            //TODO
        }
    }//pit

    //add n marbles to element function
    function addMarbles(element, n){
        this.element = element;
        this.n = n;
        for(let i=0;i<n;i++){
            let marble = document.createElement("div");
            marble.setAttribute('class', "marble");
            element.append(marble);
        }
    }
    
    
    //board object
    var Board = {
        board : gameState,
        score : {player1: 0, player2: 0},
        playerTurn : 1,
        captureTarget : 7,
        skipTarget : 0,
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
            store2.setAttribute('id', 0);
            //insert marbles (is this one unnecessary?)
            addMarbles(store2, this.board[0]);
            this.p2store.append(store2);
            //add pit function
            pits[0] = new Pit(store2,0,this.board[0]); 
            console.log(pits[0]);

            //player 2 row
            for(let i=13; i>7; i--){
                let pit = document.createElement("div");
                pit.setAttribute('class', "player2 pit");
                pit.setAttribute('id', i);
                addMarbles(pit, this.board[i]);
                this.p2row.append(pit);
                //add pit function
                pits[i] = new Pit(pit,i,this.board[i]); 
                console.log(pits[i]);
            }

            //player 1 row
            for(let i=1; i<7; i++){
                let pit = document.createElement("div");
                pit.setAttribute('class', "player1 pit");
                pit.setAttribute('id', i);
                addMarbles(pit, this.board[i]);
                this.p1row.append(pit);
                
                //add pit function
                pits[i] = new Pit(pit,i,this.board[i]); 
                console.log(pits[i]);
            }
            //player 1 store
            let store1 = document.createElement("div");
            store1.setAttribute('class', "player1 pit store");
            store1.setAttribute('id', 7);
            //insert marbles?
            addMarbles(store1, this.board[7]);
            this.p1store.append(store1);
            //add pit function
            pits[7] = new Pit(store1,7,this.board[7]); 
            console.log(pits[7]);

            /****************** LIVE TEST AREA ******************/
            // let pitone = document.getElementById('pit1');
            // if(!pitone.hasChildNodes()){console.log("empty");};
            console.log(this.playerTurn);
            console.log(this.captureTarget);
            console.log(this.skipTarget);
            
            //highlighting pits
            // document.getElementById("store"+0).style.backgroundColor = "lightblue";
            //switch turns
            // document.getElementById("p1row").classList.toggle("yourturn");

        },//init
        checkIfAnybodyWon : function(){
            //check if p1row and p2row are empty
            // if()
            return false;
        },
        //functions to determine which store to capture marbles to
        //and which to skip, depending on player turn
        // skipTarget : function(){
        //     return this.playerTurn==1 ? 0: 7;
        // },
        // captureTarget : function(){
        //     return this.playerTurn==1 ? 7: 0;
        // },
        yourSide : function(){
            return this.playerTurn==1 ? this.p1row: this.p2row;
        },
        endTurn : function(){
            if(this.playerTurn == 1){
                this.playerTurn = 2;
                this.captureTarget = 0;
                this.skipTarget = 7;
            }else{
                this.playerTurn = 1;
                this.captureTarget = 7;
                this.skipTarget = 0;
            }
            // this.playerTurn == 1 ? this.playerTurn = 2: this.playerTurn = 1;
            this.p1row.classList.toggle("yourturn");
            this.p2row.classList.toggle("yourturn");

            setWalkListener();
        },
        clear : function(){
            location.reload();
        }
    }

    Board.initialize();
    setWalkListener();

    // Events go here

    //reset game listener

    //pit mouseover listener?
    
    //pit onclick listener
    function setWalkListener(target){
        document.querySelectorAll('.yourturn>.pit').forEach(e =>{
            //make it possible to set listener to specific pit?
            e.addEventListener('click',(e) =>{
                pitNum = e.target.getAttribute("id");
                if(pitNum !== undefined && pits[pitNum] !== undefined && !pits[pitNum].isEmpty()){
                    pits[pitNum].walk();
                }
            });
        });
    }
        //call the walk marbles function

    console.log("end");
}