// One. Animated text flashes.

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(
    75,						// fov
    window.innerWidth / window.innerHeight,	// ratio
    0.1,					// near
    1000					// far
);
camera.position.set(0, 0, 100);
camera.lookAt(new THREE.Vector3(0, 0, 0));

var renderer = new THREE.WebGLRenderer();
renderer.setSize(
    window.innerWidth / 3,			// width
    window.innerHeight / 3,			// height
    false					// stretch
);
document.body.appendChild(renderer.domElement);

var clock = new THREE.Clock();

var mixer = null;

// Words somewhat related to radioactivity.
var words = [
    "decay", "half time", "isotope", "radiation",
    "alpha particle", "beta particle", "neutrino",
    "gamma ray", "fission", "radium", "nitrogen-14",
    "becquerel", "positron", "mean lifetime"
];

var words_geometry = [];
var font_loader = new THREE.FontLoader();
font_loader.load('/fonts/helvetiker_regular.typeface.json', function (font) {
    for (var i in words) {
	var geometry = new THREE.TextGeometry(words[i], {
	    font: font,
	    size: 8,
	    height: 0.1,
	    curveSegments: 1,
	});
	words_geometry.push(geometry);
    }
});

var current_action = null;
var current_word = null;
var word_animation_position = new THREE.VectorKeyframeTrack('.position', [0, 0.5], [0, 0, 0, -20, -1, 100]);
var word_animation_rotation = new THREE.VectorKeyframeTrack('.rotation', [0, 0.5], [0, 0, 0, 0.8, 0.02, 0.02]);
var word_clip = new THREE.AnimationClip('Action', 0.5, [word_animation_position, word_animation_rotation]);

var animate = function () {
    requestAnimationFrame(animate);

    // First time.
    if ((!current_action || !current_action.isRunning()) && words_geometry.length > 0) {
	if (current_word) {
	    scene.remove(current_word);
	}

	var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
	current_word = new THREE.Mesh(michek.pickRandomItem(words_geometry), material);

	mixer = new THREE.AnimationMixer(current_word);
	scene.add(current_word);

	current_action = mixer.clipAction(word_clip);
	current_action.clampWhenFinished = true;
	current_action.loop = THREE.LoopOnce;
	current_action.play();
    }

    if (mixer) {
	mixer.update(clock.getDelta());
    }

    renderer.render(scene, camera);
};

animate();
