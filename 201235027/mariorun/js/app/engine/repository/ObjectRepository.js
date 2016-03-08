define(function (require) {
    var GameObject = require('../GameObject');

    function ObjectRepository(maxZIndex, objectTypes) {
        var self = this;

        this.maxZIndex = maxZIndex;

        if(objectTypes.indexOf('default') == -1)
            objectTypes.push('default');
        this.objectTypes = objectTypes;

        this.objects = {};
        this.zObjects = {};
        this.tObjects = {};
        this.toRemove = [];

        for(var i = 0; i < maxZIndex; i++) {
            this.zObjects[i] = {};
        }

        if(objectTypes.indexOf('default') == -1)
            objectTypes.push('default');

        for(i = 0; i < this.objectTypes.length; i++) {
            this.tObjects[this.objectTypes[i]] = {};
        }

        this.add = function(obj){
            if(obj instanceof GameObject && obj.zIndex >= 0 && obj.zIndex < this.maxZIndex) {
                this.objects[obj.id] = obj;
                this.zObjects[obj.zIndex][obj.id] = obj;
                this.tObjects[obj.type][obj.id] = obj;

                return obj;
            } else
                return null;
        };

        this.get = function(id) {
            if(this.objects.hasOwnProperty(id)) {
                return this.objects[id];
            } else
                return null;
        };

        this.getAll = function() {
            return this.objects;
        };

        this.getObjectsByType = function(type) {
            if(this.tObjects.hasOwnProperty(type)) {
                return this.tObjects[type];
            } else
                return {};
        };

        this.assignRemove = function (id) {
            if(this.objects.hasOwnProperty(id) && this.toRemove.indexOf(id) == -1) {
                this.toRemove.push(id);
                this.objects[id].alive = false;
            }
        };

        this.remove = function(id) {
            if(this.objects.hasOwnProperty(id)){
                var rmv = this.objects[id];
                delete this.objects[rmv.id];
                delete this.zObjects[rmv.zIndex][rmv.id];
                delete this.tObjects[rmv.type][rmv.id];
            }
        };

        this.update = function() {
            this.toRemove.forEach(function(objID){
                self.remove(objID);
            });
            this.toRemove = [];
        };
    }

    return ObjectRepository;
});
