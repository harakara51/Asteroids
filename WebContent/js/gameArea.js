var myGameArea = {

	sprite: document.createElement("div"),
	

	canvas: document.createElement("canvas"),
	start: function() {

		this.canvas.width = 640;
		this.canvas.height = 480;
		this.canvas.setAttribute("id", "Canvas");
		this.canvas.style.background = "black";
		this.canvas.style.margin = "auto";
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
    
    if(x > 303 && x <379 &&  y <357 &&  y >316)
    	{
    		console.log("inside Play Game textbox")
    		gameStatus = "playing";
    	}
    
    if(x > 303 && x <379  && y >395 && y < 432)
    	
	{
    	console.log(x, y);
		console.log("inside highscores textbox")
		gameStatus = "highScores";
	}
}