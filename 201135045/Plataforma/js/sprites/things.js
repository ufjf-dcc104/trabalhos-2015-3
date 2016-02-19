/**
 *	@class Things
 *	@brief Sprite para representação de objetos e efeitos do jogo
 *	@param r0 Vetor posição inicial {x: x0, y: y0}
 *	@param d  Dimensões do sprite {w: ?, h: ?}
 *	@param bd Borda do sprite {w: ?, h: ?}
 */
function Things(r0, d, bd) { 
	Sprite.call(this, r0, d, bd); 
	
	this.appear = false;
	this.animation = new Animator();
	this.start = new Date().getTime();
	
	Object.freeze(this.bd);
	
} herda(Things, Sprite);

/************** Implementação dos métodos herdados ***************/

Things.prototype.key = function() { 
	return "objects";
}

Things.prototype.draw = function(ctx, map) {
	ctx.save();
		ctx.translate(this.r.x, this.r.y);
		ctx.save();
			ctx.scale(this.s.x, this.s.y);
			if(this.animation.hasAnimation()) {
				this.animation.drawFrame(ctx, DT);
			} else {
				ctx.strokeStyle = "#FF0";
				ctx.strokeRect(-this.d.w/2, -this.d.h/2, this.d.w, this.d.h);
			}
		ctx.restore();
	ctx.restore();

	if(map) {
		var gr = map.getPosition(this.r.x, this.r.y + this.sz.h/2 - 1, this.sz.w, this.sz.h);
		
		ctx.strokeStyle = "#FF0";
		ctx.strokeRect(DGRID * (gr.x - Math.floor(gr.w/2)), DGRID * (gr.y - gr.h + 1), DGRID * gr.w, DGRID * gr.h);
		
		ctx.strokeStyle = "#000";
		ctx.strokeRect(this.left(), this.head(), this.right() - this.left(), this.foot() - this.head());
	}
}

Things.prototype.update = function(dt, g) {
	
}

Things.prototype.positionLimit = function(size) { 

}

/************** funções estáticas ***************/

//! Inicializa os objetos e efeitos
var createThings = function(xm, ym) {
	var banana = new Things( {x: xm, y: ym},
							 {w: DGRID, h: DGRID},
							 {w: 2, h: 2}
							);
	banana.animation.createAnimation("moving", "things", 8, 1 * DGRID, 1 * DGRID, 0 * DGRID, 0 * DGRID, 0.80, CYCLIC);
	banana.animation.executeAnimation("moving");
	
	var cacho = new Things( {x: xm + 4 * DGRID, y: ym},
							{w: 2 * DGRID, h: 2 * DGRID},
							{w: 8, h: 16}
						);
	cacho.animation.createAnimation("moving", "things", 6, 2 * DGRID, 2 * DGRID, 0 * DGRID, 1 * DGRID, 1.20, RETURN);
	cacho.animation.executeAnimation("moving");
	
	return [banana, cacho];
}