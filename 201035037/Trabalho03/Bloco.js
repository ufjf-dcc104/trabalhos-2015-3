/*
Bloco dinâmico (se move no mapa)
*/
function BlocoDin(){

	this.x = 0;//posição em x
	this.y = 0;//posição em y
	this.gx= 0;//posição em x no grid
	this.gy= 0;//posição em y no grid
	this.vx = 0;//velocidade em x
	this.vy = 0;//velocidade em y
	///this.ax = 0;//aceleracao em x
	///this.ay = 0;//aceleração em y
	///this.atx = 1.5;//atrito em x
	///this.aty = 0;//atrito em y
	this.altura= 32;
	this.largura= 32;
	this.tipo="h";
	
	this.img= new Image();
	
	this.moverNoGrid= function(grid,dt,g){
		
		//this.ax -= this.atx*(this.vx);
    
		this.vx = this.vx + dt;//this.ax*dt;	
    
		this.gx = Math.floor((this.x)/this.largura);
		this.gy = Math.floor((this.y)/this.altura);
    
		this.x = this.x + this.vx*dt;
		
	};//fim: mover no grid
	
	this.controlar= function(grid){
		if(grid[this.gy][this.gx+2]>0){
			this.vx =(-1)*Math.abs(this.vx);
		}else if(grid[this.gy][this.gx-1]>0){
			this.vx = Math.abs(this.vx);
		}
	};
	
	
	///sobrescrever a fç de desenho
	this.desenhar = function(ctx, mapaAtual){
		ctx.save();
		
		ctx.translate(this.x, this.y);
		ctx.drawImage(this.img,0,mapaAtual*this.largura,///corte: pos inicial x, y
										  this.largura,this.altura,/// tamanho do corte largura, altura
										  0, 0,///imagem pos (x,y)
										  this.largura, this.altura);///imagem tamanho: largura,altura
		ctx.restore();
		//ctx.strokeStyle = "white";
		//ctx.strokeRect(this.gx*this.largura,this.gy*this.altura, this.largura, this.altura);
	};
	
};
