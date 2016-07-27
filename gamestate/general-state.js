
module.exports = {
    mode: null,
    players_to_sockets: {},
    socket_ids_to_players: {},
    players: [],
    playerOrder: [],

    changeTo: function changeTo(newMode){
    	if(this.mode){
    		this.mode.finish();
    	}

    	this.mode = newMode;

    	if(this.mode){
    		this.mode.start();
    	}
    },

    sync: function sync(socket){
        if(this.mode){
            this.mode.start(socket);
        }
    }
};
