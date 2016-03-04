onload = function() {
	startGame();
	mySound2.play(); 
	mySound2.loop(); 
	// document.querySelector("body").addEventListener("mousemove", myFunction);
	addEventListener("keypress", getKeys);

};

var myAmmo;

function startGame() {

	myGameArea.start();
	// myBackground = new component(656, 280, "img/spaceBG.JPEG", 0, 0, "image");
	mySound = new sound("audio/LaserBlaster.mp3");
	mySound1 = new sound("audio/Explosion.mp3");
	mySound2 = new sound("audio/Asteroids.mp3");
	myGamePiece1 = new component(40, 45, "img/playerShip1.png", 0, 70, "image");
	myShip = new component(20, 20, "img/asteroids4.png", 0, 70, "image");
	myScore = new component("30px", "Consolas", "red", 280, 40, "text");
	myObstacles = [];
	myAmmo = [];
	counter = 0;
	q = false;

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
		this.frameNo = 0;
		this.interval = setInterval(updateGameArea, 20);
	},

	clear: function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
	stop: function() {
		clearInterval(this.interval);

	}

}

function everyinterval(n) {
	if ((myGameArea.frameNo / n) % 1 == 0) {
		return true;
	}
	return false;
}


function updateGameArea() {

 
	myGameArea.clear();
	myScore.text = "SCORE: " + myGameArea.frameNo;
	myScore.update();
	myScore.text = "SCORE: " + myGameArea.frameNo;
	myScore.update();
	myGamePiece1.update();
	mySpriteMovement();
	playtheme(); 
	makeObstacles();
	// myGamePiece1.image.src = "img/playerShip2.png";

	// if (q) {
	if (myAmmo.length > 0) {
		for (var i = 0; i < myAmmo.length; i++) {
			console.log("in myAmmo and q and bullet obj is :" + myAmmo + "counter is: " + counter);
			myAmmo[i].speedX = 3;
			myAmmo[i].update();
			myAmmo[i].newPos();	
		}
	}
}

function makeObstacles() {
	var x, y, height, width;
	for (var i = 0; i < myObstacles.length; i += 1) {
		if (myGamePiece1.crashWith(myObstacles[i])) {
			myGamePiece1.image.src = "img/explosionBig.jpg";
			myGameArea.stop();
			mySound2.stop();
			return;
		}
	}

	for (var i  = 0; i < myAmmo.length; i += 1) {

		{
			for (var j= 0; j < myObstacles.length; j += 1) {
				if (myAmmo[i].crashWith(myObstacles[j])) {
					myObstacles[i].image.src = "img/explosionBig.jpg";

					myObstacles.splice(j, 1);
					myAmmo.splice(i, 1);
					mySound1.play();
					// 	myObstacles[i].speedX = 0;
					// myObstacles[i].x =0;
					// myObstacles[i].y =0;
					return;
				}
			}
		}
	}

	myGameArea.frameNo += 1;
	if (myGameArea.frameNo == 1 || everyinterval(150)) {
		x = myGameArea.canvas.width;
		y = Math.random() * myGameArea.canvas.height;
		height = Math.random() * (myGameArea.canvas.height / 3);
		width = Math.random() * (myGameArea.canvas.width / 3);
		console.log(y);
		myObstacles.push(new component(width, height, "img/asteroids4.png", x, y, "image"));
	}
	for (i = 0; i < myObstacles.length; i += 1) {
		myObstacles[i].x += Math.random() * (-3);
		myObstacles[i].update();
		myObstacles[i].newPos();
	}
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
		// myGamePiece1.image.src = "img/playerShip2.png";
		mySpriteMovement();
		if (myGamePiece1.speedY < -2) {
			myGamePiece1.speedY = -2;
		}
	} else if (e.charCode === 115) {
		// myGamePiece1.image.src = "img/playerShip2.png";
		myGamePiece1.speedY += 0.5;
		if (myGamePiece1.speedY > 2) {
			myGamePiece1.speedY = 2;
		}

	}

	if (e.charCode === 32) {

		var xAmmo = myGamePiece1.x;
		console.log("creating bullet object");
		myAmmo.push(new component2(10, 20, "img/Lasers/laserBlue02.png", xAmmo, myGamePiece1.y, "image"));
		mySound.play();	
		// mySound.stop();
		q = true;
	}
	// else {
	// 	// if (myGamePiece1.speedX>3)
	// 	// {q
	// 	// 	myGamePiece1.speedX ==3;
	// 	// }
	// }


}

function playtheme () {
mySound2.play();	
}


function mySpriteMovement(e) {

	myGamePiece1.update();

	myGamePiece1.newPos();

}