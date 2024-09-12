class SoundManager {
  sounds = {
    bgMusic: new Audio("audio/background.mp3"),
    characterJump: new Audio("audio/jump.mp3"),
    characterHurt: new Audio("audio/hurt.mp3"),
    characterDead: new Audio("audio/dead.mp3"),
    coinSound: new Audio("audio/coin_picked.mp3"),
    bottlePickSound: new Audio("audio/item_picked.mp3"),
    winSound: new Audio("audio/win.mp3"),
    chickenKilled: new Audio("audio/chicken_killed.mp3"),
    throwSound: new Audio("audio/throw.mp3"),
  };

  /**
   * Initializes the SoundManager with sound assets and volume controls.
   * @constructor
   */
  constructor() {
    this.bgMusic = new Audio("audio/background.mp3");
    this.bgMusic.loop = true;
    this.bgMusic.volume = 0.5;
    this.volumeStates = ["off", "low", "high"];
    this.currentVolumeState = 1;
    this.updateVolumeButton();
    this.addVolumeButtonListeners();
  }

  /**
   * Plays a sound based on its name.
   * @param {string} soundName - The name of the sound to play.
   */
  playSound(soundName) {
    const sound = this.sounds[soundName];
    if (sound) {
      if (this.currentVolumeState === 0) {
        return;
      }
      if (soundName === "characterHurt") {
        sound.play();
      } else {
        const clonedSound = sound.cloneNode();
        clonedSound.play();
      }
    } else {
      console.error(`Sound ${soundName} not found!`);
    }
  }

  /**
   * Plays the background music.
   */
  playBackgroundMusic() {
    this.bgMusic.play();
  }

  /**
   * Sets the volume for the background music and sound effects.
   * @param {string} volumeState - The desired volume state ('off', 'low', 'high').
   */
  setVolume(volumeState) {
    let volumeLevel;
    if (volumeState === "off") {
      volumeLevel = 0;
    } else if (volumeState === "low") {
      volumeLevel = 0.3;
    } else if (volumeState === "high") {
      volumeLevel = 1.0;
    }

    this.bgMusic.volume = volumeLevel;
    Object.values(this.sounds).forEach((sound) => {
      sound.volume = volumeLevel;
    });
  }

  /**
   * Updates the visibility of volume control buttons based on the current volume state.
   */
  updateVolumeButton() {
    document.getElementById("button-volume-up").style.display = "none";
    document.getElementById("button-volume-down").style.display = "none";
    document.getElementById("button-volume-off").style.display = "none";

    if (this.currentVolumeState === 0) {
      document.getElementById("button-volume-off").style.display = "block";
    } else if (this.currentVolumeState === 1) {
      document.getElementById("button-volume-down").style.display = "block";
    } else {
      document.getElementById("button-volume-up").style.display = "block";
    }
  }

  /**
   * Adds event listeners to volume control buttons for changing the volume state.
   */
  addVolumeButtonListeners() {
    document
      .getElementById("button-volume-off")
      .addEventListener("click", () => {
        this.changeVolumeState();
      });
    document
      .getElementById("button-volume-down")
      .addEventListener("click", () => {
        this.changeVolumeState();
      });
    document
      .getElementById("button-volume-up")
      .addEventListener("click", () => {
        this.changeVolumeState();
      });
  }

  /**
   * Changes the current volume state and updates the volume and button display.
   */
  changeVolumeState() {
    this.currentVolumeState = (this.currentVolumeState + 1) % 3;
    this.setVolume(this.volumeStates[this.currentVolumeState]);
    this.updateVolumeButton();
  }

  /**
   * Sets the volume to off.
   */
  setVolumeToOff() {
    this.currentVolumeState = 0; 
    this.setVolume("off"); 
  }

  /**
   * Sets the volume to low at startGame.
   */
  setVolumeToDown() {
    this.currentVolumeState = 1; 
    this.setVolume("low"); 
  }
}
