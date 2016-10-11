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
	this.currentPlayer = 1;
	this.isGameRunning = true;

	$("#turnDisplay").text("X Turn");
	this.context.clearRect(0, 0, this.width, this.height);

	for (var i = 0; i < 2; ++i){
		this.context.beginPath()
		this.context.moveTo(this.width / 3 * (1 + i), 0);
		this.context.lineTo(this.width / 3 * (1 + i) , this.height);
		this.context.moveTo(0, this.height / 3 * (1 + i));
		this.context.lineTo(this.width, this.height / 3 * (1 + i));
		this.context.stroke();
	}
}

TicTacToe.prototype.currentPlayerSymbol = function () {
	return this.currentPlayer == 1 ? "X" : "O";
}

TicTacToe.prototype.nextPlayer = function () {
	this.currentPlayer = this.currentPlayer == 1 ? 2 : 1;
	$("#turnDisplay").text(this.currentPlayerSymbol() + " Turn");
}

TicTacToe.prototype.areXAndYInField = function (x, y) {
	return (x >= 0 && x <= 2 && y >= 0 && y <= 2)
}

TicTacToe.prototype.makeMark = function (x, y) {
	// x and y should be in the interval [0, 2]
	if (!this.areXAndYInField(x, y)) {
		return;
	}

	if (this.gamefield[x][y] != 0) {
		return;
	}

	this.gamefield[x][y] = this.currentPlayer;
	if (this.currentPlayer == 1) {
		this.drawX(x, y);
	}
	else if (this.currentPlayer == 2) {
		this.drawO(x, y);
	}

	isvictory = this.currentPlayerHasWon();
	if (isvictory) {
		this.isGameRunning = false;
		$("#turnDisplay").text(this.currentPlayerSymbol() + " has won!");
	}
	else if (this.isDraw()) {
		this.isGameRunning = false;
		$("#turnDisplay").text("Draw");
	}
	else {
		this.nextPlayer();
	}
}

TicTacToe.prototype.drawX = function (x, y) {
	// x and y should be in the interval [0, 2]
	if (!this.areXAndYInField(x, y)) {
		return;
	}

	this.context.beginPath()
	this.context.moveTo(this.fieldWidth * (x + this.markMarginPercentage), this.fieldHeight * (y + this.markMarginPercentage));
	this.context.lineTo(this.fieldWidth * (x + 1 - this.markMarginPercentage), this.fieldHeight * (y + 1 - this.markMarginPercentage));

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

TicTacToe.prototype.isDraw = function () {
	for (var x = 0; x < 3; ++x) {
		for (var y = 0; y < 3; ++y) {
			if (this.gamefield[x][y] == 0) {
				return false;
			}
		}
	}
	return true;
}

TicTacToe.prototype.currentPlayerHasWon = function () {
	// horizontal
	for (var i = 0; i < 3; ++i) {
		if (this.currentPlayer == this.gamefield[i][0] &&
			this.gamefield[i][0] == this.gamefield[i][1] &&
			this.gamefield[i][1] == this.gamefield[i][2]) {
			return true;
		}
	}
	// vertical
	for (var i = 0; i < 3; ++i) {
		if (this.currentPlayer == this.gamefield[0][i] &&
			this.gamefield[0][i] == this.gamefield[1][i] &&
			this.gamefield[1][i] == this.gamefield[2][i]) {
			return true;
		}
	}
	// and diagonal
	for (var i = 0; i < 2; ++i) {
		if (this.currentPlayer == this.gamefield[0 + 2 * i][0] &&
			this.gamefield[0 + 2 * i][0] == this.gamefield[1][1] &&
			this.gamefield[1][1] == this.gamefield[2 - 2 * i][2]) {
			return true;
		}
	}
	return false;
}

TicTacToe.prototype.initializeClickEvents = function () {
	canvasLeft = this.canvas.offsetLeft;
	canvasTop = this.canvas.offsetTop;
	var self = this;
	canvas.addEventListener('click', function (event) {
		if (!self.isGameRunning) {
			return;
		}
		var rect = self.canvas.getBoundingClientRect();
		var x = event.clientX - rect.left;
		var y = event.clientY - rect.top;
		x = Math.floor(x / (rect.width / 3));
		y = Math.floor(y / (rect.height / 3));
		self.makeMark(x, y);
	})

	$("#newGameButton").click(function () {
		self.newGame();
	});
}

var canvas = document.getElementById('myCanvas');
var ttt = new TicTacToe(canvas);

