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
	createHighScores2 =true;
	totalScore =0;
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
	 else if (gameStatus === "highScores") {
		
		 if(createHighScores)
	{	 
			 createHighScores =false;
			 console.log(createHighScores);
		 myGameArea.clear();
		 var method ="GET";
			var urlcode ="highScores";
			console.log(urlcode + "inside gameStatus if logic");
		
			getData(method,urlcode,createHighScoresFromDB) ;
			createHighScoresFromDB();
			 createHighScores2 =false;
	}	

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
	 	createHighScores =true;
	 }
}

function getData(method,url,getData, object) {
	
	console.log(url);
		var fullURL ="http://localhost:8080/Asteroids/rest/" + url;
		console.log("fullurl inside getData is " +fullURL);
		var xhr = new XMLHttpRequest();
		xhr.open(method, fullURL);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status < 400) {

				getDataFromDB =JSON.parse(xhr.responseText);
				console.log("inside getData :" +getDataFromDB)
				createHighScoresFromDB(getDataFromDB);
				
				
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
	 getData(method,urlcode,callback3, scoresObj);
	
}	


var createHighScoresFromDB =function (data) {
	 if(createHighScores2)
		{
		
	console.log("inside create scores from DB " + data  );
	var tempY =20;
	highScorePage= new component("30px", "Consolas", "white", 250, 40, "text");
	highScoreTitle = new component("20px", "Consolas", "white", 175, 100, "text");
	highScorePage.text=" High Score";
	highScoreTitle.text=" NAME          SCORE         KILLS";


	highScorePage.update();
	highScoreTitle.update();
	console.log("1st person" + data[0] );
	for(var i =0; i < data.length ; i++)
		{
		highScoreX= new component("15px", "Consolas", "white", 175, (100 + tempY), "text");
		console.log("in loop to create scores" + i);
		highScoreX.text="      " + data[i].name + "                         "+ data[i].score + " " + "               " + data[i].kills;
		highScoreX.update();
		tempY= tempY+20;
		}
	


	
		}
	
};

var callback3 = function (data) {
	
	console.log("inside callback method of post");
		
	};

function mySpriteMovement(e) {

	myGamePiece1.update();

	myGamePiece1.newPos();

}