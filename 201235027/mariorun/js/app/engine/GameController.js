define(function (require) {

    var $ = require('jquery'),
        AudioRepository = require('./repository/AudioRepository'),
        ImageRepository = require('./repository/ImageRepository'),
        ObjectRepository = require('./repository/ObjectRepository'),
        Camera = require('./Camera'),
        KeyStatus = require('./KeyStatus');

    function GameController(canvasID, conf) {
        var self = this;

        //Canvas
        this.canvas = document.getElementById(canvasID);
        this.context = this.canvas.getContext('2d');
        this.canvasHeight = this.canvas.height;
        this.canvasWidth = this.canvas.width;

        //Helper Objects
        this.config = conf;
        this.audioRepository = new AudioRepository();
        this.imageRepository = new ImageRepository();
        this.objectRepository = new ObjectRepository(this.config.maxZIndex, this.config.objectTypes);
        this.camera = new Camera(self);
        this.keyStatus = new KeyStatus(this.config.mappedKeys);
        this.shared = {};

        //Callbacks
        this.loadingloopCallback = undefined;
        this.beforeStartCallback = undefined;
        this.loopCallback = undefined;

        //FPS control
        this.fps = 0;
        this.recalcFPS = 0;
        this.time = undefined;
        this.dt = undefined;

        this.gameStatus = GameController.WAITINGSTART;

        this.updateFPS = function(){
            var now = new Date().getTime();
            this.dt = (now - (this.time || now))/1000;
            this.time = now;

            this.recalcFPS -= this.dt;

            if(this.recalcFPS < 0) {
                this.recalcFPS = 0.5;
                this.fps = Math.floor(1 / this.dt);
            }
        };

        this.gameLoop = function () {
            requestAnimationFrame(self.gameLoop);

            self.updateFPS();

            //Update objectRepository
            self.objectRepository.update();

            if(self.loopCallback != undefined)
                self.loopCallback();
        };

        this.setGameLoop = function(callback) {
            this.loopCallback = callback;
        };

        this.setLoadingLoop = function(callback) {
            this.loadingloopCallback = callback;
        };

        this.setBeforeStart = function(callback) {
            this.beforeStartCallback = callback;
        };

        this.getAudioRepository = function () {
            return this.audioRepository;
        };

        this.getImageRepository = function () {
            return this.imageRepository;
        };

        this.getObjectRepository = function () {
            return this.objectRepository;
        };

        this.getContext = function() {
            return this.context;
        };

        this.getKeyStatus = function () {
            return this.keyStatus;
        };

        this.updateAllObjects = function (){
            for (var objId in this.objectRepository.getAll()) {
                var obj = this.objectRepository.get(objId);
                if(obj != null)
                    obj.update();
            }
        };

        this.drawAllObjects = function (){
            for (var i = 0; i < this.objectRepository.maxZIndex; i++) {
                for (var objId in this.objectRepository.zObjects[i]) {
                    var obj = this.objectRepository.get(objId);
                    if(obj != null)
                        obj.draw();
                }
            }
        };

        // You SHOULD add all audios and images to repositories before calling this function!!!
        this.start = function() {
            if(this.gameStatus == GameController.WAITINGSTART) {
                this.gameStatus = GameController.LOADING;

                var loading = setInterval(function() {
                    if (self.loadingloopCallback != undefined){
                        self.updateFPS();
                        self.loadingloopCallback();
                    }

                    if(self.audioRepository.isReady() && self.imageRepository.isReady()) {
                        clearInterval(loading); //Stop loading
                        self.time = undefined; //Reset FrameTime

                        if(self.beforeStartCallback == undefined || self.beforeStartCallback() != false) {
                            self.gameStatus = GameController.RUNNING;
                            self.gameLoop();
                        }
                    }
                },1000/30);
            }
        };
    }

    //GAME STATUS
    GameController.WAITINGSTART = 0;
    GameController.LOADING = 1;
    GameController.RUNNING = 2;

    return GameController;
});
