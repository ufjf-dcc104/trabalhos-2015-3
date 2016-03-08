/**
 * Created by Héber on 20-Jan-16.
 */
function SpriteEscudo(){
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.w = 60;
    this.h = 60;
    this.tempoEscudo = 10000;
    this.mover = function(){};
    this.desenhar = function(ctx,img, x, y, dt){
        if(this.tempoEscudo < 50) {
            this.x = x;
            this.y = y;
            imagens.desenhaXYWH(ctx, img, this.x, this.y, this.w, this.h);
            this.tempoEscudo += 5*dt;
        }else{
            this.x = 0;
            this.y = 0;
        }
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
};