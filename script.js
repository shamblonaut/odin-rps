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
				return 'Draw!';
			case 'paper':
				return 'You lose! Paper beats Rock';
			case 'scissors':
				return 'You win! Rock beats Scissors';
		}
	} else if (playerSelection === 'paper') {
		switch (computerSelection) {
			case 'rock':
				return 'You win! Paper beats Rock';
			case 'paper':
				return 'Draw!';
			case 'scissors':
				return 'You lose! Scissors beat Paper';
		}
	}  else if (playerSelection === 'scissors') {
		switch (computerSelection) {
			case 'rock':
				return 'You lose! Rock beats Scissors';
			case 'paper':
				return 'You win! Scissors beat Paper';
			case 'scissors':
				return 'Draw!';
		}
	}
}

// Play given number of rounds of Rock Paper Scissors
function game(rounds) {
	let playerScore = 0;
	let computerScore = 0;

	for(let i = 0; i < rounds; i++) {
		let roundResult = playRound(getPlayerChoice(), getComputerChoice());
		console.log(roundResult);

		if (roundResult.includes('win')) {
			playerScore++;
		} else if (roundResult.includes('lose')) {
			computerScore++;
		}
	}

	if (playerScore > computerScore) {
		console.log(`You win with ${playerScore} points!`);
	} else if(computerScore > playerScore) {
		console.log(`Computer wins with ${computerScore} points!`);
	} else {
		console.log(`The game was a draw with ${playerScore} points for you and ${computerScore} points for Computer!`)
	}
}

// Play the game
game(5);
