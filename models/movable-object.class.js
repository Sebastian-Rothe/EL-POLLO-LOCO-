class MovableObject { 
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;

    constructor(){
        
    };
    
    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    };

    moveRight() {
        console.log('Moving Right');
        
    }
}

