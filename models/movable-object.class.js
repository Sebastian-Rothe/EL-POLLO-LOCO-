class MovableObject extends DrawableObject{ 
    speed = 0.15;
    otherDirection = false;
    speedY = 0; // Fallgeschwindigkeit
    acceleration = 2.5; // Beschleunigung der Fallgeschwindigkeit
    energy = 100;
    lastHit = 0;


    constructor(){
        super();
    };
  
    moveRight() {
        this.x += this.speed;       
    }

    moveLeft(){
        this.x -= this.speed;
    }

    playAnimation(images){
        let i = this.currentImage % images.length; // let i = 0 % 6; loop => if i === length then start over...
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    applyGravity(){
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            };
        }, 1000 / 25);
    }

    isAboveGround(){
        if(this instanceof ThrowableObject){
            return true;
        } else {
            return this.y < 145;
        }
    }

    jump(){
        this.speedY = 30;
    }

    isColliding(mo){
        return this.x + this.width > mo.x &&
                this.y + this.height > mo.y && 
                this.x < mo.x &&
                this. y < mo.y + mo.height;
    }
    // isColliding(enemy) {
    //     return this.x + this.width > enemy.x &&  // Prüft, ob die rechte Seite des Charakters die linke Seite des Gegners überschneidet
    //            this.x < enemy.x + enemy.width && // Prüft, ob die linke Seite des Charakters die rechte Seite des Gegners überschneidet
    //            this.y + this.height > enemy.y && // Prüft, ob die untere Seite des Charakters die obere Seite des Gegners überschneidet
    //            this.y < enemy.y + enemy.height;  // Prüft, ob die obere Seite des Charakters die untere Seite des Gegners überschneidet
    // }

    isJumpingOn(mo) {
        return (
            this.y + this.height > mo.y && // Der Charakter ist über dem Huhn
            this.y + this.height < mo.y + mo.height && // Der Charakter ist unter dem Huhn (nicht zu tief)
            this.x + this.width > mo.x && // Horizontaler Überlappung
            this.x < mo.x + mo.width // Horizontaler Überlappung
        );
    }

    hit(){
        this.energy -= 1;
        if(this.energy <= 0){
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }
    isDead(){
        return this.energy == 0;
    }

    isHurt(){
        let timePassed = new Date().getTime() - this.lastHit; // difference in ms
        timePassed = timePassed / 1000; // difference in sec
        return timePassed < 1;

    }

}

