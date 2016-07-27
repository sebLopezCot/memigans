
var gs = require('../gamestate/general-state');
var socketHelper = require('../util/socket-helper');

var generalProtocol = require('./general-protocol');
var lobbyMode = require('../modes/lobby-mode');

function setupSocketServer(io){
    io.on('connection', function(socket){
        socket.on('handshake', function(config){
            // Load default game protocols
            socketHelper.loadProtocol(generalProtocol, socket);

            // Load default game mode if not already loaded
            if(gs.mode == null){
                gs.changeTo(lobbyMode);
            } else {
                // Check to see if the game is in lobby mode
                if(gs.mode.name == 'game'){
                    if(gs.mode.id != config.lastGameId){
                        socket.emit('locked out');
                    } else {
                        socket.emit('auto add', config.lastGameName);
                    }
                } else {
                    // Sync the local socket with the right game mode
                    gs.sync(socket);
                }
            }
        });
    });
}

module.exports = setupSocketServer;
