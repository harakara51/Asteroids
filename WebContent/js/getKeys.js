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

}