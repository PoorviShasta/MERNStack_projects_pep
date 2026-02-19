let playerScore = 0;
let computerScore = 0;  
let buttons = document.querySelectorAll('.btn');
console.log("buttons");
let playerScoreEl = document.getElementById('player-score');

let computerScoreEl = document.getElementById('computer-score');

let resultEl = document.getElementById('result');

buttons.forEach(function(btn){
    btn.addEventListener('click', function(){
        let result = playRound(btn.id, computerPlay());
        console.log(result);
        resultEl.textContent = result;
    })

})
function computerPlay(){
    let choices = ['rock', 'paper', 'scissors'];
    let randomChoice = Math.floor(Math.random() * choices.length);
    return choices[randomChoice];
}
function playRound(playerSelection, computerSelection){
    if (playerSelection === computerSelection){
        return "It's a tie!";
    } else if (
        (playerSelection === 'rock' && computerSelection === 'scissors') ||
        (playerSelection === 'paper' && computerSelection === 'rock') ||
        (playerSelection === 'scissors' && computerSelection === 'paper')
    ){
        playerScore++;
        playerScoreEl.textContent = playerScore;
        return `You win! ${playerSelection} beats ${computerSelection}`;    
    } else {
        computerScore++;
        computerScoreEl.textContent = computerScore;
        return `You lose! ${computerSelection} beats ${playerSelection}`;
    }


}
// let buttons = document.querySelectorAll('.btn');

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