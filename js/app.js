/*  Enemies our player must avoid. Class takes 3 parameters. The initial column
*   from 1 to 5, the initial row from 1 to 6, and the speed at which the Enemy
*   automatically moves.
*/
var Enemy = function(initCol, initRow, speed) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.col = initCol;
    this.row = initRow;
    // see comments below on the functions transforming row & column number
    // to the x and y pixel coordinate
    this.colToXcoordinate();
    this.rowToYcoordinate();
    // Number of current enemies on the game board, will also be the index in allEnemies
    // number of this instantiated class thus the .numEnemies can be used
    // to remove this bug from the allEnemies array when it is off of the board
    this.numEnemies = allEnemies.length;
    // Property for the speed at which the sprite automatically moves
    // across the screen from left to right. Set to 0 for players
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Move sprite across the screen from right to left according to the speed
    // parameter. Once the sprite is off of the screen to the right, reset
    // sprites position to off the screen to the left.
    if(this.x <= 505){
      this.x = this.x + (this.speed * dt);
    } else {
      this.x = -101;
    }
};

/*  Code easier to read and interpret when the position of the sprites is in
    the number of rows and columns, thus I have abstracted in a function the
    transform from the row number to the y coordinate. I used a switch statement
    because I noticed that the positioning of the sprites using a constant number
    multiplied by a row number to be unsatisfactory visually in the rows towards
    the bottom of the table.. Something to do with the .png of the game tiles and
    the .png of the sprites.. so I've opted at this moment to write the switch
    statement instead of figure out how that is working and create a function
    to position the sprites.

    The switch statement takes the this.row (from 1-6, instead of 0-5) and assigns
    the y-coordinate which I think makes the game look good.

    I think dealing with discrete rows will also make the collision detection
    easier (if player.row === enemy.row) then check x pos
*/
Enemy.prototype.rowToYcoordinate = function() {
  switch (this.row) {
    case 1:
      this.y = -20;
      break;
    case 2:
      this.y = 60;
      break;
    case 3:
      this.y = 146;
      break;
    case 4:
      this.y = 228;
      break;
    case 5:
      this.y = 312;
      break;
    case 6:
      this.y = 390;
      break;
    default:
      this.y = 146; // default to the third row
  }
};

// function to turn column number (in 1 to 6) to the appropriate x coordinate
// All bugs begin in column 0 (off to the left of the game board)
// all columns are 101 px wide, thus to get canvas x position multiply column
// by 101 px
Enemy.prototype.colToXcoordinate = function() {
  this.x = 101 * (this.col - 1);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    this.rowToYcoordinate();
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
  // if(player.y < playerRowpx){
  //   player.x = playerColStart;
  //   player.y = playerRowStart;
  // } else {
  //   //change the x and y in accordance with the pressed keys
  // }
  allEnemies.forEach(function(enemy) {
      if(enemy.row === player.row){
        if(enemy.x > (player.x - 101) && enemy.x <= (player.x+101)){
          player.row = playerRowStart;
          player.col = playerColStart;
        }
      }
  });
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Create array allEnemies which will hold each instantiated Enemy. Need to
// make a helper function outside of enemy class to push the created enemy
// into the allEnemies array.
var allEnemies = [];
allEnemies.push(new Enemy(0,3,100));

// create variables for player starting point. Will be used in collisions and
// to reset game when the game is won.
var playerColStart = 3;
var playerRowStart = 6;
// instantiate player objects
var player = new Player(playerColStart,playerRowStart,0);

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

function checkCollisions() {
  allEnemies.forEach(function(enemy) {
      if(enemy.row === player.row){
        if(player.x > enemy.x+101 || player.x < enemy.x -101){
          player.row = playerRowStart;
          player.col = playerColStart;
        }
      }
  });
}
