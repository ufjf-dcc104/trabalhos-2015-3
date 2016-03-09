			function Sprite(){
				this.x = 130;
				this.y = 130;
				this.vx = 0;
				this.vy = 0;
				this.ax = 0;
				this.ay = 0;
				this.w = 30;
				this.h = 30;
				this.velocidade = 0;
				this.angulo = -Math.PI/2;
				this.va = 0;
				this.atx = 1.5;
				this.aty = 0;

				this.mover = function(dt, g){

					this.vx = this.velocidade;
					
					this.vx = this.vx + this.ax*dt;
					
					this.x = this.x + this.vx*dt;
					this.y = this.y + this.vy*dt;
				};

				this.desenhar = function(ctx){
					ctx.beginPath();
					ctx.fillStyle = "red";
					ctx.rect(this.x,this.y,this.w,this.h);
					ctx.fill();
					ctx.closePath();
				};
				this.desenharInimigo = function(ctx){
					this.s = this.s||1;
					ctx.save();
					ctx.translate(this.x, this.y);
					ctx.rotate(this.angulo+Math.PI/2);
					if(this.vx > 0){
						ctx.scale(-2,2);
					}else {
						ctx.scale(2,2);
					}
					this.f+=8*dt
					if(this.f>5) this.f = 1;
					ctx.drawImage(this.img, Math.floor(this.f)*16, this.p*16, 16, 16,-8, 0, 16, 16	);

					ctx.restore();

				};
				this.controlar = function () {
					if(this.x>pc.x){
						this.ax = -50;
					}else if(this.x<pc.x){
						this.ax = 50;
					}
					if(this.y>pc.y && this.vy == 0){
						this.vy -= 3*g;
					}
						
				}
				

				this.moverCartGrid = function(dt, g, grid){
					this.ax -= this.atx*(this.vx);
					this.ay -= this.aty*(this.vy);

					this.vx = this.vx + this.ax*dt;					
					this.vy = this.vy + this.ay*dt + g*dt;

					this.gx = Math.floor(this.x/30);
					this.gy = Math.floor((this.y+14)/30);

					this.x = this.x + this.vx*dt;
					if(grid[this.gy+1][this.gx]==1){
						var dy = Math.min(
							this.vy*dt,
							(this.gy+1)*30-(this.y+this.h/2)
						);
						if(dy ==0) this.vy = 0;
						this.y += dy;

					} else {
						this.y = this.y + this.vy*dt;
					}
					if(this.x<this.w/2) this.x = this.w/2;	
					if(this.y<this.h/2) this.y = this.h/2;
					if(this.x+this.w/2>30*20) this.x = 30*20-this.w/2;	
					if(this.y+this.h/2>30*20) this.y = 30*20-this.h/2;
				};
				
				
				this.colidiuCom = function(alvo){
					if(this.x > alvo.x+alvo.w) return false;
					if(this.x+this.w < alvo.x) return false;
					if(this.y > alvo.y+alvo.h) return false;
					if(this.y+this.h < alvo.y) return false;
					return true;
				};
			}
