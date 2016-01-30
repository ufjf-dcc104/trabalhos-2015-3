function Espinho ()
{
	this.x = 0.0;
	this.y = 0.0;
	this.vx = 0.0;
	this.vy = 0.0;
	this.ax = 0.0;
	this.ay = 0.0;
	this.w = 30.0;
	this.h = 30.0;
	
	this.mover = function (dt,g,grid)
	{
		var gx, gy;
		gx = Math.floor(this.x/30);
		gy = Math.floor((this.y+14)/30);
		if (gy == 8)
		{
			this.vy = 0;
			this.y = -60;
		}
		this.vy += g*dt;
		this.y += this.vy*dt;
	};

	this.desenhar = function (ctx)
	{
		ctx.save();
		ctx.strokeStyle = "black";
		ctx.fillStyle = "rgb(300,300,300)";
		
		// Leva o eixo para a posicao do sprite
		ctx.translate(this.x, this.y);
		ctx.beginPath();
		ctx.moveTo(0, -this.h/2);
		ctx.lineTo(this.w, -this.h/2);
		ctx.lineTo(this.w/2, this.h/2);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		ctx.restore();
		//ctx.strokeStyle = "white";
		//ctx.strokeRect(this.gx*30,this.gy*30, 30, 30);
	};

	this.colidiuCom = function (alvo)
	{
		if(this.x > alvo.x+alvo.w/2) return false;
		if(this.x+this.w/2 < alvo.x) return false;
		if(this.y > alvo.y+alvo.h/2) return false;
		if(this.y+this.h/2 < alvo.y) return false;
		return true;
	};
}
