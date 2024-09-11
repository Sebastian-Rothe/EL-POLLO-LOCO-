class Bottles extends MovableObject {
  offset = {
    top: 15,
    left: 40,
    right: 40,
    bottom: 15,
  };
  // Images_Bottle = [
  //     './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
  //     './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
  //     './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
  //     './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
  // ]

  Images_Bottle_On_Ground = [
    "./img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "./img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  /**
   * Creates an instance of the Bottles class.
   *
   * @constructor
   * @param {number} x - The x-coordinate of the bottle.
   * @param {number} y - The y-coordinate of the bottle.
   */
  constructor(x, y) {
    super();
    this.loadImage(
      "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );
    this.loadImages(this.Images_Bottle_On_Ground);
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    this.animate();
  }

  /**
   * Animates the bottle by cycling through its images.
   *
   * @function animate
   * @returns {void} This function does not return a value.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.Images_Bottle_On_Ground);
    }, 1000 / 3);
  }
}
