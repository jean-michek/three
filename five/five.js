// Five. Evolving scratches.

// Settings to experiment w/.
var kHackerMode = 1;
var kLines = 15;
var kVertices = 7;
var kAnimationRotation = 2;
var kAnimationPosition = 10;

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(
    75,						// fov
    window.innerWidth / window.innerHeight,	// ratio
    0.1,					// near
    1000					// far
);
camera.position.set(0, 0, 200);
camera.lookAt(new THREE.Vector3(0, 0, 0));

var renderer = new THREE.WebGLRenderer();
renderer.setSize(
    window.innerWidth / kHackerMode,		// width
    window.innerHeight / kHackerMode,		// height
    false					// stretch
);
document.body.appendChild(renderer.domElement);

var clock = new THREE.Clock();
var materials = new Array();
var geometries = new Array();
var lines = new Array();
var effect = new THREE.ParallaxBarrierEffect(renderer);

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
	    '.quaternion', [0, 0.5, 1, 2, 2.5, 3], [
		michek.makeRandomVector(michek.origin, kAnimationRotation).toArray(),
		michek.makeRandomVector(michek.origin, kAnimationRotation).toArray(),
		michek.makeRandomVector(michek.origin, kAnimationRotation).toArray(),
		michek.makeRandomVector(michek.origin, kAnimationRotation).toArray(),
		michek.makeRandomVector(michek.origin, kAnimationRotation).toArray(),
		michek.makeRandomVector(michek.origin, kAnimationRotation).toArray(),
	    ].flat()
	),
	new THREE.VectorKeyframeTrack(
	    '.position', [0, 0.5, 1, 2, 2.5, 3], [
		michek.makeRandomVector(michek.origin, kAnimationPosition).toArray(),
		michek.makeRandomVector(michek.origin, kAnimationPosition).toArray(),
		michek.makeRandomVector(michek.origin, kAnimationPosition).toArray(),
		michek.makeRandomVector(michek.origin, kAnimationPosition).toArray(),
		michek.makeRandomVector(michek.origin, kAnimationPosition).toArray(),
		michek.makeRandomVector(michek.origin, kAnimationPosition).toArray(),
	    ].flat()
	)
    ];

    var mixer = new THREE.AnimationMixer(object);
    var clip = new THREE.AnimationClip('rotatingLines', 3, keyframes);
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

    effect.render(scene, camera);
};

init();
animate();
