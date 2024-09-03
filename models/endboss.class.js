class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 55;
    minX = 2300; 
    maxX = 2700; 
    movingForward = true;
    moving = false;
    hits = 0; // Anzahl der Treffer
    maxHits = 5; // Maximale Trefferanzahl, bevor der Endboss stirbt

    Images_Walking = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    constructor() {
        super().loadImage(this.Images_Walking[0]);
        this.loadImages(this.Images_Walking);
        this.x = 2500;
        this.animate();
    }

    hit() {
        this.hits++;
        if (this.hits >= this.maxHits) {
            this.die();
        }
    }

    updateEndbossStatus() {
        let percentage = 100 - (this.hits / this.maxHits * 100);
        world.statusEndboss.setPercentage(percentage);
    }

    die() {
        console.log("Endboss is dead!");
        // Hier kann zusätzliche Logik hinzugefügt werden, z.B. das Entfernen des Endbosses aus dem Spiel
        this.moving = false;
        // Möglicherweise eine Animation oder ein Geräusch abspielen
    }

    animate() {
        setInterval(() => {
            if (this.moving) {
                this.move();
                this.playAnimation(this.Images_Walking);
            }
        }, 1000 / 60); // 60 FPS Animation
    }

    move() {
        if (this.movingForward) {
            this.moveForward();
        } else {
            this.moveBackward();
        }

        // Grenzkontrolle für Bewegung
        if (this.x >= this.maxX) {
            this.movingForward = false;
        } else if (this.x <= this.minX) {
            this.movingForward = true;
        }
    }
// right
    moveForward() {
        this.speed = 1; // langsame Vorwärtsbewegung
        this.x += this.speed;
    }
// left
    moveBackward() {
        this.speed = Math.random() * 5 + 3; // schnellere Rückwärtsbewegung mit zufälliger Geschwindigkeit zwischen 3 und 8
        this.x -= this.speed;
    }

    startMoving() {
        setTimeout(() => {
            this.moving = true;
        }, 2000); // Beginnt die Bewegung 2 Sekunden, nachdem der Spieler den Endboss sehen kann
    }
}
