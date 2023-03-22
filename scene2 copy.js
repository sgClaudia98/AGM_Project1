
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, 1.33, 0.1, 1000);
camera.position.z = 5;
camera.position.y = 2;
camera.lookAt(new THREE.Vector3(0, 0, 0))

var div = document.getElementById('scene2-body');
var renderer = new THREE.WebGLRenderer();
renderer.setSize(div.clientWidth, div.clientHeight);
console.log(div.clientWidth, div.clientHeight)

var canvas = renderer.domElement;
div.appendChild(canvas);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(15, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Create the object carousel
var carousel = new THREE.Object3D();
scene.add(carousel);

// Load the 3D objects
var loader = new GLTFLoader();
loader.load('/assets/Low-Poly-Racing-Car.gltf', function (object1) {
    object1.scene.position.set(-2, 0, 0);
    carousel.add(object1.scene);
});

loader.load('/assets/hand_low_poly/hand.gltf', function (object2) {
    object2.scene.position.set(0, 0, 0);
    carousel.add(object2.scene);
});

loader.load('/assets/Low-Poly-Racing-Car.gltf', function (object3) {
    object3.scene.position.set(2, 0, 0);
    carousel.add(object3.scene);
});

// Add interactivity to the carousel
var mouseDown = false;
var mouseX = 0;

function onMouseDown(event) {
    mouseDown = true;
    mouseX = event.clientX;
}

function onMouseMove(event) {
    if (mouseDown) {
        var deltaX = event.clientX - mouseX;
        carousel.rotation.y += deltaX * 0.01;
        mouseX = event.clientX;
    }
}

function onMouseUp(event) {
    mouseDown = false;
}

renderer.domElement.addEventListener('mousedown', onMouseDown, false);
renderer.domElement.addEventListener('mousemove', onMouseMove, false);
renderer.domElement.addEventListener('mouseup', onMouseUp, false);

// Render the scene
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();