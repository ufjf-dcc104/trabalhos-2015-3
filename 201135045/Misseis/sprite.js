// Alguns ângulos constantes //
const PI2     = Math.PI / 2.0;	//< 90º
const PI4     = Math.PI / 4.0;	//< 45º
const PI6	  = Math.PI / 6.0;	//< 30º
const PI12	  = Math.PI / 12.0;	//< 15º
const RAD4DEG = Math.PI / 180.0;  //< radianos por grau
const DEG4RAD = 180.0 / Math.PI;  //< graus por radiano
///////////////////////////////

function Shot(_x, _y, _vx, _vy, r, url) {
	this.pos = {x: _x, y: _y};
	this.vel = {vx: _vx, vy: _vy};
	this.radius = r;
	
	this.image = new Image();
	this.image.src = url;
	
	this.draw = function(ctx) {
		var R = this.radius;
		
		ctx.save();
		ctx.translate(this.pos.x, this.pos.y);
		ctx.drawImage(this.image, -R, -R, 2 * R, 2 * R);
		ctx.restore();
	}
	
	this.move = function(dt, g) {
		var prevy = this.pos.y;
		
		this.pos.x += this.vel.vx * dt;
		this.pos.y += this.vel.vy * dt - (g/2) * dt * dt;
		this.vel.vy -= g * dt;
		
		this.radius -= 0.1;
	}
	// @param o Ponto origem vetor velocidade
	// @param mag Magnitude do vetor
	this.setVelocityVector = function(o, _mag) {
		var mag = _mag || 325;
		var d = this.pos; // destino
		var norm = Math.sqrt( Math.pow(d.x - o.x, 2) + Math.pow(o.y - d.y, 2) );
		
		this.vel = {vx: (d.x - o.x)/norm, vy: (d.y - o.y)/norm};
		this.vel.vx *= mag;
		this.vel.vy *= mag;
	}
}

function Asteroid(cx, cy, r, _vx, _vy, id) {
	this.radius = r;
	this.center = {x: cx, y: cy};
	this.vel = {vx: _vx, vy: _vy};
	this.life = 3;
	this.state= ["_l1", "_l2", "_l3"];
	
	this.id = id;
	this.image = new Image();
	
	this.draw = function(ctx, mira) {
		this.image.src = "img/ast" + this.id + this.state[this.life-1] + ".png";
	
		ctx.save();
		ctx.translate(this.center.x, this.center.y);
		ctx.drawImage(this.image, -this.radius, -this.radius, 2 * this.radius, 2 * this.radius);
		ctx.restore();
	
		if(mira) {
			var p = this.getFrontPoint(true);
			ctx.fillStyle = "red";
			ctx.strokeStyle = "red";
			ctx.beginPath();
				ctx.arc(p.x, p.y, 2, 0, 2 * Math.PI, true);
			ctx.closePath();
			ctx.fill();
			ctx.moveTo(this.center.x, this.center.y);
			ctx.lineTo(p.x, p.y);
			ctx.stroke();
		}
	}
	
	this.move = function(dt, g) {
		var prevy = this.center.y;
		this.center.x += this.vel.vx * dt;
		this.center.y += this.vel.vy * dt - (g/2) * dt * dt;
		this.vel.vy -= g * dt;
		
		this.radius -= 0.002 * g;
	}
	
	this.reached = function(shot) {
		// Largura do quadrado inscrito na circunferência (asteróide)
		// L = DIAG/sqrt(2), onde DIAG = 2R; @var width2 = L/2
		var width2 = this.radius / Math.sqrt(2);
		if(this.center.x - width2 <= shot.pos.x && shot.pos.x <= this.center.x + width2) {
			if(this.center.y - width2 <= shot.pos.y && shot.pos.y <= this.center.y + width2) {
				// Atingiu
				this.life -= 1;
				if(this.life == 0)
					return 2; 		// CODE 2: Atingiu e Destruiu
				return 1;			// CODE 1: Atingiu
			}
		}
		return 0;					// CODE 0: Não atingiu
	}
	
	this.getFrontPoint = function(mira) {
		var mv = Math.sqrt(this.vel.vx * this.vel.vx + this.vel.vy * this.vel.vy);
		var theta = Math.acos(this.vel.vx / mv);
		if(mira) {
			return {x: this.center.x + Math.cos(theta) * (this.radius+350-this.center.y),
					y: this.center.y + Math.sin(theta) * (this.radius+350-this.center.y) };
		} else {
			return {x: this.center.x + Math.cos(theta) * this.radius,
					y: this.center.y + Math.sin(theta) * this.radius };
		}
		
	}
}

function Build(_x, _y, _w, _h, url) {
	this.pos  = {x: _x, y: _y};
	this.size = {w: _w, h: _h};
	this.life = 3;
	this.state= ["_l1.jpg", "_l2.jpg", "_l3.jpg"];
	
	this.url = url;
	this.draw = function(ctx) {
		if(!ctx) return;
		
		ctx.fillStyle = ctx.createPattern(this.image, 'repeat');
		ctx.fillRect(this.pos.x, this.pos.y, this.size.w, this.size.h);
	}
	
	this.image = new Image();
	this.image.myDraw = this.draw;
	this.image.onload = function() {
		this.myDraw(this._canvas);
	}
	this.image.src = url + this.state[this.life-1];
	
	this.collided = function(asteroid) {
		var p = asteroid.getFrontPoint();
		if(this.pos.x - 10 <= p.x && p.x <= this.pos.x + this.size.w + 10) {
			if(this.pos.y + 20 < p.y) {
				// Colidiu
				this.life -= 1;
				if(this.life == 0)
					return 2; 		// CODE 2: Colidiu e Destruiu
				this.image.src = this.url + this.state[this.life-1];
				return 1;			// CODE 1: Colidiu
			}
		}
		return 0;					// CODE 0: Não Colidiu
	}
}

/**
 *	@param center	Coordenadas do centro do shooter 
 *	@param size		Dimensões do shooter (largura x altura)
 *	@param theta	Ângulo de rotação sobre o próprio eixo (em graus)
 */
function Shooter(center, size, url) {
	this.center = center || {x: 0, y: 0};
	this.size  = size  || {w: 50, h: 50};
	this.theta = 0;
	this.omega = 0;
	
	this.state = ["_l1.png", "_l2.png", "_l3.png"];
	this.life = 3;
	this.url = url;
	
	// Posição da bala
	this.ballPos = {x: this.center.x, y: this.center.y - this.size.h / 2};
	
	this.draw = function(ctx) {
		if(!ctx) return;
		
		ctx.save();
		ctx.translate(this.center.x, this.center.y);
		ctx.rotate(this.theta);
		
		ctx.drawImage(this.image, -this.size.w/2, -this.size.h/2, this.size.w, this.size.h);
		ctx.restore();
	}
		
	this.image = new Image();
	this.image.myDraw = this.draw;
	this.image.onload = function() {
		this.myDraw(this._canvas);
	}
	this.image.src = url + this.state[3];
		
	/**
	 *	@param dt	Comprimento do intervalo de tempo
	 *	@param g 	Magnitude da gravidade
	 */
	this.move = function(dt, g) {	
		this.theta += this.omega * dt;
		if(this.theta < -PI4) {
			this.theta = -PI4;
		} else if(PI4 < this.theta) {
			this.theta = PI4;
		}
		
		this.ballPos.x = this.center.x + (this.size.h / 2) * Math.sin(this.theta);
		this.ballPos.y = this.center.y - (this.size.h / 2) * Math.cos(this.theta);
	}
	
	this.collided = function(asteroid) {
		var p = asteroid.getFrontPoint();
		var w2 = this.size.w / 2;
		if(this.center.x - w2 -10 <= p.x && p.x <= this.center.x + w2 + 10) {
			if(this.ballPos.y + 10 < p.y) {
				// Colidiu
				this.life -= 1;
				if(this.life == 0)
					return 2; 		// CODE 2: Colidiu e Destruiu
				this.image.src = this.url + this.state[this.life-1];
				return 1;			// CODE 1: Colidiu
			}
		}
		return 0;					// CODE 0: Não Colidiu
	}
	
	this.reset = function() {
		this.life = 3;
		this.theta = 0;
		this.omega = 0;
		this.image.src = this.url + this.state[2];
	}
}

function CollectionGenerator(W, H) {
	this.WIDTH  = W;
	this.HEIGHT = H;
	
	this.build = function(n){
		var builds = [];
		var lastw = 0;
		
		for(var i = 0; i < n; i++) {
			var wi = Math.floor(50 + Math.random() * 10);
			var hi = Math.floor(100 + Math.random() * 40);
			var xi = 5 + i * (lastw + 20);
			var yi = this.HEIGHT - hi;
			
			lastw = wi;
			
			builds.push(new Build(xi, yi, wi, hi, "img/predio"));
		}
		return builds;
	},
	this.asteroid = function(n) {
		var asteroids = [];
		var s = function() {
			return Math.pow(-1, Math.floor(Math.random() * 2));
		}
		
		for(var i = 0; i < n; i++) {
			var r  = Math.floor(8 + Math.random() * 4);
			var cx = Math.floor(10 + Math.random() * this.WIDTH-10);
			var cy = -r * (i + 2);
			var vx = s() * Math.floor(10 + Math.random() * 10);
			var vy = s() * Math.floor(10 + Math.random() * 10);
			
			var imageID = Math.floor(1 + Math.random() * 3);
			
			asteroids.push(new Asteroid(cx, cy, r, vx, vy, imageID));
		}
		
		return asteroids;
	}
};