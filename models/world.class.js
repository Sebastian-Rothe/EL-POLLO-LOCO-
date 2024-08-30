class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    };


    setWorld(){
        this.character.world = this;
    };

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMaps(this.level.backgroundObjects);
        
        this.addToMap(this.character);
        this.addObjectsToMaps(this.level.enemies);
        this.addObjectsToMaps(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    };

    addObjectsToMaps(objects){
        objects.forEach( o => {
            this.addToMap(o);
        })
    };

    addToMap(mo){
        if(mo.otherDirection){
           this.flipImage(mo)
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        if(mo.otherDirection){
         this.flipImageBack(mo)
        }
    }

    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width -1, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo){
        mo.x = mo.x * -1;
        this.ctx.restore(); 
    }
}