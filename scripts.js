let sequence = [];
let currentSequence = [];
let currentPlay = 0;

$('button.start-game').click(function (e) {
    initiateGame();
});

function initiateGame() {
    nextLevel();
}

$('button.game-button').click(function (e) {
    clickButton(e.currentTarget.id);
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

function nextLevel() {
    $('.game-text').text("Level " + (currentPlay + 1));
    let randomNumber = getRandomNumber();
    sequence.push(randomNumber);
    currentPlay = 0;
    currentSequence = [];

    setTimeout(function () {
        clickButton('button-' + randomNumber);
    }, 1000);

}

function clickButton(buttonId) {

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

function gameOver() {

    sequence = [];
    currentSequence = [];
    currentPlay = 0;
    $('.game-text').text("Game Over, Press Any Key to Restart");

    $('body').css('background-color', 'red');
    setTimeout(function () {
        $('body').css('background-color', '#011F3F');
    }, 100);

    let audio = new Audio("sounds/wrong.mp3");
    audio.play();
}

function getRandomNumber() {
    let number = Math.floor(Math.random() * 4) + 1;
    return number;
}
