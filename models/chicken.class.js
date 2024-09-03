class Chicken extends MovableObject {
    y = 350;
    height = 70;
    width = 70;
    Images_Walking = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]

    Image_Dead = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]

    constructor(){
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.Images_Walking);
        this.x = 200 + Math.random() * 2000;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    };

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        
        setInterval(() =>{
            this.playAnimation(this.Images_Walking);
        }, 100);
    };
    
   
}