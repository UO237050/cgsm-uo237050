import * as THREE from 'three';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min';
import Stats from 'three/examples/jsm/libs/stats.module';

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer( {antialias: true} );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 1, 4000 );
camera.position.set( 0, 0, 300 );

const geometry = new THREE.BoxGeometry( 100, 100, 100 );
const textureLoader = new THREE.TextureLoader( );
const material = new THREE.MeshPhongMaterial(
    {
        map: textureLoader.load( "../textures/brick.jpg",( loaded ) => { renderer.render( scene, camera ); } ),
        bumpMap: textureLoader.load( "../textures/brick-map.jpg",( loaded ) => { renderer.render( scene, camera ); } )
    } );
const box = new THREE.Mesh( geometry, material );

box.rotation.set( Math.PI / 5, Math.PI / 5, 0 );
scene.add( box );
renderer.render( scene, camera );

const controlData = {
    bumpScale: material.bumpScale,
    stats:scene.stats
}

const gui = new GUI( );
gui.add( controlData, 'bumpScale', -4, 4 ).step(0.1).name( 'bumpScale' );

const stats = new Stats( );
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0px';
document.body.appendChild( stats.domElement );

const clock = new THREE.Clock( );

function animate( ) {

    const delta = clock.getDelta( ); // Elapsed time in seconds

    // UPDATE THE SCENE ACCORDING TO THE ELAPSED TIME
    const rotation = ( delta * Math.PI * 2 ) / 24;
    box.rotation.y += rotation;
    
    material.bumpScale = controlData.bumpScale;
    stats.update();

    // Render the scene
    renderer.render( scene, camera );

    // Request the browser to execute the animation-rendering loop
    requestAnimationFrame( animate );
};
animate();
const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
directionalLight.position.set(100, 0, 200);
scene.add(directionalLight);



window.addEventListener( 'resize', ( ) => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix( );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.render( scene, camera );
}, false );