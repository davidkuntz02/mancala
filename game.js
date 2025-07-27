//NMSU CS382 Simple Multiplayer Game Project Mancala
//David Kuntz
//design inspiration taken from HTML5 Checkers on jasonlawrencewong.com/checkers

window.onload = function () {

    //initial state
    var gameState = [0, 4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4];
    var testState = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    var twoState = [0,2,2,2,2,2,2,0,2,2,2,2,2,2];
    var threeState = [0,3,3,3,3,3,3,0,3,3,3,3,3,3];
    

    //objects array
    var pits = [];

    //pit functions?
    function Pit(element, position, marbsInit) {
        this.element = element;
        this.position = position;
        this.marbs = marbsInit;
        //walk marbles is where the magic happens
        this.walk = function () {
            //take all marbles from pit
            let marbsInHand = this.marbs;
            //for (marbs) traverse pits COUNTER-clockwise depositing marbles
            for (let i = 1; i <= marbsInHand; i++) {
                //position of the next pit = (position + i) % 14
                let thisPit = pits[(position + i) % 14];
                //last pit
                if (i == marbsInHand) {
                    //if last pit lands on other side (and not your store) end turn
                    if (thisPit.getID() != Board.captureTarget
                        && !thisPit.element.parentNode.classList.contains('yourturn')) {
                        console.log("Marble landed on other side. End turn.")
                        Board.endTurn();
                    } else {
                        //if last pit is the store keep going
                        if (thisPit.getID() == Board.captureTarget) {
                            console.log("Marble landed in your store. Free turn!");
                        } else {
                            //if last pit is empty and not store capture adjacent marbles and end turn
                            if (thisPit.isEmpty()) {
                                console.log("Capture adjacent marbles.");
                                //adjacent pit position = 14 - position 
                                let adjacentPit = pits[14 - thisPit.position];
                                //place a marble before you capture the marble, silly!!!!!!!
                                addMarbles(thisPit.element, 1);
                                thisPit.setMarbs(thisPit.getMarbs() + 1);
                                //remove a marble element from home pit
                                this.element.removeChild(element.firstChild);
                                this.marbs -= 1;
                                thisPit.captureMarbs(pits[Board.captureTarget]);
                                adjacentPit.captureMarbs(pits[Board.captureTarget]);
                                Board.endTurn();
                                continue;
                            } else {
                                Board.endTurn();
                            };
                            // //seed on variant implementation (decided not to do this)
                            // //if last pit is not empty and not store keep going from that pit
                            // console.log("Keep going");
                            // // thisPit.element.style.boxShadow = "0 0 5px 5px limegreen";
                            // //make sure you move the marbles properly before calling walk() again
                            // console.log("next " + (position + i) % 14);
                            // console.log(Board.skipTarget);
                            // await sleep(500);
                            // if (thisPit.getID() === Board.skipTarget) {
                            //     console.log("skip " + Board.skipTarget);
                            //     marbsInHand++;
                            // } else {
                            //     //remove a marble element
                            //     this.element.removeChild(element.firstChild);
                            //     this.marbs -= 1;
                            //     //place a marble in the next pit
                            //     addMarbles(thisPit.element, 1);
                            //     thisPit.setMarbs(thisPit.getMarbs() + 1);
                            //     console.log(thisPit);
                            // }
                            // thisPit.walk();
                            // //don't move marbles twice
                            // break;
                        }
                    }
                };
                //skip opponent store
                if (thisPit.getID() === Board.skipTarget) {
                    marbsInHand++;
                } else {
                    //remove a marble element
                    this.element.removeChild(element.firstChild);
                    this.marbs -= 1;
                    //place a marble in the next pit
                    addMarbles(thisPit.element, 1);
                    thisPit.setMarbs(thisPit.getMarbs() + 1);
                }
                //update score
                if (thisPit.getID() == Board.captureTarget) {
                    console.log("Marble captured.");
                    Board.updateScore();
                }
            }; //loop
        }
        this.isEmpty = function () {
            if (this.element.hasChildNodes()) return false;
            return true;
        }
        this.getID = function () {
            return this.element.getAttribute('id');
        }
        this.getMarbs = function () {
            return this.marbs;
        }
        this.setMarbs = function (newMarbs) {
            this.marbs = newMarbs;
        }
        //capture marbles (marbles dest should be pits[captureTarget]
        //-but it doesn't have to be)
        this.captureMarbs = function (dest) {
            //take all marbles from pit
            let marbsInHand = this.marbs;
            for (let i = 1; i <= marbsInHand; i++) {
                //remove a marble element
                this.element.removeChild(element.firstChild);
                this.marbs -= 1;
                //place a marble in the next pit
                addMarbles(dest.element, 1);
                dest.setMarbs(dest.getMarbs() + 1);
                //update score
                if (dest.getID() == Board.captureTarget) {
                    Board.updateScore();
                }
            }
        }
    }//pit

    //add n marbles to element function
    function addMarbles(element, n) {
        this.element = element;
        this.n = n;
        for (let i = 0; i < n; i++) {
            let marble = document.createElement("div");
            marble.setAttribute('class', "marble");
            element.append(marble);
        }
    }


    //board object
    var Board = {
        board: threeState,
        score: { player1: 0, player2: 0 },
        playerTurn: 1,
        captureTarget: 7,
        skipTarget: 0,
        p1row: document.getElementById('p1row'),
        p2row: document.getElementById('p2row'),
        p1store: document.getElementById('p1store'),
        p2store: document.getElementById('p2store'),
        p1score: document.getElementById('p1score'),
        p2score: document.getElementById('p2score'),
        initialize: function () {
            console.log("initializing");
            //insert pits and stores into board
            //player 2 store
            let store2 = document.createElement("div");
            store2.setAttribute('class', "player2 pit store");
            store2.setAttribute('id', 0);
            //insert marbles (is this one unnecessary?)
            addMarbles(store2, this.board[0]);
            this.p2store.append(store2);
            //add pit function
            pits[0] = new Pit(store2, 0, this.board[0]);
            console.log(pits[0]);

            //player 2 row
            for (let i = 13; i > 7; i--) {
                let pit = document.createElement("div");
                pit.setAttribute('class', "player2 pit");
                pit.setAttribute('id', i);
                addMarbles(pit, this.board[i]);
                this.p2row.append(pit);
                //add pit function
                pits[i] = new Pit(pit, i, this.board[i]);
                console.log(pits[i]);
            }

            //player 1 row
            for (let i = 1; i < 7; i++) {
                let pit = document.createElement("div");
                pit.setAttribute('class', "player1 pit");
                pit.setAttribute('id', i);
                addMarbles(pit, this.board[i]);
                this.p1row.append(pit);

                //add pit function
                pits[i] = new Pit(pit, i, this.board[i]);
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
            pits[7] = new Pit(store1, 7, this.board[7]);
            console.log(pits[7]);

            //initialize scores
            this.p1score.innerText = this.score.player1;
            this.p2score.innerText = this.score.player2;
            setWalkListener();

            /****************** LIVE TEST AREA ******************/
            // let pitone = document.getElementById('pit1');
            // if(!pitone.hasChildNodes()){console.log("empty");};

            // pits[6].captureMarbs(pits[this.captureTarget]);

            //highlighting pits
            // document.getElementById("store"+0).style.backgroundColor = "lightblue";
            //switch turns
            // document.getElementById("p1row").classList.toggle("yourturn");

        },
        checkIfAnybodyWon: function () {
            let side1IsEmpty = true;
            let side2IsEmpty = true;
            let side1 = pits.slice(1, 7);
            let side2 = pits.slice(8, 14);
            //check if side1 or side2 are empty
            for (let i = 0; i < 6; i++) {
                if (!side1[i].isEmpty()) side1IsEmpty = false;
                if (!side2[i].isEmpty()) side2IsEmpty = false;
            }
            if (side1IsEmpty || side2IsEmpty) {
                //somebody won
                window.alert("Win!");
                console.log("Win!");
                Board.endTurn();
                this.p1row.classList.remove("yourturn");
                this.p2row.classList.remove("yourturn");
                console.log('Capture all the marbs');
                if (!side1IsEmpty) {
                    for (let i = 1; i < 7; i++) {
                        pits[i].captureMarbs(pits[7]);
                    }
                } else if (!side2IsEmpty) {
                    for (let i = 8; i < 14; i++) {
                        pits[i].captureMarbs(pits[0]);
                    }
                }
                //find out who won
                //TODO: Come up with a better way to display result than window.alert()
                if (this.score.player1 > this.score.player2) {
                    window.alert("Player 1 Won!");
                } else if (this.score.player1 == this.score.player2) {
                    window.alert("It's a tie!");
                } else {
                    window.alert("Player 2 Won!");
                }
                return true;
            }
            return false;
        },
        yourSide: function () {
            return this.playerTurn == 1 ? this.p1row : this.p2row;
        },
        endTurn: function () {
            if (this.playerTurn == 1) {
                this.playerTurn = 2;
                this.captureTarget = 0;
                this.skipTarget = 7;
            } else {
                this.playerTurn = 1;
                this.captureTarget = 7;
                this.skipTarget = 0;
            }
            this.p1row.classList.toggle("yourturn");
            this.p2row.classList.toggle("yourturn");
        },
        //increases current player score by 1 when called
        updateScore: function () {
            this.playerTurn == 1 ? this.score.player1 += 1 : this.score.player2 += 1;
            this.p1score.innerText = this.score.player1;
            this.p2score.innerText = this.score.player2;
        },
        clear: function () {
            location.reload();
        }
    }

    Board.initialize();

    // Events go here

    //reset game listener
    document.getElementById('reset').addEventListener('click', () => {
        Board.clear();
    })

    //pit onclick listener
    function setWalkListener() {
        document.querySelectorAll('.column>.pit').forEach(e => {
            e.addEventListener('click', (e) => {
                if (e.target.parentNode.classList.contains('yourturn')) {
                    pitNum = e.target.getAttribute("id");
                    if (pitNum !== undefined
                        && pits[pitNum] !== undefined
                        && !pits[pitNum].isEmpty()) {
                        //call the walk marbles function if target pit has marbs
                        pits[pitNum].walk();
                    }
                    Board.checkIfAnybodyWon();
                } else {
                    console.log("Not your turn.");
                }
            });
            //js dynamic styling 
            //pit mouseover listener
            //TODO ideas
            // - menu options for adjusting how pit highlighting works
            e.addEventListener('mouseover', (e) => {
                if (!e.target.classList.contains('marble')) {
                    //highlight pit
                    if (e.target.parentNode.classList.contains('yourturn')) {
                        e.target.style.boxShadow = "0 0 5px 5px lawngreen"; //blueviolet
                        //highlight pits based on how many marbles you can drop
                        //get number of marbles in e
                        if(e.target.children.length != 0){
                            //marbs + target id
                            let eid = Number(e.target.getAttribute("id"));
                            let emarbs = e.target.childElementCount + eid;
                            for(let i=eid+1; i<=emarbs; i++){
                                //set box shadow on pits
                                let id = i%14;
                                document.getElementById(id).style.boxShadow = "0 0 5px 5px mediumaquamarine";
                                // TODO: check if last pit is empty
                                // if(i==emarbs){
                                //     if()
                                // }
                            }
                        }
                    }

                }
            });
            //pit mouseout listener
            e.addEventListener('mouseout', (e) => {
                //remove shadow from all pits
                for(let i=0; i<14; i++){
                    document.getElementById(i).style.boxShadow = "3px 3px 6px #222 inset";
                }
                // if (!e.target.classList.contains('marble')) {
                //     e.target.style.boxShadow = "3px 3px 6px #222 inset";
                // }
            });
        });
    }

    //win button
    document.getElementById('win').addEventListener('click', () => {
        for (let i = 1; i < 7; i++) {
            pits[i].captureMarbs(pits[Board.captureTarget]);
        }
        Board.checkIfAnybodyWon();
    })
}