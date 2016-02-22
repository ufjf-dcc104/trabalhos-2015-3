			function Sprite(){
				this.x = 200;
				this.y = 280;
				this.vx = 0;
				this.vy = 0;
				this.ax = 0;
				this.ay = 0;
				this.w = 30;
				this.h = 40;
				this.velocidade = 0;
				this.angulo = -Math.PI/2;
				this.va = 0;
				this.builds= [];

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
				this.desenhar = function(ctx, n){
					ctx.save();

					ctx.strokeStyle = "black";
					ctx.fillStyle = "rgb(250, 150, 150)";
					
					var build1 = new Predio();
					build1.dados(300,300,50,30);
					var build2 = new Predio();
					build2.dados(250,300,50,30);
					var build3 = new Predio();
					build3.dados(100,300,50,30);
					var build4 = new Predio();
					build4.dados(50,300,50,30);
					
					
					if(n[0]==true)builds.push(build1);

					if(n[1]==true)builds.push(build2);

					if(n[2]==true)builds.push(build3);

					if(n[3]==true)builds.push(build4);
						
					
					
					
					builds.forEach(function(t){
						
							ctx.beginPath();
							ctx.strokeStyle="blue";
							ctx.rect(t.x,t.y,t.w,-t.h);
							ctx.stroke();
						
					});

					ctx.translate(this.x, this.y);
					ctx.rotate(this.angulo+Math.PI/2);
					ctx.beginPath();
					ctx.moveTo(-this.w/2, this.h/2);
					ctx.lineTo(this.w/2, this.h/2);
					ctx.lineTo(0, -this.h/2);
					ctx.closePath();
					ctx.fill();
					ctx.stroke();
					ctx.restore();/*
					builds.pop(build1);
					builds.pop(build2);
					builds.pop(build3);
					builds.pop(build4);*/
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
			
			function Predio(){
				this.x = 250;
				this.y = 300;
				this.vx = 0;
				this.vy = 0;
				this.ax = 0;
				this.ay = 0;
				this.w = 30;
				this.h = 40;
				this.velocidade = 0;
				this.angulo = -Math.PI/2;
				this.va = 0;

				
				this.dados = function(x,y,h,w){
					this.x=x;
					this.y=y;
					this.h=h;
					this.w=w;
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

