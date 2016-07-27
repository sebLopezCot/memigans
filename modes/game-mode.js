
var gs = require('../gamestate/general-state');
var socketHelper = require('../util/socket-helper');

var crypto = require('crypto');

// var gameProtocol = require('../socket/lobby-protocol');

module.exports = {
	name: 'game',

	id: null,
	
	start: function start(socket){
		// Generate the cookie so that if someone leaves the game it is okay
		// for them to come back
		if(this.id == null){
			this.id = crypto.randomBytes(20).toString('hex');
		}

		var gameId = this.id;
		
		if(socket){
			socket.emit('gen cookie', {
				id: gameId,
				name: gs.socket_ids_to_players[socket.id]
			});

			socket.emit('joined game');
		} else {
			socketHelper.emitToEachPlayer('gen cookie', function(player){
				return {
					id: gameId,	// game id, not player id
					name: player.name
				};
			});

			socketHelper.emitToAllPlayers('joined game');
		}


		// socketHelper.loadProtocol(gameProtocol);
	},

	finish: function finish(){
		// socketHelper.unloadProtocol(gameProtocol);
	}
};
