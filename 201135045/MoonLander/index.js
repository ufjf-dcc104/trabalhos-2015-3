function Text(font, size, rgb) {
	this.font = font 	|| "Courier";
	this.size = size 	|| 24;
	this.color = rgb 	|| "#0AF";
	
	this.raster = function(ctx, text, x, y) {
		ctx.font = "" + this.size + "px " + this.font;
		ctx.fillStyle = this.color;
		ctx.fillText(text, x, y);
	}
}

function State() {
	this.life = 3;
	this.score = 0;
	this.text = new Text();
	
	this.sumScore = function() { this.score++; }
	this.lostLife = function() { this.life--; }
	
	this.show = function(ctx) {
		this.text.raster(ctx, "Vidas:  " + this.life, 15, 60);
		this.text.raster(ctx, "Pontos: " + this.score, 500, 60);
	}
	
	this.reset = function() {
		this.life = 3;
		this.score = 0;
	}
}

function start() {
	var canvas = document.getElementById("game");
	var ctx = canvas.getContext("2d");
	var state = new State();
	
	const WIDTH = canvas.offsetWidth;
	const HEIGHT = canvas.offsetHeight;
	const base = { pos: new Point(Math.random() * (WIDTH-150), HEIGHT-15), 
				   size: new Size(150, 15) };
	
	const FPS = 60;
	const DT = 1/FPS;
	const G = -75;
	
	var nave = new Sprite(new Point(WIDTH/2, HEIGHT/2), new Size(50, 50), "img/player_ship.png");
	var bar = { pos: new Point(15, 15), 
					  size: new Size(WIDTH-30, 20),
					  energy: 1.0 };
	
	// Main Loop
	var loop = function() {
		ctx.clearRect(0, 0, WIDTH, HEIGHT);
		if(bar.energy <= 0.0) {
			alert("Acabou energia!!");
			bar.energy = 1.0;
			state.lostLife();
			nave.reset({x: WIDTH/2, y: HEIGHT/2});
			if(state.life == 0) {
				alert("Game Over!!");
				state.reset();
				bar.energy = 1.0;
			}
			base.pos.x = Math.random() * (WIDTH-150);
		}
		// Barra de energia
		ctx.fillStyle = "#0F4";
		ctx.strokeStyle = "darkgreen";
		ctx.fillRect(bar.pos.x, bar.pos.y, bar.energy * bar.size.w, bar.size.h);
		ctx.strokeRect(bar.pos.x, bar.pos.y, bar.size.w, bar.size.h);
		
		// Chão
		ctx.fillStyle = "#4f4642";
		ctx.strokeStyle = "darkgray";
		ctx.fillRect(0, base.pos.y, WIDTH, base.size.h);
		ctx.strokeRect(0, base.pos.y, WIDTH, base.size.h);
		// Base
		ctx.fillStyle = "blue";
		ctx.strokeStyle = "darkgray";
		ctx.fillRect(base.pos.x, base.pos.y, base.size.w, base.size.h);
		ctx.strokeRect(base.pos.x, base.pos.y, base.size.w, base.size.h);

		nave.move(DT, G);
		// Verifica se está acima da base
		if(base.pos.x < nave.coord.x && nave.coord.x < base.pos.x + base.size.w) {
			// Verifica se está sobre a base
			if(nave.coord.y + nave.size.h/2 > base.pos.y) {
				// Verifica com que velocidade alcançou a base
				if(nave.vel.vy < 20) {
					alert("You Win!!");
					state.sumScore();
					nave.reset({x: WIDTH/2, y: HEIGHT/2});
				} else {
					alert("You Lost!!");
					state.lostLife();
					nave.reset({x: WIDTH/2, y: HEIGHT/2});
					if(state.life == 0) {
						alert("Game Over!!");
						bar.energy = 1.0;
						state.reset();
					}
				}
				base.pos.x = Math.random() * (WIDTH-150);
			}
		} else {
			// Verifica se está sobre o chão
			if(nave.coord.y + nave.size.h/2 > base.pos.y) {
				nave.coord.y = base.pos.y - nave.size.h/2;
				nave.acel.ay = 0;
				nave.vel.vy = 0;
				
				alert("You Lost!!");
				state.lostLife();
				nave.reset({x: WIDTH/2, y: HEIGHT/2});
				if(state.life == 0) {
					alert("Game Over!!");
					state.reset();
				}
				base.pos.x = Math.random() * (WIDTH-150);
			}
		}
		nave.draw(ctx);
		state.show(ctx);
	}

	setInterval(loop, 1000/FPS);
	
	addEventListener("keydown", function(e){
		if(e.keyCode == 87) {// W
			nave.toUp(G);
			bar.energy -= 0.005;
		} else if(e.keyCode == 65) { // A
			nave.toLeft(G);
			nave.backTheta = false;
			bar.energy -= 0.0007;
		} else if(e.keyCode == 83) { // S
			nave.toDown(G);
			bar.energy -= 0.001;
		} else if(e.keyCode == 68) { // D
			nave.toRight(G);
			nave.backTheta = false;
			bar.energy -= 0.001;
		}
	});

	addEventListener("keyup", function(e){
		if(e.keyCode == 87 || e.keyCode == 83) { // W ou S
			nave.acel.ay = 0;
		} else if(e.keyCode == 65) { // A
			nave.acel.ax = 0;
			nave.signalTheta = +1;
			nave.backTheta = true;
		} else if(e.keyCode == 68) { // D
			nave.acel.ax = 0;
			nave.signalTheta = -1;
			nave.backTheta = true;
		}
	});
}