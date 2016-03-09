			function Sprite(){
				
				this.x = 10;
				this.y = 825.99;
				//this.x = 800;
				//this.y = 20;
				this.vx = 0;
				this.vy = 0;
				this.ax = 0;
				this.ay = 0;
				this.w = 30;
				this.h = 30;
				this.altura_padrao_pulo = 30;
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
				
				this.moverPlataformaMovel = function(dt){
					this.x = this.x + this.vx*dt;
					this.y = this.y + this.vy*dt;
				};
				
				this.moverCartGrid = function(dt, g, grid){
					this.ax -= this.atx*(this.vx);
					this.ay -= this.aty*(this.vy);

					this.vx = this.vx + this.ax*dt;					
					this.vy = this.vy + this.ay*dt + g*dt;

					this.gx = Math.floor(this.x/30);
					this.gy = Math.floor((this.y+14)/30);

					this.x = this.x + this.vx*dt;
					
					/*Diferencia as plataformas: 1 -> Chão, 2 -> Plataforma Comum e 3 -> Plataforma Master (Quando o personagem alcança seu objetivo.)
					Essa parte, também, cria o limite superior (efeito de chão) das plataformas. Assim, o personagem não pode cair da plataforma
					(se ele estiver em cima dela).*/
					if((grid[this.gy + 1][this.gx] == 1) || (grid[this.gy + 1][this.gx] == 2) || (grid[this.gy + 1][this.gx] == 3) || (grid[this.gy + 1][this.gx] == 4) || (grid[this.gy + 1][this.gx] == 5) || (grid[this.gy + 1][this.gx] == 6) || (grid[this.gy + 1][this.gx] == 7)){
						
						var dy = Math.min(
							this.vy*dt,
							(this.gy + 1)*30 - (this.y + this.altura_padrao_pulo/2)
						);
						
						if(dy == 0){
							this.vy = 0;
						} 
						
						this.y += dy;
					
					//Sem obstáculos aqui.
					}else {
						this.y = this.y + this.vy*dt;
					}
					
					/*Parede Esquerda da Plataforma Comum.*/
					if(this.vx > 0 && (grid[this.gy][this.gx + 1] == 2 ||grid[this.gy][this.gx + 1] == 3)){
						
						var dx = Math.min(
							this.vx*dt,
							(this.gx + 1)*this.w - (this.x + this.w/2)
						);
						
						this.ax = 0;
						this.ay = 0;
						this.x += dx
							
					/*Parede Direita da Plataforma Comum.*/
					}else if(this.vx < 0 && (grid[this.gy][this.gx - 1] == 2 || grid[this.gy][this.gx - 1] == 3)){
						
						var dx = Math.max(
							this.vx*dt,
							(this.gx)*this.w - (this.x - this.w/2)
						);
						this.ax = 0;
						this.ay = 0;
						this.x += dx;
								
						/*Sem obstáculos aqui*/
						}else{
							this.x = this.x + this.vx*dt;
						}
					
					if(this.x < 0) this.x = 0;	
					if(this.y < 0) this.y = 0;
					
				};
				
				/*this.desenhar = function(ctx){
					
					ctx.save();

					ctx.strokeStyle = "black";
					ctx.fillStyle = "rgb(250, 150, 150)";

					ctx.translate(this.x, this.y);
					ctx.rotate(this.angulo+Math.PI/2);
					ctx.beginPath();
					//O -20, foi vc quem colocou, para o personagem andar exatamente sobre as plataformas.
					ctx.moveTo(-this.w/2, this.h/2 - 22);
					ctx.lineTo(this.w/2, this.h/2 - 22);
					ctx.lineTo(0, -this.h/2 - 22);
					
					ctx.closePath();
					ctx.fill();
					ctx.stroke();
					ctx.restore();
					ctx.strokeStyle = "white";
					ctx.strokeRect(this.gx*30,this.gy*30 - 22, 30, 30);
				};*/
				
				this.controlar = function(){};
				
				/*Função que controla a colisão dos objetos do jogo.*/ 			
				this.colidiuCom = function(alvo){
				
					//Não está colidindo.
					if(this.x > alvo.x + alvo.w){
						return false;
					} 
					if(this.x + this.w < alvo.x){
						return false;
					} 
					if(this.y > alvo.y + alvo.h){
						return false;
					} 
					if(this.y + this.h < alvo.y){
						return false; 
					} 
					  
					//Qualquer outro caso, está colidindo.
					return true;
				};
			}
