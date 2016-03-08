/**
 *	@class Enemy
 *	@brief Sprite para representação dos personagens inimigos do jogador
 *	@param r0 Vetor posição inicial {x: x0, y: y0}
 *	@param d  Dimensões do sprite {w: ?, h: ?}
 *	@param bd Borda do sprite {w: ?, h: ?}
 *	@param ax Módulo da aceleração no eixo x
 */
function Enemy(r0, d, bd, ax)  { 
	Sprite.call(this, r0, d, bd);
	this.a.x = Math.abs(ax) || Math.abs(0.25 * G);
	
	this.AX = this.a.x;
	this.animation = new Animator();
	
	this.appear = false;
	
	Object.freeze(this.bd);
	Object.freeze(this.AX);
	
	this.setMovingAnimation = function(n, w, h, x0, y0, t) {
		this.animation.createAnimation("moving", "enemys", n, w, h, x0, y0, t, CYCLIC);
		this.animation.executeAnimation("moving");
	}
	
} herda(Enemy, Sprite);

/************** Implementação dos métodos herdados ***************/

Enemy.prototype.key = function()  { 
	return "enemys"; 
}

Enemy.prototype.draw = function(ctx, map) {
	ctx.save();
		ctx.translate(this.r.x, this.r.y);
		ctx.save();
			ctx.scale(this.s.x, this.s.y);
			if(this.animation.hasAnimation()) {
				this.animation.drawFrame(ctx, DT);
			} else {
				ctx.strokeStyle = "#0F0";
				ctx.strokeRect(-this.d.w/2, -this.d.h/2, this.d.w, this.d.h);
			}
		ctx.restore();
	ctx.restore();

	if(map) {
		var gr = map.getPosition(this.r.x, this.r.y + this.sz.h/2 - 1, this.sz.w, this.sz.h);
		
		ctx.strokeStyle = "#0F0";
		ctx.strokeRect(DGRID * (gr.x - Math.floor(gr.w/2)), DGRID * (gr.y - gr.h + 1), DGRID * gr.w, DGRID * gr.h);
		
		ctx.strokeStyle = "#000";
		ctx.strokeRect(this.left(), this.head(), this.right() - this.left(), this.foot() - this.head());
	}
}

Enemy.prototype.update = function(dt, g) {
	if(Math.abs(this.a.x) < EPS) {
		this.a.x = this.AX;
	} else if(this.v.x < -EPS) {
		this.a.x = -this.AX;
		this.s.x = -SX;
	} else if(this.v.x > +EPS) {
		this.a.x = this.AX;
		this.s.x = SX;
	}
}

Enemy.prototype.positionLimit = function(map) { 
	var xmin = -map.getMargin().l + DGRID;
	var xmax = map.getSize().w - map.getMargin().r;

	if(this.left()  < xmin)	{ this.r.x = xmin + this.sz.w/2 - this.bd.w; this.v.x = -this.v.x; }
	if(this.right() > xmax) { this.r.x = xmax - this.sz.w/2 + this.bd.w; this.v.x = -this.v.x; }
}

/************** funções estáticas ***************/

//! Inicializa os inimigos
var createEnemies = function(xm, ym) {
	var kritter = new Enemy( {x: Math.random() * xm, y: ym}, 
							  {w: 3 * DGRID, h: 3 * DGRID},
							  {w: 12, h: 20}, 
							  Math.abs(0.27 * G)
							);
	kritter.setMovingAnimation(8, 3 * DGRID, 3 * DGRID, 9 * DGRID, 5 * DGRID, 1.00);
	var klump = new Enemy( {x: Math.random() * xm, y: ym}, 
							{w: 3 * DGRID, h: 4 * DGRID},
							{w: 12, h: 16},
							Math.abs(0.25 * G)
						);
	klump.setMovingAnimation(8, 3 * DGRID, 4 * DGRID, 9 * DGRID, 8 * DGRID, 1.00);
	var krusha = new Enemy( {x: Math.random() * xm, y: ym}, 
							{w: 3 * DGRID, h: 4 * DGRID},
							{w: 16, h: 32},
							Math.abs(0.33 * G)
						);
	krusha.setMovingAnimation(12, 3 * DGRID, 4 * DGRID, 9 * DGRID, 12 * DGRID, 1.10);
	var army = new Enemy( {x: Math.random() * xm, y: ym}, 
							{w: 2 * DGRID, h: 2 * DGRID},
							{w: 8, h: 8},
							Math.abs(1.0 * G)
						);
	army.setMovingAnimation(7, 2 * DGRID, 2 * DGRID, 31 * DGRID, 0 * DGRID, 0.25);
	var zinger = new Enemy( {x: Math.random() * xm, y: ym}, 
							{w: 3 * DGRID, h: 3 * DGRID},
							{w: 12, h: 24},
							Math.abs(0.30 * G)
						);
	zinger.setMovingAnimation(4, 3 * DGRID, 3 * DGRID, 0 * DGRID, 2 * DGRID, 0.50);
	
	return [kritter, klump, krusha, army];
}