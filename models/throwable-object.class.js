class ThrowableObject extends MovableObject {

    Images_Bottle = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]
    Images_Bottle_Splash = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]

    constructor(x, y, soundManager, otherDirection) {
        super().loadImage('./img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.Images_Bottle);
        this.loadImages(this.Images_Bottle_Splash);
        this.x = otherDirection ? x - 130 : x;
        this.y = y;
        this.width = 60;
        this.height = 70;
        this.soundManager = soundManager;
        this.otherDirection = otherDirection;
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.soundManager.playSound('throwSound');
        this.applyGravity();
        const throwSpeed = this.otherDirection ? -10 : 10;

        this.thrownBottle = setInterval(() => {
            this.x += throwSpeed;
        }, 25);
        this.rotationBottle = setInterval(() => {
            this.playAnimation(this.Images_Bottle);
        }, 100);
    }

   
    playSplashAnimation() {
        console.log('Splash Animation Triggered');
        if (this.isSplashing) return;
    
        this.isSplashing = true; // Flag setzen
        clearInterval(this.thrownBottle);
        clearInterval(this.rotationBottle);
    
        // Füge die Splash-Animation als eigene Animation hinzu
        this.playAnimation(this.Images_Bottle_Splash);
    
        // Setze die Y-Position für die Animation
        const originalY = this.y; // Original Y-Position speichern
        let splashYPosition = originalY; // Temporäre Y-Position für die Splash-Animation
        let splashAnimationFrame = 0; // Frame-Index für die Splash-Animation
    
        // Intervall zur Aktualisierung der Splash-Animation
        this.splashAnimationInterval = setInterval(() => {
            if (splashAnimationFrame < this.Images_Bottle_Splash.length) {
                this.img = this.imageCache[this.Images_Bottle_Splash[splashAnimationFrame]]; // Setze das aktuelle Bild
                splashAnimationFrame++; // Erhöhe den Frame-Index
            } else {
                clearInterval(this.splashAnimationInterval);
                this.isSplashing = false; // Animation abgeschlossen
                this.y = originalY; // Stelle die Y-Position zurück
            }
            splashYPosition += 5; // Optional: Bewege die Splash-Animation nach unten
            this.y = splashYPosition; // Aktualisiere die Y-Position
        }, 100); // Setze die Frame-Rate auf 10 FPS (100ms)
    }
    
    
}
