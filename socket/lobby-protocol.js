
var gs = require('../gamestate/general-state');
var socketHelper = require('../util/socket-helper');

var gameMode = require('../modes/game-mode');

module.exports = {
	// When everyone is ready
	'everyone in': function everyoneInCall(socket){
		return function everyoneIn(){
			if(gs.players.length > 1){
				gs.changeTo(gameMode);

				socketHelper.emitToAllPlayers('game started');
			}
		};
	}
};
