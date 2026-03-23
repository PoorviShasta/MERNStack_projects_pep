let playerScore = 0;
let computerScore = 0;

const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const resultEl = document.getElementById('result');
const detailEl = document.getElementById('detail');
const resetBtn = document.getElementById('resetBtn');
const choices = document.querySelectorAll('.choice');

function computerPlay() {
  const options = ['rock', 'paper', 'scissors'];
  return options[Math.floor(Math.random() * options.length)];
}

function formatChoice(choice) {
  if (choice === 'rock') return 'Rock ✊';
  if (choice === 'paper') return 'Paper ✋';
  return 'Scissors ✌️';
}

function updateScore() {
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
}

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return {
      message: "It's a tie!",
      detail: `Both selected ${formatChoice(playerSelection)}.`,
      winner: 'tie',
    };
  }

  const wins = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper',
  };

  if (wins[playerSelection] === computerSelection) {
    playerScore++;
    updateScore();
    return {
      message: `You win! ${formatChoice(playerSelection)} beats ${formatChoice(computerSelection)}.`,
      detail: `Human is winning now!`,
      winner: 'player',
    };
  }

  computerScore++;
  updateScore();
  return {
    message: `You lose! ${formatChoice(computerSelection)} beats ${formatChoice(playerSelection)}.`,
    detail: `Computer takes the lead!`,
    winner: 'computer',
  };
}

function checkGameEnd() {
  if (playerScore >= 5 || computerScore >= 5) {
    const winner = playerScore > computerScore ? 'You won the match 🎉' : 'Computer won the match 🤖';
    resultEl.textContent = winner;
    detailEl.textContent = 'Press Reset to play again.';
    choices.forEach((btn) => (btn.disabled = true));
  }
}

choices.forEach((btn) => {
  btn.addEventListener('click', () => {
    const playerChoice = btn.dataset.choice;
    const computerChoice = computerPlay();
    const round = playRound(playerChoice, computerChoice);

    resultEl.textContent = round.message;
    detailEl.textContent = `You: ${formatChoice(playerChoice)}  |  Computer: ${formatChoice(computerChoice)}`;

    if (playerScore < 5 && computerScore < 5) {
      checkGameEnd();
    }
  });
});

resetBtn.addEventListener('click', () => {
  playerScore = 0;
  computerScore = 0;
  updateScore();
  resultEl.textContent = 'Ready for a new match!';
  detailEl.textContent = 'Choose your weapon to begin.';
  choices.forEach((btn) => (btn.disabled = false));
});

updateScore();
resultEl.textContent = 'Make your move';
detailEl.textContent = 'First to 5 wins the round.';// let buttons = document.querySelectorAll('.btn');

// let playerScore = 0;
// let computerScore = 0;

// let playerScoreEl = document.getElementById('player-score');
// let computerScoreEl = document.getElementById('computer-score');
// let resultEl = document.getElementById('result');

// buttons.forEach(function(btn){

//     btn.addEventListener('click', function(){

//         let playerChoice = btn.id;
//         let computerChoice = computerPlay();

//         let result = playRound(playerChoice, computerChoice);

//         resultEl.textContent = result;

//     });

// });

// function computerPlay(){

//     let choices = ['rock', 'paper', 'scissors'];

//     let randomChoice = Math.floor(Math.random() * choices.length);

//     return choices[randomChoice];
// }

// function playRound(playerSelection, computerSelection){

//     if (playerSelection === computerSelection){
//         return "It's a Tie!";
//     }

//     else if (
//         (playerSelection === 'rock' && computerSelection === 'scissors') ||
//         (playerSelection === 'paper' && computerSelection === 'rock') ||
//         (playerSelection === 'scissors' && computerSelection === 'paper')
//     ){

//         playerScore++;

//         playerScoreEl.textContent = playerScore;

//         return `You Win! ${playerSelection} beats ${computerSelection}`;
//     }

//     else {

//         computerScore++;

//         computerScoreEl.textContent = computerScore;

//         return `You Lose! ${computerSelection} beats ${playerSelection}`;
//     }
// }