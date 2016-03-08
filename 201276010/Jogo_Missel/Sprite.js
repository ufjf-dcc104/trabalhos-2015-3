function BancoDeImagens(){
                    this.imagens = {};
                    this.add = function(nome,url){
                        this.imagens[nome] = new Image();
                        this.imagens[nome].src = url;
                    };
                    this.desenhaXY = function(ctx,nome,x,y){
                      ctx.drawImage(this.imagens[nome],x,y);  
                    };
                    this.desenhaCompleto = function(ctx,nome,x,y,w,h,dx,dy,dw,dh){
                      ctx.drawImage(this.imagens[nome],x,y,w,h,dx,dy,dw,dh);  
                    };
                        
                };
                var imagens = new BancoDeImagens();
                imagens.add("ship","nave.png");
                imagens.add("ship2","spritesheet.png");			

		function Sprite(){
				this.x = 190;
				this.y = 270;
				this.vx = 0;
				this.vy = 0;
				this.ax = 0;
				this.ay = 0;
				this.w = 30;
				this.h = 40;
				this.velocidade = 0;
				this.angulo = 4.7;
				this.va = 0;

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
				
				this.desenharNave = function(ctx,nomeNave,xx,yy){
					ctx.save();

					ctx.strokeStyle = "black";
					ctx.fillStyle = "rgb(250, 150, 150)";
					width = this.w * 1.2;
					height = this.h * 1.2;
					posX = this.x - width/2;
					posY = this.y - height/2;
					imagens.desenhaCompleto(ctx,nomeNave,xx,yy,30,40,posX,this.y,30,40);

					ctx.translate(this.x, this.y);
					ctx.rotate(this.angulo+Math.PI/2);
					ctx.beginPath();
					
					ctx.closePath();
					ctx.fill();
					ctx.stroke();
					ctx.restore();
				};
				this.desenharTiro = function(ctx){
					ctx.save();

					ctx.strokeStyle = "black";
					ctx.fillStyle = "rgb(250, 150, 150)";
					width = this.w * 1.2;
					height = this.h * 1.2;
					posX = this.x - width/2;
					posY = this.y - height/2;


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
				this.desenharAliado = function(ctx){
					ctx.save();

					ctx.strokeStyle = "black";
					ctx.fillStyle = "rgb(250, 150, 150)";
					width = this.w * 1.2;
					height = this.h * 1.2;
					posX = this.x - width/2;
					posY = this.y - height/2;

						
					ctx.translate(this.x, this.y);
					ctx.rotate(this.angulo+Math.PI/2);
					imagens.desenhaXY(ctx,"ship",-15,-10);
					ctx.beginPath();
					
					ctx.closePath();
					ctx.fill();
					ctx.stroke();
					ctx.restore();
	                        }
	
				this.controlar = function(){

				};
				this.colidiuCom = function(alvo){
					var porcentagemTamanho = 0.7;
					thiswidth = this.w * porcentagemTamanho ;
					thisheight = this.h * porcentagemTamanho ;
					thisposX = this.x - (thiswidth/2);
					thisposY = this.y - (thisheight/2);

					alvowidth = alvo.w * porcentagemTamanho ;
					alvoheight = alvo.h * porcentagemTamanho ;
					alvoposX = alvo.x - alvowidth/2;
					alvoposY = alvo.y - alvoheight/2;
	
					if(thisposX > alvoposX+alvowidth) return false;
					if(thisposX+thiswidth < alvoposX) return false;
					if(thisposY > alvoposY+alvoheight) return false;
					if(thisposY+thisheight < alvoposY) return false;
					return true;
				};
			}
                        
                           function Predio(x,y, w,h){
                               
				
                                this.w = w;
                                this.h = h;
				this.x = x;
				this.y = y;
                                
                                this.desenhar = function(ctx){
					ctx.save();
					ctx.beginPath();
                                        ctx.fillStyle = "red";
					width = this.w * 1.1;
					height = this.h * 1.1;
					posX = this.x - width/2;
					posY = this.y - height/2;
                                        ctx.fillRect(this.x,this.y,this.w,this.h);
                                        ctx.strokeStyle = "darkred";
                                        ctx.lineWidth = 3;
                                        ctx.strokeRect(this.x,this.y, this.w,this.h);
					
					ctx.closePath();
					ctx.fill();
					ctx.stroke();
					ctx.restore();
				};
                                
                                this.apagar = function(ctx){
					this.w=-1000;
                                        this.h=-1000;
                                        this.x=-1000;
                                        this.y=-1000;
				};

				this.colidiuCom = function(alvo){
					porcentagemTamanho = 1.1;

					alvowidth = alvo.w * porcentagemTamanho ;
					alvoheight = alvo.h * porcentagemTamanho ;
					alvoposX = alvo.x - alvowidth/2;
					alvoposY = alvo.y - alvoheight/2;
	
					if(this.x > alvoposX+alvowidth) return false;
					if(this.x+this.w < alvoposX) return false;
					if(this.y > alvoposY+alvoheight) return false;
					if(this.y+this.h < alvoposY) return false;
					return true;
				};
                               
                           }
