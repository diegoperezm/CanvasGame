// BOARD SETTINGS
var canvas = document.getElementById('canvas'); // STORE CANVAS ELEMENT
var map = canvas.getContext("2d"); // STORE RENDERING CONTEXT
function debug( command ){
	const commands = {
		"Actors": function(){
			console.table([...characters["Players"], ...characters["Enemies"]]);
		},
		"Players": function(){
			console.table(characters["Players"]);
		},
		"Enemies": function(){
			console.table(characters["Enemies"]);
		}
	}
}
