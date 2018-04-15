/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of gueses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const UIgame = document.querySelector('#game'),
      UIminNum = document.querySelector('.min-num'),
      UImaxNum = document.querySelector('.max-num'),
      UIguessBtn = document.querySelector('#guess-btn'),
      UIguessInput = document.querySelector('#guess-input'),
      UImessage = document.querySelector('.message');

// Assign UI min and max
UIminNum.textContent = min;
UImaxNum.textContent = max;

// Play again event listener
UIgame.addEventListener('mousedown', function(e) {
  if(e.target.classList.contains('play-again')){
    window.location.reload();
  }
})

// Listen for guess
UIguessBtn.addEventListener('click', function() {
  let guess = parseInt(UIguessInput.value);

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // Check if won
  if(guess === winningNum) {
    // Game over - won
    gameOver(true, `${winningNum} is correct, YOU WIN!`);
    // Play Again?
    playAgain();

   } else {
    // Wrong number
    guessesLeft -= 1;

    if(guessesLeft === 0) {
      // Game over - lost
      gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
      
      // Play Again?
      playAgain();
    } else {
      // Game continues - answer wrong
       gameOver(false, `${guess} is not correct, ${guessesLeft} guesses left`);
       UIguessInput.disabled = false;
       
    }
  }
});

// Game over
function gameOver(won, msg) {
  let color;

  won === true? color = 'green' : color = 'red';
  // Disable input
  UIguessInput.disabled = true;
  // Change corder color
  UIguessInput.style.borderColor = color;
  // Set message
  setMessage(msg, color);
}

// Play Again 
function playAgain(){
  UIguessBtn.value = 'Play Again';
  UIguessBtn.className += 'play-again';
}

// Get winning num
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set message
function setMessage(msg, color) {
  UImessage.style.color = color;
  UImessage.textContent = msg;
}