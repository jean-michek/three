// Five. Evolving scratches.

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
var materials = new Array();
var geometries = new Array();
var lines = new Array();

var kLines = 5;
var kVertices = 7;

var makeLine = function () {
    var material = new THREE.LineBasicMaterial({
	color: michek.makeRandomColor(),
    });

    var geometry = new THREE.Geometry();
    for (var j = 0; j < kVertices; ++j) {
	geometry.vertices.push(
	    michek.makeRandomVector(michek.origin, 100)
	);
    }

    var object = new THREE.Line(geometry, material);

    var keyframes = [
	new THREE.VectorKeyframeTrack(
	    '.quaternion', [0, 1], [
		michek.makeRandomVector(michek.origin, 4).toArray(),
		michek.makeRandomVector(michek.origin, 4).toArray(),
		michek.makeRandomVector(michek.origin, 4).toArray(),
		michek.makeRandomVector(michek.origin, 4).toArray(),
	    ].flat()
	),
	new THREE.VectorKeyframeTrack(
	    '.position', [0, 0], [
		michek.makeRandomVector(michek.origin, 10).toArray(),
		michek.makeRandomVector(michek.origin, 10).toArray(),
		michek.makeRandomVector(michek.origin, 10).toArray(),
		michek.makeRandomVector(michek.origin, 10).toArray(),
	    ].flat()
	)
    ];

    var mixer = new THREE.AnimationMixer(object);
    var clip = new THREE.AnimationClip('rotatingLines', 1, keyframes);
    var action = mixer.clipAction(clip);

    action.loop = THREE.LoopPingPong;

    return {
	material: material,
	geometry: geometry,
	object: object,
	mixer: mixer,
	clip: clip,
	action: action,
    };
};

var init = function () {
    for (var i = 0; i < kLines; ++i) {
	lines[i] = makeLine();
	scene.add(lines[i].object);
    }
};

var animate = function () {
    var delta = clock.getDelta();
    requestAnimationFrame(animate);

    for (var i = 0; i < kLines; ++i) {
	lines[i].action.play();
	lines[i].mixer.update(delta);
    }

    renderer.render(scene, camera);
};

init();
animate();
