import * as THREE from 'three';

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer( {antialias: true} );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 1, 4000 );
camera.position.set( 0, 0, 500);

const RTierra= 50;
const tierraGeometry= new THREE.SphereGeometry(RTierra,32,32);
const mapUrl = "../textures/earth.jpg";   // The file used as texture
const textureLoader = new THREE.TextureLoader( );  // The object used to load textures
const map = textureLoader.load( mapUrl, ( loaded ) => { renderer.render( scene, camera ); } );
const material = new THREE.MeshPhongMaterial( { map: map } );
const tierra = new THREE.Mesh(tierraGeometry,material);

const RAtmos=RTierra + 1;
const atmosGeometry= new THREE.SphereGeometry(RAtmos,32,32);
const mapUrlatmos = "../textures/atmos.png";   // The file used as texture
const textureLoaderatmos = new THREE.TextureLoader( );  // The object used to load textures
const mapAtmos = textureLoaderatmos.load( mapUrlatmos, ( loaded ) => { renderer.render( scene, camera ); } );
var atmosphereMaterial = new THREE.MeshLambertMaterial( { color: 0xFFFFFF, map: mapAtmos, transparent: true } );

const atmos = new THREE.Mesh(atmosGeometry,atmosphereMaterial);
scene.add(tierra);
scene.add(atmos);

const grupoTierra= new THREE.Object3D();
grupoTierra.add(tierra);
grupoTierra.add(atmos);
grupoTierra.rotateZ(0.36);
scene.add(grupoTierra);

const RMoon=0.27 * RTierra;
const moonGeometry= new THREE.SphereGeometry(RMoon,32,32);
const distance= 62.5;
const moonMapUrl = '../textures/moon.jpg';
const moonTextureLoader= new THREE.TextureLoader();
const moonMap = moonTextureLoader.load( moonMapUrl, ( loaded ) => { renderer.render( scene, camera ); } );
const moonMaterial = new THREE.MeshLambertMaterial( { map: moonMap, color: 0x888888 } );
const moon= new THREE.Mesh(moonGeometry,moonMaterial);
moon.position.set( Math.sqrt( distance / 2 ) * RTierra, 0, -Math.sqrt( distance / 2 ) * RTierra );
// Rotate the Moon to face visible side to the Earth (tidal locking)
moon.rotation.y = Math.PI;

scene.add(moon);
// Moon should rotate around the Earth: an Object3D is needed
const moonGroup = new THREE.Object3D( );
moonGroup.add( moon );

// The Moon orbit is a bit tilted
moonGroup.rotation.x = 0.089;
scene.add(moonGroup);


const pointLight= new THREE.PointLight(0xFFFFFF, 500,500,1);
pointLight.position.set(100, 50, 50);
scene.add(pointLight);



renderer.render( scene, camera );

const clock = new THREE.Clock( );

function animate( ) {

    const delta = clock.getDelta( ); // Elapsed time in seconds

    // UPDATE THE SCENE ACCORDING TO THE ELAPSED TIME
    const rotation = ( delta * Math.PI * 2 ) / 24;
    tierra.rotation.y += rotation;
    atmos.rotation.y += rotation * 0.95;

    const moonRotationTime= 24*28;
    const moonRotation= ( delta * Math.PI * 2 ) / moonRotationTime;
    moonGroup.rotation.y += moonRotation;
    // Render the scene
    renderer.render( scene, camera );

    // Request the browser to execute the animation-rendering loop
    requestAnimationFrame( animate );
};

animate();
window.addEventListener( 'resize', ( ) => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix( );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.render( scene, camera );
}, false );