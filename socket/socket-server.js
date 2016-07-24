
var gs = require('../gamestate/general-state');
var socketHelper = require('../util/socket-helper');

var generalProtocol = require('./general-protocol');
var lobbyMode = require('../modes/lobby-mode');

function setupSocketServer(io){
    io.on('connection', function(socket){
        // Load default game protocols
        socketHelper.loadProtocol(generalProtocol, socket);

        // Load default game mode
        gs.changeTo(lobbyMode);
    });
}

module.exports = setupSocketServer;
