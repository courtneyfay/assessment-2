document.addEventListener('DOMContentLoaded', function() {
  console.log("js is loaded!");

  function hoverText() {
  	let text = document.getElementById("game-button");
  	text.classList.toggle("swell");
  	console.log("hit hovertitle function");
  }

  setInterval(hoverText, 1000);
  
});