class MovableObject { 
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;

    constructor(){
        
    };
    
    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    };

    loadImages(arr){
        arr.forEach((path) => {  
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    };

    moveRight() {
        console.log('Moving Right');
        
    }

    moveLeft(){
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

    playAnimation(images){
        let i = this.currentImage % this.Images_Walking.length; // let i = 0 % 6; loop => if i === length then start over...
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}

