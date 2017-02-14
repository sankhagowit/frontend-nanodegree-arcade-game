/*  Enemies our player must avoid. Class takes 3 parameters. The initial column
 *   from 1 to 5, the initial row from 1 to 6, and the speed at which the Enemy
 *   automatically moves.
 */
var numCols = 5;
var numRows = 6;

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
Enemy.prototype.update = function(dt, index) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Move sprite across the screen from right to left according to the speed
    // parameter. Once the sprite is off of the screen to the right its speed
    // is set to zero and it no longer changes.
    // I tried deleting the entry using splice and passing the index however
    // when multiple enemies left the screen around the same time the index
    // passed to this method was no longer consistent with the index of the
    // all Enemies array and thus it would sometimes delete an Enemy still
    // crossing the screen.
    // This however just loads the browser memory with these enemies off to the
    // right... how should I delete them?
    if (this.x <= 505) {
        this.x = this.x + (this.speed * dt);
    } else {
        this.x = -105;
        this.speed = 0;
        console.log('enemy \'deleted\'');
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
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(initRow, initCol, speed) {
    // delegate Enemy properties to player
    Enemy.call(this, initRow, initCol, speed);
    this.sprite = 'images/char-boy.png';
};
// Copy Enemy class methods to Player class
Player.prototype = Object.create(Enemy.prototype);
// reset Player prototype to player class from Enemy class
Player.prototype.constructor = Player;

Player.prototype.handleInput = function(keys) {
    switch (keys) {
        case 'up':
            // decrease player.row by 1 - update function will handle getting row = 1
            this.row--;
            break;
        case 'down':
            if (this.row < numRows) {
                this.row++;
            }
            break;
        case 'left':
            if (this.col > 1) {
                this.col--;
            }
            break;
        case 'right':
            if (this.col < numCols) {
                this.col++;
            }
            break;
        default:
            //Do nothing
    }

};

Player.prototype.update = function() {
    this.rowToYcoordinate();
    this.colToXcoordinate();

    if (this.row === 1) {
        // player has reached the goal of the game, reset location
        this.row = playerRowStart;
        this.col = playerColStart;
    }

    // Collision detection. The the enemy is on the same row as the player
    // then check if the x location of the bug is within the collision zone
    // which explicitly is the width of the bug (101px) less than player.x and
    // width of the bug greater than player.x location.
    allEnemies.forEach(function(enemy) {
        if (enemy.row === player.row) {
            if (enemy.x > (player.x - 101) && enemy.x <= (player.x + 101)) {
                player.row = playerRowStart;
                player.col = playerColStart;
            }
        }
    });

    // Randomly populate game board with enemies. While I don't really want
    // to put this in the player method, if it is in the enemy method it will be
    // called for each enemy and the number of enemies will quickly get ridiculious
    if (Math.random() <= 0.02) {
        console.log('enemy created');
        randomEnemy();
    }
};

// Create array allEnemies which will hold each instantiated Enemy. Need to
// make a helper function outside of enemy class to push the created enemy
// into the allEnemies array.
var allEnemies = [];
allEnemies.push(new Enemy(0, 3, 100));

// From MDN https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_integer_between_two_values_inclusive
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to randomly populate the row and the speed of the enemy using
// the above function getRandomIntInclusive
function randomEnemy() {
    var row = getRandomIntInclusive(2, 4);
    var speed = getRandomIntInclusive(50, 500);
    allEnemies.push(new Enemy(0, row, speed));
}

// create variables for player starting point. Will be used in collisions and
// to reset game when the game is won.
var playerColStart = 3;
var playerRowStart = 6;
// instantiate player objects
var player = new Player(playerColStart, playerRowStart, 0);

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
