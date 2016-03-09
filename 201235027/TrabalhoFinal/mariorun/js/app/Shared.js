define(function (require) {

    var io = require('socketio'),
        Const = require('./Const'),
        Map = require('./model/Map'),
        Mario = require('./model/Mario'),
        StatusBar = require('./model/StatusBar'),
        PlayerMario = require('./model/PlayerMario');

    function Share(gameController)
    {
        var self = this;
        this.gameController = gameController;

        this.gameStatus = Const.GAME_WAIT;
        this.socketState = Const.SOCKET_INIT;

        this.mapGrid = undefined;
        this.roomBest = 0;
        this.usersOn = 0;

        this.myID = undefined;
        this.myBest = 0;
        this.actualScore = 0;

        var socket = io.connect(this.gameController.config.socketurl);

        //Socket Listeners
        socket.on('connecting', function() {
            self.socketState = Const.SOCKET_CONNECTING;
        });

        socket.on('connect_failed', function() {
            self.socketState = Const.SOCKET_CONFAIL;
        });

        socket.on('error', function() {
            self.socketState = Const.SOCKET_ERROR;
        });

        socket.on('connect', function () {
            self.socketState = Const.SOCKET_CONNECTED;

            socket.emit('getMapAndId', {}, function (data) {
                self.myID = data.id;
                self.mapGrid = data.map;
                self.startGame();
            });
        });

        socket.on('newAction', function (data) {
            if(data.id == self.myID)
                return;

            //Get player
            var playerMario = self.gameController.objectRepository.get(data.id);
            if(playerMario == null)
                playerMario = self.gameController.objectRepository.add(new PlayerMario(data.id, self.gameController));

            //Update X Y
            playerMario.x = data.x;
            playerMario.y = data.y;

            switch(data.action){
                case Const.PLAYER_ENTER:
                    playerMario.vx = 0;
                    break;

                case Const.PLAYER_START:
                    playerMario.vx = 200;
                    break;

                case Const.PLAYER_JUMP:
                    playerMario.doJump();
                    break;
            }
        });

        socket.on('updateStats', function (data) {
            self.roomBest = data.bestScore;
            self.usersOn = data.usersOn;
        });

        socket.on('playerExit', function (data) {
            var playerMario = self.gameController.objectRepository.get(data.id);
            if(playerMario != null)
                self.gameController.objectRepository.assignRemove(playerMario.id);
        });

        this.startGame = function() {
            var mario = this.gameController.objectRepository.add(new Mario('mario', this.gameController));

            if(this.gameController.objectRepository.get('map') == null){
                var map = this.gameController.objectRepository.add(new Map('map', this.gameController, this.mapGrid));
                this.gameController.camera.setWorldBox(0, 0, map.width, map.height);
            }

            if(this.gameController.objectRepository.get('statusbar') == null){
                this.gameController.objectRepository.add(new StatusBar('statusbar', this.gameController, this.mapGrid));
            }

            this.sendAction(mario.x, mario.y, Const.PLAYER_ENTER);
            self.gameStatus = Const.GAME_READY;
        };


        this.sendAction = function(x, y, action) {
            socket.emit('playerAction', {'id': this.myID, 'x': x, 'y': y, 'action': action});
        };

        this.sendBestScore = function() {
            socket.emit('bestScore', {'id': this.myID, 'score': this.actualScore});
        };

    }

    return Share;
});
