class World {
    constructor(canvas, keyboard, soundManager) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.running = false;   
        this.soundManager = soundManager;

        this.screenManager = new ScreenManager(
            canvas,
            this.ctx,
            () => this.startGame(),
            () => this.restartGame()
        );
        this.screenManager.showStartScreen();
     
    }

    startGame() {
        this.running = true;
        this.soundManager.playBackgroundMusic(); 
        initLevel(); 
        this.initializeGameObjects();
        this.setWorld();
        this.run();
        this.draw();
    }

    initializeGameObjects() {
        this.character = new Character();
        this.statusHealth = new StatusHealth();
        this.statusCoin = new StatusCoin();
        this.statusBottle = new StatusBottle();
        this.statusEndboss = new StatusEndboss();
        this.level = level1;
        this.camera_x = 0;
        this.throwableObjects = [];
    }

    restartGame() {
        this.running = false;
        this.resetGame();
        this.startGame();
    }

    resetGame() {
        this.stopGame(); // Intervalle stoppen
        this.throwableObjects = [];
        this.character = null;
        this.statusHealth = null;
        this.statusCoin = null;
        this.statusBottle = null;
        this.statusEndboss = null;
        this.level = null; // Level auf null setzen, wird im StartGame neu initialisiert
        this.camera_x = 0; // Kamera zurücksetzen
    }
    run() {
        if (!this.running) return;
        this.gameInterval = setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollectibles();
            this.checkEndbossVisibility();
            this.checkEndbossHit();
            this.checkGameOver();
        }, 50);
    }
    checkGameOver() {
        if (this.character.energy <= 0) {
            setTimeout(() => {
                this.endGame(false); 
            }, 1000);
        } else if (this.endboss && this.endboss.isDead) {
                this.endGame(true);
        } 
    }
    

    endGame(win) {
        this.running = false;
        this.stopGame();
        win ? this.screenManager.showWinScreen() : this.screenManager.showGameOverScreen();
    }

    stopGame() {
        clearInterval(this.gameInterval);
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
            if (this.character.isJumpingOn(enemy) && !enemy.isDead) {
                    enemy.hit();
                    return
            } else if (this.character.isColliding(enemy)) {
                if (!enemy.isDead) {
                    this.character.hit();
                    this.statusHealth.setPercentage(this.character.energy);
                } else if (enemy.isDead) {
                    return
                }
            }
        });
    }

    checkThrowObjects() {
        const cooldownTime = 500;
    
        if (this.keyboard.D && this.character.bottlesCollected > 0) {
            const currentTime = new Date().getTime();
    
            if (currentTime > this.character.throwCooldown) {
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                this.throwableObjects.push(bottle);
                this.character.bottlesCollected -= 1;
                this.statusBottle.setPercentage(this.character.bottlesCollected * 20);
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
        if (!this.running) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMaps(this.level.backgroundObjects); 
        this.addObjectsToMaps(this.level.clouds);
        this.addObjectsToMaps(this.level.bottles); 
        this.addObjectsToMaps(this.level.coins); 

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

        if (this.running) {
            requestAnimationFrame(() => this.draw());
        }
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


