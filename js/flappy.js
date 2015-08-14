// the Game object used by the phaser.io library
var stateActions = {preload: preload, create: create, update: update};
var score;
score = -3
var sheep;
var labelScore;
var player;
var gapSize;
var gapMargin;
var blockHeight;
var dog;
var pipes = [];

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);

/*
 * Loads all resources for the game and gives them names.
 */
jQuery("#greeting-form").on("submit", function (event_details) {
});
function preload() {
    game.load.image("playerImg", "../assets/sheep.png");
    game.load.audio("score", "../assets/point.ogg");
    game.load.image("backgroundImg", "../assets/grass.png");
    game.load.image("box", "../assets/fence2.png");
    game.load.image("dog", "../assets/dog.png")
    game.load.audio("lamb", "../assets/baalamb1.wav")


}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    //game.add.image(0,0, "backgroundImg");
    var background = game.add.image(0, 0, "backgroundImg");
    background.width = 790;
    background.height = 400
    game.add.text(50, 110, "WELCOME TO JUMP THE FENCE! ",
        {font: "50px Callibri", fill: "#197519"});


    /*   sheep = game.add.sprite(340,220, "playerImg");
     sheep.width=100;
     sheep.height=95;*/

    // set the background colour of the scene
    game.input
        .onDown
        .add(clickHandler);

    //alert(score);

    labelScore = game.add.text(20, 20, "0");
    player = game.add.sprite(200, 220, "playerImg");
    player.width = 75;
    player.height =70;
    game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
        .onDown.addOnce(startgame);

    dog = game.add.sprite (10, 340, "dog")
    dog.width = 65;
    dog.height = 60;


    var pipeInterval = 2;
    game.time.events
        .loop(pipeInterval * Phaser.Timer.SECOND, generatePipe);


}


function startgame() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    //player=game.add.sprite(80, 200, "playerImg");
    game.physics.arcade.enable(player);
    //player.body.velocity.x= 100;
    player.body.velocity.y = -25
    player.body.gravity.y = 600;
    game.input
        .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(spaceHandler);

        //.mouse.addKey(Phaser.Mouse.LEFT_BUTTON)
        //.onDown.add(spaceHandler)
    //player.body.gravity.x=50;
    //generatePipe();
}
function changeScore() {
    score = score + 1;
    if (score >0) {
        labelScore.setText(score.toString());
        game.sound.play("lamb");
    }



}
function clickHandler(event) {//alert("Click!");
//alert("The position is: " + event.x + "," +event.y);
    //game.add.sprite(event.x, event.y, "playerImg");
}
function spaceHandler() {
    player.body.velocity.y = -250;
}

/*function moveRight(){
 sheep.kill();
 player.x = player.x +10
 }*/

function gameOver() {
    player.kill();
    alert("GAME OVER!!");
    //game.physics.arcade.disable(player);
    score=-3;
    game.state.restart();




}
function generatePipe() {
    player.body.velocity.x = 0;


    var gapStart = game.rnd.integerInRange(1, 5);
    for (var count = 0; count < 8; count = count + 1) {
        if (count != gapStart && count != gapStart + 1 && count != gapStart + 2) {
            addPipeBlock(800, count * 50);
        }

    }
changeScore();

}

function addPipeBlock(x, y) {
    var block = game.add.sprite(x, y, "box");
    pipes.push(block);

    game.physics.arcade.enable(block);
    block.body.velocity.x = -100;

}


/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {

    if (player.y < 0 || player.y > 400) {
        gameOver();
    }
    {  game.physics.arcade.overlap (player,pipes, gameOver);}






}

