define(function (require) {
    var GameObject = require('../engine/GameObject'),
        Const = require('../Const');

    function Status(id, controller) {
        //Game Object Configs
        this.init(id, controller);
        this.zIndex = 4;

        this.draw = function() {
            this.context.font = "30px Arial";
            this.context.fillStyle = "rgb(255, 255, 255)";

            if(this.shared.gameStatus == Const.GAME_READY) {
                var mario = this.objectRepository.get('mario');
                if(mario != null && mario.vx == 0){
                    this.context.fillText('Press `space` to start the game' , 100, 170);
                }
                return;
            }

            switch(this.shared.socketState){
                case Const.SOCKET_INIT:
                    this.context.fillText('Initializing Connection...' , 130, 170);
                    break;

                case Const.SOCKET_CONNECTING:
                    this.context.fillText('Connecting...' , 160, 170);
                    break;

                case Const.SOCKET_CONFAIL:
                case Const.SOCKET_ERROR:
                    this.context.fillText('Connection Fail! Refresh the page!' , 60, 170);
                    break;

                case Const.SOCKET_CONNECTED:
                    this.context.fillText('Connected! Loading Map...' , 130, 170);
                    break;
            }
        };

    }

    Status.prototype = new GameObject();

    return Status;
});