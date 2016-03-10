var pc = new Sprite();
pc.f = 1; pc.p = 1;
pc.img = new Image()
pc.img.src="img/Old hero.png";
pc.atx = 1.6;

var scroll=0;
		
addEventListener("keydown", function(e){
	e.preventDefault();
	if(e.keyCode==37){
		pc.direita = true;
	}
	if(e.keyCode==39){
		pc.esquerda = true;
	}
	if(e.keyCode==38){
		pc.pulando = true;
	}

});
addEventListener("keyup", function(e){
	e.preventDefault();
	if(e.keyCode==37){
		pc.direita = false;
	}
	if(e.keyCode==39){
		pc.esquerda = false;
	}
	if(e.keyCode==38){
		pc.pulando = false;
	}
	
});

pc.controlar = function(){
	if(this.direita){
		this.ax = -250;
	}else if(this.esquerda){
		this.ax =  250;
	}else{
		this.ax = 0;
	}
	if(this.pulando && this.vy == 0){
		this.vy = -3*g;
		this.pulando = false;
	}

	if(tramp){
		this.vy=-4*g;
		tramp=false;
	}
};


pc.desenhar = function(ctx){
	ctx.save();
	ctx.translate(this.x, this.y);
	ctx.rotate(this.angulo+Math.PI/2);

	if(Math.abs(this.vx) < 2){
		this.vx = 0;
		ctx.scale(2,2);
		this.p=1;
	}else if(this.vx > 0){
		this.p=2;
		ctx.scale(2,2);
	}else {
		this.p=2;
		ctx.scale(-2,2);
	}
	this.f+=8*dt
	
	
	switch(this.p){
		case 1: if(this.f>=5) this.f = 1;
		break;
		case 2: if(this.f>=7) this.f = 1;
		break;
	}
	if(this.vy<0){
		this.p = 3;
		this.f = 1;
	}else if(this.vy>0){
		this.p = 3;
		this.f = 2;
	}
					
	ctx.drawImage(this.img, Math.floor(this.f)*16, this.p*16.1, 16, 16,
								-8, -8, 16, 16	);

	ctx.restore();
	//ctx.strokeStyle = "white";

	//ctx.strokeRect(this.gx*30,this.gy*30, 30, 30);
};
