// Utils.

// Useless namespace to look cool.
var michek = {

    // Pick a random item from an array.
    pickRandomItem: function (items) {
	if (!items.length) {
	    return null;
	}
	return items[Math.floor(Math.random() * items.length)];
    },

    // Simple audio player.
    audioPlayer: function () {
	var player = document.getElementById('player');
	if (!player) {
	    return;
	}

	var play = document.getElementById('player-play');
	if (play && !play.onclick) {
	    play.onclick = function () {
		player.play();
	    }
	}

	var pause = document.getElementById('player-pause');
	if (pause && !pause.onclick) {
	    pause.onclick = function () {
		player.pause();
	    }
	}

	var stop = document.getElementById('player-stop');
	if (stop && !stop.onclick) {
	    stop.onclick = function () {
		player.pause();
		player.currentTime = 0;
	    }
	}

	var cursor = document.getElementById('player-cursor');
	if (cursor) {
	    var progression = (player.currentTime / player.duration) * 100;
	    cursor.style.width = progression + '%';
	}
    },

};
