class ThrowableObject extends MovableObject{

   
    
    constructor(x, y, soundManager){
        super().loadImage('./img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 70;
        this.soundManager = soundManager;
        this.throw();
    }


    throw(){
        this.speedY = 30;
        this.soundManager.playSound('throwSound');
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }
    
}