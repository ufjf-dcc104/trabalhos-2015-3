function Moeda(){
	this.f = 0; this.p = 0;
	this.img = new Image()
	this.img.src="img/hud_coins.png";
}

Moeda.prototype = new Sprite();


Moeda.prototype.desenhar = function(ctx){
	ctx.save();
	ctx.translate(this.x, this.y);
	ctx.rotate(this.angulo+Math.PI/2);
					
	ctx.drawImage(this.img, 0, 0, 65, 65,-16, -16, 40, 40);

	ctx.restore();
};

Moeda.prototype.colidiuCom = function(alvo){
	if(this.x> alvo.x+alvo.w) return false;
	if(this.x+this.w < alvo.x) return false;
	if(this.y> alvo.y+alvo.h) return false;
	if(this.y+this.h< alvo.y) return false;

	numMoedasColetadas++;
	return true;
};

function criaMoedas(){
	for (var i = 30; i >= 0; i--) {
		var moeda = new Moeda();

		moeda.x = Math.random()*5000+100;
		while(!verificaXMoedas(moeda.x)){
			moeda.x = Math.random()*5000+100;
		}

		moeda.y= Math.random()*500;
		while(moeda.y<325 || moeda.y>380){
			moeda.y= Math.random()*500;
		}
		
		spritesMoedas.push(moeda);	
	};
}


function verificaXMoedas(xMoeda){
	for(var sp in spritesMoedas){
		if(spritesMoedas[sp].x-22 <= xMoeda && spritesMoedas[sp].x+22 >= xMoeda){
			return false;
		}
	}

	return true;
}

function desenhaMoedasColetadas(){
	ctx.font="30px Arial";
	ctx.fillStyle = "white";
	ctx.fillText(numMoedasColetadas+"x ",10 +(pc.x-250) ,50);
	ctx.drawImage(moedaImg, 0, 0, 65, 65, 10 +(pc.x-190) , 25, 40, 40);
}
