class DrawableObject {
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;

    constructor(){

    }
  
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

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    
    drawCollisionFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Coins || this instanceof Bottles) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
    
            const collisionX = this.x + this.offset.left;
            const collisionY = this.y + this.offset.top;
            const collisionWidth = this.width - this.offset.left - this.offset.right;
            const collisionHeight = this.height - this.offset.top - this.offset.bottom;
    
            ctx.rect(collisionX, collisionY, collisionWidth, collisionHeight);
            ctx.stroke();
        }
    }
    
}