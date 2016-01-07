			function Sprite(){
				this.x = 130;
				this.y = 130;
				this.vx = 0;
				this.vy = 0;
				this.ax = 0;
				this.ay = 0;
				this.w = 30;
				this.h = 40;
				this.velocidade = 0;
				this.angulo = 0;
				this.va = 0;
				this.cor = "rgb(250, 150, 150)";

				this.mover = function(dt, g){
					this.angulo = this.angulo + this.va*dt;
					this.vx = Math.cos(this.angulo)*this.velocidade;
					this.vy = Math.sin(this.angulo)*this.velocidade;
					//this.ax -= 0.5*(this.vx);

					//this.vx = this.vx + this.ax*dt;
					this.x = this.x + this.vx*dt;
					
					//this.ay -= 0.5*(this.vy);
					//this.vy = this.vy + this.ay*dt+g*dt;
					this.y = this.y + this.vy*dt;
				};
				this.desenhar = function(ctx){
					ctx.save();

					ctx.strokeStyle = "black";
					ctx.fillStyle = this.cor;

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
				};
				this.desenhaParede = function(ctx){
					ctx.fillStyle = this.cor;
					ctx.beginPath();
					ctx.moveTo(this.x,this.y);
					ctx.lineTo(this.x+this.w,this.y);
					ctx.lineTo(this.x+this.w,this.y+this.h);
					ctx.lineTo(this.x,this.y+this.h);
					ctx.closePath();
					ctx.stroke();
					ctx.fill();
				}
				this.colidiuCom = function(alvo){
					if(this.x > alvo.x+alvo.w) return false;
					if(this.x+this.w < alvo.x) return false;
					if(this.y > alvo.y+alvo.h) return false;
					if(this.y+this.h < alvo.y) return false;
					return true;
				};
			}
