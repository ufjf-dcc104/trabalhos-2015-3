define(function (require) {
    var GameObject = require('../engine/GameObject'),
        IDGenerator = require('../engine/IDGenerator'),
        EnemyBullet = require('./EnemyBullet');

    function Enemy(id, controller) {
        //Game Object Configs
        this.init(id, controller);
        this.width = 38;
        this.height = 28;
        this.zIndex = 2;
        this.speed = 50;

        //Move limits
        this.xRightL = 0;
        this.xLeftL = 0;
        this.yBottomL = 0;

        //Shooting
        this.shootDelay = 1;  //in seconds
        this.timeToShoot = 3;

        this.IDGen = new IDGenerator();

        this.update = function() {
            this.checkCollision();

            this.timeToShoot -= this.dt();

            //Move
            this.x += this.speed*this.dt();

            if(this.x < this.xLeftL) {
                this.speed = -1 * this.speed;
                this.x = this.xLeftL;
            } else if(this.x > this.xRightL) {
                this.speed = -1 * this.speed;
                this.x = this.xRightL;
            }

            this.y += Math.abs(this.speed)*this.dt();

            if(this.y > this.yBottomL)
                this.y = this.yBottomL;

            //Shoot
            this.shoot();
        };

        this.draw = function() {
            this.context.drawImage(this.imageRepository.get('enemy'), this.x, this.y);
        };

        this.checkCollision = function () {

            for(var objId in this.objectRepository.getObjectsByType('bullet')){
                var obj = this.objectRepository.get(objId);

                if(obj.alive && this.collide(obj)) {
                    this.collideListener(obj);
                    obj.collideListener(this);
                }
            }

        };

        this.collideListener = function(obj) {
            if(!this.alive)
                return;

            this.objectRepository.assignRemove(this.id);
            this.audioRepository.play('explosion');

            this.shared.enemies--;
            this.shared.score += 10;
        };

        this.shoot = function() {
            if(this.timeToShoot > 0)
                return;

            this.timeToShoot = this.shootDelay;

            var rand = Math.floor((Math.random() * 100) + 1);
            if(rand > this.shared.shootChance)
                return;


            var bullet1 = new EnemyBullet(this.IDGen.get(), this.controller);
            bullet1.x = this.x + 8;
            bullet1.y = this.y + 10;

            var bullet2 = new EnemyBullet(this.IDGen.get(), this.controller);
            bullet2.x = this.x + 29;
            bullet2.y = this.y + 10;

            this.objectRepository.add(bullet1);
            this.objectRepository.add(bullet2);
        };
    }

    Enemy.prototype = new GameObject();

    return Enemy;
});