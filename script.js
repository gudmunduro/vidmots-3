
var renderer;
var scene;
var camera;
var sphere;

function initScene()
{
    renderer = new THREE.WebGLRenderer();
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );

    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    camera.position.z = 15;
}

function createSphere()
{
    let geometry = new THREE.SphereGeometry( 5, 12, 12 );
    let material = new THREE.MeshNormalMaterial();
    sphere = new THREE.Mesh( geometry, material );
    scene.add( sphere );
}

function createLight()
{
    let directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    scene.add( directionalLight );
}

initScene();
createSphere();
createLight();

var animate = function () {
    requestAnimationFrame( animate );

    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;

    renderer.render( scene, camera );
};

animate();