function menu () {

// console.log("in menu js file");
	myTitle = new component("30px", "Consolas", "white", 280, 60, "text");
	startGame = new component("15px", "Consolas", "white", 300, 160, "text");
	highScores = new component("15px", "Consolas", "white", 300, 230, "text");

	myTitle.text="Asteroids";
	startGame.text = "Play Game";
	highScores.text = "High Scores";

	myTitle.update();
	startGame.update();
	highScores.update();
// console.log(myTitle);
	

}

function calculateScore () {
	
	totalScore=myGameArea.frameNo;
	if(kills >0)
		{
		totalScore = totalScore + (kills *1000);
		}
	
}




//	var highScoreDiv = document.getElementById("div");
//	highScoreDiv.style.backgroundColor ="red";
//
//	var Canvastemp = document.getElementById("Canvas");
//	Canvastemp.appendChild(highScoreDiv);
	