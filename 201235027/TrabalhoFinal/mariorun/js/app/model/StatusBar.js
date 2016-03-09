define(function (require) {
    var GameObject = require('../engine/GameObject'),
        Const = require('../Const');

    function StatusBar(id, controller) {
        //Game Object Configs
        this.init(id, controller);
        this.zIndex = 4;

        this.update = function() {
            if(this.shared.actualScore > this.shared.myBest)
                this.shared.myBest = this.shared.actualScore;

            if(this.shared.myBest > this.shared.roomBest)
                this.shared.sendBestScore();
        };

        this.draw = function() {
            this.context.fillStyle = "rgba(0, 0, 0, 0.6)";
            this.context.fillRect(0,0,600,20);

            this.context.font = "13px Arial";
            this.context.fillStyle = "rgb(255, 255, 255)";

            this.context.fillText('Name: '+this.shared.myID, 5, 15);
            this.context.fillText('Your best: '+this.shared.myBest, 160, 15);
            this.context.fillText('Room best: '+this.shared.roomBest, 265, 15);
            this.context.fillText('Users On: '+this.shared.usersOn, 380, 15);
            this.context.fillText('Actual Score: '+this.shared.actualScore, 480, 15);
        };

    }

    StatusBar.prototype = new GameObject();

    return StatusBar;
});