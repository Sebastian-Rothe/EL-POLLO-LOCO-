let canvas;
let world;
let keyboard;

/**
 * Initializes the game by setting up the canvas, keyboard, and world.
 * 
 * This function retrieves the canvas element from the HTML document,
 * creates a new instance of the Keyboard class, and initializes the
 * World class with the canvas and keyboard instances.
 * 
 * @function init
 * @returns {void} This function does not return a value.
 */
function init() {
  canvas = document.getElementById("canvas");
  keyboard = new Keyboard();
  world = new World(canvas, keyboard);
}


