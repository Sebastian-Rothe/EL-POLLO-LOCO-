class Chicken extends MovableObject {
  y = 350;
  height = 70;
  width = 70;
  isDead = false;
  offset = {
    top: 15,
    left: 10,
    right: 10,
    bottom: 10,
  };

  Images_Walking = [
    "./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  Image_Dead = ["./img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  /**
   * Creates an instance of the Chicken class.
   *
   * @constructor
   */
  constructor() {
    super().loadImage("./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.Images_Walking);
    this.x = 200 + Math.random() * 2000;
    this.speed = 0.15 + Math.random() * 0.5;
    this.animate();
  }

  /**
   * Animates the chicken's movement and walking animation.
   * @method
   */
  animate() {
    setInterval(() => {
      if (!this.isDead) {
        this.moveLeft();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (!this.isDead) {
        this.playAnimation(this.Images_Walking);
      }
    }, 100);
  }

  /**
   * Handles the chicken being hit, setting it to dead and changing its image.
   * @method
   */
  hit() {
    this.isDead = true;
    this.loadImage(this.Image_Dead[0]);
    this.y = 360;
  }
}
