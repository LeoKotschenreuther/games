var TicTacToe = function (canvas) {
	this.canvas = canvas;
	this.context = canvas.getContext("2d");

	this.height = canvas.height;
	this.width = canvas.width;

	this.fieldHeight = this.height / 3;
	this.fieldWidth = this.width / 3;

	this.markMarginPercentage = 0.1;

	this.newGame();
	this.initializeClickEvents();
}

TicTacToe.prototype.newGame = function() {
	this.gamefield = [[0,0,0], [0,0,0], [0,0,0]];

	$("#turnDisplay").text("X Turn");
	this.context.clearRect(0, 0, this.width, this.height);
	gamefield = [[0,0,0], [0,0,0], [0,0,0]];

	for (var i = 0; i < 2; ++i){
		this.context.moveTo(this.width / 3 * (1 + i), 0);
		this.context.lineTo(this.width / 3 * (1 + i) , this.height);
		this.context.stroke();
	}

	for (var i = 0; i < 2; ++i){
		this.context.moveTo(0, this.height / 3 * (1 + i));
		this.context.lineTo(this.width, this.height / 3 * (1 + i));
		this.context.stroke();
	}
}

TicTacToe.prototype.areXAndYInField = function (x, y) {
	return (x >= 0 && x <= 2 && y >= 0 && y <= 2)
}

TicTacToe.prototype.makeMark = function (x, y, player) {
	// x and y should be in the interval [0, 2] and player should be 1 or 2
	if (!this.areXAndYInField(x, y) || player < 1 || player > 2) {
		return;
	}

	if (this.gamefield[x][y] != 0) {
		return;
	}

	this.gamefield[x][y] = player;
	if (player == 1) {
		this.drawX(x, y);
	}
	else if (player == 2) {
		this.drawO(x, y);
	}
}

TicTacToe.prototype.drawX = function (x, y) {
	// x and y should be in the interval [0, 2]
	if (!this.areXAndYInField(x, y)) {
		return;
	}

	this.context.moveTo(this.fieldWidth * (x + this.markMarginPercentage), this.fieldHeight * (y + this.markMarginPercentage));
	this.context.lineTo(this.fieldWidth * (x + 1 - this.markMarginPercentage), this.fieldHeight * (y + 1 - this.markMarginPercentage));
	this.context.stroke();

	this.context.moveTo(this.fieldWidth * (x + 1 - this.markMarginPercentage), this.fieldHeight * (y + this.markMarginPercentage));
	this.context.lineTo(this.fieldWidth * (x + this.markMarginPercentage), this.fieldHeight * (y + 1 - this.markMarginPercentage));
	this.context.stroke();
}

TicTacToe.prototype.drawO = function (x, y) {
	// x and y should be in the interval [0, 2]
	if (!this.areXAndYInField(x, y)) {
		return;
	}

	this.context.beginPath();
	this.context.arc(
		this.fieldWidth * (x + .5),
		this.fieldHeight * (y + .5),
		Math.min(this.fieldWidth, this.fieldHeight) * (1 - 2 * this.markMarginPercentage) * .5,
		0,
		2 * Math.PI
	);
	this.context.stroke();
}

TicTacToe.prototype.initializeClickEvents = function () {
	// canvasLeft = canvas.offsetLeft;
	// canvasTop = canvas.offsetTop;
	// canvas.addEventListener('click', function(event) {
	// 	var x = event.pageX - canvasLeft,
	// 		y = event.pageY - canvasTop;


	// })
}

var canvas = document.getElementById('myCanvas');
var ttt = new TicTacToe(canvas);

