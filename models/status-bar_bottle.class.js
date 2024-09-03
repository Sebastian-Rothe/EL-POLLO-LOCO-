class StatusBottle extends StatusBar {
    constructor() {
        super([
            './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
            './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
            './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
            './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
            './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
            './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
        ]);
        this.setPercentage(0);
        this.x = 10; 
        this.y = 80; 
    }
}