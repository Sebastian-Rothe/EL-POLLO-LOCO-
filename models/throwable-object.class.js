class ThrowableObject extends MovableObject {
  Images_Bottle = [
    "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];
  Images_Bottle_Splash = [
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * Initializes a new throwable object with position, sound manager, and direction.
   * @constructor
   * @param {number} x - The initial x-coordinate of the throwable object.
   * @param {number} y - The initial y-coordinate of the throwable object.
   * @param {SoundManager} soundManager - The sound manager for playing sounds.
   * @param {boolean} otherDirection - Indicates if the object is thrown in the opposite direction.
   */
  constructor(x, y, soundManager, otherDirection) {
    super().loadImage("./img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.Images_Bottle);
    this.loadImages(this.Images_Bottle_Splash);
    this.x = otherDirection ? x - 130 : x;
    this.y = y;
    this.width = 60;
    this.height = 70;
    this.soundManager = soundManager;
    this.otherDirection = otherDirection;
    this.throw();
  }

  /**
   * Throws the bottle with an upward velocity and applies gravity.
   */
  throw() {
    this.speedY = 30;
    this.soundManager.playSound("throwSound");
    this.applyGravity();
    const throwSpeed = this.otherDirection ? -10 : 10;

    this.thrownBottle = setInterval(() => {
      this.x += throwSpeed;
    }, 25);
    this.rotationBottle = setInterval(() => {
      this.playAnimation(this.Images_Bottle);
    }, 100);
  }
}
