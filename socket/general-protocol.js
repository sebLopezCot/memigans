
var gs = require('../gamestate/general-state');
var socketHelper = require('../util/socket-helper');
var listHelper = require('../util/list-helper');

module.exports = {
	// When a player is asking to be added
	'add player': function addPlayerCall(socket){
		return function addPlayer(playername){
			if(gs.mode && gs.mode.name == 'lobby'){
				if(gs.players_to_sockets[playername]){
	                socket.emit('already exists');
	            } else {
	                // Add the player
	                gs.players_to_sockets[playername] = socket;
	                gs.socket_ids_to_players[socket.id] = playername;
	                gs.players.push({
	                    name: playername,
	                    id: socket.id
	                });
	                gs.players = gs.players.sort(listHelper.sortByKey('name'));
	                gs.playerOrder = gs.players.map(function(player){ return player.id });

	                // Respond to the player that was just added
	                socket.emit('added', {
	                    name: playername,
	                    id: socket.id
	                });

	                // Broadcast the addition to other players
	                socketHelper.emitToAllPlayers('update list', gs.players);
	            }
			}
		};
	},

	// When a player disconnects
	'disconnect': function disconnectCall(socket){
		return function disconnect(){
			var playername = gs.socket_ids_to_players[socket.id];
	        if(playername){
	            delete gs.socket_ids_to_players[socket.id];
	            delete gs.players_to_sockets[playername];
	            var i = gs.playerOrder.indexOf(socket.id);
	            gs.playerOrder.splice(i,1);
	            gs.players.splice(i,1);

	            socketHelper.emitToAllPlayers('update list', gs.players);
	        }
		};
	}
};
