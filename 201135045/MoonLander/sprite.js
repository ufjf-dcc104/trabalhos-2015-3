function Point(x, y) {
	this.x = x;
	this.y = y;
}

function Size(w, h) {
	this.w = w;
	this.h = h;
}

// Alguns ângulos constantes //
const PI2     = Math.PI / 2.0;	//< 90º
const PI4     = Math.PI / 4.0;	//< 45º
const PI6	  = Math.PI / 6.0;	//< 30º
const PI12	  = Math.PI / 12.0;	//< 15º
const RAD4DEG = Math.PI / 180.0;  //< radianos por grau
const DEG4RAD = 180.0 / Math.PI;  //< graus por radiano
///////////////////////////////

/**
 *	@param coord(Point)	Coordenadas do sprite 
 *	@param size(Size)	Dimensões do sprite (largura x altura)
 *	@param theta		Ângulo de rotação sobre o próprio eixo (em graus)
 */
function Sprite(coord, size, url) {
	this.size  = size  || new Size(50, 50);
	this.coord = coord || new Point(0, 0);
	
	this.theta = 0;
	this.backTheta = false;
	this.signalTheta = 0;
	
	this.image = new Image();
	this.image.src = url;
	
	//////////////// Propriedades Físicas /////////////////
	this.vel   = {vx: 0, vy: 0}; //< velocidade linear
	this.acel  = {ax: 0, ay: 0}; //< Aceleração linear
	this.omega = 0;	//< Magnitude da velocidade angular
	///////////////////////////////////////////////////////
	
	this.draw = function(ctx) {
		if(this.backTheta) {
			this.theta += this.signalTheta * RAD4DEG;
			if(-0.0001 < this.theta && this.theta < 0.0001) {
				this.signalTheta = 0;
				this.theta = 0;
				this.backTheta = false;
			}
		}
		
		ctx.save();
		ctx.translate(this.coord.x, this.coord.y);
		ctx.rotate(this.theta);
		
		ctx.drawImage(this.image, -this.size.w/2, -this.size.h/2, this.size.w, this.size.h);
		ctx.restore();
	}
	
	/**
	 *	@param dt	Comprimento do intervalo de tempo
	 *	@param g 	Magnitude da gravidade
	 */
	this.move = function(dt, g) {	
		this.vel.vx += this.acel.ax * dt;
		this.vel.vy += (this.acel.ay - g) * dt;
		
		this.coord.x += this.vel.vx * dt;
		this.coord.y += this.vel.vy * dt;
	}
	
	this.reset = function(p0) {
		this.coord = p0;
		this.vel = {vx: 0, vy: 0};
		this.acel = {ax: 0, ay: 0};
		this.theta = 0;
		this.signalTheta = 0;
		this.omega = 0;
	}
	
	this.toRight = function(g) { 
		this.acel.ax = 36; 
		this.signalTheta = +1;
		if(this.theta < PI12) {
			this.theta += this.signalTheta * (3 * RAD4DEG);
		}
	}
	this.toLeft  = function(g) { 
		this.acel.ax = -36; 
		this.signalTheta = -1;
		if(-PI12 < this.theta) {
			this.theta += this.signalTheta * (3 * RAD4DEG);
		}
	}
	this.toUp    = function(g) { this.acel.ay = -20 * Math.sqrt(-g); }
	this.toDown  = function(g) { this.acel.ay = 20 * Math.sqrt(-g); }
}