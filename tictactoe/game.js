var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

// do cool things with the context
// context.font = '40pt Calibri';
// context.fillStyle = 'blue';
// context.fillText('Hello World!', 150, 100);

var height = context.canvas.height;
var width = context.canvas.width;

var gamefield = [[0,0,0], [0,0,0], [0,0,0]];

var newGame = function(height, width) {
	$("#turnDisplay").text("X Turn");
	context.clearRect(0, 0, width, height);
	gamefield = [[0,0,0], [0,0,0], [0,0,0]];

	for (var i = 0; i < 2; ++i){
		context.moveTo(width / 3 * (1 + i), 0);
		context.lineTo(width / 3 * (1 + i) , height);
		context.stroke();
	}

	for (var i = 0; i < 2; ++i){
		context.moveTo(0, height / 3 * (1 + i));
		context.lineTo(width, height / 3 * (1 + i));
		context.stroke();
	}

}

newGame(height, width);

canvasLeft = canvas.offsetLeft;
canvasTop = canvas.offsetTop;
canvas.addEventListener('click', function(event) {
	var x = event.pageX - canvasLeft,
		y = event.pageY - canvasTop;

	
})