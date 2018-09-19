// Four. Scratches.

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
    window.innerWidth / 4,				// width
    window.innerHeight / 4,				// height
    false						// stretch
);
document.body.appendChild(renderer.domElement);

var materials = new Array();
var geometries = new Array();

for (var i = 0; i < 100; ++i) {
    materials[i] = new THREE.LineBasicMaterial({
	color: michek.makeRandomColor(),
    });
    geometries[i] = new THREE.Geometry();
    for (var j = 0; j < 7; ++j) {
	geometries[i].vertices.push(
	    michek.makeRandomVector(michek.origin, 100)
	);
    }
}

var animate = function () {
    requestAnimationFrame(animate);  

    var scratch= new THREE.Line(
	michek.pickRandomItem(geometries),
	michek.pickRandomItem(materials)
    );

    scene.add(scratch);
    renderer.render(scene, camera);
    scene.remove(scratch);
};

animate();
