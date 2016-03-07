onload = function() {
	startGame();
	mySound2.play();

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
	
		menu();
		createHighScores = true;
	}
}

function getData(method, url, getData, object) {

	console.log(url);
	var fullURL = "http://localhost:8080/Asteroids/rest/" + url;
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
		console.log("Jus before sendingobject date attribute value :" + object.datemeditated + " time attribute " + object.timemeditated);
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

		console.log("inside create scores from DB " + data);
		var tempY = 20;
		
		highScorePage = new component("30px", "Consolas", "white", 250, 40, "text");
		highScoreTitle = new component("20px", "Consolas", "white", 175, 100, "text");
		highScorePage.text = " High Score";
		highScoreTitle.text = " NAME          SCORE         KILLS";

		retrunToMenu = new component("20px", "Consolas", "white", 285, 400, "text");

		retrunToMenu.text = "Return to Menu";
		retrunToMenu.update();


		highScorePage.update();
		highScoreTitle.update();

		for (var i = 0; i < data.length; i++) {
			highScoreName = new component("15px", "Consolas", "white", 200, (100 + tempY), "text");
			highScoreValue = new component("15px", "Consolas", "white", 300, (100 + tempY), "text");
			highScoreKills = new component("15px", "Consolas", "white", 415, (100 + tempY), "text");
			
			console.log("in loop to create scores" + i);
			highScoreName.text =  data[i].name;
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

//	console.log("inside callback method of post");

};

function mySpriteMovement(e) {

//	console.log("in mySpriteMovement");
	myGamePiece1.update();

	myGamePiece1.newPos();

}