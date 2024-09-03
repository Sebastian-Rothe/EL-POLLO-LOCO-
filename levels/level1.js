const level1 = new Level(

    enemies = [
        // new Chicken(),
        // new Chicken(),
        // new Chicken(),
        new Endboss()
    ],

    clouds = [
        new Cloud(),
        // new Cloud(1000, 0),
        // new Cloud(3000, 0)
    ],

    coins = [
        new Coins(300, 400),
        new Coins(500, 350),
        new Coins(700, 300),
        new Coins(900, 250),
        new Coins(1100, 200),
        new Coins(1300, 150),
        new Coins(1500, 100)
    ],

    bottles = [
        new Bottles(1200, 170),
        new Bottles(1400, 120)
    ],

    backgroundObjects = [
        new BackgroundObject('./img/5_background/layers/air.png', -719),
        new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', -719),

        new BackgroundObject('./img/5_background/layers/air.png', 0),
        new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('./img/5_background/layers/air.png', 719),
        new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719),

        new BackgroundObject('./img/5_background/layers/air.png', 719 *2),
        new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719 *2),
        new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719 *2),
        new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719 *2),
        new BackgroundObject('./img/5_background/layers/air.png', 719 * 3),
        new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719 * 3),
        new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719 * 3),
        new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719 * 3),
    ]

);