class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;

  /**
   * Creates an instance of the BackgroundObject class.
   *
   * @constructor
   * @param {string} imagePath - The path to the image for the background object.
   * @param {number} x - The x-coordinate of the background object.
   * @param {number} y - The y-coordinate of the background object.
   */
  constructor(imagePath, x, y) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}
