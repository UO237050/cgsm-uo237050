import * as THREE from 'three';

import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer( {antialias: true} );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 1, 4000 );
camera.position.set( 0, 10, 300 );

const helper = new THREE.GridHelper( 800, 40, 0x444444, 0x444444 );
helper.position.y = 0.1;

scene.add(helper);

const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
directionalLight.position.set(0, 0.5, 100);
scene.add(directionalLight);

const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xf0f0f0, 0.6 );
hemiLight.position.set( 0, 500, 0 );
scene.add( hemiLight );

const geometry = new THREE.BoxGeometry( 50, 50, 50 );
const textureLoader = new THREE.TextureLoader( );

const regularFaceMaterial = new THREE.MeshPhongMaterial(
    {
        map: textureLoader.load( "../textures/brick.jpg",( loaded ) => { renderer.render( scene, camera ); } ),
        bumpMap: textureLoader.load( "../textures/brick-map.jpg",( loaded ) => { renderer.render( scene, camera ); } )
    } );

const specialFaceMaterial = new THREE.MeshPhongMaterial(
    {
        map: textureLoader.load( "../textures/brickSpecial.png",( loaded ) => { renderer.render( scene, camera ); } ),
        bumpMap: textureLoader.load( "../textures/brick-mapSpecial.jpg",( loaded ) => { renderer.render( scene, camera ); } )
    } );

// A box has 6 faces
const materials = [
    specialFaceMaterial,
    regularFaceMaterial,
    regularFaceMaterial,
    regularFaceMaterial,
    regularFaceMaterial,
    regularFaceMaterial,
];

const box1 = new THREE.Mesh( geometry, materials );
const box2 = new THREE.Mesh( geometry, materials );

box1.position.set(-100,0,-200);
box2.position.set(100,0,-200);

scene.add(box1);
scene.add(box2);

const controls = new FirstPersonControls( camera, renderer.domElement );
controls.movementSpeed = 70;
controls.lookSpeed = 0.05;
controls.noFly = false;
controls.lookVertical = false;

const clock = new THREE.Clock( );

function animate( ) {

    const delta = clock.getDelta( ); // Elapsed time in seconds

    controls.update (delta);
    
    
  

    // Render the scene
    renderer.render( scene, camera );

    // Request the browser to execute the animation-rendering loop
    requestAnimationFrame( animate );
};
animate();