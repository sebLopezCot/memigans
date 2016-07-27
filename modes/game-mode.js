
var gs = require('../gamestate/general-state');
var socketHelper = require('../util/socket-helper');

// var gameProtocol = require('../socket/lobby-protocol');

module.exports = {
	name: 'game',
	
	start: function start(){
		// socketHelper.loadProtocol(gameProtocol);
	},

	finish: function finish(){
		// socketHelper.unloadProtocol(gameProtocol);
	}
};
