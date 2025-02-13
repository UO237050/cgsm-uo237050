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


const specialFaceSoundMaterial = new THREE.MeshPhongMaterial(
    {
        map: textureLoader.load( "../textures/brickSpecialSound.png",( loaded ) => { renderer.render( scene, camera ); } ),
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

box1.position.set(-375,25,-375);
box2.position.set(375,25,-375);
box2.rotateY(Math.PI);

scene.add(box1);
scene.add(box2);

const listener = new THREE.AudioListener();
camera.add( listener );

const audioLoader = new THREE.AudioLoader();
const sound1 = new THREE.PositionalAudio( listener );
audioLoader.load( "../sounds/dog.ogg", ( buffer ) => {
    sound1.setBuffer( buffer );
    sound1.setRefDistance( 20 );
    sound1.setLoop( true );
    sound1.setRolloffFactor( 1 );
    //sound1.play(); // Modern browsers do not allow sound to start without user interaction
});
box1.add( sound1 );

//const audioLoader2 = new THREE.AudioLoader();
const sound2 = new THREE.PositionalAudio( listener );
audioLoader.load( "../sounds/376737_Skullbeatz___Bad_Cat_Maste.ogg", ( buffer ) => {
    sound2.setBuffer( buffer );
    sound2.setRefDistance( 20 );
    sound2.setLoop( true );
    sound2.setRolloffFactor( 1 );
    //sound2.play(); // Modern browsers do not allow sound to start without user interaction
});
box2.add( sound2 );


box1.name="Box1";
box2.name="Box2";

const rayCaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let intersectedObject = null;

rayCaster.setFromCamera( mouse, camera );

// Look for all the intersected objects
const intersects = rayCaster.intersectObjects( scene.children );
if ( intersects.length > 0 ) {

    // Sorted by Z (close to the camera)
    if ( intersectedObject != intersects[ 0 ].object ) {

        intersectedObject = intersects[ 0 ].object;
        console.log( 'New intersected object: ' + intersectedObject.name );
    }
} else {

    intersectedObject = null;
}

const controls = new FirstPersonControls( camera, renderer.domElement );
controls.movementSpeed = 70;
controls.lookSpeed = 0.05;
controls.noFly = false;
controls.lookVertical = false;

const clock = new THREE.Clock( );

function animate( ) {

    const delta = clock.getDelta( ); // Elapsed time in seconds

    controls.update (delta);
    
    rayCaster.setFromCamera( mouse, camera );

    // Look for all the intersected objects
    const intersects = rayCaster.intersectObjects( scene.children );
    if ( intersects.length > 0 ) {

        // Sorted by Z (close to the camera)
        if ( intersectedObject != intersects[ 0 ].object ) {

            intersectedObject = intersects[ 0 ].object;
            console.log( 'New intersected object: ' + intersectedObject.name 

    );
        }
    } else {

    intersectedObject = null;
    }
  

    // Render the scene
    renderer.render( scene, camera );

    // Request the browser to execute the animation-rendering loop
    requestAnimationFrame( animate );
};
animate();

document.body.addEventListener( 'mousemove', ( event ) => {
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}, false );

document.body.addEventListener( 'keydown', ( event ) => {

    // Space key code
    const spaceKeyCode = 32;

    // Space pressed and intersected object
    if ( event.keyCode === spaceKeyCode && intersectedObject ) {

        if ( sound1.isPlaying === true && intersectedObject.name===box1.name){
            sound1.pause();
            box1.material[ 0 ] = specialFaceMaterial;
            box1.needsUpdate = true;
        }else if(sound1.isPlaying != true && intersectedObject.name===box1.name ){
            sound1.play();
            box1.material[ 0 ] = specialFaceSoundMaterial;
            box1.material.needsUpdate = true;
        } else if (sound2.isPlaying === true && intersectedObject.name===box2.name) {
            sound2.pause();
            box2.material[ 0 ] = specialFaceMaterial;
            box2.needsUpdate = true;
        }else if(sound2.isPlaying != true && intersectedObject.name===box2.name ){
            sound2.play();
            box2.material[ 0 ] = specialFaceSoundMaterial;
            box2.material.needsUpdate = true;
        }
    }
}, false );