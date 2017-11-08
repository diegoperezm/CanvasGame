var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
var textarea = document.getElementById('code');
var reset = document.getElementById('reset');
var edit = document.getElementById('edit');
var code = textarea.value;

function clearCanvas(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  eval(textarea.value);
}

reset.addEventListener('click', function() {
  textarea.value = code;
  drawCanvas();
});

edit.addEventListener('click', function() {
  textarea.focus();
})

textarea.addEventListener('input', drawCanvas);
window.addEventListener('load', drawCanvas);
var num = 10;
let rW = 10;
let rH = 10;
let rX = 10;
let rY = 10;
let scale = 1;
let value = 10 * scale;
let keyPress = false;
let lastKey = null;

function move(){
	console.log("moving", rW, rH, lastKey);
	if( lastKey === 37 ){
		rX-=value
		console.log(rX - value)
	}else if( lastKey === 38 ){
		rY-=value
	}else if( lastKey === 39 ){
		rX+=value
	}else if( lastKey === 40 ){
		rY+=value
	}
	
	reDraw();
}

function reDraw(){
	ctx.fillRect(rX, rY, rW, rH);
}

function listen(){
	console.log("listening");
	move()
}

document.addEventListener("keydown", function(e){
	keyPress = true;
	lastKey = e.keyCode;
	clearCanvas()
	move()
})

document.addEventListener("keyup", function(e){
	keyPress = false;
})