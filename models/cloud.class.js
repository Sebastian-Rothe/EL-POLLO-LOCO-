class Cloud extends MovableObject {
  y = 25;
  width = 500;
  height = 250;

  /**
   * Creates an instance of the Cloud class.
   *
   * @constructor
   */
  constructor() {
    super().loadImage("./img/5_background/layers/4_clouds/1.png");
    this.x = 0 + Math.random() * 2500;
    this.animate();
  }

  /**
   * Animates the cloud by moving it horizontally to the left.
   * @method
   */
  animate() {
    setInterval(() => {
      this.x -= 0.1;
    }, 1000 / 60);
    this.moveLeft();
  }
}
