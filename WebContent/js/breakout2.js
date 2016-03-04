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
	createHighScores =true;
	totalScore =0;

}



function everyinterval(n) {
	if ((myGameArea.frameNo / n) % 1 == 0) {
		return true;
	}
	return false;
}


function updateGameArea() {

	 if (gameStatus === "playing") {

		 calculateScore ();
		myGameArea.clear();
		myScore.text = "SCORE: " + totalScore;
		myScore.update();
		myKills.text ="Kills " + kills;
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

	 }
	 else if (gameStatus === "highscores") {
		 myGameArea.clear();
			
	 }
	 
	 else if (gameStatus === "submitHighscores") {

		 myGameArea.clear();
		 var personName = prompt("Please enter your name") || "AS";
		console.log(personName);
		gameStatus = "Menu";
	 }
	 
	 
	 else {
		 myGameArea.clear();
		 makeObstacles();
	 	menu();
	 }
}

function getData(method,url,callback, object) {
	
	console.log(url);
		var fullURL ="http://localhost:8080/Asteroids/rest/" + url;
		console.log("fullurl inside getData is " +fullURL);
		var xhr = new XMLHttpRequest();
		xhr.open(method, fullURL);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status < 400) {

				callback(JSON.parse(xhr.responseText));
			}
		};
		if (object) {
			console.log("Jus before sendingobject date attribute value :" +object.datemeditated + " time attribute " + object.timemeditated);
	        xhr.send(JSON.stringify(object));
	    } else {
	        xhr.send(null);
	    }
	};
	
	
function sendScoreToDB() {
	
	var scoresObj = {};
	 scoresObj.name = "AS";
	 scoresObj.score = totalScore;
	 scoresObj.kills= kills;
	 var method ="POST";
	 var urlcode ="newScore";
	 console.log("score: " + scoresObj.score + "kills : " + scoresObj.kills );
	 getData(method,urlcode,callback, scoresObj);
	
}	


var callback = function (data) {
	
	console.log("inside callback method of post");
		
	}

function mySpriteMovement(e) {

	myGamePiece1.update();

	myGamePiece1.newPos();

}