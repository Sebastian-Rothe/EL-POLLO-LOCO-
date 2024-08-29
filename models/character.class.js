class Character extends MovableObject {
  height = 280;
  y = 150;
    Images_Walking = [      
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];

    constructor(){
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.Images_Walking);

        this.animate();

    };

    animate() {
        setInterval(() =>{
            let i = this.currentImage % this.Images_Walking.length; // let i = 0 % 6; loop => if i === length then start over...
            let path = this.Images_Walking[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 150);
    };
   
    jump(){

    }

}