function makeObstacles() {
	
	if (gameStatus==="playing")
		{
	var x, y, height, width;
	for (var i = 0; i < myObstacles.length; i += 1) {
		if (myGamePiece1.crashWith(myObstacles[i])) {
			myGamePiece1.image.src = "img/explosionBig.jpg";
//			myGameArea.stop();
			mySound2.stop();
			gameStatus ="submitHighscores";
			
			sendScoreToDB();
			return;
		}
	}

	for (var i  = 0; i < myAmmo.length; i += 1) {

		{
			for (var j= 0; j < myObstacles.length; j += 1) {
				if (myAmmo[i].crashWith(myObstacles[j])) {
//					myObstacles[i].image.src = "img/explosionBig.jpg";
					kills = kills +1;
					console.log("counter" + kills);
					myObstacles.splice(j, 1);
					myAmmo.splice(i, 1);
					mySound1.play();
					
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
}