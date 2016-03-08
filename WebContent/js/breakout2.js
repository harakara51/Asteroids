window.onload = function() {
	canvas3 = document.getElementById('test');

	myGameArea.canvas = canvas3;

	startGame();

	mySound2.play();

	// document.querySelector("body").addEventListener("mousemove", myFunction);
	addEventListener("keypress", getKeys);

};

function path2d() {

	var context = canvas3.getContext('2d');

	// Create the shape
	var path = new Path2D();
	path.moveTo(290, 140);
	path.lineTo(375, 140);
	path.lineTo(375, 180);
	path.lineTo(290, 180);

	path.closePath()
	context.strokeStyle = '#600';
	context.fillStyle = '#f00';

	context.stroke(path);
	context.fill(path);

	var path2 = new Path2D();
	path2.moveTo(290, 210);
	path2.lineTo(375, 210);
	path2.lineTo(375, 250);
	path2.lineTo(290, 250);
	// path.lineTo(200,75);
	path2.closePath()

	// Stroke and fill it
	context.strokeStyle = '#600';
	context.fillStyle = '#f00';

	context.stroke(path2);
	context.fill(path2);

	 test45 =function createMenuButton() {
		
		console.log("in creating button when it is highScores");
		var path3 = new Path2D();
		path3.moveTo(275, 375);
		path3.lineTo(420, 375);
		path3.lineTo(420, 420);
		path3.lineTo(275, 420);
//		path3.addText();
		// path.lineTo(200,75);
		path3.closePath()

		// Stroke and fill it
		context.strokeStyle = '#600';
		context.fillStyle = '#f00';
		context.stroke(path3);
		context.fill(path3);
		
		 canvas3.addEventListener('mousemove', function (e)
				 {
				 var x = e.offsetX;
				 var y = e.offsetY;
				
				 if (context.isPointInPath(path3, x, y)) {
				 e.target.style.cursor = 'pointer';
				 } else {
				 e.target.style.cursor = 'default';
				 }
				 }, false);
		 
		 canvas3.addEventListener('click', function(e) {
				var x = e.offsetX;
				var y = e.offsetY;

				if (context.isPointInPath(path2, x, y)) {
					gameStatus = "test";
				}
			}, false);

	}
	/**
	 * The mousemove listener
	 */
	canvas3.addEventListener('mousemove', function(e) {
		var x = e.offsetX;
		var y = e.offsetY;

		if (context.isPointInPath(path, x, y)) {
			e.target.style.cursor = 'pointer';
		} else {
			e.target.style.cursor = 'default';
		}
	}, false);

	canvas3.addEventListener('mousemove', function(e) {
		var x = e.offsetX;
		var y = e.offsetY;

		if (context.isPointInPath(path2, x, y)) {
			e.target.style.cursor = 'pointer';
		} else {
			e.target.style.cursor = 'default';
		}
	}, false);

	

	/**
	 * The click listener
	 */
	canvas3.addEventListener('click', function(e) {
		var x = e.offsetX;
		var y = e.offsetY;

		if (context.isPointInPath(path, x, y)) {
			gameStatus = "playing";
		}
	}, false);

	canvas3.addEventListener('click', function(e) {
		var x = e.offsetX;
		var y = e.offsetY;

		if (context.isPointInPath(path2, x, y)) {
			gameStatus = "highScores";
		}
	}, false);

}

var myAmmo;

function startGame() {

	myGameArea.start();
	// myBackground = new component(656, 280, "img/spaceBG.JPEG", 0, 0,
	// "image");
	mySound = new sound("audio/LaserBlaster.mp3");
	mySound1 = new sound("audio/Explosion.mp3");
	mySound2 = new sound("audio/Asteroids.mp3");
	myGamePiece1 = new component(40, 45, "img/playerShip1.png", 0, 70, "image");
	myShip = new component(20, 20, "img/asteroids4.png", 0, 70, "image");
	myScore = new component("30px", "Consolas", "red", 380, 40, "text");
	myKills = new component("30px", "Consolas", "red", 180, 40, "text");
	myObstacles = [];
	myAmmo = [];
	kills = 0;
	q = false;
	gameStatus = "Menu";
	createHighScores = true;
	createHighScores2 = true;
	totalScore = 0;
	getDataFromDB = [];

}

function everyinterval(n) {
	if ((myGameArea.frameNo / n) % 1 == 0) {
		return true;
	}
	return false;
}

function updateGameArea() {

	if (gameStatus === "playing") {

		calculateScore();
		myGameArea.clear();
		myScore.text = "SCORE: " + totalScore;
		myScore.update();
		myKills.text = "Kills " + kills;
		myKills.update();

		myGamePiece1.update();
		mySpriteMovement();

		makeObstacles();
		// myGamePiece1.image.src = "img/playerShip2.png";

		if (myAmmo.length > 0) {
			for (var i = 0; i < myAmmo.length; i++) {

				myAmmo[i].speedX = 3;
				myAmmo[i].update();
				myAmmo[i].newPos();
			}
		}

	} else if (gameStatus === "highScores") {

		
		if (createHighScores) {
			
			createHighScores = false;
			console.log(createHighScores);
			myGameArea.clear();
			var method = "GET";
			var urlcode = "highScores";
			console.log(urlcode + "inside gameStatus if logic");

			getData(method, urlcode, createHighScoresFromDB);
			createHighScoresFromDB();
			createHighScores2 = false;
		}

	} else if (gameStatus === "submitHighscores") {

		myGameArea.clear();
		personName = prompt("Please enter your name") || "AS";
		console.log(personName);
		sendScoreToDB();
		gameStatus = "Menu";
	} else {
		myGameArea.clear();
		path2d();
		menu();
		createHighScores = true;
	}
}

function getData(method, url, getData, object) {

	console.log(url);
	var fullURL = "/Asteroids/rest/" + url;
	console.log("fullurl inside getData is " + fullURL);
	var xhr = new XMLHttpRequest();
	xhr.open(method, fullURL);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status < 400) {

			getDataFromDB = JSON.parse(xhr.responseText);
			console.log("inside getData :" + getDataFromDB)
			createHighScoresFromDB(getDataFromDB);

		}
	};
	if (object) {
		console.log("Jus before sendingobject date attribute value :"
				+ object.datemeditated + " time attribute "
				+ object.timemeditated);
		xhr.send(JSON.stringify(object));
	} else {
		xhr.send(null);
	}
};

function sendScoreToDB() {

	var scoresObj = {};
	scoresObj.name = personName;
	scoresObj.score = totalScore;
	scoresObj.kills = kills;
	var method = "POST";
	var urlcode = "newScore";
	console.log("score: " + scoresObj.score + "kills : " + scoresObj.kills);
	getData(method, urlcode, callback3, scoresObj);

}

var createHighScoresFromDB = function(data) {
	if (createHighScores2) {
		test45()
//		console.log("inside create scores from DB " + data);
		var tempY = 20;

		highScorePage = new component("30px", "Consolas", "white", 250, 40,
				"text");
		highScoreTitle = new component("20px", "Consolas", "white", 175, 100,
				"text");
		highScorePage.text = " High Score";
		highScoreTitle.text = " NAME          SCORE         KILLS";

		retrunToMenu = new component("20px", "Consolas", "white", 285, 400,
				"text");

		retrunToMenu.text = "Return to Menu";
		retrunToMenu.update();

		highScorePage.update();
		highScoreTitle.update();

		for (var i = 0; i < data.length; i++) {
			highScoreName = new component("15px", "Consolas", "white", 200,
					(100 + tempY), "text");
			highScoreValue = new component("15px", "Consolas", "white", 300,
					(100 + tempY), "text");
			highScoreKills = new component("15px", "Consolas", "white", 415,
					(100 + tempY), "text");

//			console.log("in loop to create scores" + i);
			highScoreName.text = data[i].name;
			highScoreValue.text = data[i].score;
			highScoreKills.text = data[i].kills;

			highScoreName.update();
			highScoreValue.update();
			highScoreKills.update();
			tempY = tempY + 20;
		}

	}

};

var callback3 = function(data) {

	// console.log("inside callback method of post");

};

function mySpriteMovement(e) {

	// console.log("in mySpriteMovement");
	myGamePiece1.update();

	myGamePiece1.newPos();

}