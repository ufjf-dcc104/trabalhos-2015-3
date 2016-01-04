/**
 * Created by Héber on 09-Dec-15.
 */
function desenhar(){

    vx = vx + ax*dt + vento*dt;
    x = x + vx*dt;
    vy = vy + ay*dt+gravidade*dt;
    y = y + vy*dt;

    if(y > 250){
        if(x > 300 && x < 350 && vy < 30){
            if(nivelAtual < nivel.length)
                nivelAtual = nivelAtual + 1;

            y = 130;
            x = 130;
        }
        else if(x > 300 && x < 350 && vy > 30) {
            if(vidas > 0){
                vidas = vidas - 1;
            }

            y = 130;
            x = 130;
        }
        else if(x < 300 || x > 350) {
            if(vidas > 0){
                vidas = vidas - 1;
            }

            y = 130;
            x = 130;
        }

        ay = 0;
        ax = 0;
        vy = 0;
        vx = 0;
        combustivel = combustivelInicial;
    }
    //calcula a velocidade do vento
    vento = getRandomInt(-50, 50);

    //controla combustivel
    if(vidas > 0)
        combustivel -= nivel[nivelAtual];
    else
        combustivel = 0;

    if(combustivel <= 0){
        if(vidas > 0){
            vidas = vidas - 1;
            combustivel = combustivelInicial;
        }

        y = 130;
        x = 130;
    }

    ctx.clearRect(0,0, 400, 300);
    ctx.strokeStyle = "black";
    ctx.fillStyle = "rgb(250, 150, 150)";

    //desenha a nave se tiver vida
    if(vidas > 0) {
        ctx.beginPath();
        ctx.moveTo(x, 30 + y);
        ctx.lineTo(20 + x, 30 + y);
        ctx.lineTo(10 + x, y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    //cria o retangulo de pouso
    ctx.beginPath();
    ctx.rect(300, 280, 50, 10);
    ctx.closePath();
    ctx.stroke();

    //imprime na tela a quantidade de vidas
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.fillText("vidas = "+ vidas, 310, 10, 100);
    ctx.fillText("combustivel = "+ combustivel, 310, 20, 100);
    ctx.fillText("nível = "+ nivelAtual, 310, 30, 100);
    ctx.fillText("vento = "+ vento, 310, 40, 100);
    //ctx.fillText("velocidade = "+ vy, 310, 50, 100);
    ctx.closePath();
    ctx.stroke();

    //barra de combustivel
    ctx.fillStyle = "red";
    ctx.fillRect(1,1,combustivel,10);
    ctx.strokeStyle = "dark";
    ctx.lineWidth = 3;
    ctx.strokeRect(1,1,300,10);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}