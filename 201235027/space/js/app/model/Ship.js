define(function (require) {
    var GameObject = require('../engine/GameObject'),
        IDGenerator = require('../engine/IDGenerator'),
        Bullet = require('./Bullet'),
        GameOver = require('./GameOver');

    function Ship(id, controller) {
        //Game Object Configs
        this.init(id, controller);
        this.width = 40;
        this.height = 26;
        this.x = (controller.canvasWidth/2.0) - (this.width/2.0);
        this.y = controller.canvasHeight - this.height;
        this.speed = 150;
        this.zIndex = 2;

        //Shooting
        this.shootDelay = 0.5;  //in seconds
        this.timeToShoot = 3;

        this.IDGen = new IDGenerator();

        this.update = function() {
            this.checkCollision();

            //score per second
            this.shared.score += this.shared.scorePerSec * this.dt();

            this.timeToShoot -= this.dt();

            // Y move
            if(this.keyStatus.pressed('up')) {
                this.y -= this.speed*this.dt();

                if(this.y <= 250)
                    this.y = 250;
            } else if(this.keyStatus.pressed('down')){
                this.y += this.speed*this.dt();

                if(this.y >= controller.canvasHeight - this.height)
                    this.y = controller.canvasHeight - this.height;
            }

            // X move
            if(this.keyStatus.pressed('right')){
                this.x += this.speed*this.dt();

                if(this.x >= controller.canvasWidth - this.width)
                    this.x = controller.canvasWidth - this.width;
            } else if(this.keyStatus.pressed('left')){
                this.x -= this.speed*this.dt();

                if(this.x <= 0)
                    this.x = 0;
            }

            if(this.keyStatus.pressed('space')){
                this.shoot();
            }
        };

        this.draw = function() {
            this.context.drawImage(this.imageRepository.get('ship'), this.x, this.y);
        };

        this.checkCollision = function () {
            for(var objId in this.objectRepository.getObjectsByType('enemy_bullet')){
                var obj = this.objectRepository.get(objId);

                if(obj.alive && this.collide(obj)) {
                    this.collideListener(obj);
                    obj.collideListener(this);
                }
            }
        };

        this.collideListener = function(obj) {
            this.audioRepository.play('explosion');

            if(this.shared.shipLife - 5 > 0) {
                this.shared.shipLife -= 5;
            } else {
                //GameOver
                this.shared.shipLife = 0;
                this.shared.gameover = true;
                this.shared.clearZindex(2);
                this.objectRepository.add(new GameOver('gameover', this.controller));
            }
        };

        this.shoot = function() {
            if(this.timeToShoot > 0)
                return;

            this.timeToShoot = this.shootDelay;

            var bullet1 = new Bullet(this.IDGen.get(), this.controller);
            bullet1.x = this.x + 6;
            bullet1.y = this.y + 5;

            var bullet2 = new Bullet(this.IDGen.get(), this.controller);
            bullet2.x = this.x + 33;
            bullet2.y = this.y + 5;

            this.objectRepository.add(bullet1);
            this.objectRepository.add(bullet2);

            this.audioRepository.play('laser');
        };
    }

    Ship.prototype = new GameObject();

    return Ship;
});