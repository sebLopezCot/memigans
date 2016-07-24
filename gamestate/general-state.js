
var LOBBY_MODE = 0;
var GAME_MODE = 1;

module.exports = {
	LOBBY_MODE: LOBBY_MODE,
    GAME_MODE: GAME_MODE,

    mode: LOBBY_MODE,
    players_to_sockets: {},
    socket_ids_to_players: {},
    players: [],
    playerOrder: []
};
