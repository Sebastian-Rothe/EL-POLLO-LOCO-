class Coins extends MovableObject{
    offset = {
        top: 35,
        left: 35,
        right: 35,
        bottom: 35
      };
    Image_Coin = [
        './img/8_coin/coin_1.png'
    ];
    constructor(x, y) {
        super();
        this.loadImage(this.Image_Coin[0]);
        this.x = x;
        this.y = y;
        this.width = 100;  
        this.height = 100; 
    }

}