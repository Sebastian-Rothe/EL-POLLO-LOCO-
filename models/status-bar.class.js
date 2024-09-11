class StatusBar extends DrawableObject {
  /**
   * Initializes the StatusBar with given images and sets the initial percentage.
   * @constructor
   * @param {string[]} images - An array of image paths for different percentage levels.
   */
  constructor(images) {
    super();
    this.images = images;
    this.percentage = 100;
    this.loadImages(this.images);
    this.setPercentage(this.percentage);
    this.width = 200;
    this.height = 50;
  }

  /**
   * Sets the current percentage of the status bar and updates the displayed image.
   * @param {number} percentage - The new percentage value (0 to 100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.images[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the index of the image based on the current percentage.
   * @returns {number} The index of the image corresponding to the current percentage.
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
