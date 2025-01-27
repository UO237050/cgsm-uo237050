import * as THREE from 'three';

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer( {antialias: true} );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 1, 4000 );
camera.position.set( 0, 0, 500 );

const geometry = new THREE.BoxGeometry( 25, 25, 25 );
const cylinderGeometry= new THREE.CylinderGeometry(25,25,25);
const sphereGeometry= new THREE.SphereGeometry(25,25,25);
const houseGeometry= new THREE.BufferGeometry();

const material = new THREE.MeshBasicMaterial( );
const basicMaterial = new THREE.MeshBasicMaterial({color: 0xFF0000});
const lambertMaterial= new THREE.MeshLambertMaterial({color: 0x0000FF});
const phongMaterial= new THREE.MeshPhongMaterial({color: 0x00FF00});


const box = new THREE.Mesh( geometry, basicMaterial);
const cylinder= new THREE.Mesh(cylinderGeometry,lambertMaterial);
const sphere = new THREE.Mesh(sphereGeometry,phongMaterial);
box.position.set(-75,0,0);
cylinder.position.set(0,0,0);
sphere.position.set(75,0,0);

//Vertices de la casa
const vertices= new Float32Array([
    -25, -25, 0,
     25, -25, 0,
    -25,  25, 0,
     25,  25, 0,
       0,  50, 0,
]);

const indices = [
    //Base
    0, 1, 2,
    1, 3, 2,
    //Techo
    2, 3, 4,
];

houseGeometry.setIndex(indices);
houseGeometry.setAttribute('position', new THREE.BufferAttribute(vertices,3));

const house= new THREE.Mesh(houseGeometry,material);
house.position.set(150,0,0);


box.rotation.set(Math.PI / 5, -Math.PI / 5, 0 );
cylinder.rotation.set( Math.PI / 5, 0 , 0 );
scene.add( box );
scene.add(cylinder);
scene.add(sphere);
scene.add(house);

const ambientLight = new THREE.AmbientLight(0x404040, 0.5); 
scene.add(ambientLight);

const pointLight= new THREE.PointLight(0xFFFFFF, 1, 1000);
pointLight.position.set(0, 0, 300);
scene.add(pointLight);

const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
directionalLight.position.set(-200, 0, 200);
scene.add(directionalLight);

renderer.render( scene, camera );

window.addEventListener( 'resize', ( ) => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix( );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.render( scene, camera );
}, false );