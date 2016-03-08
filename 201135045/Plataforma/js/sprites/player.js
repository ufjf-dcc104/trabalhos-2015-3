/**
 *	@class Player
 *	@brief Sprite do jogador, controla e renderiza o personagem principal
 *	@param r0 Vetor posição inicial {x: x0, y: y0}
 *	@param d  Dimensões do sprite {w: ?, h: ?}
 *	@param bd Borda do sprite {w: ?, h: ?}
 */
function Player(r0, d, bd, hmax) { 
	Sprite.call(this, r0, d, bd);
	
	this.animation = new Animator();
	
	// Estados do personagem
	this.walkToRight= false;
	this.walkToLeft = false;
	this.jump		= false;
	// Altura máxima do pulo
	this.hmax = this.s.y * DGRID * (hmax || 4.5);
	
	Object.freeze(this.hmax);
	
	// Inicializa animações
	var tmax = -Math.sqrt(2 * Math.abs(G) * this.hmax) / G; tmax = 2 * (tmax + tmax / 8.0);
	this.animation.createAnimation("idle",    "dk", 11, 3 * DGRID, 5 * DGRID,  0 * DGRID,  0 * DGRID, 1.80, RETURN);
	this.animation.createAnimation("turning", "dk",  3, 3 * DGRID, 5 * DGRID, 36 * DGRID,  0 * DGRID, 0.30, NO_REPEAT);
	this.animation.createAnimation("walking", "dk", 19, 3 * DGRID, 5 * DGRID,  0 * DGRID,  5 * DGRID, 1.00, CYCLIC);
	this.animation.createAnimation("jumping", "dk", 18, 3 * DGRID, 5 * DGRID,  0 * DGRID, 10 * DGRID, tmax, NO_REPEAT);
	this.animation.addEventTo("jumping", function(params) {
		params.self.bd.h = params.h;
	}, {self: this, h: bd.h} );
	
	this.animation.linkAnimations("turning", "walking");
	
	this.animation.executeAnimation("idle");
	
} herda(Player, Sprite);

/************** Implementação dos métodos herdados ***************/

Player.prototype.key = function() { 
	return "dk"; 
}

Player.prototype.draw = function(ctx, map) {
	ctx.save();
		ctx.translate(this.r.x, this.r.y);
		ctx.save();
			ctx.scale(this.s.x, this.s.y);
			if(this.animation.hasAnimation()) {
				this.animation.drawFrame(ctx, DT);
			} else {
				ctx.strokeStyle = "#F00";
				ctx.strokeRect(-this.d.w/2, -this.d.h/2, this.d.w, this.d.h);
			}
		ctx.restore();
	ctx.restore();

	if(map) {
		var gr = map.getPosition(this.r.x, this.r.y + this.sz.h/2 - 1, this.sz.w, this.sz.h);
		
		ctx.strokeStyle = "#F00";
		ctx.strokeRect(DGRID * (gr.x - Math.floor(gr.w/2)), DGRID * (gr.y - gr.h + 1), DGRID * gr.w, DGRID * gr.h);
		
		ctx.strokeStyle = "#000";
		ctx.strokeRect(this.left(), this.head(), this.right() - this.left(), this.foot() - this.head());
	}
}

Player.prototype.update = function(dt, g) {
	var jumping = !(Math.abs(this.v.y) < EPS);
	
	// se não está pulando, mas é para pular então pula
	if(!jumping && this.jump) {
		this.jump = false;
		// Equação de torriceli: v² = v0² + 2adr
		// dr = hmax --> v = 0
		this.v.y = -Math.sqrt(2 * Math.abs(g) * this.hmax);
		this.animation.resetTo("jumping");
		this.animation.executeAnimation("jumping");
		if(Math.abs(this.v.x) > 2.0) {
			this.animation.linkAnimations("jumping", "walking");
		} else {
			this.animation.linkAnimations("jumping", "idle");
		}
		this.bd.h -= 16;
	}
	
	//this.fatx = 1.5;
	if(this.walkToRight) {	
		this.a.x = -0.5 * g;
		this.s.x = SX;
		if(!this.animation.isExecuting("jumping")) {
			this.animation.executeAnimation("walking");
		}
	} else if(this.walkToLeft) {
		this.a.x = 0.5 * g;
		this.s.x = -SX;
		if(!this.animation.isExecuting("jumping")) {
			this.animation.executeAnimation("walking");
		}
	} else {
		this.a.x = 0;
		if(Math.abs(this.v.x) < 2.0 && !this.animation.isExecuting("jumping"))
			this.animation.executeAnimation("idle");
	}
}

Player.prototype.positionLimit = function(map) {
	var xmin = 0;
	var xmax = map.getSize().w - 2 * map.getMargin().r;

	if(this.left()  < xmin)	{ this.r.x = xmin + this.sz.w/2 - this.bd.w; this.v.x = 0.0; }
	if(this.right() > xmax) { this.r.x = xmax - this.sz.w/2 + this.bd.w; this.v.x = 0.0; }
}