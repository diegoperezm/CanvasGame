// GAME SETTINGS
let phases = 0; // ITERATE THIS INTEGER FOR EACH beginPhase()
let enemySpawnInterval = 30000; // ENEMY SPAWN INTERVAL TIMER IN MILISECONDS
let enemyWanderInterval = 5000; // ENEMY WANDER INTERVAL TIMER IN MILISECONDS
let enemyIds = []; // COLLECTION OF UNIQUE ENEMY IDS
var num = 10;
let rW = 10;
let rH = 10;
let rX = 10;
let rY = 10;
let levelBase = 1; // LOWEST LEVEL FOR AN ACTOR
let levelMax = 10; // HIGHEST LEVEL FOR AN ACTOR
let movementBase = 5; // LOWEST MOVEMENT SPEED FOR AN ACTOR
let healthBase = 10; // LOWEST HEALTH FOR AN ACTOR
let scale = 1; // CONTROLLER FOR AN ACTORS SIZE
let value = 10 * scale;
let keyPress = false; // SWITCH TO TRACK KEY PRESSES
let lastKey = null; // STORES LAST KEY PRESSED
let enemyLimit = 10; // MAX ALLOWABLE ENEMY ACTORS PRESENT ON GAME BOARD
let characters = { // STORES ACTOR OBJECTS
	Players: [], // STORES PLAYER OBJECTS (MIGHT NOT KEEP THIS SETUP)
	Enemies: [] // STORES ENEMY OBJECTS
}

// BOARD CONTROLS

// FUNCTION THAT REMOVES ALL DRAWN RECTANGLES UP TO CANVAS DIMENSIONS
function clearCanvas( canvas, svgContext ){
	svgContext.clearRect(0, 0, canvas.width, canvas.height);
}

// FUNCTION THAT DRAWS RECTANGLE ON CANVAS
function renderCanvas( svgContext, x, y, w, h ){
	svgContext.fillRect( x, y, w, h );
}

// ENDS PREVIOUS INTERACTION PHASE
function endPhase(){
	clearCanvas( canvas, map );
}

// BEGINS NEXT INTERACTION PHASE
function beginPhase(){
	drawActors();
}

// UTILITY FUNCTION WHICH DRAWS ALL SPAWNED CHARACTERS ON BOARD
function drawActors(){
	for( let col in characters ){
		for( let actor of characters[col] )
		renderCanvas(map, actor["X"], actor["Y"], actor["W"], actor["H"]);
	}
}

// GAME CONTROLS

// ENEMY CONSTRUCTOR
function BadGuy( args ){
	this.ID = args.id,
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

// PLAYER CONSTRUCTOR
function Player( args ){
	this.X = args.spawnX;
	this.Y = args.spawnY;
	this.W = args.level * 10;
	this.H = args.level * 10;
	this.Health = 15 * args.level;
	this.Strength = 1.5 * args.level
	this.Speed = movementBase + 10 / args.level;
	this.Height = 10 * args.level;
	this.Width = 10 * args.level;
}

function existsIn( checkFor, col ){
	for( let item of col ){
		if( checkFor !== item ) true;
	}

	return false;
}

function randomEnemyId(){
	let thisRandomId = Math.round(Math.random() * 1000);
	if( existsIn(thisRandomId, enemyIds) ) return false;

	enemyIds[enemyIds.length] = thisRandomId;
	return thisRandomId;
}

function randomChoice(){
	return Math.round(Math.random() * 1)
}

function movePlayer( object ){
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

function wander( obj ){
	let choices = {
		move: 0, // ENEMY DECIDES IF IT WILL MOVE
		moveX: 0, // ENEMY DECIDES IF IT WILL MOVE HORIZONTALLY
		moveY: 0, // ENEMY DECIDES IF IT WILL MOVE VERTICALLY
		direction: 1 // ENEMY DECIDES DIRECTION OF MOVEMENT
	}

	for( let choice in choices ){
		choices[choice] = randomChoice();
		if( choice === "direction" && choices[choice] === 0 ) choices[choice] = -1
	}

	if( choices["move"] ){
		if( choices["moveX"] ) obj["X"] += obj["Speed"] * choices["direction"]
		if( choices["moveY"] ) obj["Y"] += obj["Speed"] * choices["direction"]
	}
}

function didCollide( col ){
	let l = 0;

	while( l < col.length ){
		let matchingFor = col[l];

		for( let i = 0; i < col.length; i++ ){
			if( i !== l ){
				let matchingWith = col[i];
				if(
					collision( matchingFor, matchingWith )
				){
					console.log( matchingFor, "\n", matchingWith, "\nCollision!")
					alert("Collision!");
				}
			}
		}
		l++
	}
}

function collision( objOne, objTwo ){
  if(
    (objOne.X > objTwo.X - objOne.W && objOne.X < objTwo.X + objTwo.W)
    &&
    (objOne.Y > objTwo.Y - objOne.H && objOne.Y < objTwo.Y + objTwo.H)
  ){
    return true;
  }else{
    return false;
  }
}

function enemyDirection(  ){}

function enemyMove(  ){}

function enemyWander(  ){
	for( let enemy of characters["Enemies"] ){
		wander( enemy );
	}
	endPhase();
	beginPhase();
}

function createCharacter( args, cstr ){
	return new cstr(args);
}

function spawn( col, obj ){
	col[col["length"]] = obj;
}

// function despawn( )


// let enemiesThatRoamTogetherPwnTogether = window.setInterval(enemyWander, enemyWanderInterval);

let enemySpawnTimer = window.setInterval(function(){
	// let timer = 30000;
	// let enemySpawnTimerCountdown = window.setInterval(function(){
	// 	if( timer > 10000 ){
	// 		timer = timer - 5000;
	// 		console.log(`${timer/1000} seconds till enemy spawn.`);
	// 	}
	//
	// 	if( timer < 11000 ){
	// 		let enemySpawnTimerCountdownTen = window.setInterval(function(){
	// 			timer = timer - 1000;
	// 			console.log(`${timer/1000} seconds till enemy spawn.`);
	//
	// 			if( timer < 1000 ){
	// 				window.clearInterval(enemySpawnTimerCountdown);
	// 				window.clearInterval(enemySpawnTimerCountdownTen);
	// 			}
	// 		}, 1000);
	// 	}
	// }, 5000);

	if( characters["Enemies"]["length"] < enemyLimit ){
		let enemySpawnId = randomEnemyId();
		if( enemySpawnId ){
			spawn(
				characters["Enemies"],
				createCharacter(
					{ id: "E" + enemySpawnId, level: 1, spawnX: (Math.floor(Math.random() * canvas.width)), spawnY: (Math.floor(Math.random() * canvas.height)) },
					BadGuy
				)
			);

			renderCanvas( map,
				characters["Enemies"][characters["Enemies"]["length"] - 1]["X"],
				characters["Enemies"][characters["Enemies"]["length"] - 1]["Y"],
				characters["Enemies"][characters["Enemies"]["length"] - 1]["W"],
				characters["Enemies"][characters["Enemies"]["length"] - 1]["H"]
			);
		}
	}
}, enemySpawnInterval);

// INITIALIZE GAME BOARD

// Create & Spawn Player Arbitrarily
spawn( characters["Players"], createCharacter({ level: 1, spawnX: 25, spawnY: 25 }, Player) );
let player1 = characters.Players[0]
renderCanvas( map, player1.X, player1.Y, player1.W, player1.H )

// Player KeyPress
document.addEventListener("keydown", function(e){
	endPhase();
	keyPress = true;
	lastKey = e.keyCode;
	movePlayer( player1 );
	didCollide( [...characters["Players"], ...characters["Enemies"]] );
	beginPhase();
})

// Player KeyRelease
document.addEventListener("keyup", function(e){
	keyPress = false;
})
