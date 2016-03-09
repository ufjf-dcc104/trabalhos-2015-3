define(function (require) {

    function Const(gameController)
    {}

    //SOCKET STATUS
    Const.SOCKET_INIT = 0;
    Const.SOCKET_CONNECTING = 1;
    Const.SOCKET_CONFAIL = 2;
    Const.SOCKET_ERROR = 3;
    Const.SOCKET_CONNECTED = 4;

    //PLAYBLE STATUS
    Const.GAME_WAIT = 0;
    Const.GAME_READY = 1;

    //PLAYER ACTIONS
    Const.PLAYER_ENTER = 0;
    Const.PLAYER_START = 1;
    Const.PLAYER_JUMP = 2;

    return Const;
});
