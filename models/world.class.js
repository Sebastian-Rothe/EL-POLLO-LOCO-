class World {
    character = new Character();
    statusHealth = new StatusHealth(); 
    statusCorn = new StatusCorn();      
    statusBottle = new StatusBottle();  
    statusEndboss = new StatusEndboss(); 
    
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    throwableObjects = [];

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    };
    
    run(){
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);
    }
    
    checkCollisions(){
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy) ) {
                this.character.hit();
                this.statusHealth.setPercentage(this.character.energy)
            };
        })
    }
    checkThrowObjects(){
        if(this.keyboard.D){
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle)
        }
    }

    setWorld(){
        this.character.world = this;
    };

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMaps(this.level.backgroundObjects);
        this.addObjectsToMaps(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
        // ------ Space for fixed  objects------------
        this.addToMap(this.statusHealth); 
        this.addToMap(this.statusCorn);   
        this.addToMap(this.statusBottle); 
        this.addToMap(this.statusEndboss); 
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMaps(this.level.enemies);
        this.addObjectsToMaps(this.throwableObjects);

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
           this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if(mo.otherDirection){
         this.flipImageBack(mo);
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