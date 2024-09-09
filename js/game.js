let canvas;
let world;
let keyboard;
// let soundManager;

function init() {
  canvas = document.getElementById("canvas");
  keyboard = new Keyboard();
  // soundManager = new SoundManager();
  world = new World(canvas, keyboard);
}

