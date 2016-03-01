define(function (require) {
    var GameObject = require('../engine/GameObject');
    var GameOver = require('./GameOver');
    var Win = require('./Win');

    function Mario(id, controller) {
        //Game Object Configs
        this.init(id, controller);
        this.zIndex = 2;
        this.x = 0;
        this.y = 223;
        this.width = 32;
        this.height = 64;

        this.vx = 200;
        this.gravity = 1000;
        this.jump = false;

        this.spriteIndex = 0;
        this.spriteTime = 0.1;
        this.spriteTimeNow = this.spriteTime;

        this.update = function() {
            if (this.keyStatus.pressed('up') && !this.jump && this.vy == 0) {
                this.jump = true;
                this.vy = -400;
                this.audioRepository.play('jump');
            } else
                this.vy = this.vy + this.gravity * this.dt();

            this.x += this.vx * this.dt();

            var gx = Math.floor((this.x + (this.width / 2)) / 32),
                gy = Math.floor((this.y + (this.height / 2) + 2) / 32);

            // Colisions
            var map = this.objectRepository.get('map');

            // End Game
            if(map.grid[gx] == undefined) {
                this.objectRepository.add(new Win('win', this.controller));
                this.objectRepository.assignRemove(this.id);
                return;
            }

            // Die
            if (map.grid[gx][gy] == undefined){
                this.objectRepository.add(new GameOver('gameover', this.controller));
                this.objectRepository.assignRemove(this.id);
                return;
            }

            //Ground Colision
            if(map.grid[gx][gy+1] == 1){
                var dy = Math.min(
                    this.vy*this.dt(),
                    (gy+1)*32-(this.y+this.height)
                );
                if(dy == 0){
                    if(this.jump) {
                        this.spriteIndex = 0;
                        this.spriteTimeNow = this.spriteTime;
                    }
                    this.vy = 0;
                    this.jump = false;
                }

                this.y += dy;
            } else {
                this.y = this.y + this.vy*this.dt();
            }

            // Sprite Update
            this.spriteTimeNow -= this.dt();
            if(this.spriteTimeNow <= 0) {
                this.spriteTimeNow = this.spriteTime;
                this.spriteIndex = (this.spriteIndex+1)%3;
            }
        };

        this.draw = function() {
            if(this.jump)
                this.context.drawImage(this.imageRepository.get('mario'), 144, 0, 16, 32, this.getDrawX(), this.getDrawY(), this.width, this.height);
            else
                this.context.drawImage(this.imageRepository.get('mario'), 112-(this.spriteIndex*16), 0, 16, 32, this.getDrawX(), this.getDrawY(), this.width, this.height);
        };

    }

    Mario.prototype = new GameObject();

    return Mario;
});