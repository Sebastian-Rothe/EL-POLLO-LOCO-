class Character extends MovableObject {
  height = 280;
  coinsCollected = 0;
  bottlesCollected = 0;
  y = 20;
    Images_Walking = [      
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];
    Images_Jumping = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png'
    ];
    Images_Dead = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png'
    ];
    Images_Hurt = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png'
    ];
    world;
    speed = 10;

    constructor(){
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.Images_Walking);
        this.loadImages(this.Images_Jumping);
        this.loadImages(this.Images_Dead);
        this.loadImages(this.Images_Hurt);
        this.applyGravity();
        this.animate();

    };

    animate() {
        setInterval(() => {
            if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x){
                this.moveRight();
                this.otherDirection = false;
                 // line for sound
            }
            if(this.world.keyboard.LEFT && this.x > 0){
               this.moveLeft();
               this.otherDirection = true;
                // line for sound
            }
            if(this.world.keyboard.SPACE && !this.isAboveGround()){
               this.jump();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() =>{
            if(this,this.isDead()){
                this.playAnimation(this.Images_Dead);
            } else if(this.isHurt()){
                this.playAnimation(this.Images_Hurt);
            } else if(this.isAboveGround()){
                this.playAnimation(this.Images_Jumping);
            } else {
                if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT){
                    this.playAnimation(this.Images_Walking);  
                }

            }

        }, 50);
    };
   
   

}