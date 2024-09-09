class World {

    coin_sound = new Audio('audio/coin_picked.mp3');
    bottle_pick_sound = new Audio('audio/item_picked.mp3');
    win_sound = new Audio('audio/win.mp3');
    chicken_killed = new Audio('audio/chicken_killed.mp3');

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
        this.stopGame();
        this.throwableObjects = [];
        this.character = null;
        this.statusHealth = null;
        this.statusCoin = null;
        this.statusBottle = null;
        this.statusEndboss = null;
        this.level = null;
        this.camera_x = 0;
    }

    run() {
        if (!this.running) return;
        this.gameInterval = setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollectibles();
            this.checkEndbossVisibility();
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
        if (win) {
            if (this.win_sound.currentTime === 0) {
                this.win_sound.play();
            }
            this.screenManager.showWinScreen();
        } else {
            this.screenManager.showGameOverScreen();
        }
    }

    stopGame() {
        clearInterval(this.gameInterval);
    }

 
    checkEndbossVisibility() {
        if (this.character.x > 2100 && !this.level.enemies[0].moving) {
            this.level.enemies[0].startMoving();
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (!enemy.isDead) {
                if (this.character.isColliding(enemy)) {
                    this.processCharacterEnemyCollision(enemy);
                }
            }
        });

        this.detectThrowableCollisions();
    }

    processCharacterEnemyCollision(enemy) {
        if (enemy instanceof Endboss) {
            this.handleEndbossCollision();
        } else if (this.isCharacterAbove(enemy)) {
            this.handleEnemyJumpedOn(enemy);
        } else {
            this.handleCharacterDamage();
        }
    }

    handleEndbossCollision() {
        this.character.hit();
        this.statusHealth.setPercentage(this.character.energy);
    }

    handleEnemyJumpedOn(enemy) {
        enemy.hit();
        this.chicken_killed.play();
    }

    handleCharacterDamage() {
        this.character.hit();
        this.statusHealth.setPercentage(this.character.energy);
    }

    detectThrowableCollisions() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy)) {
                    if (enemy instanceof Endboss) {
                        this.handleEndbossHit(bottleIndex, enemy);
                    } else {
                        this.handleEnemyHitByBottle(bottleIndex, enemy);
                    }
                }
            });
        });
    }

    handleEndbossHit(bottleIndex, enemy) {
        enemy.hit(); 
        this.throwableObjects.splice(bottleIndex, 1); 
        this.bottle_pick_sound.play();
    }

    handleEnemyHitByBottle(bottleIndex, enemy) {
        enemy.hit();
        this.throwableObjects.splice(bottleIndex, 1);
        this.chicken_killed.play();
    }

    isCharacterAbove(enemy) {
        return this.character.y + this.character.height < enemy.y + enemy.height;
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
            if (this.character.bottlesCollected < 5 && this.character.isColliding(bottle)) {
                this.collectBottle(index);
            }
        });
    }

    collectCoin(index) {
        const coin = this.level.coins[index];
        this.coin_sound.play();
        this.character.coinsCollected += 1;
        this.level.coins.splice(index, 1);
        this.statusCoin.setPercentage(this.character.coinsCollected * 5);
    }

    collectBottle(index) {
        const bottle = this.level.bottles[index];
        this.bottle_pick_sound.play();
        this.level.bottles.splice(index, 1);
        this.character.bottlesCollected += 1;
        this.statusBottle.setPercentage(this.character.bottlesCollected * 20);
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        if (!this.running) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMaps(this.level.backgroundObjects);
        this.addObjectsToMaps(this.level.clouds);
        this.addObjectsToMaps(this.level.bottles);
        this.addObjectsToMaps(this.level.coins);

        this.ctx.translate(-this.camera_x, 0);

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
    }

    addObjectsToMaps(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawCollisionFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width - 1, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
