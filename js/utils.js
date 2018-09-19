// Utils.

// Useless namespace to look cool.
var michek = {
    // Center of the universe.
    origin: new THREE.Vector3(0, 0, 0),

    // Returns sometimes true.
    makeSometimesTrue: function (pct) {
	return Math.random() * 100 < pct;
    },

    // Makes a kind-of random Vector around some position.
    makeRandomVector: function (center, strength) {
	var x = Math.floor(Math.random() * strength / 2);
	var y = Math.floor(Math.random() * strength / 2);
	var z = Math.floor(Math.random() * strength / 2);

	if (michek.makeSometimesTrue(50)) {
	    x *= -1;
	}
	if (michek.makeSometimesTrue(50)) {
	    y *= -1;
	}
	if (michek.makeSometimesTrue(50)) {
	    z *= -1;
	}

	return new THREE.Vector3(x, y, z);
    },

    // Make a random integer between min and max.
    makeRandomInt: function (min, max) {
	return min + Math.floor(Math.random() * (max - min));
    },

    // Makes a random color.
    makeRandomColor: function () {
	return Math.random() * 0xFFFFFF;
    },

    // Picks a random item from an array.
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
