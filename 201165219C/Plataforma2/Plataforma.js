function Plataforma ()
{
	this.x = 0.0;
	this.y = 0.0;
	this.vx = 0.0;
	this.vy = 0.0;
	this.ax = 0.0;
	this.ay = 0.0;
	this.w = 30.0;
	this.h = 30.0;
	this.cooldown = 0;
	this.img;
	
	this.mover = function (dt,g,grid)
	{
		var gx, gy;
		gx = Math.floor(plat.x/30);
		gy = Math.floor((plat.y+14)/30);
		// Extremidade esquerda
		if (gx < 4)
		{
			if (this.cooldown > 50)
			{
				this.ax *= -1;
				this.vx = 0;
				this.cooldown = 0;
			}
		}
		// Extremidade direita
		else if (gx == 7)
		{
			if (this.cooldown > 50)
			{
				this.ax *= -1;
				this.vx = 0;
				this.cooldown = 0;
			}
		}
		this.vx += this.ax*dt;
		this.x += this.vx*dt;
		this.cooldown++;	
	};

	this.desenhar = function (ctx)
	{
		ctx.drawImage(this.img,30,30,30,30,this.x,this.y-10,30,30);
	};

	this.colidiuCom = function (alvo)
	{

	};
}
