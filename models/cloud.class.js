class Cloud extends MovableObject{
    y = 25;
    width = 500;
    height = 250;

    constructor(){
        super().loadImage('./img/5_background/layers/4_clouds/1.png');

        this.x = 0 + Math.random() * 500;
        this.animate();
       

    };
    animate(){
        this.moveLeft();
    }




}