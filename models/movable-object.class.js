class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  /**
   * Creates an instance of MovableObject.
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * Moves the object to the right.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Plays the animation using the provided image array.
   * @param {Array<string>} images - An array of image paths to animate.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Applies gravity to the object, making it fall over time.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the object is above the ground.
   * @returns {boolean} - True if above ground, false otherwise.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 145;
    }
  }

  /**
   * Makes the object jump by setting its vertical speed.
   */
  jump() {
    this.speedY = 30;
  }

  /**
   * Checks for a collision with another movable object.
   * @param {MovableObject} mo - The movable object to check against.
   * @returns {boolean} - True if there is a collision, false otherwise.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Reduces the energy of the object by one, and updates the last hit timestamp.
   */
  hit() {
    this.energy -= 1;
    if (this.energy <= 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks if the object is dead.
   * @returns {boolean} - True if energy is zero, false otherwise.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Checks if the object is hurt within the last second.
   * @returns {boolean} - True if the object is hurt, false otherwise.
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 1;
  }
}
