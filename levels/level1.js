let level1;

function initLevel() {
  level1 = new Level(
    (enemies = [
      new Endboss(),
      new ChickenSmall(),
      new ChickenSmall(),
      new ChickenSmall(),
      new ChickenSmall(),
      new ChickenSmall(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken()
    ]),

    (clouds = [
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
    ]),

    (coins = [
      new Coins(300, 300),
      new Coins(500, 350),
      new Coins(700, 300),
      new Coins(900, 350),
      new Coins(1100, 200),
      new Coins(1300, 150),
      new Coins(1500, 100),
      new Coins(1700, 250), 
      new Coins(1900, 220), 
      new Coins(2100, 200), 
    ]),

    (bottles = [
      new Bottles(1200, 170),
      new Bottles(1400, 120),
      new Bottles(1700, 120),
      new Bottles(-400, 320),
      new Bottles(1900, 200),
      new Bottles(2100, 200), 
      new Bottles(2300, 220), 
    ]),

    (backgroundObjects = [
      new BackgroundObject("./img/5_background/layers/air.png", -719),
      new BackgroundObject(
        "./img/5_background/layers/3_third_layer/2.png",
        -719
      ),
      new BackgroundObject(
        "./img/5_background/layers/2_second_layer/2.png",
        -719
      ),
      new BackgroundObject(
        "./img/5_background/layers/1_first_layer/2.png",
        -719
      ),

      new BackgroundObject("./img/5_background/layers/air.png", 0),
      new BackgroundObject("./img/5_background/layers/3_third_layer/1.png", 0),
      new BackgroundObject("./img/5_background/layers/2_second_layer/1.png", 0),
      new BackgroundObject("./img/5_background/layers/1_first_layer/1.png", 0),
      new BackgroundObject("./img/5_background/layers/air.png", 719),
      new BackgroundObject(
        "./img/5_background/layers/3_third_layer/2.png",
        719
      ),
      new BackgroundObject(
        "./img/5_background/layers/2_second_layer/2.png",
        719
      ),
      new BackgroundObject(
        "./img/5_background/layers/1_first_layer/2.png",
        719
      ),

      new BackgroundObject("./img/5_background/layers/air.png", 719 * 2),
      new BackgroundObject(
        "./img/5_background/layers/3_third_layer/1.png",
        719 * 2
      ),
      new BackgroundObject(
        "./img/5_background/layers/2_second_layer/1.png",
        719 * 2
      ),
      new BackgroundObject(
        "./img/5_background/layers/1_first_layer/1.png",
        719 * 2
      ),
      new BackgroundObject("./img/5_background/layers/air.png", 719 * 3),
      new BackgroundObject(
        "./img/5_background/layers/3_third_layer/2.png",
        719 * 3
      ),
      new BackgroundObject(
        "./img/5_background/layers/2_second_layer/2.png",
        719 * 3
      ),
      new BackgroundObject(
        "./img/5_background/layers/1_first_layer/2.png",
        719 * 3
      ),
      new BackgroundObject("./img/5_background/layers/air.png", 719 * 4),
      new BackgroundObject(
        "./img/5_background/layers/3_third_layer/1.png",
        719 * 4
      ),
      new BackgroundObject(
        "./img/5_background/layers/2_second_layer/1.png",
        719 * 4
      ),
      new BackgroundObject(
        "./img/5_background/layers/1_first_layer/1.png",
        719 * 4
      ),
    ])
  );
}
