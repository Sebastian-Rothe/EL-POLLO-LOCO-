class Coins extends MovableObject{

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