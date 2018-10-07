// Six. Evolving things.

// Settings to experiment w/.
var kHackerMode = 1;
var kLights = 5;
var kKnots = 50;
var kAnimationPosition = 20;
var kAnimationRotation = 1;

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(
    75,						// fov
    window.innerWidth / window.innerHeight,	// ratio
    0.1,					// near
    1000					// far
);
camera.position.set(0, 0, 45);
camera.lookAt(new THREE.Vector3(0, 0, 0));

var renderer = new THREE.WebGLRenderer({
    antialias: true,
});
renderer.setSize(
    window.innerWidth / kHackerMode,		// width
    window.innerHeight / kHackerMode,		// height
    false					// stretch
);
renderer.setClearColor(0x000000, 1);
document.body.appendChild(renderer.domElement);

var composer = new THREE.EffectComposer(renderer);
composer.addPass( new THREE.RenderPass(scene, camera));
var glitchPass = new THREE.GlitchPass();
glitchPass.renderToScreen = true;
composer.addPass(glitchPass);

var clock = new THREE.Clock();
var materials = new Array();
var geometries = new Array();
var knots = new Array();

var makeLights = function () {
    return [
	new THREE.HemisphereLight(
	    0xFF0000,
	    0xFFFFFF
	)
    ];
};

var makeKnot = function () {
    var material = new THREE.MeshToonMaterial({
	color: michek.makeRandomColor(),
	transparent: true,
	opacity: 0.4,
    });

    var geometry = new THREE.CircleGeometry(
	michek.makeRandomFloat(0.1, 4), 10
    );

    var object = new THREE.Mesh(geometry, material);

    var keyframes = [
	new THREE.VectorKeyframeTrack(
	    '.position', [0, 0.25, 1, 2, 2.5, 3], [
		michek.makeRandomVector(michek.origin, kAnimationPosition).toArray(),
		michek.makeRandomVector(michek.origin, kAnimationPosition).toArray(),
		michek.makeRandomVector(michek.origin, kAnimationPosition).toArray(),
		michek.makeRandomVector(michek.origin, kAnimationPosition).toArray(),
		michek.makeRandomVector(michek.origin, kAnimationPosition).toArray(),
		michek.makeRandomVector(michek.origin, kAnimationPosition).toArray(),
	    ].flat(),
	    THREE.InterpolateSmooth
	),
	new THREE.VectorKeyframeTrack(
	    '.quaternion', [0, 0.75, 1.5, 2, 2.75, 3], [
		michek.makeRandomVector(michek.origin, kAnimationRotation).toArray(),
		michek.makeRandomVector(michek.origin, kAnimationRotation).toArray(),
		michek.makeRandomVector(michek.origin, kAnimationRotation).toArray(),
		michek.makeRandomVector(michek.origin, kAnimationRotation).toArray(),
		michek.makeRandomVector(michek.origin, kAnimationRotation).toArray(),
		michek.makeRandomVector(michek.origin, kAnimationRotation).toArray(),
	    ].flat(),
	    THREE.InterpolateSmooth
	)

    ];

    var mixer = new THREE.AnimationMixer(object);
    var clip = new THREE.AnimationClip('rotatingKnots', 3, keyframes);
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
    for (var i = 0; i < kKnots; ++i) {
	knots[i] = makeKnot();
	scene.add(knots[i].object);
    }

    var lights = makeLights();
    for (var i = 0; i < lights.length; ++i) {
	scene.add(lights[i]);
    }
};

var animate = function () {
    var delta = clock.getDelta();
    requestAnimationFrame(animate);

    for (var i = 0; i < kKnots; ++i) {
	knots[i].action.play();
	knots[i].mixer.update(delta);
    }

    composer.render();
};

init();
animate();
