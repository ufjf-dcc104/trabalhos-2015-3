define(function (require) {

    function AudioPool(url, pSize, params){
        var poolSize = pSize;

        var pool = [];
        var currentIndex = 0;

        var loadedSize = 0;

        for (var i = 0; i < poolSize; i++) {
            var audio = new Audio(url);

            for(var param in params){
                if(params.hasOwnProperty(param)){
                    audio[param] = params[param];
                }
            }

            audio.oncanplaythrough = function() {
                loadedSize++;
            };

            audio.load();
            pool[i] = audio;
        }

        this.getIndex = function(index) {
            if(pool[index])
                return pool[index];
        };

        this.getNext = function() {
            var next = currentIndex;
            currentIndex = (currentIndex + 1) % poolSize;

            return pool[next];
        };

        this.getPool = function(){
          return pool;
        };

        this.isReady = function() {
            return poolSize == loadedSize;
        };

    }

    function AudioRepository() {
        var audios = {};
        var muted = false;

        this.add = function(name, url, pSize, params){
            var defaultParams = (params || {});
            var poolSize = (pSize || 1);

            audios[name] = new AudioPool(url, poolSize, defaultParams);
        };

        this.getAudioPool = function(name) {
            if(audios.hasOwnProperty(name)) {
                return audios[name];
            } else
                return null;
        };

        this.getAudio = function(name) {
            if(audios.hasOwnProperty(name)) {
                return audios[name].getNext();
            } else
                return null;
        };

        this.play = function(name) {
            if(muted)
                return;

            if(audios.hasOwnProperty(name)) {
                var audio = audios[name].getNext();

                //if(audio.currentTime == 0 || audio.ended) {
                    audio.play();
                //}
            }
        };

        this.setMuted = function(bool) {
            muted = bool;
        };

        this.stop = function(name) {
            if(audios.hasOwnProperty(name)) {
                var audioPool = audios[name].getPool();

                for(var i = 0; i < audioPool.length; i++){
                    audioPool[i].pause();
                    audioPool[i].currentTime = 0;
                }
            }
        };

        this.stopAll = function() {
            for(var name in audios) {
                this.stop(name);
            }
        };

        this.isReady = function() {
            var bool = true;

            for(var name in audios) {
                if(audios.hasOwnProperty(name)) {
                    bool = bool && audios[name].isReady();

                    if(!bool)
                        break;
                }
            }

            return bool;
        };

    }

    return AudioRepository;
});
