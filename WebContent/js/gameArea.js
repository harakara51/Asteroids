
var myGameArea = {

	sprite: document.createElement("div"),
	

	
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


function changeGameStatus(event)  {

	 event.preventDefault();
	var x = event.pageX;
      var  y = event.pageY;
    console.log(x, y);
    
if(y >550 && y < 580)
    	
	{
    	console.log(x, y);
		console.log("return to Menu")
		gameStatus = "test";
	}
    
}