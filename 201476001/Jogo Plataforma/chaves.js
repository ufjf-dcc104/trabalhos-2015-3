function Chave(){
	this.f = 0; this.p = 0;
	this.img = new Image()
	this.img.src="img/items_spritesheet.png";
}

Chave.prototype = new Sprite();


Chave.prototype.desenhar = function(ctx){
	ctx.save();
	ctx.translate(this.x, this.y);
	ctx.rotate(this.angulo+Math.PI/2);
					
	ctx.drawImage(this.img, 130, 0, 60, 80,-16, -16, 60, 80);

	ctx.restore();
};

Chave.prototype.colidiuCom = function(alvo){
	if(this.x> alvo.x+alvo.w) return false;
	if(this.x+this.w < alvo.x) return false;
	if(this.y> alvo.y+alvo.h) return false;
	if(this.y+this.h< alvo.y) return false;

	numChavesColetadas++;

	return true;
};

function criaChaves(){
	for (var l = 0; l < 10; l++) {
		for (var c = 0; c < 100; c++){
		
			if(mapa[l][c]==8){
				var chave = new Chave();
				chave.x = 65*c;
				chave.y= 50*l;
				spritesChaves.push(chave);

				c+=3;

				numChaves++;
			}

			if(Math.floor(Math.random())*15==4 && l==5){
				var chave = new Chave();
				chave.x = 65*c;
				chave.y= 65*l;
				spritesChaves.push(chave);

				numChaves++;
			}
		}
	}
}
