/* JS Requirements
	
-Your game page must have at least two player objects											DONE
-Add a keydown event listener that console logs "blue move" or "red move"						DONE
-Replace that console log with JavaScript that moves the red or blue div a little to the right 	DONE 
-Your game must have a clear win condition														**NOT YET**
-GRADED: Adhere to the AirBnB style guide for writing your JavaScript							**NOT YET**
-GRADED: Comment your code appropriately														**NOT YET**

Bonus:
-Have players do something other than simply pressing a key to move their player, 
	for example, make them type words, or solve simple math problems
-Score each game based on the time it took to complete and by how much time 
	they beat the opposing player
-Display the time it took for the player to complete the race
-Make a 'Best of 3' tournament and display the winner of the tournament
-Keep track of best times/ high scores across page refreshes using localStorage

*/
document.addEventListener('DOMContentLoaded', function() {
  console.log("js is loaded!");

  // Constructor function that creates 2 new player objects
  function Player(name="player1", xPosition=0, yPosition=0, width=100) {
  		this.name = name;
  		this.xPosition = xPosition;
  		this.yPosition = yPosition;
  		this.width = width;
  }

  //function that moves the player 1% to the right when the appropriate key is struck (k/K for player1, s/S for player2)
  Player.prototype = {
  	keystrokeMove: function() {
  		let player = document.getElementById(this.name);

  		//move the player to the right
  		this.xPosition = this.xPosition + 9;
  		player.style.left = (this.xPosition + "px");

  		//moves the player down the mountain
  		this.yPosition = this.yPosition + 4;
  		player.style.top = (this.yPosition + "px"); 
  	}, 
  	
  	checkForWinner: function() {
  		let snowboarderPosition = this.xPosition + this.width;	

  		if (snowboarderPosition < racetrack.offsetWidth) {
  			return;
  		} else {
  			winAnimation(this.name);
  		}
  	}
  }; 

  //setting some global objects and variables
  let player1 = new Player("player1", 0, 0);
  let player2 = new Player("player2", 0, 0);
  let racetrack = document.getElementById('container');

  //function that listens for an event of keypress on the document and then decides which player to move (k/K is player1, s/S is player2)
  document.addEventListener("keypress",keypressListener);

  function keypressListener() {
    if (event.key == "k" || event.key == "K") {	
	  player1.keystrokeMove();
	} else if (event.key == "s" || event.key == "S") {
	  player2.keystrokeMove();
	} else {
	  console.log("you pressed the wrong key");
	  console.log(event);
	  console.log(event.key);
	}
	
	//after every key press, check for a winner
	player1.checkForWinner();
	player2.checkForWinner();
  };

  function winAnimation(name) {
  	console.log(name + " won!");
  };

});


