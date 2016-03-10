function Abelha(){
	this.f = 5; this.p = 5;
	this.img = new Image()
	this.img.src="img/enemies.png";
	this.volta = 0;
}
Abelha.prototype = new Sprite();

Abelha.prototype.desenhar = function(ctx){
	ctx.save();
	ctx.translate(this.x, this.y);
	ctx.rotate(this.angulo+Math.PI/2);

	if(this.vx > 0){
		ctx.scale(-1,1);
	}else {
		ctx.scale(1,1);
	}
	this.f+=38*dt
	
	
	switch(this.p){
		case 5: if(this.f>=7) this.f = 5;
		break;
	}
	
					
	ctx.drawImage(this.img, Math.floor(this.f)*72, this.p*54, 72, 54,-16, -16, 32, 32);

	ctx.restore();
};

Abelha.prototype.controlar = function(){
	this.volta += 1*dt;
	if(this.volta/2>1){
		this.vy = -2*g;
	}
	if(this.volta>3){
		this.vx = -this.vx;
		this.volta = 0;
	}
}

Abelha.prototype.colidiuCom = function(alvo){
	if(this.x> alvo.x+alvo.w) return false;
	if(this.x+this.w < alvo.x) return false;
	if(this.y> alvo.y+alvo.h) return false;
	if(this.y+this.h< alvo.y) return false;

	tamBarraVida=tamBarraVida-5;
	return true;
};


function criaAbelhas(){
	for (var i = 15; i >= 0; i--) {
		var abelha = new Abelha();
		abelha.vx = -Math.random()*200+100;
		abelha.x = Math.random()*5000+100;
		abelha.volta = Math.random()*3;
		//sprites.push(abelha);	
	};
}