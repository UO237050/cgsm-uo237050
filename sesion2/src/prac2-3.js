import * as THREE from 'three';

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer( {antialias: true} );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 1, 4000 );
camera.position.set( 0, 0, 500 );

const tierraGeometry= new THREE.SphereGeometry(50,32,32);
const mapUrl = "../textures/earth.jpg";   // The file used as texture
const textureLoader = new THREE.TextureLoader( );  // The object used to load textures
const map = textureLoader.load( mapUrl, ( loaded ) => { renderer.render( scene, camera ); } );
const material = new THREE.MeshPhongMaterial( { map: map } );

const tierra = new THREE.Mesh(tierraGeometry,material);

const atmosGeometry= new THREE.SphereGeometry(51,32,32);
const mapUrlatmos = "../textures/atmos.png";   // The file used as texture
const textureLoaderatmos = new THREE.TextureLoader( );  // The object used to load textures
const mapAtmos = textureLoaderatmos.load( mapUrlatmos, ( loaded ) => { renderer.render( scene, camera ); } );
var atmosphereMaterial = new THREE.MeshLambertMaterial( { color: 0xFFFFFF, map: mapAtmos, transparent: true } );

const atmos = new THREE.Mesh(atmosGeometry,atmosphereMaterial);
scene.add(tierra);
scene.add(atmos);


const pointLight= new THREE.PointLight(0xFFFFFF, 500,500,1);
pointLight.position.set(100, 50, 50);
scene.add(pointLight);



renderer.render( scene, camera );

window.addEventListener( 'resize', ( ) => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix( );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.render( scene, camera );
}, false );