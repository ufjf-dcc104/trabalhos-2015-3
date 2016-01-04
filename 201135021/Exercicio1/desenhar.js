/**
 * Created by Héber on 07-Dec-15.
 */

function desenhar(){
    ctx.clearRect(0, 0, 400, 300);

    nave.controlar();
    nave.mover(dt, g);
    nave.desenhar(ctx);

    for(var i=0;i<inimigos.length;i++){
        inimigos[i].controlar();
        inimigos[i].mover(dt, g);
        inimigos[i].desenhar(ctx);

        if(nave.colidiuCom(inimigos[i])){
            energia = energia-30;
            inimigos[i].reset();
            if(energia <= 0) {
                vidas--;
                energia = 300;
            }

        }

        if(intervaloTiroInimigo > frequenciaTiroInimigo){
            if(inimigos[i].y > 0) {
                bulletInimigo.push(new SpriteTiro(inimigos[i].x + 14, inimigos[i].y + 32, imgBala, getRandomInt(minVelocidadeTiroInimigo, maxVelocidadeTiroInimigo)));
                intervaloTiroInimigo = 0;
            }
        }

        intervaloTiroInimigo+=dt*30;
    };

    for(var j=0;j<bullet.length;j++){
        if(bullet[j]>0){
            bullet.splice(j,1);
            j--;
        }
        bullet[j].controlar();
        bullet[j].mover(dt, -g);
        bullet[j].desenhar(ctx);

        for(var i = 0;i<inimigos.length;i++){
            if(bullet[j].colidiuCom(inimigos[i])){
                pontos++;
                inimigos[i].reset();
                bullet.splice(j, 1);
                j--;
                break;
            }
        }
    };

    for(var i=0;i<bulletInimigo.length;i++){
        if(bulletInimigo[i]>300){
            bulletInimigo.splice(i,1);
            i--;
        }
        bulletInimigo[i].controlar();
        bulletInimigo[i].mover(dt, g);
        bulletInimigo[i].desenhar(ctx);

        if(bulletInimigo[i].colidiuCom(nave)){
            energia = energia - 30;
            bulletInimigo.splice(i,1);
            i--;
        }
    }

    //imprime na tela a quantidade de vidas
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.fillText("vidas = "+ vidas, 310, 10, 100);
    ctx.fillText("pontos = "+ pontos, 310, 20, 100);
    ctx.closePath();
    ctx.stroke();

    //barra de energia
    ctx.fillStyle = "red";
    ctx.fillRect(1,1,energia,10);
    ctx.strokeStyle = "dark";
    ctx.lineWidth = 3;
    ctx.strokeRect(1,1,energia,10);

    intervaloTiroNave+=dt*30;

    if(vidas < 0) {
        ctx.clearRect(0, 0, 400, 300);
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.fillText("GAME OVER", 150, 150, 1000);
        ctx.closePath();
        ctx.stroke();
    }
};

function BancoDeImagens(){
    this.imagens = {};
    this.add = function(nome, url){
        this.imagens[nome] = new Image();
        this.imagens[nome].src = url;
    };
    this.desenhaXY =function(ctx, nome, x, y){
        ctx.drawImage(this.imagens[nome], x, y);
    };
    this.desenhaXYWH =function(ctx, nome, x, y, w, h){
        ctx.drawImage(this.imagens[nome], x, y, w, h);
    };
    this.desenha = function(ctx, nome,
                            x, y, w, h,
                            dx, dy, dw, dh
    ){
        ctx.drawImage(this.imagens[nome], x, y, w, h,
            dx, dy, dw, dh);
    };
}

function SpriteNave(x, y){
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.w = 32;
    this.h = 32;
    this.mover = function(dt, g){
        this.ax -= 0.5 * (this.vx);
        this.vx = this.vx + this.ax * dt;
        this.x = this.x + this.vx * dt;
        if(this.x < 0){
            this.x = 0;
        }else if(this.x > 368){
            this.x = 368;
        }
    };
    this.desenhar = function(ctx){
        imagens.desenhaXY(ctx, "ship", this.x, this.y);

    };
    this.controlar = function(){
        if(teclado.direita){
            this.ax = 30;
            this.vx = 100;
        }else if(teclado.esquerda) {
            this.ax = -30;
            this.vx = -100;
        }else if(teclado.espaco){
            if(intervaloTiroNave > frequenciaTiroNave){
                bullet.push(new SpriteTiro(nave.x+14, nave.y, imgBala, getRandomInt(minVelocidadeTiroNave,maxVelocidadeTiroNave)));
                intervaloTiroNave = 0;
            }
        }else{
            this.ax = 0;
        }
    };
    this.colidiuCom = function(alvo){
        if(this.x > alvo.x+alvo.w) return false;
        if(this.x+this.w < alvo.x) return false;
        if(this.y > alvo.y+alvo.h) return false;
        if(this.y+this.h < alvo.y) return false;
        return true;
    };
};

function SpriteInimigos(minX, maxX, minY, maxY, img){
    this.x = getRandomInt(minX,maxX);
    this.y = getRandomInt(minY,maxY);
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.w = 32;
    this.h = 32;
    this.mover = function(dt, g){
        this.y = this.y + velocidadeInimigo*dt*g;
        if(this.y > 268){
            this.x = getRandomInt(minX,maxX);
            this.y = getRandomInt(minY,maxY);
            energia = energia-15;
            if(energia <= 0){
                vidas--;
                energia = 300;
            }
        }
    };
    this.desenhar = function(ctx){
        imagens.desenhaXY(ctx, img, this.x, this.y);
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
    this.reset = function(){
        this.x = getRandomInt(minX,maxX);
        this.y = getRandomInt(minY,maxY);
    }
}

function SpriteTiro(x, y, img, velocidadeBala){
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.w = 4;
    this.h = 4;
    this.velocidadeBala = velocidadeBala;
    this.mover = function(dt, g){
        this.y = this.y + this.velocidadeBala*dt*g;
    };
    this.desenhar = function(ctx){
        imagens.desenhaXYWH(ctx, img, this.x, this.y, this.w, this.h);
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

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}