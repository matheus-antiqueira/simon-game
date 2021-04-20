let sequence = [];
let currentSequence = [];
let currentPlay = 0;

$('button.start-game').click(function (e) {
    initiateGame();
});

function initiateGame() {
    sequence = [];
    currentPlay = 0;
    currentSequence = [];
    nextLevel();
}

function nextLevel() {
    $('.game-text').text("Level " + (currentPlay + 1));
    let randomNumber = getRandomNumber();
    sequence.push(randomNumber);
    currentPlay = 0;
    currentSequence = [];

    setTimeout(function () {
        animateButton('button-' + randomNumber);
    }, 1000);
}

function getRandomNumber() {
    let number = Math.floor(Math.random() * 4) + 1;
    return number;
}

function animateButton(buttonId) {

    let numberButton = buttonId.split('-')[1];

    if (numberButton == 1) {
        let audio = new Audio("sounds/green.mp3");
        audio.play();
    } else if (numberButton == 2) {
        let audio = new Audio("sounds/red.mp3");
        audio.play();
    } else if (numberButton == 3) {
        let audio = new Audio("sounds/yellow.mp3");
        audio.play();
    } else if (numberButton == 4) {
        let audio = new Audio("sounds/blue.mp3");
        audio.play();
    }

    document.getElementById(buttonId).classList.add("pressed");

    setTimeout(function () {
        document.getElementById(buttonId).classList.remove("pressed");
    }, 100);
}

$('button.game-button').click(function (e) {
    animateButton(e.currentTarget.id);
    currentSequence.push(e.currentTarget.id.split('-')[1]);
    if (checkPlay()) {
        currentPlay++;

        if (currentPlay == sequence.length)
            nextLevel();

    } else {
        gameOver();
    }
});

function checkPlay() {

    if (sequence[currentPlay] == currentSequence[currentPlay])
        return true;

    return false;
}

function gameOver() {

    $('.game-text').text("Game Over, Press the button to Restart");

    $('body').css('background-color', 'red');
    setTimeout(function () {
        $('body').css('background-color', '#011F3F');
    }, 100);

    let audio = new Audio("sounds/wrong.mp3");
    audio.play();
}

