
var gs = require('../gamestate/general-state');
var socketHelper = require('../util/socket-helper');
var generalProtocol = require('./general-protocol');

function setupSocketServer(io){
    io.on('connection', function(socket){
        // Load default game protocols
        socketHelper.loadProtocol(generalProtocol, socket);
    });
}

module.exports = setupSocketServer;
