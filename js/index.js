var canvas = document.getElementById('canvas');
var map = canvas.getContext("2d");

// Basic Function: Clear Canvas
function clearCanvas( canvas, svgContext ){
	svgContext.clearRect(0, 0, canvas.width, canvas.height);
}

// Basic Function: Draw Rectangle on Canvas
function renderCanvas( svgContext, x, y, w, h ){
	svgContext.fillRect( x, y, w, h );
}

function BadGuy( args ){
	this.X = args.spawnX;
	this.Y = args.spawnY;
	this.W = args.level * 10;
	this.H = args.level * 10;
	this.Health = 5 * args.level;
	this.Strength = 2 * args.level;
	this.Speed = movementBase + 10 / args.level;
	this.Height = 10 * args.level;
	this.Width = 10 * args.level;
}

function Player( args ){
	this.X = args.spawnX;
	this.Y = args.spawnY;
	this.W = args.level * 10;
	this.H = args.level * 10;
	this.Health = 15 * args.level;
	this.Strength = 1.5 * args.level;
	this.Speed = movementBase + 10 / args.level;
	this.Height = 10 * args.level;
	this.Width = 10 * args.level;
}

var num = 10;
let rW = 10;
let rH = 10;
let rX = 10;
let rY = 10;
let levelBase = 1;
let levelMax = 10;
let movementBase = 5;
let healthBase = 10;
let scale = 1;
let value = 10 * scale;
let keyPress = false;
let lastKey = null;
let characters = {
	Players: [],
	Enemies: []
}

// Create & Spawn Player Arbitrarily
characters.Players.push( new Player({ level: 1, spawnX: 25, spawnY: 25 }) )
let player1 = characters.Players[0]
renderCanvas( map, player1.X, player1.Y, player1.W, player1.H )

// Create & Spawn Enemies Arbitrarily
let enemySpawnTimer = window.setInterval(function(){
	characters.Enemies.push(new BadGuy({ level: 1, spawnX: (Math.floor(Math.random() * canvas.width)), spawnY: (Math.floor(Math.random() * canvas.height)) }))
	renderCanvas( map, enemy.X, enemy.Y, enemy.W, enemy.H )	
	console.log(characters.Enemies);
}, 30000);

function endPhase(){
	clearCanvas( canvas, map );
}

function beginPhase(){
	// Draw Characters
	renderCanvas( map, player1.X, player1.Y, player1.W, player1.H )
	for( enemy of characters.Enemies ){
		renderCanvas( map, enemy.X, enemy.Y, enemy.W, enemy.H )
	}
}

////      Move a Character Object
/////////////////////////////////
//
function move( object ){
	if( lastKey === 37 ){
		object.X -= object.Speed
	}else if( lastKey === 38 ){
		object.Y -= object.Speed
	}else if( lastKey === 39 ){
		object.X += object.Speed
	}else if( lastKey === 40 ){
		object.Y += object.Speed
	}
}

// Player KeyPress
document.addEventListener("keydown", function(e){
	endPhase()
	keyPress = true
	lastKey = e.keyCode
	move( player1 )
	beginPhase()
})

// Player KeyRelease
document.addEventListener("keyup", function(e){
	keyPress = false;
})