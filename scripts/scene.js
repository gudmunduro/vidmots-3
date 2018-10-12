
var renderer;
var scene;
var camera;
var sphere;
var angleCameraController;


function randomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }


function initScene()
{
    renderer = new THREE.WebGLRenderer();
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );

    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    camera.position.z = 15;
}
function setupLight()
{
    let directionalLight = new THREE.DirectionalLight( 0xffffff, 1.0 );
    let ambientLight = new THREE.AmbientLight( 0x404040, 0.4 );

    scene.add(directionalLight);
    scene.add(ambientLight);
}
function animate()
{
    requestAnimationFrame(animate);

    sphere.rotation.x += 0.01;
    sphere.rotation.z += 0.01;

    renderer.render( scene, camera );
}

function createSphere()
{
    let geometry = new THREE.SphereGeometry( 5, 6, 6 );
    let material = new THREE.MeshPhysicalMaterial({ color: 0xe26e02 });
    sphere = new THREE.Mesh( geometry, material );
    scene.add(sphere);

    angleCameraController = new AngleCameraController(camera, sphere);
}

function createSecondSphere()
{
    let geometry = new THREE.SphereGeometry( 4, 8, 8 );
    let material = new THREE.MeshPhysicalMaterial({ color: 0x20e89e });
    let sphere2 = new THREE.Mesh( geometry, material );
    sphere2.position.z = 30;
    scene.add(sphere2);

    window.lastDegForAngleCamera = 0;
    angleCameraController.onCameraPosUpdate = function (deg) {
        let colors = [0x20e89e, 0xef0420, 0x36bff9, 0xd013f2, 0x6a6a6b, 0xdbea09];
        if (deg < 98 && lastDegForAngleCamera >= 98 || deg > 262 && lastDegForAngleCamera <= 262)
        {
            sphere2.material.setValues({ color: colors[randomInt(colors.length) ]});
        }
        window.lastDegForAngleCamera = deg;
    }
}

function run()
{
    initScene();
    createSphere();
    createSecondSphere();
    setupLight();
    animate();
}

run();