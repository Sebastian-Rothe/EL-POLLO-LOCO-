class Level {
  enemies;
  clouds;
  coins;
  bottles;
  backgroundObjects;
  level_end_x = 2700;

  /**
   * Creates an instance of the Level class.
   *
   * @param {Array<MovableObject>} enemies - An array of enemies in the level.
   * @param {Array<Cloud>} clouds - An array of clouds in the level.
   * @param {Array<Coins>} coins - An array of coins in the level.
   * @param {Array<Bottle>} bottles - An array of bottles in the level.
   * @param {Array<DrawableObject>} backgroundObjects - An array of background objects in the level.
   * @constructor
   */
  constructor(enemies, clouds, coins, bottles, backgroundObjects) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.bottles = bottles;
    this.endboss = this.enemies.find((enemy) => enemy instanceof Endboss);
  }
}
