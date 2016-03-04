function component(width, height, color, x, y, type) {
	this.type = type;

	this.width = width;
	this.height = height;
	this.speedX = 0;
	this.speedY = 0;
	this.x = x;
	this.y = y;
	this.newPos = function() {
		this.x += this.speedX;
		this.y += this.speedY;

		if (this.x < 0) {
			this.x = 640;
		} else if (this.x > 640) {
			this.x = 0;
		}

		if (this.y < 0) {
			this.y = 480;
		} else if (this.y > 640) {
			this.y = 0;
		}


	}

	this.update = function() {
		ctx = myGameArea.context;



		if (this.type == "text") {
			ctx.font = this.width + " " + this.height;
			ctx.fillStyle = color;
			ctx.fillText(this.text, this.x, this.y);
		} else if (this.type == "image") {
			this.image = new Image();
			this.image.src = color;
			ctx.drawImage(this.image,
				this.x,
				this.y,
				this.width, this.height);
		} else {
			ctx.fillStyle = color;
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	};


	this.crashWith = function(otherobj) {
		var myLeft = this.x;
		var myRight = this.x + (this.width);
		var myTop = this.y;
		var myBottom = this.y + (this.height);
		var otherleft = otherobj.x;
		var otherright = otherobj.x + (otherobj.width);
		var othertop = otherobj.y;
		var otherbottom = otherobj.y + (otherobj.height);
		var crash = true;


		if ((myBottom < othertop) || (myTop > otherbottom) ||
			(myRight < otherleft) ||
			(myLeft > otherright)) {
			crash = false;
		}
		return crash;
	}

}



function component2(width, height, color, x, y, type) {
	this.type = type;

	this.width = width;
	this.height = height;
	this.speedX = 0;
	this.speedY = 0;
	this.x = x;
	this.y = y;
	this.isFired = true;
	this.newPos = function() {
		this.x += this.speedX;
		this.y += this.speedY;
	}

	this.update = function() {
		ctx = myGameArea.context;



		if (this.type == "text") {
			ctx.font = this.width + " " + this.height;
			ctx.fillStyle = color;
			ctx.fillText(this.text, this.x, this.y);
		} else if (this.type == "image") {
			this.image = new Image();
			this.image.src = color;
			ctx.drawImage(this.image,
				this.x,
				this.y,
				this.width, this.height);
		} else {
			ctx.fillStyle = color;
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	};


	this.crashWith = function(otherobj) {
		var myLeft = this.x;
		var myRight = this.x + (this.width);
		var myTop = this.y;
		var myBottom = this.y + (this.height);
		var otherleft = otherobj.x;
		var otherright = otherobj.x + (otherobj.width);
		var othertop = otherobj.y;
		var otherbottom = otherobj.y + (otherobj.height);
		var crash = true;


		if ((myBottom < othertop) || (myTop > otherbottom) ||
			(myRight < otherleft) ||
			(myLeft > otherright)) {
			crash = false;
		}
		return crash;
	};

}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.loop = function(){
        this.sound.loop();
    }
    this.stop = function(){
        this.sound.pause();
    }
}





