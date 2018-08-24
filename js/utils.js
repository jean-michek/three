// Utils.

// Useless namespace to look cool.
var mxs = {

    // Pick a random item from an array.
    pickRandomItem: function (items) {
	if (!items.length) {
	    return null;
	}
	return items[Math.floor(Math.random() * items.length)];
    }

};
