function Point(x, y) {
	this.x = x;
	this.y = y;
}

function Size(w, h) {
	this.w = w;
	this.h = h;
}


/**
 *	@param coord(Point)	Coordenadas do sprite 
 *	@param size(Size)	Dimensões do sprite (largura x altura)
 *	@param theta		Ângulo de rotação sobre o próprio eixo (em graus)
 */
function Sprite(coord, size, theta, url) {
	this.size  = size  || new Size(50, 50);
	this.coord = coord || new Point(0, 0);
	this.theta = theta || 0;
	
	//////////////// Propriedades Físicas /////////////////
	this.vel   = {vx: 0, vy: 0}; //< velocidade linear
	this.acel  = {ax: 0, ay: 0}; //< Aceleração linear
	this.omega = 0;	//< Magnitude da velocidade angular
	///////////////////////////////////////////////////////

	this.image = new Image();
	this.image.src = url;
	
	this.draw = function(ctx) {
		ctx.save();
		ctx.translate(this.coord.x, this.coord.y);

		ctx.drawImage(this.image, -this.size.w/2, -this.size.h/2, this.size.w, this.size.h);		
		ctx.restore();
	}
	
	/**
	 *	@param dt	Comprimento do intervalo de tempo
	 *	@param g 	Magnitude da gravidade
	 */
	this.move = function(dt, g) {	
		this.coord.y += (this.vel.vy * dt) - g/2 * (dt*dt);
		this.vel.vy -= g * dt;
	}

	
	this.collision = function(pilastraCima , pilastraBaixo)
	{
		if (  ((this.coord.y - this.size.h/2 + 4) < ( (pilastraCima.coord.y) + pilastraCima.size.w)) &&  (this.coord.x + this.size.w/2 -4) > (pilastraCima.coord.x)) {return true;}
		if (  ((this.coord.y - this.size.h/2 +4) < ( (pilastraCima.coord.y) + pilastraCima.size.w)) &&  ((this.coord.x - this.size.w/2 +4 < pilastraCima.coord.x + pilastraCima.size.h) && ( (this.coord.x - this.size.w/2 > pilastraCima.coord.x)) ) ) {return true;}
		if ( (this.coord.y + this.size.h/2 -4) > (pilastraBaixo.coord.y) &&  (this.coord.x + this.size.w/2 -4) > (pilastraCima.coord.x)){return true;}

		return false;
	}
    
}

/**
 *	@param coord(Point)	Coordenadas do sprite 
 *	@param size(Size)	Dimensões do sprite (largura x altura)
 *	@param theta		Ângulo de rotação sobre o próprio eixo (em graus)
 */
function Obstaculo(coord, size, theta, url) {
	this.size  = size  || new Size(50, 50);
	this.coord = coord || new Point(0, 0);
	this.theta = theta || 0;
	
	//////////////// Propriedades Físicas /////////////////
	this.vel   = -100;	//< Magnitude da velocidade linear
	this.omega = 0;	//< Magnitude da velocidade angular
	this.acel  = 0;	//< Magnitude da aceleração linear
	///////////////////////////////////////////////////////

	this.image = new Image();
	this.image.src = url;
	
	this.draw = function(ctx) {
		ctx.save();
		//ctx.translate(0,0);
		//ctx.rotate(this.theta + PI2);
	
		ctx.drawImage(this.image, this.coord.x, this.coord.y, this.size.h, this.size.w);	
		ctx.restore();
	}
	
	/**
	 *	@param dt	Comprimento do intervalo de tempo
	 *	@param g 	Magnitude da gravidade
	 */
	this.move = function(dt, g) {	
		this.theta = this.theta + this.omega * dt;
		var vx = Math.cos(this.theta) * (this.vel);
		this.coord.x += vx * dt;
	}


	this.colidiuCom = function(alvo){
        if(this.coord.x > alvo.coord.x+alvo.size.w) return false;
        if(this.coord.x+this.size.w < alvo.coord.x) return false;
        if(this.coord.y > alvo.coord.y+alvo.size.h) return false;
        if(this.coord.y+this.size.h < alvo.coord.y) return false;
        return true;
    };

}