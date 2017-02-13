/*  Enemies our player must avoid. Class takes 3 parameters. The initial column
*   from 0 to 4, the initial row from 0 to 5, and the speed at which the Enemy
*   automatically moves.
*/
var Enemy = function(initCol, initRow, speed) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.col = initCol;
    this.row = initRow;
    // starting x coordinate from column number. All bugs begin in column -1
    // all columns are 101 px wide, thus to get canvas x position multiply column
    // by 101 px
    this.x = this.col * 101;
    // Initial y position or the initial row to start on with row 0 being the
    // first row rendered. Sprites are 101px wide, thus we take the row Number
    // Enemies can only start on the stone which are rows 1, 2, and 3 (top row 0)
    // It seems the px position to be aligned on a certain row changes depending
    // on what row the sprite is on, thus I will use a switch statement
    this.rowToYcoordinate();
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

/*  Code easier to read and interpret when the position of the sprites is in
*   the number of rows and columns, thus I have abstracted in a function the
*   transform from the row number to the y coordinate. I used a switch statement
*   because I noticed that the positioning of the sprites using a constant number
*   multiplied by a row number to be unsatisfactory visually in the rows towards
*   the bottom of the table. I think dealing with discrete rows will also make
*   the collision detection easier (if player.row === enemy.row) then check x pos
*/
Enemy.prototype.rowToYcoordinate = function() {
  switch (this.row) {
    case 0:
      this.y = -20;
      break;
    case 1:
      this.y = 60;
      break;
    case 2:
      this.y = 146;
      break;
    case 3:
      this.y = 228;
      break;
    case 4:
      this.y = 312;
      break;
    case 5:
      this.y = 390;
      break;
    default:
      this.y = 146; // default to the third row
  }
}

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
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Create array allEnemies which will hold each instantiated Enemy. Need to
// make a helper function outside of enemy class to push the created enemy
// into the allEnemies array.
var allEnemies = [];
allEnemies.push(new Enemy(-1,2,100));

var playerColStart = 2;
var playerRowStart = 5;

var player = new Player(2,5,0);

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
