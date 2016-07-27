
var gs = require('../gamestate/general-state');
var eh = require('../util/error-helper');

module.exports = {
	emitToAllPlayers: function emitToAllPlayers(msg, payload){
        if(gs){
        	gs.players.forEach(function(player){
	            var socket = gs.players_to_sockets[player.name];
                if(socket){
	               socket.emit(msg, payload);
                } else {
                    eh.socketUndefinedError();
                }
	        });
        } else {
            eh.noGSError();
        }
    },

    emitToEachPlayer: function emitToEachPlayer(msg, func){
        if(gs){
            gs.players.forEach(function(player){
                var socket = gs.players_to_sockets[player.name];
                if(socket){
                    socket.emit(msg, func(player));
                } else {
                    eh.socketUndefinedError();
                }
            });
        } else {
            eh.noGSError();
        }
    },

    loadProtocol: function loadProtocol(protocol, socket){
    	if(gs){
            if(socket){
                for(action in protocol){
                    socket.on(action, protocol[action](socket));
                }
            } else {
                for(playerName in gs.players_to_sockets){
                    var socket = gs.players_to_sockets[playerName];

                    if(socket){
                        for(action in protocol){
                            socket.on(action, protocol[action](socket));
                        }
                    } else {
                        eh.socketUndefinedError();
                    }
                }
            }

    	} else {
            eh.noGSError();
        }
    },

    unloadProtocol: function unloadProtocol(protocol){
    	if(gs){
    		for(playerName in gs.players_to_sockets){
				var socket = gs.players_to_sockets[playerName];

                if(socket){
    				for(action in protocol){
    					socket.removeAllListeners(action);
    				}
                } else {
                    eh.socketUndefinedError();
                }
			}
    	} else {
            eh.noGSError();
        }
    }
};
