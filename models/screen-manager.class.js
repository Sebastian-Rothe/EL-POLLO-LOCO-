class ScreenManager {
  /**
   * Creates an instance of ScreenManager.
   * @constructor
   * @param {HTMLCanvasElement} canvas - The canvas element for rendering the game.
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context for the canvas.
   * @param {function} startGameCallback - Callback function to start the game.
   * @param {function} restartGameCallback - Callback function to restart the game.
   */
  constructor(canvas, ctx, startGameCallback, restartGameCallback) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.startGameCallback = startGameCallback;
    this.restartGameCallback = restartGameCallback;
    this.currentScreen = null;
    this.currentButtons = [];

    window.addEventListener('resize', this.toggleButtonsVisibility.bind(this));
    this.toggleButtonsVisibility();
  }

  /**
   * Displays the start screen with buttons to start the game, view instructions, or see the impressum.
   */
  showStartScreen() {
    this.currentScreen = "start";
    this.clearScreen();
    this.drawImage("./img/9_intro_outro_screens/start/startscreen_1.png");

    // Erstellen der Buttons mit der neuen Funktion
    this.createMultipleButtons([
      { text: "Start Game", callback: () => { this.removeCurrentButtons(); this.startGameCallback(); }, type: "start" },
      { text: "Instructions", callback: () => { this.removeCurrentButtons(); this.showInstructions(); }, type: "instructions" },
      { text: "Impressum", callback: () => { this.removeCurrentButtons(); this.showImpressum(); }, type: "impressum" }
    ]);
  }

  /**
   * Displays the game over screen with an option to play again.
   */
  showGameOverScreen() {
    this.currentScreen = "gameOver";
    this.clearScreen();
    this.drawImage("./img/9_intro_outro_screens/game_over/oh no you lost!.png");

    // Erstellen der Buttons für "Play Again" und "Return to Start"
    this.createMultipleButtons([
      { text: "Play Again", callback: () => { this.removeCurrentButtons(); this.restartGameCallback(); }, type: "playAgain" },
      { text: "Return to Start", callback: () => { this.removeCurrentButtons(); this.showStartScreen(); }, type: "start-above" }
    ]);
  }

  /**
   * Displays the win screen with an option to play again.
   */
  showWinScreen() {
    this.currentScreen = "win";
    this.clearScreen();
    this.drawImage("./img/9_intro_outro_screens/win/win_2.png");

    // Erstellen der Buttons für "Play Again" und "Return to Start"
    this.createMultipleButtons([
      { text: "Play Again", callback: () => { this.removeCurrentButtons(); this.restartGameCallback(); }, type: "playAgain" },
      { text: "Return to Start", callback: () => { this.removeCurrentButtons(); this.showStartScreen(); }, type: "start-above" }
    ]);
  }

  /**
   * Centralized function to create multiple buttons.
   * @param {Array} buttonConfigs - An array of objects containing text, callback, and type for each button.
   */
  createMultipleButtons(buttonConfigs) {
    buttonConfigs.forEach(({ text, callback, type }) => {
      this.createButton(text, callback, type);
    });
  }

  /**
   * Creates a button and appends it to the screen.
   * @param {string} text - The text to display on the button.
   * @param {function} callback - The function to be called when the button is clicked.
   * @param {string} type - The type of the button (e.g., start, instructions, impressum).
   */
  createButton(text, callback, type) {
    const button = document.createElement("button");
    button.innerText = text;
    button.onclick = callback;

    if (type === "start" || type === "playAgain") {
      button.classList.add("start-button");
    } else if (type === "start-above") {
      button.classList.add("start-button-above");
    } else if (type === "instructions") {
      button.classList.add("button-start-screen", "instructions");
    } else if (type === "impressum") {
      button.classList.add("button-start-screen", "impressum");
    }

    document.getElementById("fullscreen").appendChild(button);
    this.currentButtons.push(button); 
    this.toggleButtonsVisibility();
  }

  /**
   * Clears the current screen and removes buttons.
   */
  clearScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.removeCurrentButtons();
  }

  /**
   * Draws an image on the canvas.
   * @param {string} imagePath - The path to the image to draw.
   */
  drawImage(imagePath) {
    const img = new Image();
    img.src = imagePath;
    img.onload = () => {
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
    };
  }

  /**
   * Removes all current buttons from the screen.
   */
  removeCurrentButtons() {
    this.currentButtons.forEach((button) => button.remove());
    this.currentButtons = [];
  }

  /**
   * Controls the visibility of buttons based on viewport width.
   * Hides buttons if viewport width is less than 500 pixels.
   */
  toggleButtonsVisibility() {
    if (window.innerWidth < 480) {
      this.currentButtons.forEach(button => {
        button.style.display = "none"; 
      });
    } else {
      this.currentButtons.forEach(button => {
        button.style.display = "block"; 
      });
    }
  }
}
