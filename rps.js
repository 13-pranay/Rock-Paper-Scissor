// Score object to keep track of wins, loses, and ties
const score = {
    wins: 0,
    loses: 0,
    tied: 0
};

// Variable to control autoplay functionality
let isautoplaying = false;
let intervalId;

// Function to reset the score
function reset() {
    score.wins = 0;
    score.loses = 0;
    score.tied = 0;
    alert(`Your score has been reset`);
    scoredisplay();
    document.querySelector('.wl').innerHTML = `win/lose`;
    document.querySelector('.cp').innerHTML = `you:  ,  Computer: `;
}

// Function to toggle autoplay
function toggle() {
    const button = document.getElementById('autobutton');
    if (!isautoplaying) {
        intervalId = setInterval(function () {
            const playerMove = computermove();
            playgame(playerMove);
        }, 1000);
        isautoplaying = true;
        button.innerHTML = 'stop';
    } else {
        stopautoplay();
        button.innerHTML = 'autoplay';
    }
}

// Function to stop autoplay
function stopautoplay() {
    clearInterval(intervalId);
    isautoplaying = false;
}

// Function to toggle dark mode
function toggledark() {
    const body = document.body;
    const darkButton = document.getElementById('dark');

    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        darkButton.innerHTML = 'dark';
    } else {
        body.classList.add('dark-mode');
        darkButton.innerHTML = 'light';
    }
}

// Event listener for keyboard inputs (r, p, s)
document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playgame('Rock');
    } else if (event.key === 'p') {
        playgame('Paper');
    } else if (event.key === 's') {
        playgame('Scissor');
    }
});

// Function to generate computer's move (Rock, Paper, Scissor)
function computermove() {
    const randomNumber = Math.random();
    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1/3) {
        computerMove = 'Rock';
    } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
        computerMove = 'Paper';
    } else if (randomNumber >= 2/3 && randomNumber < 1) {
        computerMove = 'Scissor';
    }
    return computerMove;
}

// Function to play the game based on player's move
function playgame(playerMove) {
    const computerMove = computermove();
    let result = '';

    if (playerMove === 'Rock') {
        if (computerMove === 'Rock') {
            result = 'tie';
        } else if (computerMove === 'Paper') {
            result = 'you lose';
        } else if (computerMove === 'Scissor') {
            result = 'you win';
        }
    } else if (playerMove === 'Paper') {
        if (computerMove === 'Rock') {
            result = 'you win';
        } else if (computerMove === 'Paper') {
            result = 'tie';
        } else if (computerMove === 'Scissor') {
            result = 'you lose';
        }
    } else if (playerMove === 'Scissor') {
        if (computerMove === 'Rock') {
            result = 'you lose';
        } else if (computerMove === 'Paper') {
            result = 'you win';
        } else if (computerMove === 'Scissor') {
            result = 'tie';
        }
    }

    count(result);
    document.querySelector('.cp').innerHTML = `you: <img class="dis-pic" src="images/${playerMove.toLowerCase()}.jpg" alt=""> computer:<img class="dis-pic" src="images/${computerMove.toLowerCase()}.jpg" alt=""> `;
    document.querySelector('.wl').innerHTML = `${result}`;
    scoredisplay();
}

// Function to update the score based on game result
function count(result) {
    if (result === 'you win') {
        score.wins += 1;
    } else if (result === 'you lose') {
        score.loses += 1;
    } else if (result === 'tie') {
        score.tied += 1;
    }
    scoredisplay();
}

// Function to display the current score
function scoredisplay() {
    document.querySelector('.scorecard').innerHTML = `
        wins: ${score.wins} loses: ${score.loses} tied: ${score.tied}`;
}
