class Chicken extends MovableObject {
    y = 350;
    height = 70;
    width = 70;
    isDead = false; // Lebenszustand hinzufügen
    Images_Walking = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]

    Image_Dead = [
        './img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
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
            if (!this.isDead) { // Nur bewegen, wenn das Huhn nicht tot ist
            this.moveLeft();
            }
        }, 1000 / 60);
        
        setInterval(() =>{
            if (!this.isDead) { // Nur animieren, wenn das Huhn nicht tot ist
                this.playAnimation(this.Images_Walking);
            }
        }, 100);
    };

    hit() {
        this.isDead = true; // Huhn wird "tot"
        console.log('chicken is dead');
        this.loadImage(this.Image_Dead[0]); // Bild auf tot setzen
        this.y = 360;
    }
    
   
}