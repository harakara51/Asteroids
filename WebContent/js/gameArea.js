
var myGameArea = {

	sprite: document.createElement("div"),
	
//  canvas: document.getElementById("test"),
	canvas: document.createElement("canvas"),
	start: function() {

		this.canvas.width = 640;
		this.canvas.height = 480;
		this.canvas.setAttribute("id", "Canvas");
		this.canvas.style.background = "black";
//		this.canvas.style.margin = "auto";
		this.canvas.style.marginLeft = "20%";
		this.canvas.textAlign="center";
		this.canvas.addEventListener('click', changeGameStatus);


		
		this.context = this.canvas.getContext("2d");
		document.body.appendChild(this.canvas);
		this.frameNo = 0;
		
		this.interval = setInterval(updateGameArea, 16.67);
	},

	clear: function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
	stop: function() {
		clearInterval(this.interval);

	}

}


function changeGameStatus(e)  {


	var x = event.pageX;
      var  y = event.pageY;
    console.log(x, y);
    
    if(x > 503 && x <579 &&  y >315 &&  y <335)
    	{
    		console.log("inside Play Game textbox");
    		totalScore = 0;
    		kills = 0;
    		gameStatus = "playing";
    		
    	}
    
    if(x > 503 && x <579  && y >385 && y < 405)
    	
	{
    	console.log(x, y);
		console.log("inside highscores textbox")
		gameStatus = "highScores";
	}
if(x > 490 && x <625  && y >550 && y < 580)
    	
	{
    	console.log(x, y);
		console.log("return to Menu")
		gameStatus = "test";
	}
    
}