onload = function() {
	startGame();
	// document.querySelector("body").addEventListener("mousemove", myFunction);
	addEventListener("keypress", getKeys);

};


function startGame() {

	myGameArea.start();

	 myGamePiece = new component(20, 20, "white", 500, 70);

	myGamePiece1 = new component(150, 20, "red", 240, 460);

	myObstacles =[];



}

var myGameArea = {

	sprite: document.createElement("div"),

	canvas: document.createElement("canvas"),
	start: function() {

		this.canvas.width = 640;
		this.canvas.height = 480;
		this.canvas.style.background = "black";
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.interval = setInterval(updateGameArea, 20);

},

		clear: function() {
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		},

		stop: function() {
			clearInterval(this.interval);

		}

	}




function component(width, height, color, x, y) {
	this.width = width;
	this.height = height;
	this.speedX = 0;
	this.speedY = 0;
	this.x = x;
	this.y = y;
	// this.style.borderRadius ="100%";
	this.update = function() {
		ctx = myGameArea.context;
		ctx.fillStyle = color;
		ctx.fillRect(this.x, this.y, this.width, this.height);

	};
	this.newPos = function() {
		this.x += this.speedX;
		this.y += this.speedY;

	}

	this.crashWith = function(otherobj) {
		var myLeft = this.x;
		var myRight = this.x + (this.width);
		var myTop = this.y;
		var myBottom = this.y + (this.height);
		var otherleft = otherobj.x;
		var otherright = otherobj.x + (otherobj.width);
		var othertop = otherobj.y;
		var otherbottom = otherobj.y + (otherobj.height);
		var crash = true;


		if ((myBottom < othertop) || (myTop > otherbottom) ||
			(myRight < otherleft) ||
			(myLeft > otherright)) {
			crash = false;
		}
		return crash;



	}

}




function updateGameArea() {



	if (myGamePiece.crashWith(myGamePiece1)) {
		myGameArea.stop();

	}

	 myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        y = myGameArea.canvas.height - 200;
        myObstacles.push(new component(10, 200, "green", x, y));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }
	myGameArea.clear();
	myGamePiece.update();
	mySpriteMovement();
	myGamePiece.x -= 1;
	myGamePiece.y += 1;

}

function getKeys(e) {

	console.log(e.charCode);
	if (e.charCode === 100) {
		myGamePiece1.speedX += 0.5;
		if (myGamePiece1.speedX > 2) {
			myGamePiece1.speedX = 2;
		}

	} else if (e.charCode === 97) {

		myGamePiece1.speedX -= 0.5;
		if (myGamePiece1.speedX < -2) {
			myGamePiece1.speedX = -2;
		}
	} else if (e.charCode === 119) {
		myGamePiece1.speedY -= 0.5;
		if (myGamePiece1.speedY < -2) {
			myGamePiece1.speedY = -2;
		}
	} else if (e.charCode === 115) {
		myGamePiece1.speedY += 0.5;
		if (myGamePiece1.speedY > 2) {
			myGamePiece1.speedY = 2;
		}

	}
	// else {
	// 	// if (myGamePiece1.speedX>3)
	// 	// {
	// 	// 	myGamePiece1.speedX ==3;
	// 	// }
	// }


}


function mySpriteMovement(e) {

	myGamePiece1.update();

	myGamePiece1.newPos();

}