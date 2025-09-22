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

    window.addEventListener("resize", this.toggleButtonsVisibility.bind(this));
    this.toggleButtonsVisibility();
  }

  /**
   * Displays the start screen with buttons to start the game, view instructions, or see the impressum.
   */
  showStartScreen() {
    this.currentScreen = "start";
    this.clearScreen();
    this.drawImage("./img/9_intro_outro_screens/start/startscreen_1.png");

    this.createStartGameButton();
    this.createInstructionsButton();
    this.createImpressumButton();
  }

  /**
   * Creates and appends the Start Game button.
   */
  createStartGameButton() {
    this.createButton(
      "Start Game",
      () => {
        this.removeCurrentButtons();
        this.startGameCallback();
      },
      "start"
    );
  }

  /**
   * Creates and appends the Instructions button.
   */
  createInstructionsButton() {
    this.createButton(
      "Instructions",
      () => {
        this.removeCurrentButtons();
        this.showInstructions();
      },
      "instructions"
    );
  }

  /**
   * Creates and appends the Impressum button.
   */
  createImpressumButton() {
    this.createButton(
      "Impressum",
      () => {
        this.removeCurrentButtons();
        this.showImpressum();
      },
      "impressum"
    );
  }

  /**
   * Displays the instructions screen with controls for the game.
   */
  showInstructions() {
    this.clearScreen();
    this.hideVolumeButtons();
    const instructionsContent = this.createInstructionsContent();
    const goBackButton = this.createGoBackButton(instructionsContent);

    document.getElementById("fullscreen").appendChild(instructionsContent);
    document.getElementById("fullscreen").appendChild(goBackButton);
  }

  /**
   * Creates the content for the instructions screen.
   * @returns {HTMLElement} The instructions content element.
   */
  createInstructionsContent() {
    const instructionsContent = document.createElement("div");
    instructionsContent.classList.add("impressum-content");
    instructionsContent.innerHTML = `
      <span class="impressum-headline">Instructions</span>
      <p>Move Left: Arrow Left (←) or A</p>
      <p>Move Right: Arrow Right (→) or D</p>
      <p>Jump: Spacebar</p>
      <p>Throw: R</p> 
  ;`;
    return instructionsContent;
  }

  /**
   * Creates the go back button for the instructions screen.
   * @param {HTMLElement} instructionsContent The instructions content element.
   * @returns {HTMLElement} The go back button element.
   */
  createGoBackButton(instructionsContent) {
    const goBackButton = document.createElement("button");
    goBackButton.innerText = "Go Back";
    goBackButton.classList.add("start-button");
    goBackButton.onclick = () => {
      instructionsContent.remove();
      goBackButton.remove();
      this.showStartScreen();
    };
    return goBackButton;
  }

  /**
   * Displays the impressum screen with contact information.
   */
  showImpressum() {
    this.clearScreen();
    this.hideVolumeButtons();
    const impressumContent = this.createImpressumContent();
    const goBackButton = this.createGoBackButton(impressumContent);
    document.getElementById("fullscreen").appendChild(impressumContent);
    document.getElementById("fullscreen").appendChild(goBackButton);
  }

  /**
   * Hides volume control buttons.
   */
  hideVolumeButtons() {
    document.getElementById("button-volume-up").style.display = "none";
    document.getElementById("button-volume-down").style.display = "none";
    document.getElementById("button-volume-off").style.display = "none";
  }

  /**
   * Creates the impressum content with contact information.
   * @returns {HTMLElement} The impressum content element.
   */
  createImpressumContent() {
    const impressumContent = document.createElement("div");
    impressumContent.classList.add("impressum-content");
    impressumContent.innerHTML = `
      <span class="impressum-headline">Impressum</span>
      <span>Sebastian Rothe</span>
      <span>Mühlwehrstraße, 8</span>
      <span>60488 Frankfurt am Main</span>
      <br>
      <span>Kontakt</span>
      <span>Telefon: 0176 52968778</span>
      <span>E-Mail: mail@sebastian-rothe.com</span>
      <br>
      <span> Erstellt von impressum-generator.info - powered by abfindungshero.de </span>
      <span>Angaben gemäß Par. 5 DDG</span>
  ;`;
    return impressumContent;
  }

  /**
   * Creates a 'Go Back' button and assigns the click handler.
   * @param {HTMLElement} impressumContent - The impressum content element to be removed on button click.
   * @returns {HTMLElement} The 'Go Back' button element.
   */
  createGoBackButton(impressumContent) {
    const goBackButton = document.createElement("button");
    goBackButton.innerText = "Go Back";
    goBackButton.classList.add("start-button");
    goBackButton.onclick = () => {
      this.handleGoBack(impressumContent, goBackButton);
    };
    return goBackButton;
  }

  /**
   * Handles the actions when the 'Go Back' button is clicked.
   * @param {HTMLElement} impressumContent - The impressum content element to be removed.
   * @param {HTMLElement} goBackButton - The 'Go Back' button to be removed.
   */
  handleGoBack(impressumContent, goBackButton) {
    impressumContent.remove();
    goBackButton.remove();
    this.showStartScreen();
    document.getElementById("button-volume-down").style.display = "block";
  }

  /**
   * Displays the game over screen with an option to play again.
   */
  showGameOverScreen() {
    this.currentScreen = "gameOver";
    this.clearScreen();
    this.drawImage("./img/9_intro_outro_screens/game_over/oh no you lost!.png");

    this.createPlayAgainButton();
    this.createReturnButton();
  }

  /**
   * Displays the win screen with an option to play again.
   */
  showWinScreen() {
    this.currentScreen = "win";
    this.clearScreen();
    this.drawImage("./img/9_intro_outro_screens/win/win_2.png");

    this.createPlayAgainButton();
    this.createReturnButton();
  }

  /**
   * Creates the "Return to Start" button and appends it to the screen.
   * The button, when clicked, removes the current buttons and shows the start screen.
   */
  createReturnButton() {
    this.createButton(
      "Return to Start",
      () => {
        this.removeCurrentButtons();
        this.showStartScreen();
      },
      "start-above"
    );
  }

  /**
   * Creates the "Play Again" button and appends it to the screen.
   * The button, when clicked, removes the current buttons and restarts the game using the provided callback.
   */
  createPlayAgainButton() {
    this.createButton(
      "Play Again",
      () => {
        this.removeCurrentButtons();
        this.restartGameCallback();
      },
      "playAgain"
    );
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
      this.currentButtons.forEach((button) => {
        button.style.display = "none";
      });
    } else {
      this.currentButtons.forEach((button) => {
        button.style.display = "block";
      });
    }
  }
}
