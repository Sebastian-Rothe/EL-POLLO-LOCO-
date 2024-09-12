class World {
  /**
   * Creates an instance of the World class.
   *
   * @constructor
   * @param {HTMLCanvasElement} canvas - The canvas element used for rendering the game.
   * @param {Keyboard} keyboard - The instance of the Keyboard class for input handling.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.running = false;
    this.soundManager = new SoundManager();

    this.screenManager = new ScreenManager(
      canvas,
      this.ctx,
      () => this.startGame(),
      () => this.restartGame()
    );
    this.screenManager.showStartScreen();
    this.winSoundPlayed = false;
  }

  /**
   * Starts the game by setting the running state to true,
   * playing background music, initializing the level,
   * game objects, and starting the game loop.
   *
   * @function startGame
   * @returns {void} This function does not return a value.
   */
  startGame() {
    this.running = true;
    this.soundManager.playBackgroundMusic();
    this.soundManager.setVolumeToDown();
    this.soundManager.updateVolumeButton();

    initLevel();
    this.initializeGameObjects();
    this.setWorld();
    this.run();
    this.draw();
  }

  /**
   * Initializes the game objects required for the world,
   * including the character and status indicators.
   *
   * @function initializeGameObjects
   * @returns {void} This function does not return a value.
   */
  initializeGameObjects() {
    this.character = new Character(this.soundManager);
    this.statusHealth = new StatusHealth();
    this.statusCoin = new StatusCoin();
    this.statusBottle = new StatusBottle();
    this.statusEndboss = new StatusEndboss();
    this.level = level1;
    this.camera_x = 0;
    this.throwableObjects = [];
  }

  /**
   * Restarts the game by setting the running state to false
   * and calling the startGame function again.
   *
   * @function restartGame
   * @returns {void} This function does not return a value.
   */
  restartGame() {
    this.running = false;
    this.startGame();
  }

  /**
   * Runs the game loop, checking collisions and updates at a regular interval.
   *
   * @function run
   * @returns {void} This function does not return a value.
   */
  run() {
    if (!this.running) return;
    this.gameInterval = setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.checkCollectibles();
      this.checkEndbossVisibility();
      this.checkGameOver();
    }, 10);
  }

  /**
   * Ends the game and displays the appropriate screen based on the win status.
   *
   * @function endGame
   * @param {boolean} win - Indicates whether the game was won or lost.
   * @returns {void} This function does not return a value.
   */
  endGame(win) {
    this.running = false;
    this.stopGame();
    if (win) {
      if (!this.winSoundPlayed) {
        this.soundManager.playSound("winSound");
        this.winSoundPlayed = true;
      }
      this.screenManager.showWinScreen();
    } else {
      this.screenManager.showGameOverScreen();
    }
    this.soundManager.setVolumeToOff();
    this.soundManager.updateVolumeButton();
  }

  /**
   * Clears all intervals set in the game to stop any ongoing processes.
   *
   * @function clearAllIntervals
   * @returns {void} This function does not return a value.
   */
  clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  }

  /**
   * Stops the game by clearing all intervals.
   *
   * @function stopGame
   * @returns {void} This function does not return a value.
   */
  stopGame() {
    this.clearAllIntervals();
  }

  /**
   * Sets the world property of the character to the current world instance.
   *
   * @function setWorld
   * @returns {void} This function does not return a value.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Draws the game state on the canvas, including background, characters,
   * and objects based on their current state.
   *
   * @function draw
   * @returns {void} This function does not return a value.
   */
  draw() {
    if (!this.running) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMaps(this.level.backgroundObjects);
    this.addObjectsToMaps(this.level.clouds);
    this.addObjectsToMaps(this.level.bottles);
    this.addObjectsToMaps(this.level.coins);

    this.ctx.translate(-this.camera_x, 0);

    this.addToMap(this.statusHealth);
    this.addToMap(this.statusCoin);
    this.addToMap(this.statusBottle);
    this.addToMap(this.statusEndboss);

    this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.character);
    this.addObjectsToMaps(this.level.enemies);
    this.addObjectsToMaps(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);

    if (this.running) {
      requestAnimationFrame(() => this.draw());
    }
  }

  /**
   * Adds a collection of objects to the map for rendering.
   *
   * @function addObjectsToMaps
   * @param {Array} objects - An array of objects to be added to the map.
   * @returns {void} This function does not return a value.
   */
  addObjectsToMaps(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds a single map object to the canvas.
   *
   * @function addToMap
   * @param {Object} mo - The object to be added to the map.
   * @returns {void} This function does not return a value.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips the image for an object horizontally for rendering.
   *
   * @function flipImage
   * @param {Object} mo - The object whose image is to be flipped.
   * @returns {void} This function does not return a value.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width - 1, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores the original orientation of the object after flipping.
   *
   * @function flipImageBack
   * @param {Object} mo - The object whose image orientation is to be restored.
   * @returns {void} This function does not return a value.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /**
   * Checks if the game is over based on the character's energy level.
   *
   * @function checkGameOver
   * @returns {void} This function does not return a value.
   */
  checkGameOver() {
    if (this.character.energy <= 0 && this.running) {
      setTimeout(() => {
        this.endGame(false);
      }, 1000);
    }
  }

  /**
   * Checks the visibility of the end boss and starts its movement if necessary.
   *
   * @function checkEndbossVisibility
   * @returns {void} This function does not return a value.
   */
  checkEndbossVisibility() {
    if (this.character.x > 2100 && !this.level.enemies[0].moving) {
      this.level.enemies[0].startMoving();
    }
  }

  /**
   * Checks for collisions between the character and enemies in the game.
   *
   * @function checkCollisions
   * @returns {void} This function does not return a value.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (!enemy.isDead) {
        if (this.character.isColliding(enemy)) {
          this.processCharacterEnemyCollision(enemy);
        }
      }
    });

    this.detectThrowableCollisions();
  }

  /**
   * Processes the collision between the character and an enemy.
   *
   * @function processCharacterEnemyCollision
   * @param {Object} enemy - The enemy object involved in the collision.
   * @returns {void} This function does not return a value.
   */
  processCharacterEnemyCollision(enemy) {
    if (enemy instanceof Endboss) {
      this.handleEndbossCollision();
    } else if (this.isCharacterAbove(enemy)) {
      this.handleEnemyJumpedOn(enemy);
    } else {
      this.handleCharacterDamage();
    }
  }

  /**
   * Checks if the character is positioned above an enemy.
   *
   * @function isCharacterAbove
   * @param {Object} enemy - The enemy object to check against.
   * @returns {boolean} True if the character is above the enemy, false otherwise.
   */
  isCharacterAbove(enemy) {
    return (
      this.character.y + this.character.height <= enemy.y + enemy.height &&
      this.character.speedY <= 0
    );
  }

  /**
   * Handles the event when the character jumps on an enemy.
   *
   * @function handleEnemyJumpedOn
   * @param {Object} enemy - The enemy object that was jumped on.
   * @returns {void} This function does not return a value.
   */
  handleEnemyJumpedOn(enemy) {
    enemy.hit();
    this.soundManager.playSound("chickenKilled");
  }

  /**
   * Handles the collision with the end boss by damaging the character.
   *
   * @function handleEndbossCollision
   * @returns {void} This function does not return a value.
   */
  handleEndbossCollision() {
    this.character.hit();
    this.statusHealth.setPercentage(this.character.energy);
  }

  /**
   * Handles the general damage to the character from enemy collisions.
   *
   * @function handleCharacterDamage
   * @returns {void} This function does not return a value.
   */
  handleCharacterDamage() {
    this.character.hit();
    this.statusHealth.setPercentage(this.character.energy);
  }

  /**
   * Detects collisions between throwable objects and enemies.
   *
   * @function detectThrowableCollisions
   * @returns {void} This function does not return a value.
   */
  detectThrowableCollisions() {
    this.throwableObjects.forEach((bottle, bottleIndex) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy)) {
          if (enemy instanceof Endboss) {
            this.handleEndbossHit(bottleIndex, enemy);
          } else {
            this.handleEnemyHitByBottle(bottleIndex, enemy);
          }
        }
      });
    });
  }

  /**
   * Handles the collision when a bottle hits the end boss.
   *
   * @function handleEndbossHit
   * @param {number} bottleIndex - The index of the bottle in the throwableObjects array.
   * @param {Object} enemy - The end boss enemy object.
   * @returns {void} This function does not return a value.
   */
  handleEndbossHit(bottleIndex, enemy) {
    enemy.hit();
    this.throwableObjects.splice(bottleIndex, 1);
  }

  /**
   * Handles the collision when a bottle hits a regular enemy.
   *
   * @function handleEnemyHitByBottle
   * @param {number} bottleIndex - The index of the bottle in the throwableObjects array.
   * @param {Object} enemy - The enemy object that was hit by the bottle.
   * @returns {void} This function does not return a value.
   */
  handleEnemyHitByBottle(bottleIndex, enemy) {
    enemy.hit();
    this.throwableObjects.splice(bottleIndex, 1);
    this.soundManager.playSound("chickenKilled");
  }

  /**
   * Checks for throwing objects and manages the cooldown for throwing.
   *
   * @function checkThrowObjects
   * @returns {void} This function does not return a value.
   */
  checkThrowObjects() {
    const cooldownTime = 500;
    if (this.keyboard.D && this.character.bottlesCollected > 0) {
      const currentTime = new Date().getTime();

      if (currentTime > this.character.throwCooldown) {
        let bottle = new ThrowableObject(
          this.character.x + 100,
          this.character.y + 100,
          this.soundManager,
          this.character.otherDirection
        );
        this.throwableObjects.push(bottle);
        this.character.bottlesCollected -= 1;
        this.statusBottle.setPercentage(this.character.bottlesCollected * 20);
        this.character.throwCooldown = currentTime + cooldownTime;
      }
    }
  }

  /**
   * Checks for collectible items (coins and bottles) and collects them if colliding with the character.
   *
   * @function checkCollectibles
   * @returns {void} This function does not return a value.
   */
  checkCollectibles() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.collectCoin(index);
      }
    });

    this.level.bottles.forEach((bottle, index) => {
      if (
        this.character.bottlesCollected < 5 &&
        this.character.isColliding(bottle)
      ) {
        this.collectBottle(index);
      }
    });
  }

  /**
   * Collects a coin and updates the character's coin count and status.
   *
   * @function collectCoin
   * @param {number} index - The index of the coin in the level's coins array.
   * @returns {void} This function does not return a value.
   */
  collectCoin(index) {
    const coin = this.level.coins[index];
    this.soundManager.playSound("coinSound");
    this.character.coinsCollected += 1;
    this.level.coins.splice(index, 1);
    this.statusCoin.setPercentage(this.character.coinsCollected * 5);
  }

  /**
   * Collects a bottle and updates the character's bottle count and status.
   *
   * @function collectBottle
   * @param {number} index - The index of the bottle in the level's bottles array.
   * @returns {void} This function does not return a value.
   */
  collectBottle(index) {
    const bottle = this.level.bottles[index];
    this.soundManager.playSound("bottlePickSound");
    this.level.bottles.splice(index, 1);
    this.character.bottlesCollected += 1;
    this.statusBottle.setPercentage(this.character.bottlesCollected * 20);
  }
}
