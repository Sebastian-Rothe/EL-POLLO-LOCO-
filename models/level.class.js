class Level {
    enemies;
    clouds;
    coins;
    bottles;
    backgroundObjects;
    level_end_x = 2700;

    constructor(enemies, clouds, coins, bottles, backgroundObjects){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
        this.endboss = this.enemies.find(enemy => enemy instanceof Endboss); // Endboss in enemies suchen und speichern
    }

}