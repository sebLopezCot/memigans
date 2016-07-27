
var gs = require('../gamestate/general-state');
var socketHelper = require('../util/socket-helper');

var generalProtocol = require('./general-protocol');
var lobbyMode = require('../modes/lobby-mode');

function setupSocketServer(io){
    io.on('connection', function(socket){
        // Load default game protocols
        socketHelper.loadProtocol(generalProtocol, socket);

        // Load default game mode if not already loaded
        if(gs.mode == null){
            gs.changeTo(lobbyMode);
        }

        // Check to see if the game is in lobby mode
        if(gs.mode.name != 'lobby'){
            socket.emit('locked out');
        } else {
            // Sync the local socket with the right game mode
            gs.sync(socket);
        }
    });
}

module.exports = setupSocketServer;
