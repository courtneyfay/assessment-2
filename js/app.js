// Toggles the classes to create animations on the landing page

document.addEventListener('DOMContentLoaded', function() {
  console.log('js is loaded!');

  function hoverText() {
  	let text = document.getElementById('game-button');
  	text.classList.toggle('swell');
  };

  setInterval(hoverText, 1000);

});