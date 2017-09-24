/* TODO: JS Requirements
	
-Your game page must have at least two player objects																						DONE
-Add a keydown event listener that console logs "blue move" or "red move"												DONE
-Replace that console log with JavaScript that moves the red or blue div a little to the right 	DONE 
-Your game must have a clear win condition																											DONE
-GRADED: Adhere to the AirBnB style guide for writing your JavaScript														**NOT YET**
-GRADED: Comment your code appropriately																												DONE

Bonus:
-Score each game based on the time it took to complete and by how much time 
	they beat the opposing player
-Display the time it took for the player to complete the race
-Make a 'Best of 3' tournament and display the winner of the tournament
-Keep track of best times/ high scores across page refreshes using localStorage
-Have players do something other than simply pressing a key to move their player, 
	for example, make them type words, or solve simple math problems
*/

document.addEventListener('DOMContentLoaded', function() {
  console.log("js is loaded!");

  // Constructor function creates 2 new player objects
  function Player(name="player-1", xPosition=0, yPosition=0, width=100) {
  		this.name = name;
  		this.xPosition = xPosition;
  		this.yPosition = yPosition;
  		this.width = width;
  		this.element = document.getElementById(name);
  }

  // prototype methods for the Player object: rideDown(), checkForWinner(), winAnimation()
  Player.prototype = {

    // makes a player "ride" right and down the mountain, then checks for a winner
  	rideDown: function() {

  		//move the player to the right
  		this.xPosition = this.xPosition + 9;
  		this.element.style.left = (this.xPosition + "px");

  		//moves the player down the mountain
  		this.yPosition = this.yPosition + 3;
  		this.element.style.top = (this.yPosition + "px");

  		this.checkForWinner(); 
  	}, 
  	
  	// checks to see if a snowboarder touched the right edge of the viewing screen
  	checkForWinner: function() {
  		let snowboarderPosition = this.xPosition + this.width;	

  		if (snowboarderPosition >= racetrack.offsetWidth) {
  			this.winAnimation();
  		} 
  	}, 

  	// when a snowboarder wins, they do a flip and there is a notification at the top letting everyone know who won. event listeners are turned off
  	winAnimation: function() {
  		this.element.classList.add("flip");
      let winnerAlert = document.getElementById("player-who-won"); 
      winnerAlert.innerHTML = this.name + " won!";

  		//turn off all the event listeners
  		document.removeEventListener("keypress",keypressListener);
  		player1Button.removeEventListener("touchstart", touchstartListener);
  		player2Button.removeEventListener("touchstart", touchstartListener);
  	}
  }; 

  // turns on event listeners for the "s/S" key (player1) and the "k/K" key (player2)
  function keypressListener() {
    if (event.key == "s" || event.key == "S") {	
	  	player1.rideDown();
		} else if (event.key == "k" || event.key == "K") {
	  	player2.rideDown();
		} else {
		  console.log("you pressed the wrong key");
		  console.log(event);
		  console.log(event.key);
		}
  };

  // turns on event listeners if a user clicks on the instructions on the left (player1) or the instructions on the right (player2)
  function touchstartListener() {

  		if (this.id === "instructions-player-1") {
  			player1.rideDown();
  		} else if (this.id === "instructions-player-2") {
  			player2.rideDown();
  		}; 
  };

  // adjusts the elements on the screen to make them more mobile-friendly
  function checkScreenSize() {
  	if (screen.width < 1025) {
  		player1Button.innerHTML = "Player 1: <br /> Press Here";
  		player2Button.innerHTML = "Player 2: <br /> Press Here";

  		player1Button.addEventListener("touchstart", touchstartListener);
  		player2Button.addEventListener("touchstart", touchstartListener);
  	} else {
  		document.addEventListener("keypress",keypressListener);
  	}
  };

  // creates new objects and sets global variables
  let player1 = new Player("player-1", 0, 0, 100);
  let player2 = new Player("player-2", 0, 0, 100);
  let player1Button = document.getElementById("instructions-player-1");
  let player2Button = document.getElementById("instructions-player-2");
  let racetrack = document.getElementById('container');

  // calls the function that checks on user screen size
  checkScreenSize();

  /*let snowboarders = [];

  for (let i =0; i < 3; i++) {
    snowboarders.push(new Player(("player-" + i), 0, 0, 100));
  }*/

});


