
var gs = require('../gamestate/general-state');
var socketHelper = require('../util/socket-helper');

var lobbyProtocol = require('../socket/lobby-protocol');

module.exports = {
	name: 'lobby',
	
	start: function(){
		socketHelper.loadProtocol(lobbyProtocol);
	},

	finish: function(){
		socketHelper.unloadProtocol(lobbyProtocol);
	}
};
