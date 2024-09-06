class ThrowableObject extends MovableObject{

    throw_sound = new Audio ('audio/throw.mp3');
    
    constructor(x, y){
        super().loadImage('./img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 70;
        this.throw();
    }


    throw(){
        this.speedY = 30;
        this.throw_sound.play();
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }
    
}