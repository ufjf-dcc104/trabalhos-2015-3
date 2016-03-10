function Trampolim(){
	this.f = 6.7; this.p = 5;
	this.energiaPulando=0;
	this.energiaVoltando=0;
	this.img = new Image()
	this.img.src="img/items_spritesheet.png";
}

Trampolim.prototype = new Sprite();

Trampolim.prototype.desenhar = function(ctx){
	ctx.save();
	ctx.translate(this.x, this.y);
	ctx.rotate(this.angulo+Math.PI/2);

	if(this.energiaPulando>25){
		tramp=true;
		this.energiaPulando=0;
		this.p=3.5;
	}


	if(this.p==5){
		ctx.drawImage(this.img, this.f*65, this.p*65, 65, 40, -16, -45, 65, 80);
	}else{
		ctx.drawImage(this.img, this.f*65, this.p*65, 65, 65, -16, -65, 65, 100);
	}
					
	

	ctx.restore();
};

Trampolim.prototype.controlar = function(){
	
}

Trampolim.prototype.colidiuCom = function(alvo){
	if(this.x> alvo.x+alvo.w) return false;
	if(this.x+this.w < alvo.x) return false;
	if(this.y> alvo.y+alvo.h) return false;
	if(this.y+this.h< alvo.y) return false;
	return true;
};


function criaTrampolim(){

	for (var l = 0; l < 10; l++) {
		for (var c = 0; c < 100; c++){
			if(mapa[l][c]==8){
				var tramp = new Trampolim();
				tramp.x = (c+1)*65;
				tramp.y = 5*65;
				mapa[5][c+1]=9;
				spritesTramp.push(tramp);	
				c+=5;
			}
		}
	}
}