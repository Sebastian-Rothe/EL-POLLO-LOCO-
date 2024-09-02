class StatusEndboss extends StatusBar {
    constructor() {
        super([
            './img/7_statusbars/2_statusbar_endboss/green/green0.png',
            './img/7_statusbars/2_statusbar_endboss/green/green20.png',
            './img/7_statusbars/2_statusbar_endboss/green/green40.png',
            './img/7_statusbars/2_statusbar_endboss/green/green60.png',
            './img/7_statusbars/2_statusbar_endboss/green/green80.png',
            './img/7_statusbars/2_statusbar_endboss/green/green100.png'
        ]);
        this.setPercentage(100);
        this.x = 500; 
        this.y = 0; 
    }
}