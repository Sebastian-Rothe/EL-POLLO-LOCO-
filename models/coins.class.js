class Coins extends MovableObject{
    offset = {
        top: 35,
        left: 35,
        right: 35,
        bottom: 35
      };
    Images_Coin = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png'
    ];

    constructor(x, y) {
        super();
        this.loadImage('./img/8_coin/coin_1.png');
        this.loadImages(this.Images_Coin);
        this.x = x;
        this.y = y;
        this.width = 100;  
        this.height = 100; 
        this.animate();
    }
    animate() {
        setInterval(() => {
          this.playAnimation(this.Images_Coin);
        },  200);
      }
}