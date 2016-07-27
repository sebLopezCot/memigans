(function index (window) {
	// Init variables
	var socket = io();

	$(document).ready(function(){
		$("#enterButton").on('click', function(){
			addUser();
		});

		$("#readyButton").on('click', function(){
			socket.emit('everyone in');
		});

		var lastGameId = getCookie("last-game-id");
		var lastGameName = getCookie("last-game-name");

		socket.emit('handshake', {
			lastGameId: (lastGameId) ? lastGameId : "none",
			lastGameName: (lastGameName) ? lastGameName : "Person"
		});
	});

	function addUser (input, syncAfter) {
		var name = (input) ? input : $("#playername").val();
		if(name != ""){
			// Strip tags
			var cleaned = name.replace(/(<([^>]+)>)/ig,"");

			// Add player to game request
			socket.emit('add player', {
				playername: cleaned,
				syncAfter: syncAfter
			});
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
	socket.on('added', function(player){
		clearIndexState();
	});

	socket.on('update list', function(players){
		$("#player-list").html('');

		players.forEach(function(player){
			$("#player-list").append('<li id="player_'+player.id.toString()+'">'+player.name+'</li>');
		});
	});

	socket.on('already exists', function(){
		alert("Someone already has that name");
	});

	socket.on('joined game', function(){
		$('#players').toggleClass('hidden', true);
		alert("In the game.");
	});

	socket.on('locked out', function(){
		console.log('locked out');
		$("#players").toggleClass('hidden', true);
		$("#join").toggleClass('hidden', true);
		alert("A game has started already. Wait to enter the next one.");
	});

	socket.on('game ended', function(){
		window.location.reload();
	});

	socket.on('auto add', function(playername){
		addUser(playername, true);
	})

	socket.on('gen cookie', function(data){
		createCookie("last-game-id", data.id, new Date(new Date().getTime() + 15 * 60 * 1000));
		createCookie("last-game-name", data.name, new Date(new Date().getTime() + 15 * 60 * 1000));
	});

	function getCookie(c_name) {
		if (document.cookie.length > 0) {
	        c_start = document.cookie.indexOf(c_name + "=");
	        if (c_start != -1) {
	            c_start = c_start + c_name.length + 1;
	            c_end = document.cookie.indexOf(";", c_start);
	            if (c_end == -1) {
	                c_end = document.cookie.length;
	            }
	            return unescape(document.cookie.substring(c_start, c_end));
	        }
	    }
	    return "";
	}

	function createCookie(name, value, expires, path, domain) {
	  var cookie = name + "=" + escape(value) + ";";

	  if (expires) {
	    // If it's a date
	    if(expires instanceof Date) {
	      // If it isn't a valid date
	      if (isNaN(expires.getTime()))
	       expires = new Date();
	    }
	    else
	      expires = new Date(new Date().getTime() + parseInt(expires) * 1000 * 60 * 60 * 24);

	    cookie += "expires=" + expires.toGMTString() + ";";
	  }

	  if (path)
	    cookie += "path=" + path + ";";
	  if (domain)
	    cookie += "domain=" + domain + ";";

	  document.cookie = cookie;
	}

})(window);