define(function (require) {
    var $ = require('jquery'),
        bootstrap = require('bootstrap'),
        confs = require('./config'),
        GameController = require('./engine/GameController'),
        Background = require('./model/Background'),
        Ship = require('./model/Ship'),
        Enemy = require('./model/Enemy'),
        Stage = require('./model/Stage'),
        StatusBar = require('./model/StatusBar');

    $(function () {
        var gameController = new GameController('game', confs);
        var audioRepository = gameController.getAudioRepository();
        var imageRepository = gameController.getImageRepository();
        var objectRepository = gameController.getObjectRepository();
        var shared = gameController.shared;
        var ctx = gameController.context;

        //Audio
        audioRepository.add('laser', 'sounds/laser.wav', 10);
        audioRepository.add('explosion', 'sounds/explosion.wav', 10);
        audioRepository.add('bg', 'sounds/kick_shock.wav', 1, {'loop': true});

        //Images
        imageRepository.add('bg', 'imgs/bg.png');
        imageRepository.add('ship', 'imgs/ship.png');
        imageRepository.add('bullet', 'imgs/bullet.png');
        imageRepository.add('bullet_enemy', 'imgs/bullet_enemy.png');
        imageRepository.add('enemy', 'imgs/enemy.png');


        //Enemies
        shared.populateEnemies = function(){
            var lines = 4;
            var columns = 7;
            var enemyWidth = 38;
            var enemyHeight = 28;
            var borderPadding = 10;
            var emptySpace = (2*borderPadding) + 140;
            var space = ((gameController.canvasWidth-emptySpace) - (columns*enemyWidth))/columns;
            var bottomSpace = 10;

            for(var i = 0; i < lines; i++) {
                for(var j = 0; j < columns; j++) {
                    var enemy = new Enemy('enemy' + i + j, gameController);
                    enemy.x = borderPadding + (j * (enemyWidth+space));
                    enemy.y = (i * (enemyHeight+bottomSpace)) - (lines*(enemyHeight+bottomSpace));

                    enemy.xLeftL = enemy.x;
                    enemy.xRightL = enemy.x + (emptySpace+borderPadding);
                    enemy.yBottomL = 170 - enemyHeight - ((lines-1-i) * (enemyHeight+bottomSpace));
                    objectRepository.add(enemy);
                }
            }
        };

        shared.clearZindex = function(index) {
            for (var objId in objectRepository.zObjects[index]) {
                objectRepository.remove(objId);
            }
        };

        shared.newGame = function() {
            //Remove everything on z-index2 (Ship, Bullets and enemies)
            shared.clearZindex(2);

            objectRepository.remove('gameover');

            //Game vars
            shared.stage = 1;

            shared.score = 0;
            shared.shipLife = 100;

            shared.enemies = 28;
            shared.shootChance = 5;

            shared.gameover = false;
            shared.scorePerSec = 0.5;

            //Ship
            objectRepository.add(new Ship('ship', gameController));

            //Enemies
            shared.populateEnemies();

            //Stage
            objectRepository.add(new Stage('stage', gameController));
        };


        shared.nextLevel = function() {
            shared.enemies = 28;
            shared.populateEnemies();

            //Cannot shoot
            var ship = objectRepository.get('ship');
            ship.timeToShoot = 3;

            //Remove ship & enemy bullets
            for(var objId in objectRepository.getObjectsByType('bullet')) {
                objectRepository.remove(objId);
            }

            for(var objId in objectRepository.getObjectsByType('enemy_bullet')) {
                objectRepository.remove(objId);
            }

            shared.stage++;
            //Next Stage
            objectRepository.add(new Stage('stage', gameController));

            //Difficulty
            shared.shootChance += 2;
            shared.scorePerSec += 0.2;
        };

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
            //Background
            objectRepository.add(new Background('bg', gameController));

            //Status Bar
            objectRepository.add(new StatusBar('statusBar', gameController));

            audioRepository.setMuted(true);
            audioRepository.play('bg');

            shared.newGame();
        });

        // !!
        //Game Loop
        gameController.setGameLoop(function () {

            if(!shared.gameover && shared.enemies == 0) {
                shared.nextLevel();
            }

            //Updating all objects
            gameController.updateAllObjects();

            ctx.clearRect(0, 0, gameController.canvasWidth, gameController.canvasHeight);

            //Drawing all Objects
            gameController.drawAllObjects();

        });

        gameController.start();
    });

});