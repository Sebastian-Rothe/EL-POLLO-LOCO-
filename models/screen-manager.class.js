class ScreenManager {
    constructor(canvas, ctx, startGameCallback, restartGameCallback) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.startGameCallback = startGameCallback;
        this.restartGameCallback = restartGameCallback;
        this.currentScreen = null;
        this.currentButton = null;
    }

    showStartScreen() {
        this.currentScreen = 'start';
        this.clearScreen();
        this.drawImage('./img/9_intro_outro_screens/start/startscreen_1.png');
        this.createButton('Start Game', () => {
            this.removeCurrentButton();
            this.startGameCallback();
        });
    }

    showGameOverScreen() {
        this.currentScreen = 'gameOver';
        this.clearScreen();
        this.drawImage('./img/9_intro_outro_screens/game_over/oh no you lost!.png');
        this.createButton('Play Again', () => {
            this.removeCurrentButton();
            this.restartGameCallback();
        });
    }

    showWinScreen() {
        this.currentScreen = 'win';
        this.clearScreen();
        this.drawImage('./img/9_intro_outro_screens/win/win_2.png');
        this.createButton('Play Again', () => {
            this.removeCurrentButton();
            this.restartGameCallback();
        });
    }

    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.removeCurrentButton();
    }

    drawImage(imagePath) {
        const img = new Image();
        img.src = imagePath;
        img.onload = () => {
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
        };
    }

    createButton(text, callback) {
        const button = document.createElement('button');
        button.innerText = text;
        button.onclick = callback;
        button.style.position = 'absolute';
        button.style.top = '50%';
        button.style.left = '50%';
        button.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(button);
        this.currentButton = button; // Speichere den Button, um ihn später zu entfernen
    }

    removeCurrentButton() {
        if (this.currentButton) {
            this.currentButton.remove();
            this.currentButton = null;
        }
    }
}




    // constructor(canvas, ctx, startGameCallback, restartGameCallback) {
    //     this.canvas = canvas;
    //     this.ctx = ctx;
    //     this.startGameCallback = startGameCallback;
    //     this.restartGameCallback = restartGameCallback;
    //     this.currentScreen = null; // Variable für den aktuellen Bildschirm
    // }

    // showStartScreen() {
    //     this.currentScreen = 'start';
    //     this.clearScreen();
    //     this.drawImage('./img/9_intro_outro_screens/start/startscreen_1.png');
    //     this.createButton('Start Game', this.startGameCallback);
    // }

    // showGameOverScreen() {
    //     this.currentScreen = 'gameOver';
    //     this.clearScreen();
    //     this.drawImage('./img/9_intro_outro_screens/game_over/oh no you lost!.png');
    //     this.createButton('Play Again', this.restartGameCallback);
    // }

    // showWinScreen() {
    //     this.currentScreen = 'win';
    //     this.clearScreen();
    //     this.drawImage('./img/9_intro_outro_screens/win/win_2.png');
    //     this.createButton('Play Again', this.restartGameCallback);
    // }

    // clearScreen() {
    //     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //     this.removeAllButtons();
    // }

    // removeAllButtons() {
    //     const existingButtons = document.querySelectorAll('button');
    //     existingButtons.forEach(button => button.remove());
    // }

    // drawImage(imagePath) {
    //     const img = new Image();
    //     img.src = imagePath;
    //     img.onload = () => {
    //         this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
    //     };
    // }

    // createButton(text, callback) {
    //     const button = document.createElement('button');
    //     button.innerText = text;
    //     button.onclick = callback;
    //     button.style.position = 'absolute';
    //     button.style.top = '50%';
    //     button.style.left = '50%';
    //     button.style.transform = 'translate(-50%, -50%)';
    //     document.body.appendChild(button);
    // }

