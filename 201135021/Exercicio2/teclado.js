/**
 * Created by Héber on 09-Dec-15.
 */
function teclaPressionada(e){
    console.log("Tecla: "+e.keyCode);
    if(e.keyCode==39){
        ax = 60;
    }else if(e.keyCode==37){
        ax = -60;
    }
    if(e.keyCode==40){
        ay = 30;
    }else if(e.keyCode==38){
        ay = -30;
    }
    if(e.keyCode==32){
        vy = -60;
    }
}
function teclaSolta(e){
    console.log("Tecla: "+e.keyCode);
    if(e.keyCode==39){
        ax = 0;
    }else if(e.keyCode==37){
        ax = 0;
    }
    if(e.keyCode==40){
        ay = 0;
    }else if(e.keyCode==38){
        ay = 0;
    }
}