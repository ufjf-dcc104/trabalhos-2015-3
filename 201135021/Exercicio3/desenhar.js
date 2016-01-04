/**
 * Created by Héber on 09-Dec-15.
 */

function desenhar(){

    ctx.clearRect(0,0, 400, 300);
    ctx.strokeStyle = "black";
    ctx.fillStyle = "rgb(250, 150, 150)";

    //desenha a nave se tiver vida

    nave.desenhar(ctx);
    nave.mover(dt, gravidade);
    nave.controlar();

    if(nave.colidiuCom(xObstaculo1,yObstaculo1,larguraObstaculo,alturaObstaculo1)) {
        nave.reset();
        pontos = 0;
    }
    if(nave.colidiuCom(xObstaculo2,alturaObstaculo2,larguraObstaculo,yObstaculo2)) {
        nave.reset();
        pontos = 0;
    }
    if(nave.colidiuCom(xObstaculo3,yObstaculo3,larguraObstaculo,alturaObstaculo3)) {
        nave.reset();
        pontos = 0;
    }
    if(nave.colidiuCom(xObstaculo4,alturaObstaculo4,larguraObstaculo,yObstaculo4)) {
        nave.reset();
        pontos = 0;
    }
    //imprime na tela a quantidade de pontos
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.fillText("Pontos = "+ pontos, 310, 30, 100);
    ctx.closePath();
    ctx.stroke();

    //obstaculos
    if(xObstaculo1 >= 400){
        xObstaculo1 = 1;
        alturaObstaculo1 = getRandomInt(minAlturaObstaculo, maxAlturaObstaculo);
    }else{
        xObstaculo1 += velocidadeBloco;
    }

    if(xObstaculo2 >= 400){
        xObstaculo2 = 1;
        alturaObstaculo2 = getRandomInt(300 - minAlturaObstaculo, 300 - maxAlturaObstaculo);
        yObstaculo2 = 299 - alturaObstaculo2;
    }else{
        xObstaculo2 += velocidadeBloco;
    }

    if(xObstaculo3 >= 400){
        xObstaculo3 = 1;
        alturaObstaculo3 = getRandomInt(minAlturaObstaculo, maxAlturaObstaculo);
    }else{
        xObstaculo3 += velocidadeBloco;
    }

    if(xObstaculo4 >= 400){
        xObstaculo4 = 1;
        alturaObstaculo4 = getRandomInt(300 - minAlturaObstaculo, 300 - maxAlturaObstaculo);
        yObstaculo4 = 299 - alturaObstaculo4;
    }else{
        xObstaculo4 += velocidadeBloco;
    }

    //obstaculo 1
    ctx.fillStyle = "red";
    ctx.fillRect(xObstaculo1,yObstaculo1,larguraObstaculo,alturaObstaculo1);
    ctx.strokeStyle = "dark";
    ctx.lineWidth = 3;
    ctx.strokeRect(xObstaculo1,yObstaculo1,larguraObstaculo,alturaObstaculo1);

    //obstaculo 2
    ctx.fillStyle = "red";
    ctx.fillRect(xObstaculo2,alturaObstaculo2,larguraObstaculo,yObstaculo2);
    ctx.strokeStyle = "dark";
    ctx.lineWidth = 3;
    ctx.strokeRect(xObstaculo2,alturaObstaculo2,larguraObstaculo,yObstaculo2);

    //obstaculo 3
    ctx.fillStyle = "red";
    ctx.fillRect(xObstaculo3,yObstaculo3,larguraObstaculo,alturaObstaculo3);
    ctx.strokeStyle = "dark";
    ctx.lineWidth = 3;
    ctx.strokeRect(xObstaculo3,yObstaculo3,larguraObstaculo,alturaObstaculo3);

    //obstaculo 4
    ctx.fillStyle = "red";
    ctx.fillRect(xObstaculo4,alturaObstaculo4,larguraObstaculo,yObstaculo4);
    ctx.strokeStyle = "dark";
    ctx.lineWidth = 3;
    ctx.strokeRect(xObstaculo4,alturaObstaculo4,larguraObstaculo,yObstaculo4);

    pontos++;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Sprite(){
    this.x = 130;
    this.y = 130;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.w = 30;
    this.h = 40;
    this.mover = function(dt, g){
        this.vy = this.vy + this.ay*dt+g*dt;
        this.y = this.y + this.vy*dt;
        if(this.y>400 || this.y < -30){
            this.y = 130;
            this.vy = 0;
            this.ay = 0;
            pontos = 0;
        }
    };
    this.desenhar = function(ctx){
        ctx.strokeStyle = "black";
        ctx.fillStyle = "rgb(250, 150, 150)";
        ctx.beginPath();
        ctx.moveTo(this.x, 30+this.y);
        ctx.lineTo(20+this.x, 30+this.y);
        ctx.lineTo(10+this.x,    this.y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    };
    this.controlar = function(){
        if(teclado.cima) {
            this.ay = pulo;
        }else
            this.ay = 0;
    };
    this.colidiuCom = function(x, y, w, h){
        if(this.x > x+w) return false;
        if(this.x+this.w < x) return false;
        if(this.y > y+h) return false;
        if(this.y+this.h < y) return false;
        return true;
    };
    this.reset = function(){
        this.x = 130;
        this.y = 130;
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;
        this.w = 30;
        this.h = 40;
    }
}