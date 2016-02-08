function Personagem ()
{
	this.x = 20.0;
	this.y = 0.0;
	this.vx = 0.0;
	this.vy = 0.0;
	this.ax = 0.0;
	this.atx = 1.5;
	this.ay = 0.0;
	this.w = 30.0;
	this.h = 30.0;
	this.vivo = true;
	this.plataforma = false;
	this.img;
	this.p;						
	this.f;
	this.direita;
	this.esquerda;
	this.pulando;					

	this.mover = function (dt,g,mapa,plat,espinhos,vitoria)
	{
		// Calcula o quadrado que estou
		var gx, gy;
		gx = Math.floor(pc.x/30);
		gy = Math.floor((pc.y+14)/30);	
		// Checa se colidiu com as flechas
		for (var i = 0; i < 4; i++)
		{
			if (espinhos[i].colidiuCom(this))
			{
				this.vivo = false;
				console.log("Morreu");
			}
		}
		// Checa se colidiu na plataforma, se sim o movimento deve ser igual ao da plataforma
		if (this.colidiuCom(plat))
		{
			this.plataforma = true;
			this.y = plat.y-30;
		}
		// Checa se caiu na lava
		if (mapa[gy][gx] == 2)
		{
			this.vivo = false;
			console.log("Morreu");
			return;
		}
		
		if (mapa[gy][gx] == 3)
		{
			vitoria = true;
			console.log("Vitoria");
		}		

		// Captura movimento do teclado
		if(this.direita)
		{
			if (this.plataforma)
				this.ax += -150;
			else
				this.ax = -150;
		}
		else if(this.esquerda)
		{
			if (this.plataforma)
				this.ax += 150;
			else
				this.ax = 150;
		}
		else
			this.ax = 0;
		if(this.pulando && this.vy == 0 && !mapa[gy-1][gx])
		{
			this.vy = -0.6*g;
			this.pulando = false;
			this.plataforma = false;
		}
		
		// Atualiza as posicoes do personagem
		if (this.plataforma)		// Estou sobre uma plataforma ? Se sim mover junto com ela
		{
			console.log("Colidindo com plataforma !");
			// Desaceleracao
			this.ax -= this.atx*this.vx;
			this.ax += plat.ax;	
			
			// Velocidade
			this.vx = this.ax*dt;
			this.vy = 0;
			
			// Posicao
			this.x += plat.vx*dt + this.vx*dt;
			this.y += this.vy*dt;
		
			if (!this.colidiuCom(plat))
				this.plataforma = false;
		}
		else
		{
			// Desaceleracao
			this.ax -= this.atx*this.vx;

			// Velocidade
			this.vx = this.vx + this.ax*dt;					
			this.vy = this.vy + this.ay*dt + g*dt;

			// Descubro a posicao (x,y) do meio do sprite 
			this.gx = Math.floor(this.x/30);
			this.gy = Math.floor((this.y+14)/30);

			// Posicao
			this.x = this.x + this.vx*dt;
			// Verifica se a celula de baixo eh parede
			if (mapa[this.gy+1][this.gx] == 1)
			{
				var dy = Math.min(
					this.vy*dt,
					(this.gy+1)*30-(this.y+this.h/2)
				);
				if(dy ==0) this.vy = 0;
				this.y += dy;

			} 
			else
				this.y = this.y + this.vy*dt;
		}
		// Tras o sprite de volta para a tela
		if(this.x<0) this.x = 0;	
		if(this.y<0) this.y = 0;
		if(this.x+this.w/2>30*20) this.x = 30*20-this.w/2;	
		if(this.y+this.h/2>30*20) this.y = 30*20-this.h/2;

		return (vitoria);
	};

	this.desenhar = function (ctx)
	{
		ctx.save();
		ctx.translate(this.x, this.y);			// Tranfere a origem do sistema de coordenadas para o meio do sprite
		if (Math.abs(this.vx) < 2)
		{
			this.vx = 0;
			ctx.scale(2,2);
			this.p = 1;
		}
		else if(this.vx > 0)
		{
			this.p=2;
			ctx.scale(2,2);
		}
		else 
		{
			this.p=2;
			ctx.scale(-2,2);
		}
		this.f += 8*dt;
		
		switch (this.p)
		{
			case 1: if (this.f >= 5) this.f = 1;
				break;
			case 2: if (this.f >= 7) this.f = 1;
				break;
		}
		if (this.vy < 0)
		{
			this.p = 3;
			this.f = 1;
		}
		else if (this.vy > 0)
		{
			this.p = 3;
			this.f = 2;
		}
		
		ctx.drawImage(this.img,Math.floor(this.f)*16,this.p*16,16,16,-8,-8,16,16);
		ctx.restore();
		
	};

	this.colidiuCom = function (alvo)
	{
		if(this.x > alvo.x+alvo.w) return false;
		if(this.x+this.w < alvo.x) return false;
		if(this.y > alvo.y+alvo.h) return false;
		if(this.y+this.h < alvo.y) return false;
		return true;
	};
}
