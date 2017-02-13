// Enemies our player must avoid
var Enemy = function(initCol, initRow, speed) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // starting x position. All bugs begin in first left column
    // which I believe is px 101 from the render function in engine.js x and y
    // values used to draw the game tiles. initCol for bugs should be 0.
    this.x = initCol;
    // Initial y position, need to pass Enemy class a row to begin on. bugs
    // can only start on the stone which are rows 1, 2, and 3 (if top row is 0)
    this.y = initRow;
    // Number of current enemies on the game board, will also be the index
    // number of this instantiated class thus the .numEnemies can be used
    // to remove this bug from the allEnemies array when it is off of the board
    this.numEnemies = allEnemies.length;
    // Property for the speed at which the sprite automatically moves
    // across the screen from left to right ... maybe delete this
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // Going to try writing a function that just moves a bug across the
    // screen at a constant pace. For some reason the player disappears?
    if(this.x <= 505){
      this.x = this.x + (this.speed * dt);
    } else {
      this.x = -101;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(initRow, initCol, speed) {
  // delegate Enemy properties to player
  Enemy.call(this,initRow,initCol, speed);
  this.sprite = 'images/char-boy.png';
};
// Copy Enemy class methods to Player class
Player.prototype = Object.create(Enemy.prototype);
// reset Player prototype to player class from Enemy class
Player.prototype.constructor = Player;

Player.prototype.handleInput = function(keys){
  // need to update player position with
  // this function. Could abstract it it to
};

Player.prototype.update = function() {
  //will this reset the player update method?
  if(player.y < playerRowpx){
    player.x = playerColStart;
    player.y = playerRowStart;
  } else {
    //change the x and y in accordance with the pressed keys
  };
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Create array allEnemies which will hold each instantiated Enemy. Need to
// make a helper function outside of enemy class to push the created enemy
// into the allEnemies array.
var allEnemies = [];
// Create variables to transform bug row & col into px positions
var enemyColpx = 101;
var enemyRowpx = 73;
allEnemies.push(new Enemy(0*enemyColpx,2*enemyRowpx,100));

// Create variables to transform player row & col to px positions
var playerColpx = 101;
var playerRowpx = 83;
var playerColStart = 2*playerColpx;
var playerRowStart = 5*playerRowpx;

var player = new Player(playerColStart,playerRowStart,100);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//need to make a function called checkCollisions for the player
//so the player class should be very similar to the bug class , but have
// the checkCollisions
