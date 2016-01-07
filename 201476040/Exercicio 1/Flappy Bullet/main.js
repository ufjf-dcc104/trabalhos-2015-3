var game = new Phaser.Game(400, 490, Phaser.AUTO, 'gameDiv');

var mainState = 
{

    preload: function() 
    { 
        var randomBG = Math.floor(Math.random()*16777215).toString(16);  //variável para criar N cores de background
        game.stage.backgroundColor = randomBG //define o fundo do jogo para a cor em questão

        game.load.image('bullet', 'imgs/bullet.png'); //carrega a imagem do projétil
        game.load.image('pipe', 'imgs/pipe.png');  //carrega a imagem dos canos
    },

    create: function() 
    { 
        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.pipes = game.add.group();
        this.pipes.enableBody = true;
        this.pipes.createMultiple(30, 'pipe');  
        this.timer = this.game.time.events.loop(1500, this.addRowOfPipes, this);           

        //física do projétil
        this.bullet = this.game.add.sprite(100, 245, 'bullet');
        game.physics.arcade.enable(this.bullet);
        this.bullet.body.gravity.y = 800; 

        //centraliza a posição do projétil após a animação
        this.bullet.anchor.setTo(-0.2, 0.5); 
 
        //define o uso da tecla de espaço
        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this); 

        this.score = 0; //cria o placar e a pontuação inicial
        this.labelScore = this.game.add.text(350 , 20, "0", { font: "30px Arial", fill: "#ffffff" });  
    },

    update: function() 
    {
        if (this.bullet.inWorld == false)
            this.restartGame(); //verifica se o projétil está dentro da tela do jogo, se não estiver reinicia o jogo 

        game.physics.arcade.overlap(this.bullet, this.pipes, this.hitWall, null, this); 

        
        if (this.bullet.angle < 20)     //rotaciona levemente o projétil para baixo
            this.bullet.angle += 1;     
    },

    jump: function() 
    {
        
        if (this.bullet.alive == false) //verifica se o projétil esta "vivo", se não estiver então não pode pular
            return; 

        this.bullet.body.velocity.y = -320; //'velocidade' do salto

        
        game.add.tween(this.bullet).to({angle: -20}, 100).start(); //animação do salto
    },

    hitWall: function() {
        
        if (this.bullet.alive == false) //
            return;
            
        this.bullet.alive = false;

        //previne que apareçam mais paredes quando o projétil acertar uma das paredes
        this.game.time.events.remove(this.timer);
    
        
        this.pipes.forEachAlive(function(p){
            p.body.velocity.x = 0;
        }, this);
    },
    //função auto-explicativa, reinicia o jogo
    restartGame: function() {
        game.state.start('main');
    },

    //cria um bloco da parede, se o projétil não estiver "morto"
    addOnePipe: function(x, y) {
        var pipe = this.pipes.getFirstDead();

        pipe.reset(x, y);
        pipe.body.velocity.x = -200;  
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    },

    //cria o buraco na parede, a partir dos blocos que foram criados
    addRowOfPipes: function() {
        var hole = Math.floor(Math.random()*5)+1;
        
        for (var i = 0; i < 10; i++)
            if (i != hole && i != hole +1) 
                this.addOnePipe(400, i*50+1);   
    //aumenta o score se passar no buraco
        this.score += 1;
        this.labelScore.text = this.score;  
    },
};
//faz o jogo iniciar xD
game.state.add('main', mainState);  
game.state.start('main'); 