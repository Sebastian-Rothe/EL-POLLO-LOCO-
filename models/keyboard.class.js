class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;
  D = false;

  /**
   * Creates an instance of the Keyboard class.
   * Initializes keyboard and mobile button event listeners.
   *
   * @constructor
   */
  constructor() {
    this.keyboardEvents();
    this.mobileButtonEvents();
  }

  /**
   * Sets up keyboard events for key presses and releases.
   */
  keyboardEvents() {
    window.addEventListener("keydown", (e) => {
      if (e.keyCode == 32) {
        keyboard.SPACE = true;
      }
      if (e.keyCode == 37 || e.keyCode == 65) {
        keyboard.LEFT = true;
      }
      if (e.keyCode == 38) {
        keyboard.UP = true;
      }
      if (e.keyCode == 39 || e.keyCode == 68) {
        keyboard.RIGHT = true;
      }
      if (e.keyCode == 40) {
        keyboard.DOWN = true;
      }
      if (e.keyCode == 82) {
        keyboard.D = true;
      }
    });

    window.addEventListener("keyup", (e) => {
      if (e.keyCode == 32) {
        keyboard.SPACE = false;
      }
      if (e.keyCode == 37 || e.keyCode == 65) {
        keyboard.LEFT = false;
      }
      if (e.keyCode == 38) {
        keyboard.UP = false;
      }
      if (e.keyCode == 39 || e.keyCode == 68) {
        keyboard.RIGHT = false;
      }
      if (e.keyCode == 40) {
        keyboard.DOWN = false;
      }
      if (e.keyCode == 82) {
        keyboard.D = false;
      }
    });
  }

  /**
   * Sets up mobile button events for touch controls.
   */
  mobileButtonEvents() {
    document.getElementById("btn-left").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.LEFT = true;
    });
    document.getElementById("btn-left").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.LEFT = false;
    });
    document.getElementById("btn-right").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.RIGHT = true;
    });
    document.getElementById("btn-right").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.RIGHT = false;
    });
    document.getElementById("btn-jump").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.SPACE = true;
    });
    document.getElementById("btn-jump").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.SPACE = false;
    });
    document.getElementById("btn-throw").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.D = true;
    });
    document.getElementById("btn-throw").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.D = false;
    });
  }
}
