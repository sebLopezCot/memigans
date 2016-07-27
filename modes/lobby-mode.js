
var gs = require('../gamestate/general-state');
var socketHelper = require('../util/socket-helper');

var lobbyProtocol = require('../socket/lobby-protocol');

module.exports = {
	name: 'lobby',
	
	start: function start(socket){
		socketHelper.loadProtocol(lobbyProtocol, socket);
	},

	finish: function finish(){
		socketHelper.unloadProtocol(lobbyProtocol);
	}
};
