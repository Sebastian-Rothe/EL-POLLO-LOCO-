class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 55;
    minX = 2300; 
    maxX = 2700; 
    isDead = false; // Lebenszustand hinzufügen
    movingForward = true;
    moving = false;
    hits = 0; // Anzahl der Treffer
    maxHits = 5; // Maximale Trefferanzahl, bevor der Endboss stirbt
    offset = {
        top: 90,
        left: 20,
        right: 30,
        bottom: 20
      };

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

    Images_Alert = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    Images_Attack = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    Images_Hurt = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    Images_Dead = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor() {
        super().loadImage(this.Images_Walking[0]);
        this.loadImages(this.Images_Walking);
        this.loadImages(this.Images_Alert);
        this.loadImages(this.Images_Attack);
        this.loadImages(this.Images_Hurt);
        this.loadImages(this.Images_Dead);
        this.x = 2500;
        this.animate();
    }

    hit() {
        this.hits++;
        this.playHurtAnimation();
        if (this.hits >= this.maxHits) {
            this.die();
        }
        this.updateEndbossStatus();
    }

    updateEndbossStatus() {
        let percentage = 100 - (this.hits / this.maxHits * 100);
        world.statusEndboss.setPercentage(percentage);
    }

    die() {
        this.isDead = true;
        this.playDeadAnimation(); 
        console.log("Endboss is dead!");
        this.moving = false;
      
        setInterval(() => {
            world.endGame(true); // true signalisiert einen Sieg
        }, 1000);
    }

    playHurtAnimation() {
        this.moving = false; 
        this.playAnimation(this.Images_Hurt); 
        setTimeout(() => {
            if (!this.isDead) {
                this.moving = true; 
            }
        }, 2000); 
    }

    playDeadAnimation() {
        this.moving = false; 
        this.playAnimation(this.Images_Dead);
    }

    animate() {
        this.alertPhase();
        setInterval(() => {
            if (this.moving) {
                this.move();
                this.playAnimation(this.Images_Walking);
            }
        }, 1000 / 60); // 60 FPS Animation
    }

    alertPhase() {
        this.playAnimation(this.Images_Alert);
        setTimeout(() => {
            this.startMoving();
        }, 2000); 
    }

    move() {
        if (this.movingForward) {
            this.moveForward();
        } else {
            this.moveBackward();
        }

        if (this.x >= this.maxX) {
            this.movingForward = false;
            this.attackPhase(); 
        } else if (this.x <= this.minX) {
            this.movingForward = true;
            this.attackPhase(); 
        }
    }
// right
    moveForward() {
        this.speed = 1; // langsame Vorwärtsbewegung
        this.x += this.speed;
    }
// left
    moveBackward() {
        this.speed = Math.random() * 10 + 10; // schnellere Rückwärtsbewegung mit zufälliger Geschwindigkeit zwischen 3 und 8
        this.x -= this.speed;
    }

    startMoving() {
        setTimeout(() => {
            this.moving = true;
        }, 2000); // Beginnt die Bewegung 2 Sekunden, nachdem der Spieler den Endboss sehen kann
    }
    attackPhase() {
        this.moving = false; // Stoppe die Bewegung während des Angriffs
        this.playAnimation(this.Images_Attack); // Angriffsanimation abspielen
        setTimeout(() => {
            this.moving = true; // Bewegung nach dem Angriff fortsetzen
        }, 1000); // Angriff dauert 1 Sekunde
    }
}
