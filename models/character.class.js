class Character extends MovableObject {
  height = 280;
  coinsCollected = 0;
  bottlesCollected = 0;
  isJumping = false; // Flag to track if the character is jumping
  jumpingImageIndex = 0; // Index to track the current jumping image
  throwCooldown = 0; // Abklingzeit in Millisekunden
  y = 20;
  standingTime = 0; // Zeit, die der Charakter steht
  standingTimer = null; // Timer für die stehende Zeit
  Images_Standing = [
    "./img/2_character_pepe/1_idle/idle/I-1.png",
    "./img/2_character_pepe/1_idle/idle/I-2.png",
    "./img/2_character_pepe/1_idle/idle/I-3.png",
    "./img/2_character_pepe/1_idle/idle/I-4.png",
    "./img/2_character_pepe/1_idle/idle/I-5.png",
    "./img/2_character_pepe/1_idle/idle/I-6.png",
    "./img/2_character_pepe/1_idle/idle/I-7.png",
    "./img/2_character_pepe/1_idle/idle/I-8.png",
    "./img/2_character_pepe/1_idle/idle/I-9.png",
    "./img/2_character_pepe/1_idle/idle/I-10.png"
  ];
  Images_Standing_Long = [
    './img/2_character_pepe/1_idle/long_idle/I-11.png',
    './img/2_character_pepe/1_idle/long_idle/I-12.png',
    './img/2_character_pepe/1_idle/long_idle/I-13.png',
    './img/2_character_pepe/1_idle/long_idle/I-14.png',
    './img/2_character_pepe/1_idle/long_idle/I-15.png',
    './img/2_character_pepe/1_idle/long_idle/I-16.png',
    './img/2_character_pepe/1_idle/long_idle/I-17.png',
    './img/2_character_pepe/1_idle/long_idle/I-18.png',
    './img/2_character_pepe/1_idle/long_idle/I-19.png',
    './img/2_character_pepe/1_idle/long_idle/I-20.png'
  ];
  Images_Walking = [
    "./img/2_character_pepe/2_walk/W-21.png",
    "./img/2_character_pepe/2_walk/W-22.png",
    "./img/2_character_pepe/2_walk/W-23.png",
    "./img/2_character_pepe/2_walk/W-24.png",
    "./img/2_character_pepe/2_walk/W-25.png",
    "./img/2_character_pepe/2_walk/W-26.png"
  ];
  Images_Jumping = [
    "./img/2_character_pepe/3_jump/J-31.png",
    "./img/2_character_pepe/3_jump/J-32.png",
    "./img/2_character_pepe/3_jump/J-33.png",
    "./img/2_character_pepe/3_jump/J-34.png",
    "./img/2_character_pepe/3_jump/J-35.png",
    "./img/2_character_pepe/3_jump/J-36.png",
    "./img/2_character_pepe/3_jump/J-37.png",
    "./img/2_character_pepe/3_jump/J-38.png",
    "./img/2_character_pepe/3_jump/J-39.png"
  ];
  Images_Dead = [
    "./img/2_character_pepe/5_dead/D-51.png",
    "./img/2_character_pepe/5_dead/D-52.png",
    "./img/2_character_pepe/5_dead/D-53.png",
    "./img/2_character_pepe/5_dead/D-54.png",
    "./img/2_character_pepe/5_dead/D-55.png",
    "./img/2_character_pepe/5_dead/D-56.png",
    "./img/2_character_pepe/5_dead/D-57.png"
  ];
  Images_Hurt = [
    "./img/2_character_pepe/4_hurt/H-41.png",
    "./img/2_character_pepe/4_hurt/H-42.png",
    "./img/2_character_pepe/4_hurt/H-43.png"
  ];
  world;
  speed = 10;

  constructor() {
    super().loadImage("./img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.Images_Walking);
    this.loadImages(this.Images_Jumping);
    this.loadImages(this.Images_Dead);
    this.loadImages(this.Images_Hurt);
    this.loadImages(this.Images_Standing);
    this.loadImages(this.Images_Standing_Long);
    this.applyGravity();
    this.animate();
  }
  animate() {
    setInterval(() => {
      this.handleMovement();
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
      this.updateAnimation();
    }, 100);
  }

  handleMovement() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.otherDirection = false;
      this.resetStandingDuration();
    }
    if (this.world.keyboard.LEFT && this.x > -600) {
      this.moveLeft();
      this.otherDirection = true;
      this.resetStandingDuration();
    }
    if (this.world.keyboard.SPACE && !this.isAboveGround() && !this.isJumping) {
      this.jump();
      this.isJumping = true; // Set flag to true when jumping starts
      this.jumpingImageIndex = 0; // Reset the index when the jump starts
      this.resetStandingDuration();
    } else if (!this.isAboveGround()) {
      this.startStandingDuration(); // Start counting standing duration
    }
  }


  updateAnimation() {
    if (this.isDead()) {
      this.playAnimation(this.Images_Dead);
    } else if (this.isHurt()) {
      this.playAnimation(this.Images_Hurt);
    } else if (this.isAboveGround()) {
      this.playJumpAnimationOnce(); // Play jumping animation once
    } else if (this.isStandingLong()) {
      this.playAnimation(this.Images_Standing_Long);
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.Images_Walking);
    } else {
      this.playAnimation(this.Images_Standing);
      this.isJumping = false; // Reset jumping flag when on the ground
    }
  }

  playJumpAnimationOnce() {
    if (this.jumpingImageIndex < this.Images_Jumping.length) {
      this.img = this.imageCache[this.Images_Jumping[this.jumpingImageIndex]];
      this.jumpingImageIndex++;
    }
    // After the last image, keep showing the last frame until the jump is over
  }

  isStandingLong() {
    return this.standingDuration >= 4000; // 4 Sekunden
  }

  startStandingDuration() {
    if (!this.standingTimer) {
      this.standingTimer = setInterval(() => {
        this.standingDuration += 100; 
      }, 100);
    }
  }

  resetStandingDuration() {
    clearInterval(this.standingTimer);
    this.standingTimer = null;
    this.standingDuration = 0; // Setze die Zeit zurück
  }
}


