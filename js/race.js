/* TODO: JS Requirements
	
-Your game page must have at least two player objects																						DONE
-Add a keydown event listener that console logs "blue move" or "red move"												DONE
-Replace that console log with JavaScript that moves the red or blue div a little to the right 	DONE 
-Your game must have a clear win condition																											DONE
-DRY out the code                                                                               DONE
-GRADED: Adhere to the AirBnB style guide for writing your JavaScript														**NOT YET**
-GRADED: Comment your code appropriately																												DONE

Bonus:
-Score each game based on the time it took to complete and by how much time                     **IF THERE'S TIME**
	they beat the opposing player
-Display the time it took for the player to complete the race                                   **IF THERE'S TIME**
-Make a 'Best of 3' tournament and display the winner of the tournament                         **IF THERE'S TIME**
-Keep track of best times/ high scores across page refreshes using localStorage                 **IF THERE'S TIME**
-Have players do something other than simply pressing a key to move their player,               **IF THERE'S TIME**
	for example, make them type words, or solve simple math problems
*/

document.addEventListener('DOMContentLoaded', function() {
  console.log("js is loaded!");

  // global array of all the player objects
  let players = [];

  function startGame() {

    // creates 2 new player objects and loads them into an array of all the players
    for (let i = 0; i < 2; i++) {
      let playerName = "player-" + (Number([i]) + 1);
      let instructionName = "instructions-player-" + (Number([i]) + 1);
      players.push(new Player(playerName, 0, 0, 100, instructionName));
    }

    // calls the function that checks on user screen size
    checkScreenSize(players);
  }; 

  // Constructor function creates 2 new player objects
  function Player(name="player-1", xPosition=0, yPosition=0, width=100, element="<div class='snowboarder' id='player-1'></div>", instructionName="instructions-player-1") {
  		this.name = name;
  		this.xPosition = xPosition;
  		this.yPosition = yPosition;
  		this.width = width;
  		this.element = document.getElementById(name);
      this.instructions = document.getElementById(instructionName);
  }

  // prototype method for the Player object: rideDown()
  Player.prototype = {

    // makes a player "ride" right and down the mountain, then checks for a winner
  	rideDown: function() {
  		//move the player to the right
  		this.xPosition = this.xPosition + 18;
  		this.element.style.left = (this.xPosition + "px");

  		//moves the player down the mountain
  		this.yPosition = this.yPosition + 6;
  		this.element.style.top = (this.yPosition + "px");

  		checkForWinner(this); 
  	}
  }; 

  // adjusts the elements on the screen to make them more mobile-friendly
  function checkScreenSize(array) {
    if (screen.width < 1025) {
      for (let i = 0; i < array.length; i++) {
        // updates the text to let users know they should press on instruction boxes to move the players when on a cell phone
        // sets event listeners on the instruction divs
        let idName = "instructions-" + array[i].name;
        let playerButton = document.getElementById(idName); //array[i].instructions; //
        let instructionText = "Player " + (i+1) + ": <br /> Press Here";
        playerButton.innerHTML = instructionText;
        playerButton.addEventListener("touchstart", touchstartListener); 
      }
    } else {
      // sets an event listener on the document
      document.addEventListener("keypress",keypressListener);
    } 
  };

  // turns on event listeners for the "s/S" key (player1) and for the "k/K" key (player2)
  // TODO: https://stackoverflow.com/questions/5203407/javascript-multiple-keys-pressed-at-once
  function keypressListener() {
    if (event.key == "s" || event.key == "S") { 
      players[0].rideDown();
    } else if (event.key == "k" || event.key == "K") {
      players[1].rideDown();
    } else {
      console.log("you pressed the wrong key");
      console.log(event);
      console.log(event.key);
    }
  };

  // turns on event listeners if a user clicks on the instructions on the left (player1) or the instructions on the right (player2)
  function touchstartListener() {
  		if (this.id === "instructions-player-1") {
        players[0].rideDown();
  		} else if (this.id === "instructions-player-2") {
  			players[1].rideDown();
  		}
  };

  // checks to see if a snowboarder touched the right edge of the viewing screen
  function checkForWinner(player) {
    let racetrack = document.getElementById('container');
 
    if ((player.xPosition + player.width) >= racetrack.offsetWidth) {
      winAnimation(player, players);
    } 
  };

  // when a snowboarder wins, they do a flip and there is a notification at the top letting everyone know who won. event listeners are turned off
  function winAnimation(player, array) {
    console.log("I'm trying to flip");
    player.element.classList.add("flip");
    let winnerAlert = document.getElementById("player-who-won"); 
    winnerAlert.innerHTML = player.name + " won!";

    //turn off all the event listeners
    document.removeEventListener("keypress",keypressListener);
    for (let i = 0; i < array.length; i++) {
      let idName = "instructions-" + array[i].name;
      let playerButton = document.getElementById(idName); 
      playerButton.removeEventListener("touchstart", touchstartListener); 
    }
  };

  startGame();

});


