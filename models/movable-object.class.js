class MovableObject { 
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;

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
}

