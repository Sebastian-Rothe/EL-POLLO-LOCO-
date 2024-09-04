class Bottles extends MovableObject{ 
    offset = {
        top: 15,
        left: 40,
        right: 40,
        bottom: 15
      };
    Image_Bottle = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png'
    ]
   
    constructor(x, y) {
        super();
        this.loadImage(this.Image_Bottle[0]);
        this.x = x;
        this.y = y;
        this.width = 100;  
        this.height = 100; 
    }
}
