class StatusHealth extends StatusBar {
  constructor() {
    super([
      "./img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
      "./img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
      "./img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
      "./img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
      "./img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
      "./img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
    ]);
    this.setPercentage(100);
    this.x = 10;
    this.y = 0;
  }
}
