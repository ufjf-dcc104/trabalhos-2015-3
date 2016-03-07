define(function (require) {
    var $ = require('jquery'),
        bootstrap = require('bootstrap'),
        confs = require('./config'),
        GameController = require('./engine/GameController'),
        Background = require('./model/Background'),
        Map = require('./model/Map'),
        Mario = require('./model/Mario');

    $(function () {
        var gameController = new GameController('game', confs);
        var audioRepository = gameController.getAudioRepository();
        var imageRepository = gameController.getImageRepository();
        var objectRepository = gameController.getObjectRepository();
        var shared = gameController.shared;
        var ctx = gameController.context;

        //Audio
        audioRepository.add('jump', 'sounds/smb_jump-super.wav');

        //Images
        imageRepository.add('tiles', 'imgs/tiles.png');
        imageRepository.add('mario', 'imgs/mario.png');

        // Loading Loop
        var totalTime = 0;
        var loadMessage = ['', '.', '..', '...'];
        gameController.setLoadingLoop(function(){
            totalTime += gameController.dt;

            ctx.clearRect(0, 0, gameController.canvasWidth, gameController.canvasHeight);
            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.fillRect(0, 0, gameController.canvasWidth, gameController.canvasHeight);

            ctx.font = "70px Arial";
            ctx.fillStyle = "rgb(255, 255, 255)";

            var index = Math.floor((totalTime/0.2)%4);
            ctx.fillText('Loading' + loadMessage[index], 140, 200);
        });

        // Before start game loop
        gameController.setBeforeStart(function () {
            objectRepository.add(new Background('bg', gameController));
            objectRepository.add(new Mario('mario', gameController));
            var mapa = objectRepository.add(new Map('map', gameController));

            gameController.camera.setWorldBox(0, 0, mapa.width, mapa.height);

            audioRepository.setMuted(false);
        });

        // !!
        //Game Loop
        gameController.setGameLoop(function () {
            //Updating all objects
            gameController.updateAllObjects();

            var mario = objectRepository.get('mario');
            if(mario != null)
                gameController.camera.move(mario.x - 100);

            ctx.clearRect(0, 0, gameController.canvasWidth, gameController.canvasHeight);

            //Drawing all Objects
            gameController.drawAllObjects();
        });

        gameController.start();
    });

});