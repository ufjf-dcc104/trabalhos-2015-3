/*
Controle default dos sprites do jogo
*/
function Sprite(){
	this.x = 130;//posição em x
	this.y = 130;//posição em y
	this.gx= 0;//posição em x no grid
	this.gy= 0;//posição em y no grid
	this.vx = 0;//velocidade em x
	this.vy = 0;//velocidade em y
	this.ax = 0;//aceleracao em x
	this.ay = 0;//aceleração em y
	this.atx = 1.5;//atrito em x
	this.aty = 0;//atrito em y
	this.altura= 16;
	this.largura= 16;
	
	this.p=1;//posição de animação
	this.f=0;//frame de animação
	
	this.sobBloco= false; //o sprite está sobre um bloco
	
	
	this.img= new Image();
	
	this.moverNoGrid= function(grid,dt,g){
		
		this.ax -= this.atx*(this.vx);
		this.ay -= this.aty*(this.vy);
    
		this.vx = this.vx + this.ax*dt;					
		this.vy = this.vy + this.ay*dt + g*dt;
    
		this.gx = Math.floor((this.x)/this.largura);
		this.gy = Math.floor((this.y+7)/this.altura);
    
		//*****CONTROLE DO GRID NA ORIENTAÇÃO Y*****
		///bloco de baixo é sólido
		if(grid[this.gy+1][this.gx]==1 || grid[this.gy+1][this.gx]==2){
			var dy = Math.min(
				this.vy*dt,
				(this.gy+1)*this.altura-(this.y+this.altura/2)
			);
			if(dy ==0) this.vy = 0;
			this.y += dy;
			//console.log('1');
		}///bloco de cima é sólido
		else if(this.gy>0 && (grid[this.gy-1][this.gx]==1 || grid[this.gy-1][this.gx]==2)){
			var dy = Math.max(
				this.vy*dt,
				(this.gy)*16-(this.y-this.altura/2)
			);
			this.y += Math.ceil(dy);
			//console.log(dy, this.y);
		
		///não há obstáculo
		} else{
			this.y = this.y + this.vy*dt;
			//console.log('3');
		}
		
		
		//*****CONTROLE DO GRID NA ORIENTAÇÃO X*****
		///bloco da frente é uma parede
		if(this.vx>0 && (grid[this.gy][this.gx+1]==1 || grid[this.gy][this.gx+1]==2)){
			var dx = Math.min(
				this.vx*dt,
				(this.gx+1)*this.largura-(this.x+this.largura/2)
			);
			this.x += dx;
		///bloco de trás é uma parede
		}else if(this.vx<0 && (grid[this.gy][this.gx-1]==1 || grid[this.gy][this.gx-1]==2)){
			var dx = Math.max(
				this.vx*dt,
				(this.gx)*this.largura-(this.x-this.largura/2)
			);
			this.x += dx;
		///não há obstáculo
		}else{
			this.x = this.x + this.vx*dt;
		}
		
		
		if(this.x<0) this.x = 0;	
		if(this.y<0) this.y = 0;
		if(this.x+this.largura/2>this.largura*50) this.x = this.largura*50-this.largura/2;	
		//if(this.y+this.altura/2>this.altura*15) this.y = this.altura*15-this.altura/2;
		
	};//fim: mover no grid
	
	
	///sobrescrever a fç de desenho
	this.desenhar = function(ctx, jogo){//contexto e informações do jogo (vidas, pontos...)
		ctx.save();
		ctx.strokeStyle = "black";
		ctx.fillStyle = "rgb(250, 150, 150)";

		ctx.translate(this.x, this.y);

		if(Math.abs(this.vx)<1){///animação de espera (boneco parado)
			this.vx=0;
			this.p=1;//parte 1 da animação (1ª linha de imagens)
		}else if(this.vx>0){///animação: correr para a direita
			this.p=2;//parte 2 da animação
		}else{///animação: correr para a esquerda
			this.p=2;
			ctx.scale(-1,1);//escala 1:1 com o desenho invertido no eixo x (valor negativo)
		}
		
		this.f+= 8*dt; ///dt corrige a animação na fração de tempo
					   ///constante 8: 8 frames por segundo (fração de tempo)
		
		switch(this.p){
			case 1: if(this.f>=5) this.f=1;
			break;
			case 2: if(this.f>=7) this.f=1;
			break;
		}

		if(this.vy<0){
			this.p=3;
			this.f=1;
		}else if(this.vy>0){
			this.p=3;
			this.f=2;
		}
		
		if(jogo.fimdejogo){//desenha o boneco "morto" do sprite
			ctx.drawImage(this.img, ///1,1,16,16,/// corte: pos inicial x, y tamanho do corte l, a
						5*16, 16, 16, 16,/// corte: pos inicial x, y tamanho do corte l, a
						//0, 0, 16, 16);///imagem: pos x,y tamanho l,a
						-8, -8, 16, 16);///imagem: pos x,y tamanho l,a
		}else{//desenho normal
			ctx.drawImage(this.img, ///1,1,16,16,/// corte: pos inicial x, y tamanho do corte l, a
						Math.floor(this.f)*16, this.p*16, 16, 16,/// corte: pos inicial x, y tamanho do corte l, a
						//0, 0, 16, 16);///imagem: pos x,y tamanho l,a
						-8, -8, 16, 16);///imagem: pos x,y tamanho l,a
		}
		ctx.restore();
		ctx.strokeStyle = "white";
		ctx.strokeRect(this.gx*this.largura,this.gy*this.altura, this.largura, this.altura);
	};//fim desenhar
	
	
	
};

/*
			function Sprite(){
				this.x = 130;
				this.y = 130;
				this.vx = 0;
				this.vy = 0;
				this.ax = 0;
				this.ay = 0;
				this.w = 32;
				this.h = 32;
				this.velocidade = 0;
				this.angulo = -Math.PI/2;
				this.va = 0;
				this.atx = 1.5;
				this.aty = 0;

				this.moverAng = function(dt, g){
					this.angulo = this.angulo + this.va*dt;
					this.vx = Math.cos(this.angulo)*this.velocidade;
					this.vy = Math.sin(this.angulo)*this.velocidade;
					this.x = this.x + this.vx*dt;
					
					this.y = this.y + this.vy*dt;
				};
				this.moverCart = function(dt, g){
					this.ax -= this.atx*(this.vx);
					this.ay -= this.aty*(this.vy);

					this.vx = this.vx + this.ax*dt;					
					this.vy = this.vy + this.ay*dt + g*dt;

					this.x = this.x + this.vx*dt;
					this.y = this.y + this.vy*dt;
				};
				this.moverCartGrid = function(dt, g, grid){
					this.ax -= this.atx*(this.vx);
					this.ay -= this.aty*(this.vy);

					this.vx = this.vx + this.ax*dt;					
					this.vy = this.vy + this.ay*dt + g*dt;

					this.gx = Math.floor(this.x/32);
					this.gy = Math.floor((this.y+14)/32);

					this.x = this.x + this.vx*dt;
					if(grid[this.gy+1][this.gx]==1){
						var dy = Math.min(
							this.vy*dt,
							(this.gy+1)*32-(this.y+this.h/2)
						);
						if(dy ==0) this.vy = 0;
						this.y += dy;

					} else {
						this.y = this.y + this.vy*dt;
					}
					if(this.x<0) this.x = 0;	
					if(this.y<0) this.y = 0;
					if(this.x+this.w/2>32*20) this.x = 32*20-this.w/2;	
					if(this.y+this.h/2>32*20) this.y = 32*20-this.h/2;
				};
				this.desenhar = function(ctx){
					ctx.save();

					ctx.strokeStyle = "black";
					ctx.fillStyle = "rgb(250, 150, 150)";

					ctx.translate(this.x, this.y);
					ctx.rotate(this.angulo+Math.PI/2);
					ctx.beginPath();
					ctx.moveTo(-this.w/2, this.h/2);
					ctx.lineTo(this.w/2, this.h/2);
					ctx.lineTo(0, -this.h/2);
					ctx.closePath();
					ctx.fill();
					ctx.stroke();
					ctx.restore();
					ctx.strokeStyle = "white";
					ctx.strokeRect(this.gx*32,this.gy*32, 32, 32);
				};
				this.controlar = function(){

				};
				this.colidiuCom = function(alvo){
					if(this.x > alvo.x+alvo.w) return false;
					if(this.x+this.w < alvo.x) return false;
					if(this.y > alvo.y+alvo.h) return false;
					if(this.y+this.h < alvo.y) return false;
					return true;
				};
			}
*/