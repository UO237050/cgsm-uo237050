import * as THREE from 'three';

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer( {antialias: true} );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 1, 4000 );
camera.position.set( 0, 0, 300 );

const video = document.getElementById( 'video' );

const image = document.createElement( 'canvas' );
image.width = 480;  // Video width
image.height = 204; // Video height
const imageContext = image.getContext( '2d' );
imageContext.fillStyle = '#000000';
imageContext.fillRect( 0, 0, image.width - 1, image.height - 1 );
const texture = new THREE.Texture( image );

const material = new THREE.MeshBasicMaterial( { map: texture } );
const wall = new THREE.Mesh( new THREE.PlaneGeometry( image.width, image.height, 4, 4 ), material );

scene.add(wall);


const startButton = document.getElementById('startButton');
startButton.addEventListener('click', () => init(), false);

function init() {
    var overlay = document.getElementById('overlay');
    overlay.remove();

    // Do stuff
    
    video.play();
}

const clock = new THREE.Clock( );

function animate( ) {

    const delta = clock.getDelta( ); // Elapsed time in seconds

    // UPDATE THE SCENE ACCORDING TO THE ELAPSED TIME
    const rotation = ( delta * Math.PI * 2 ) / 24;
    wall.rotation.y += rotation;
    if ( video.readyState === video.HAVE_ENOUGH_DATA ) {

        imageContext.drawImage( video, 0, 0 );
        if ( texture ) texture.needsUpdate = true;
    }
    // Render the scene
    renderer.render( scene, camera );

    // Request the browser to execute the animation-rendering loop
    requestAnimationFrame( animate );
};
animate();
const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
directionalLight.position.set(100, 0, 200);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0x404040, 0.5); 
scene.add(ambientLight);

window.addEventListener( 'resize', ( ) => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix( );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.render( scene, camera );
}, false );