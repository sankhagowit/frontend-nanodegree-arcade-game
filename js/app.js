// Enemies our player must avoid
var Enemy = function(initRow) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // starting x position. All bugs begin in first left column
    // which I believe is px 101 from the render function in engine.js x and y
    // values used to draw the game tiles.
    this.x = 101;
    // Initial y position, need to pass Enemy class a row to begin on. bugs
    // can only start on the stone which are rows 2, 3, and 4 (if top row is 1)
    this.y = initRow * 83;
    // Number of current enemies on the game board, will also be the index
    // number of this instantiated class thus the .numEnemies can be used
    // to remove this bug from the allEnemies array when it is off of the board
    this.numEnemies = allEnemies.length;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(initRow, initCol) {
  // delegate Enemy functionality to player
  // change player starting x and y to initial location on the board

}
Player.prototype.handleInput = function(keys){
  // need to update player position with
  // this function. Could abstract it it to
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Create array allEnemies which will hold each instantiated Enemy. Need to
// make a helper function outside of enemy class to push the created enemy
// into the allEnemies array.
var allEnemies = [];
// then can I just .push or .append a new Enemy into this? doens't need a name

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
