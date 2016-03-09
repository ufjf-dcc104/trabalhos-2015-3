requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app',
        socketio: 'https://cdn.socket.io/socket.io-1.4.5'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery']
        },
        'jquery.cookie': {
            deps: ['jquery']
        },
        'socketio': {
            exports: 'io'
        }
    }
});
