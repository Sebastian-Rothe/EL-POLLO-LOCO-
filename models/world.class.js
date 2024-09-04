class World {
    character = new Character();
    statusHealth = new StatusHealth(); 
    statusCoin = new StatusCoin();      
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
    }
    
    run(){
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollectibles(); // Neue Methode aufrufen
            this.checkEndbossVisibility(); // Überprüfen, ob der Endgegner sichtbar wird
            this.checkEndbossHit()
        },   50);
    }

    checkEndbossHit() {
        if (this.throwableObjects) {
            this.throwableObjects.forEach((bottle, bottleIndex) => {
                if (this.level.endboss.isColliding(bottle)) { 
                    
                        this.level.endboss.hit(); // Endboss wird getroffen
                    
                    this.level.endboss.updateEndbossStatus(); // Statusleiste aktualisieren
                    this.throwableObjects.splice(bottleIndex, 1); // Flasche entfernen
                }
            });
    }   
    }
    
    checkEndbossVisibility() {
        if (this.character.x > 2100 && !this.level.enemies[0].moving) {
            this.level.enemies[0].startMoving(); // Startet die Bewegung des Endgegners, wenn er in Sichtweite ist
        }
    }

    // checkCollisions(){
    //     this.level.enemies.forEach((enemy) => {
    //         if(this.character.isColliding(enemy) ) {
    //             this.character.hit();
    //             this.statusHealth.setPercentage(this.character.energy);
    //         }
    //     });
    // }

    checkCollisions() {
        this.level.enemies.forEach((enemy ) => {
            if (this.character.isColliding(enemy)) {
                if (!enemy.isDead) {
                    this.character.hit();
                    this.statusHealth.setPercentage(this.character.energy);
                } else if (enemy.isDead) {
                    return
                }
            }
            if (this.character.isJumpingOn(enemy) && !enemy.isDead) {
                    enemy.hit();
            }
        });
    }

    checkThrowObjects() {
        const cooldownTime = 500; // Abklingzeit in Millisekunden (z.B. 500ms)
    
        if (this.keyboard.D && this.character.bottlesCollected > 0) {
            const currentTime = new Date().getTime();
    
            if (currentTime > this.character.throwCooldown) {
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                this.throwableObjects.push(bottle);
                this.character.bottlesCollected -= 1;
                this.statusBottle.setPercentage(this.character.bottlesCollected * 20);
    
                // Setze die neue Abklingzeit
                this.character.throwCooldown = currentTime + cooldownTime;
            }
        }
    }

    checkCollectibles() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.collectCoin(index);
            }
        });
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.collectBottle(index);
            }
        });
    }
    
    collectCoin(index) {
        const coin = this.level.coins[index];
        console.log(`Collected Coin at position: (${coin.x}, ${coin.y})`);
        this.character.coinsCollected += 1;
        this.level.coins.splice(index, 1);
        this.statusCoin.setPercentage(this.character.coinsCollected * 5);
    }
    
    
    collectBottle(index) {
        const bottle = this.level.bottles[index];
        console.log(`Collected Bottle at position: (${bottle.x}, ${bottle.y})`); 
        this.level.bottles.splice(index, 1);
        this.character.bottlesCollected += 1; 
        this.statusBottle.setPercentage(this.character.bottlesCollected * 20); 
    }
    
    setWorld(){
        this.character.world = this;
    };

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMaps(this.level.backgroundObjects); // Hintergrund zuerst
        this.addObjectsToMaps(this.level.clouds);
        this.addObjectsToMaps(this.level.bottles); // Bottles zeichnen
        this.addObjectsToMaps(this.level.coins); // Coins zeichnen

        this.ctx.translate(-this.camera_x, 0);
        // ------ Space for fixed objects------------
        this.addToMap(this.statusHealth); 
        this.addToMap(this.statusCoin);   
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
        objects.forEach(o => {
            this.addToMap(o);
        });
    };

    addToMap(mo){
        if(mo.otherDirection){
           this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawCollisionFrame(this.ctx);


        if(mo.otherDirection){
         this.flipImageBack(mo);
        }
    }

    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width - 1, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo){
        mo.x = mo.x * -1;
        this.ctx.restore(); 
    }
}
