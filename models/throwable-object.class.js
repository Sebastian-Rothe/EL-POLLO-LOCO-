class ThrowableObject extends MovableObject {

    constructor(x, y, soundManager, otherDirection) {
        super().loadImage('./img/6_salsa_bottle/salsa_bottle.png');
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

        setInterval(() => {
            this.x += throwSpeed;
        }, 25);
    }
}
