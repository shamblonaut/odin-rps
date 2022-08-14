// Generate a random move for the computer's turn
function getComputerChoice() {
	let moves = ['rock', 'paper', 'scissors'];
	return moves[Math.floor(Math.random() * moves.length)];
}

// Get the player's choice of move
function getPlayerChoice() {
	let move = prompt('Choose your move (Rock, Paper, or Scissors): ').toLowerCase();
	while (move != 'rock' && move !='paper' && move != 'scissors') {
		if (move === '') {
			move = getComputerChoice();
			alert('You didn\'t choose any move, so we chose a random choice for you: ' + move);
			break;
		}
		move = prompt('Please enter a valid move (Rock, Paper, Scissors)').toLowerCase();
	}

	return move;
}

// Play a round of the game
function playRound(playerSelection, computerSelection) {
	// List the selections of the player and the computer
	console.log(`Player: ${playerSelection}, Computer: ${computerSelection}`);
	
	// Check for win, lose, and draw
	if (playerSelection === 'rock') {
		switch (computerSelection) {
			case 'rock':
				return 'The round was a draw!';
			case 'paper':
				return 'You lose the round! Paper beats Rock';
			case 'scissors':
				return 'You win the round! Rock beats Scissors';
		}
	} else if (playerSelection === 'paper') {
		switch (computerSelection) {
			case 'rock':
				return 'You win the round! Paper beats Rock';
			case 'paper':
				return 'The round was a draw!';
			case 'scissors':
				return 'You lose the round! Scissors beat Paper';
		}
	}  else if (playerSelection === 'scissors') {
		switch (computerSelection) {
			case 'rock':
				return 'You lose the round! Rock beats Scissors';
			case 'paper':
				return 'You win the round! Scissors beat Paper';
			case 'scissors':
				return 'The round was a draw!';
		}
	}
}

// Play given number of rounds of Rock Paper Scissors
const buttons = document.querySelector('.buttons');
const selections = document.querySelectorAll('.selection');
const infoDisplay = document.querySelector('.info');
const roundDisplay = document.querySelector('.round');
const playerScoreDisplay = document.querySelector('.player > .points');
const computerScoreDisplay = document.querySelector('.computer > .points');
const roundResultDisplay = document.querySelector('.result');

function displayResult(playerScore, computerScore, roundResult) {
	if(playerScore >= 5 || computerScore >= 5) {
		if (playerScore > computerScore) {
			roundResultDisplay.textContent = `You win the game with ${playerScore} points!`;
		} else if(computerScore > playerScore) {
			roundResultDisplay.textContent = `Computer wins the game with ${computerScore} points!`;
		}

		console.log(roundResultDisplay.textContent);

		selections.forEach((selection) => {
			buttons.removeChild(selection);
		});

		const restartButton = document.createElement('button');
		restartButton.classList.add('selection');
		restartButton.textContent = 'Restart';
		restartButton.addEventListener('click', () => {
			restartButton.classList.add('selected');
			window.location.reload();
		});
		restartButton.addEventListener('transitionend', (event) => {
			if (event.propertyName === 'transform') {
				restartButton.classList.remove('selected');
			}
		});
		buttons.appendChild(restartButton);
	} else {
		roundResultDisplay.textContent = roundResult;
	}
}

function playGame(selection) {
	selection.classList.add('selected');

	let roundResult = playRound(selection.getAttribute('id'), getComputerChoice());
	console.log(roundResult);

	if (roundResult.includes('win')) {
		playerScore++;
	} else if (roundResult.includes('lose')) {
		computerScore++;
	}
	
	playerScoreDisplay.textContent = playerScore;
	computerScoreDisplay.textContent = computerScore;
	displayResult(playerScore, computerScore, roundResult);

	round++;
	roundDisplay.textContent = `Round ${round}`;
}

let playerScore = 0;
let computerScore = 0;

let round = 1;
roundDisplay.textContent = `Round ${round}`;

selections.forEach((selection) => {
	selection.addEventListener('click', () => {
		if (playerScore < 5 && computerScore < 5) playGame(selection);
	});
	
	selection.addEventListener('transitionend', (event) => {
		if (event.propertyName === 'transform') {
			selection.classList.remove('selected');
		}
	});
});