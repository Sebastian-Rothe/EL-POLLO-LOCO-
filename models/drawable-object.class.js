class DrawableObject {
  x = 120;
  y = 280;
  height = 150;
  width = 100;
  img;
  imageCache = {};
  currentImage = 0;

  constructor() {}

  /**
   * Loads an image for the object.
   *
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads multiple images into the cache for animation.
   *
   * @param {string[]} arr - An array of image paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws the object on the specified canvas context.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
