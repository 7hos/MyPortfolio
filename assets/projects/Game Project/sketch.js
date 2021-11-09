/*

The Game Project 6 - Making a complete level II

Week 8

*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var realPos;

var isLeft;
var isRight;
var isJumping;
var isFalling;

var clouds;
var mountains;
var trees;
var houseXs;

var iceCream;
var canyons;

var score;
var lives;
var isLost;
var isWon;

var enimies;

function setup()

{
createCanvas(1024, 576);
floorPos_y = height * 3/4;
score = 0;
lives = 3;
startGame();
}

function startGame()

{
// Variable to control the background scrolling.
scrollPos = 0;
gameChar_x = width/2;
gameChar_y = floorPos_y;


// Variable to store the real position of the gameChar in the game
// world. Needed for collision detection.
realPos = gameChar_x - scrollPos;

// Boolean variables to control the movement of the game character.
isLeft = false;
isRight = false;
isJumping = false;
isFalling = false;

isLost = false;
isWon = false;

// Initialise arrays of scenery objects.


    houseXs = [random (-50,50),random (-150,150),random (-300,300),random (-500,500),random (-870,870),random (-1000, 1000)];


clouds = [];

for (var i = 0; i < 100 ; i++ )
{
    var c = { pos_x : random(0,8000), pos_y: random (100,200)};
    clouds.push(c);
}

mountains = [];

for (var i = 0; i < 30 ; i++ )
    {
        var m = { pos_x : random(-300,4000), pos_y: floorPos_y-246};
        mountains.push(m);

    }


trees = [];

for (var i = 0; i < 30 ; i++ )
    {
        var t= { pos_x : random(-300,4000), pos_y:floorPos_y-74 };
        trees.push(t);

    }


iceCream = [
    { x_pos: 190, y_pos: floorPos_y-40, size: 20, isFound: false},
    { x_pos: 490, y_pos: floorPos_y-40, size: 20, isFound: false},
    { x_pos: 700, y_pos: floorPos_y-40, size: 20, isFound: false},
    { x_pos: 900, y_pos: floorPos_y-40, size: 20, isFound: false},
    { x_pos: -80, y_pos: floorPos_y-40, size: 20, isFound: false},
    { x_pos: 450, y_pos: floorPos_y-40, size: 20, isFound: false},
    { x_pos: 90, y_pos: floorPos_y-40, size: 20, isFound: false},

]

canyons = [
    { x_pos: 700, width: 100},
    { x_pos: 1000, width: 100},
    { x_pos: 300, width: 100},
    { x_pos: 150, width: 100}
]
    
    

    enemies = [];
    //enemy1
    enemies.push(
    {
        x_pos: 75,
        y_pos: floorPos_y,
        x1: 70,
        x2: 260,
        speed: 3,
        size: 30,
        display: function()
        {
            // Draw enemy.
            stroke(0);
            fill(255,0,0);
            ellipse (this.x_pos, this.y_pos,40,40)
            
        },
        move: function()
        {
            this.x_pos += this.speed;
            if(this.x_pos < this.x1 || this.x_pos > this.x2)
            {
                //reverse direction
                this.speed *= -1;
            }
        },

        checkCharCollision: function()
        {
            if( abs(realPos - this.x_pos) < 34 && abs(gameChar_y - this.y_pos) < 20 )
            {
                playerDied();
            }
        }

    }
    );
    
    //enemy2
    enemies.push(
    {
        x_pos: 850,
        y_pos: floorPos_y,
        x1: 800,
        x2: 1020,
        speed: 3,
        size: 5,
        display: function()
        {
            // Draw enemy.

            stroke(0);
            fill(0,255,0);
             ellipse (this.x_pos, this.y_pos,40,40)

        },
        move: function()
        {
            this.x_pos += this.speed;
            if(this.x_pos < this.x1 || this.x_pos > this.x2)
                {
                    //reverse direction
                    this.speed *= -1;
                }
        },

        checkCharCollision: function()
        {
            if( abs(realPos - this.x_pos) < 34 && abs(gameChar_y - this.y_pos) < 20 )
                {
                    playerDied();
                }
        }
    }
    );
}
function draw()
{
background(100, 155, 255); // fill the sky blue

noStroke();
fill(0, 155, 0);
rect(0, floorPos_y, width, height*2/4);
// draw some green ground

// Draw clouds.

push();
translate(scrollPos/4,0);
drawclouds();
pop();

// Draw mountains.

push();
translate(scrollPos/3,0);
drawmountains();
pop();

// Draw trees.

push();
translate(scrollPos/2,0);
drawtrees();
pop();

// Draw houses.

push();
translate(scrollPos,0);
drawhouses();
pop();

    
// Draw canyons.

push();

translate(scrollPos,0);
for( var i = 0; i < canyons.length; i++)
{
    drawCanyon(canyons[i]);
    checkCanyon(canyons[i]);
}
pop();

checkPlayerWon();
checkPlayerDied();

// Draw pickup items.

push();
translate(scrollPos,0);
for ( var i = 0 ; i < iceCream.length; i++)
    {
drawiceCream(iceCream[i]);
checkiceCream(iceCream[i]);
    }
pop();
    
    // Draw enemies.
    
    push();
    translate(scrollPos,0);
    for ( var i = 0; i < enemies.length; i++)
        {
            enemies[i].display();
            enemies[i].move();
            enemies[i].checkCharCollision();
        }
    pop();
    
   

// Draw game character.
drawGameChar();

fill(0);
noStroke();
text("score: " + score, 20,30);
text("lives: ", 20,70);
for(var i = 0; i < lives; i++)
        {
            stroke(0);
            fill(255,0,0);
            ellipse(60+i*30,65, 20,20);
        }
    
if(isLost == true)
{
    fill(0);
    textSize(36);
    text("Game over - you lost. Press space to continue...", 50, height/2);
}

if(isWon == true)
{
  
    fill(0);
    textSize(50);
    text("Game over - you win. Press space to continue...", 50, height/2);
}

// Logic to make the game character move or the background scroll.
if(isLeft)
{
    if(gameChar_x > width * 0.2)
    {
        gameChar_x -= 5;
    }
    else
    {
        scrollPos += 5;
    }
}

if(isRight)
{
    if(gameChar_x < width * 0.8)
    {
        gameChar_x  += 5;
    }
    else
    {
        scrollPos -= 5; // negative for moving against the background
    }
}

// Logic to make the game character rise and fall.
if(gameChar_y < floorPos_y)
{
        gameChar_y += 2;
        isJumping = true;
}
else
{
        isJumping = false;
}

if(isFalling)
{
        gameChar_y += 10;
}

// Update real position of gameChar for collision detection.
realPos = gameChar_x - scrollPos;
}

// ---------------------
// Key control functions
// ---------------------

function keyPressed()
{
    // console.log(keyCode);
    // console.log(key);

if(key == 'A' || keyCode == 37)
{
        isLeft = true;
}

if(key == 'D' || keyCode == 39)
{
        isRight = true;
}

if(key == ' ' || key == 'W')
{
        if(!isJumping)
        {
                gameChar_y -= 100;
        }
}
if(isLost || isWon)
{
    if(key == ' ')
    {
        nextLevel();
    }
    return;
}
}

function keyReleased()
{
if(key == 'A' || keyCode == 37)
{
    isLeft = false;
}

if(key == 'D' || keyCode == 39)
{
    isRight = false;
}

}


// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar()
{ 
// draw game character
//the game character
if(isLeft && isJumping)
{
    // add your jumping-left code
/*penguin Jumping to the left */
//body
fill(0,0,0);
ellipse(gameChar_x,gameChar_y,25,35);
//feet
stroke(0,0,0);
fill(255,165,0);
ellipse(gameChar_x-5,gameChar_y+17,5,10);
ellipse(gameChar_x-2,gameChar_y+17,10,5);
//belly
noStroke();
stroke(0,0,0);
fill(255,255,255);
ellipse(gameChar_x-7,gameChar_y+5,10,20);
noStroke();
//eyes
ellipse(gameChar_x-7,gameChar_y-8,4,6);
//pupils
fill(0,0,0);
ellipse(gameChar_x-8,gameChar_y-8,3,3);
//nose
fill(255,165,0);
triangle(gameChar_x-11,gameChar_y-9,gameChar_x-17,gameChar_y-5,gameChar_x-12,gameChar_y-5);
//arms
fill(0,0,0);
triangle(gameChar_x-3,gameChar_y-2,gameChar_x-2,gameChar_y+4,gameChar_x-9,gameChar_y-2);

}
else if(isRight && isJumping)
{
    // add your jumping-right code




    /*penguin Jumping to the right */
//body
fill(0,0,0);
ellipse(gameChar_x,gameChar_y,25,35);
//feet
stroke(0,0,0);
fill(255,165,0);
ellipse(gameChar_x+6,gameChar_y+17,5,10);
ellipse(gameChar_x+3,gameChar_y+17,10,5);
//belly
noStroke();
stroke(0,0,0);
fill(255,255,255);
ellipse(gameChar_x+7,gameChar_y+5,10,20);
noStroke();
//eyes
ellipse(gameChar_x+7,gameChar_y-8,4,6);
//pupils
fill(0,0,0);
ellipse(gameChar_x+8,gameChar_y-8,3,3);
//nose
fill(255,165,0);
triangle(gameChar_x+11,gameChar_y-9,gameChar_x+6,gameChar_y-5,gameChar_x+12,gameChar_y-5);
//arms
fill(0,0,0);
triangle(gameChar_x+2,gameChar_y-2,gameChar_x+2,gameChar_y+4,gameChar_x+8,gameChar_y-2);

}
else if(isLeft)
{
  /*penguin Walking left */
//body
fill(0,0,0);
ellipse(gameChar_x,gameChar_y,25,35);
//feet
stroke(0,0,0);
fill(255,165,0);
ellipse(gameChar_x-5,gameChar_y+17,10,5);
ellipse(gameChar_x-3,gameChar_y+17,10,5);
//belly
noStroke();
stroke(0,0,0);
fill(255,255,255);
ellipse(gameChar_x-7,gameChar_y+5,10,20);
noStroke();
//eyes
ellipse(gameChar_x-7,gameChar_y-8,4,6);
//pupils
fill(0,0,0);
ellipse(gameChar_x-8,gameChar_y-8,3,3);
//nose
fill(255,165,0);
triangle(gameChar_x-11,gameChar_y-9,gameChar_x-17,gameChar_y-5,gameChar_x-12,gameChar_y-5);
//arms
fill(0,0,0);
triangle(gameChar_x-3,gameChar_y-2,gameChar_x-2,gameChar_y+4,gameChar_x-7,gameChar_y+5);


}
else if(isRight)
{
  // add your walking right code
    /*penguin Walking right */
//body
fill(0,0,0);
ellipse(gameChar_x,gameChar_y,25,35);
//feet
stroke(0,0,0);
fill(255,165,0);
ellipse(gameChar_x+6,gameChar_y+17,10,5);
ellipse(gameChar_x+3,gameChar_y+17,10,5);
//belly
noStroke();
stroke(0,0,0);
fill(255,255,255);
ellipse(gameChar_x+7,gameChar_y+5,10,20);
noStroke();
//eyes
ellipse(gameChar_x+7,gameChar_y-8,4,6);
//pupils
fill(0,0,0);
ellipse(gameChar_x+8,gameChar_y-8,3,3);
//nose
fill(255,165,0);
triangle(gameChar_x+11,gameChar_y-9,gameChar_x+16,gameChar_y-5,gameChar_x+12,gameChar_y-5);
//arms
fill(0,0,0);
triangle(gameChar_x+2,gameChar_y-2,gameChar_x-7,gameChar_y+4,gameChar_x+8,gameChar_y+5);

}
else if(isJumping || isFalling)
{
    // add your jumping facing forwards code


//body
fill(0,0,0);
ellipse(gameChar_x,gameChar_y,25,35);
//feet
stroke(0,0,0);
fill(255,165,0);
ellipse(gameChar_x-5,gameChar_y+20,5,10);
ellipse(gameChar_x+5,gameChar_y+20,5,10);
//belly
noStroke();
fill(255,255,255);
ellipse(gameChar_x,gameChar_y+5,20,20);
//eyes
ellipse(gameChar_x-5,gameChar_y-8,4,6);
ellipse(gameChar_x+5,gameChar_y-8,4,6);
//pupils
fill(0,0,0)
ellipse(gameChar_x-5,gameChar_y-8,3,3);
ellipse(gameChar_x+5,gameChar_y-8,3,3);
//nose
fill(255,165,0);
triangle(gameChar_x-4,gameChar_y-5,gameChar_x+4,gameChar_y-5,gameChar_x,gameChar_y-1);
//arms
fill(0,0,0);
triangle(gameChar_x-13,gameChar_y-2,gameChar_x-13,gameChar_y+4,gameChar_x-17,gameChar_y-4);
triangle(gameChar_x+13,gameChar_y-2,gameChar_x+13,gameChar_y+4,gameChar_x+17,gameChar_y-4);

}
else
{

    /*penguin standing front facing*/
//body
fill(0,0,0);
ellipse(gameChar_x,gameChar_y,25,35);
//feet
stroke(0,0,0);
fill(255,165,0);
ellipse(gameChar_x-5,gameChar_y+17,10,5);
ellipse(gameChar_x+5,gameChar_y+17,10,5);
//belly
noStroke();
fill(255,255,255);
ellipse(gameChar_x,gameChar_y+5,20,20);
//eyes
ellipse(gameChar_x-5,gameChar_y-8,4,6);
ellipse(gameChar_x+5,gameChar_y-8,4,6);
//pupils
fill(0,0,0);
ellipse(gameChar_x-5,gameChar_y-8,3,3);
ellipse(gameChar_x+5,gameChar_y-8,3,3);
//nose
fill(255,165,0);
triangle(gameChar_x-4,gameChar_y-5,gameChar_x+4,gameChar_y-5,gameChar_x,gameChar_y-1);
//arms
fill(0,0,0);

    triangle(gameChar_x-13,gameChar_y-2,gameChar_x-13,gameChar_y+4,gameChar_x-17,gameChar_y+5);

    triangle(gameChar_x+13,gameChar_y-2,gameChar_x+13,gameChar_y+4,gameChar_x+17,gameChar_y+5);
}
}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.

function drawclouds()
{
for(var i = 0; i < clouds.length; i++)
{
noStroke();
//fulmini
 fill(random(255,105),random(255,105),random(255,105))
triangle(clouds[i].pos_x+70,clouds[i].pos_y, clouds[i].pos_x+70, clouds[i].pos_y+60, clouds[i].pos_x+90,clouds[i].pos_y);
triangle(clouds[i].pos_x+110,clouds[i].pos_y, clouds[i].pos_x+110, clouds[i].pos_y+110, clouds[i].pos_x+130,clouds[i].pos_y);

    fill(105);
ellipse(clouds[i].pos_x+70, clouds[i].pos_y, 80, 45);
ellipse(clouds[i].pos_x+110, clouds[i].pos_y, 65, 55);
ellipse(clouds[i].pos_x+150, clouds[i].pos_y, 65, 55);
ellipse(clouds[i].pos_x+88, clouds[i].pos_y-20, 45, 45);
ellipse(clouds[i].pos_x+129, clouds[i].pos_y-20, 75, 75);
ellipse(clouds[i].pos_x+165, clouds[i].pos_y-22, 35, 35);
ellipse(clouds[i].pos_x+176, clouds[i].pos_y, 75, 45);

}   
}


// Function to draw mountains objects.
function drawmountains()
{
for (var i=0; i<mountains.length; i++)

{

fill(205,205,205) 

triangle(mountains[i].pos_x,mountains[i].pos_y,mountains[i].pos_x+100,mountains[i].pos_y+246,mountains[i].pos_x-80,mountains[i].pos_y+246);
triangle(mountains[i].pos_x+25,mountains[i].pos_y+20,mountains[i].pos_x+120,mountains[i].pos_y+246,mountains[i].pos_x-60,mountains[i].pos_y+246);
triangle(mountains[i].pos_x-40,mountains[i].pos_y+90,mountains[i].pos_x+100,mountains[i].pos_y+246,mountains[i].pos_x-100,mountains[i].pos_y+246);
triangle(mountains[i].pos_x+66,mountains[i].pos_y+60,mountains[i].pos_x+160,mountains[i].pos_y+246,mountains[i].pos_x-80,mountains[i].pos_y+246);

fill(255,255,255);
triangle(mountains[i].pos_x,mountains[i].pos_y,mountains[i].pos_x+23,mountains[i].pos_y+60,mountains[i].pos_x-18,mountains[i].pos_y+60);
triangle(mountains[i].pos_x+25,mountains[i].pos_y+20,mountains[i].pos_x+40,mountains[i].pos_y+60,mountains[i].pos_x+10,mountains[i].pos_y+60);



}   
}


// Function to draw trees objects.

function drawtrees()
{
for (var i=0; i<trees.length; i++)
{

noStroke();
fill(0,153,0);
ellipse(trees[i].pos_x,trees[i].pos_y-4, 95, 45);
ellipse(trees[i].pos_x,trees[i].pos_y-20, 75, 35);
ellipse(trees[i].pos_x,trees[i].pos_y-35, 35, 25);
fill(139,69,19);
rect(trees[i].pos_x-5,trees[i].pos_y-5,15,79);

}
}

// Function to draw houses objects.
function drawhouses()
{
for(var i = 0; i < houseXs.length; i++)
{
//house
stroke(0,0,0);
fill(12,169,179);
rect(houseXs[i]-100,floorPos_y-54,69,54);
fill(255,0,0);
triangle(houseXs[i]-110,floorPos_y-54,houseXs[i]-60,floorPos_y-82,houseXs[i]-20,floorPos_y-52);
//door
stroke(0,0,0);
fill(255,255,255);
rect(houseXs[i]-70,floorPos_y-19,10,19);
fill(214,234,255);
rect(houseXs[i]-90,floorPos_y-44,10,10);
rect(houseXs[i]-55,floorPos_y-44,10,10);

} 
}

// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyons objects.

function drawCanyon(f_canyons)
{
fill(50,50,0);
rect(f_canyons.x_pos, floorPos_y, f_canyons.width, height - floorPos_y);   
}

// Function to check character is over a canyons.

function checkCanyon(f_canyons)
{  
if (gameChar_y >= floorPos_y-35)
{
    if (realPos > f_canyons.x_pos && realPos < f_canyons.x_pos+f_canyons.width)
    {
        gameChar_y += 10;
    }
}   
}

// ----------------------------------
// Pick-up render and check functions
// ----------------------------------

// Function to draw pick-up objects.

function drawiceCream(f_iceCream)
{
if(f_iceCream.isFound == false)
{
stroke(0);
fill(255,255,0);
ellipse(f_iceCream.x_pos+8,floorPos_y-68,30,30);
fill(0,156,255);
ellipse(f_iceCream.x_pos+18,floorPos_y-55,30,30);
fill(255,20,147);
ellipse(f_iceCream.x_pos-2,floorPos_y-55,30,30);
fill(255,128,0);
triangle(f_iceCream.x_pos+8,floorPos_y+25,f_iceCream.x_pos-12,floorPos_y-45,f_iceCream.x_pos+28,floorPos_y-45)
noStroke();
}
}

// Function to check character has picked up an item.

function checkiceCream(f_iceCream)  
{
if(f_iceCream.isFound == false)
{
    distance= dist(f_iceCream.x_pos, f_iceCream.y_pos, realPos, gameChar_y);
    print(distance)
}

if (distance <= 50)
{
    if (!f_iceCream.isFound)
        {
f_iceCream.isFound = true;
    score += 1;
}
}
}

function checkPlayerWon()
{

if(score == iceCream.length)
{
    isWon = true;
    //console.log("You Won!")
    return isWon;
}
}
function playerDied()
{
    //console.log('player died!');
    score = 0;
    lives--;
    if (lives > 0)
    {
        // Restart game.
        startGame();
    }
    else
    {
        // Game over, player lost.
        isLost = true;
    }
}

function checkPlayerDied()
{
    if(gameChar_y > height)
    {
        //console.log("Game Over!");
        background(252);
        playerDied();
        if(lives > 0)
        {
            startGame();
        }
        else
        { 
            isLost = true;
        }
    }
}

function nextLevel()
{
// DO NOT CHANGE THIS FUNCTION!
console.log('next level');
}
