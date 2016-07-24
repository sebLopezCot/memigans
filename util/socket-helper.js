
var gs = require('../gamestate/general-state');
var eh = require('../util/error-helper');

module.exports = {
	emitToAllPlayers: function emitToAllPlayers(msg, payload){
        if(gs){
        	gs.players.forEach(function(player){
	            var socket = gs.players_to_sockets[player.name];
	            socket.emit(msg, payload);
	        });
        } else {
            eh.noGSError();
        }
    },

    loadProtocol: function loadProtocol(protocol){
    	if(gs){
    		for(playerName in gs.players_to_sockets){
				var socket = gs.players_to_sockets[playerName];

				for(action in protocol){
					socket.on(action, protocol[action](socket));
				}
			}
    	} else {
            eh.noGSError();
        }
    },

    loadProtocol: function loadProtocol(protocol, socket){
    	if(gs){
    		for(action in protocol){
				socket.on(action, protocol[action](socket));
			}
    	} else {
            eh.noGSError();
        }
    },

    unloadProtocol: function unloadProtocol(protocol){
    	if(gs){
    		for(playerName in gs.players_to_sockets){
				var socket = gs.players_to_sockets[playerName];

				for(action in protocol){
					socket.off(action);
				}
			}
    	} else {
            eh.noGSError();
        }
    }
};
