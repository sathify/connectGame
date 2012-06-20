//Game class-can be used for Tic Tac Toe/Connect four, etc.

function Game(val) {
  //private game state variables	
	//no one can change it.	
	var board = new Array(val), 
		  dim = val
		  current = 1,
		  playerOne = 'X',
		  playerTwo = 'O';
		  
	//create the board for Tic Tac Toe or Connect Four	  
	for (var i = 0; i < val; i++) {
		board[i] = new Array(val);
		for (var j = 0; j < val; j++) {
			board[i][j] = '-';
		}
	}
	
	//privileged methods to access private state
	this.currentPlayer =  function () {
		return current;
	};
	
	this.switchPlayer = function() {
        if (current === 1) {
           current = 2;
        } else {
           current = 1;
        }
	};
	
	this.player1 = function () { 
		return playerOne;
	};
	
	this.player2 = function () { 
		return playerTwo;
	};
	
	this.getboard = function () {
		return board;
	};

	this.getdimension = function () {
		return dim;
	};
}

Game.prototype.printBoard = function(over) {
	console.log('BOARD');
	var board = this.getboard(),
			dim = this.getdimension();;
	for (var i = 0; i < dim; i++) {
	 	var line='';
		for (var j = 0; j < dim; j++) {
			var item = ((j+1) === dim) ? board[i][j] +'|' : board[i][j];
			line+= '|'+item;
		}
		console.log(line);
	}
	var p = (over) ? 'GAMEOVER? True' : 'GAMEOVER? False';
	console.log(p);

};

Game.prototype.checkWinner = function(){
		//checkWinner- win depends on the game
		var item ='', dim = this.getdimension(),
			win = (dim === 6) ? dim-3 : dim-1, 
			board = this.getboard(),
			count=0;
			
		for (var i = 0; i < dim; i++) {
			count =0;
			item ='';
            for (var no = 0; no < dim; no++) {
                if (board[i][no] === '-') {
                	count = 0;
                	item='';
                    continue;
                }
                if (item === board[i][no]) {
                 	count++;
                 } else if (item !== board[i][no]) {
                    count =0;
                    item = board[i][no];
                } 
                if (count === win) {
                    return true;
                }
            }
        }

        for (var j = 0; j < dim; j++) {
        	count =0;
        	item ='';
            for (var w = 0; w < dim; w++) {
                if (board[w][j] === '-') {
                    count = 0;
                    item='';
                    continue;
                }
               if (item === board[w][j]) {
                 	count++;
                 } else if (item !== board[w][j]) {
                    count =0;
                    item = board[w][j];
                } 
                if (count === win) {
                    return true;
                }
            }
        }
        
        if(win ==2 ){
        	//check diagonals for tictac toe
        	var curr = board[0][0];
        	if( board[1][1] == curr && board[2][2] == curr && curr!=='-'){
        		return true;
        	}
			var curr = board[0][2];
        	if( board[2][0] == curr && board[1][1] == curr && curr!=='-'){
        		return true;
			}	
        }
        //connect four.
        if(win == 3) {
        	var curr = board[2][0];
        	if( board[3][1] == curr && board[4][2] == curr && board[5][3] == curr && curr!=='-'){
        		return true;
        	}
        	var curr = board[3][5];
        	if( board[2][4] == curr && board[1][3] == curr && board[0][2] == curr && curr!=='-'){
        		return true;
        	}
        	var curr = board[0][0];
        	if( board[1][1] == curr && board[2][2] == curr && board[3][3] == curr && curr!=='-'){
        		return true;
        	}
        	var curr = board[5][5];
        	if( board[4][4] == curr && board[3][3] == curr && board[2][2] == curr && curr!=='-'){
        		return true;
        	}
        	var curr = board[1][1];
        	if( board[2][2] == curr && board[3][3] == curr && board[4][4] == curr && curr!=='-'){
        		return true;
        	}	
        	var curr = board[3][0];
        	if( board[2][1] == curr && board[1][2] == curr && board[0][3] == curr && curr!=='-'){
        		return true;
        	}
        	var curr = board[5][2];
        	if( board[4][3] == curr && board[3][4] == curr && board[2][5] == curr && curr!=='-'){
        		return true;
        	}
        	var curr = board[0][5];
        	if( board[1][4] == curr && board[2][3] == curr && board[3][2] == curr && curr!=='-'){
        		return true;
        	}
        	var curr = board[5][0];
        	if( board[4][1] == curr && board[3][2] == curr && board[2][3] == curr && curr!=='-'){
        		return true;
        	}
        	var curr = board[1][4];
        	if( board[2][3] == curr && board[3][2] == curr && board[4][1] == curr && curr!=='-'){
        		return true;
        	}	    	
        }
        return false;       
};



//Play Class-simple AI to play game 
function Play(val) {
	this.gameA = new Game(val);
}

Play.prototype.play = function(){
	 var game= this.gameA,
	 	 player = game.currentPlayer(), 
		 board = game.getboard(),
		 dim = game.getdimension(),
		 arr = [];
		 
	 for (var i = 0; i < dim; i++) {
		for (var j = 0; j < dim; j++) {
			if(board[i][j] === '-'){
				arr.push([i, j]);
			}
		}
	}
	
	if(arr.length === 0) {
		return 'DRAW';
	}
	var item = Math.floor((Math.random()*arr.length)),
			l= arr[item][0],
			m = arr[item][1],
			marker =  (player === 1) ? 'X' : 'o',
			gover;
		
	board[l][m] = marker;
	gover = game.checkWinner();
	game.printBoard(gover);
	game.switchPlayer();
	
	return gover;
};

Play.prototype.startGame = function (){
		var playing = true;
		while (playing) {
			var result = this.play();
			if( result === 'DRAW'){
				console.log('THE GAME ENDED IN A DRAW');
				playing = false;
			} else if(result) {
				playing = false;
			}
		}
};

function simulateBothGames() {
	console.log('TIC TAC TOE');
	var g = new Play(3);
	g.startGame();
	
	//console.log("");
	console.log('CONNECT FOUR');
	var ga = new Play(6);
	ga.startGame();
}

simulateBothGames();