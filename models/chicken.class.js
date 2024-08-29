class Chicken extends MovableObject {
    y = 350;
    height = 70;
    width = 70;
    Images_Walking = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]

    constructor(){
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.Images_Walking);
        this.x = 200 + Math.random() * 500;
        this.animate();
    };

    animate() {
        setInterval(() =>{
            let i = this.currentImage % this.Images_Walking.length; 
            let path = this.Images_Walking[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 100);
    };
    
    moveLeft(){

    }
}