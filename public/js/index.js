(function index (window) {
	// Init variables
	var socket = io();

	window.thisPlayer = null;

	$(document).ready(function(){
		$("#enterButton").on('click', function(){
			addUser();
		});
	});

	function addUser () {
		var name = $("#playername").val();
		if(name != ""){
			// Strip tags
			var cleaned = name.replace(/(<([^>]+)>)/ig,"");
			cleaned = cleaned.split(' ')[0];

			// Add player to game request
			socket.emit('add player', cleaned);
		} else {
			alert("Please enter a valid name.");
		}
	}
 
	function clearIndexState () {
		$("#join").toggleClass('hidden', true);
		$("#title-text").html('Waiting room');
		$("#players").toggleClass('hidden', false);
	}

	// When player is added to game successfully
	socket.on('added', function(playername){
		clearIndexState();
	});

	socket.on('update list', function(players){
		$("#player-list").html('');

		players.forEach(function(player){
			$("#player-list").append('<li id="player_'+player+'">'+player+'</li>');
		});
	});

	socket.on('already exists', function(){
		alert("Someone already has that name");
	});

})(window);