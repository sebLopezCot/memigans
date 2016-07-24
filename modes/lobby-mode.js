
var gs = require('../gamestate/general-state');
var socketHelper = require('../util/socket-helper');
var lobbyProtocol = require('../socket/lobby-protocol');

module.exports = {
	init: function(){

	}, 

	start: function(){
		socketHelper.loadProtocol(lobbyProtocol);
	},

	finish: function(){
		socketHelper.unloadProtocol(lobbyProtocol);
	}
};
