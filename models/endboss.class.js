class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 55;
  minX = 2300;
  maxX = 2700;
  isDead = false;
  movingForward = true;
  moving = false;
  hits = 0;
  maxHits = 5;
  offset = {
    top: 90,
    left: 20,
    right: 30,
    bottom: 20,
  };

  Images_Walking = [
    "./img/4_enemie_boss_chicken/2_alert/G5.png",
    "./img/4_enemie_boss_chicken/2_alert/G6.png",
    "./img/4_enemie_boss_chicken/2_alert/G7.png",
    "./img/4_enemie_boss_chicken/2_alert/G8.png",
    "./img/4_enemie_boss_chicken/2_alert/G9.png",
    "./img/4_enemie_boss_chicken/2_alert/G10.png",
    "./img/4_enemie_boss_chicken/2_alert/G11.png",
    "./img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  Images_Alert = [
    "./img/4_enemie_boss_chicken/2_alert/G5.png",
    "./img/4_enemie_boss_chicken/2_alert/G6.png",
    "./img/4_enemie_boss_chicken/2_alert/G7.png",
    "./img/4_enemie_boss_chicken/2_alert/G8.png",
    "./img/4_enemie_boss_chicken/2_alert/G9.png",
    "./img/4_enemie_boss_chicken/2_alert/G10.png",
    "./img/4_enemie_boss_chicken/2_alert/G11.png",
    "./img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  Images_Attack = [
    "./img/4_enemie_boss_chicken/3_attack/G13.png",
    "./img/4_enemie_boss_chicken/3_attack/G14.png",
    "./img/4_enemie_boss_chicken/3_attack/G15.png",
    "./img/4_enemie_boss_chicken/3_attack/G16.png",
    "./img/4_enemie_boss_chicken/3_attack/G17.png",
    "./img/4_enemie_boss_chicken/3_attack/G18.png",
    "./img/4_enemie_boss_chicken/3_attack/G19.png",
    "./img/4_enemie_boss_chicken/3_attack/G20.png",
  ];
  Images_Hurt = [
    "./img/4_enemie_boss_chicken/4_hurt/G21.png",
    "./img/4_enemie_boss_chicken/4_hurt/G22.png",
    "./img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];
  Images_Dead = [
    "./img/4_enemie_boss_chicken/5_dead/G24.png",
    "./img/4_enemie_boss_chicken/5_dead/G25.png",
    "./img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /**
   * Creates an instance of the Endboss class.
   *
   * @constructor
   */
  constructor() {
    super().loadImage(this.Images_Walking[0]);
    this.loadImages(this.Images_Walking);
    this.loadImages(this.Images_Alert);
    this.loadImages(this.Images_Attack);
    this.loadImages(this.Images_Hurt);
    this.loadImages(this.Images_Dead);
    this.x = 2500;
    this.animate();
  }

  /**
   * Handles when the end boss is hit.
   */
  hit() {
    this.hits++;
    this.playHurtAnimation();
    if (this.hits >= this.maxHits) {
      this.die();
    }
    this.updateEndbossStatus();
  }

  /**
   * Updates the end boss's status in the game world.
   */
  updateEndbossStatus() {
    let percentage = 100 - (this.hits / this.maxHits) * 100;
    world.statusEndboss.setPercentage(percentage);
  }

  /**
   * Clears all intervals set for the end boss.
   */
  clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  }

  /**
   * Handles the end boss's death.
   */
  die() {
    this.isDead = true;
    this.playDeadAnimation();
    this.moving = false;
    this.clearAllIntervals();
    setTimeout(() => {
      world.endGame(true);
    }, 1000);
  }

  /**
   * Plays the dead animation for the end boss.
   */
  playDeadAnimation() {
    this.moving = false;
    this.playAnimation(this.Images_Dead);
  }

  /**
   * Plays the hurt animation for the end boss.
   */
  playHurtAnimation() {
    this.moving = false;
    this.playAnimation(this.Images_Hurt);
    setTimeout(() => {
      if (!this.isDead) {
        this.moving = true;
      }
    }, 300);
  }

  /**
   * Starts the animation loop for the end boss.
   */
  animate() {
    this.alertPhase();
    setInterval(() => {
      if (this.moving) {
        this.move();
        this.playAnimation(this.Images_Walking);
      }
    }, 1000 / 60);
  }

  /**
   * Handles the alert phase of the end boss.
   */
  alertPhase() {
    this.playAnimation(this.Images_Alert);
    setTimeout(() => {
      this.startMoving();
    }, 2000);
  }

  /**
   * Moves the end boss back and forth within defined limits.
   */
  move() {
    if (this.movingForward) {
      this.moveForward();
    } else {
      this.moveBackward();
    }

    if (this.x >= this.maxX) {
      this.movingForward = false;
      this.attackPhase();
    } else if (this.x <= this.minX) {
      this.movingForward = true;
      this.attackPhase();
    }
  }

  /**
   * Moves the end boss forward.
   */
  moveForward() {
    this.speed = 7;
    this.x += this.speed;
  }

  /**
   * Moves the end boss backward.
   */
  moveBackward() {
    this.speed = Math.random() * 100 + 10;
    this.x -= this.speed;
  }

  /**
   * Starts the movement of the end boss after a delay.
   */
  startMoving() {
    setTimeout(() => {
      this.moving = true;
    }, 2000);
  }

  /**
   * Handles the attack phase of the end boss.
   */
  attackPhase() {
    this.moving = false;
    this.playAnimation(this.Images_Attack);
    setTimeout(() => {
      this.moving = true;
    }, 1000);
  }
}
