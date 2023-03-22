
import { Power2 } from 'gsap';
import { TweenMax } from 'gsap/gsap-core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

var scene = new THREE.Scene();
var camera = new THREE.OrthographicCamera(-1, 1, 1 / 1.33, -0.5 / 1.33, 0.01, 100000);
camera.position.z = 400;
camera.scale.set(1.5, 1.5, 1.5)

camera.lookAt(new THREE.Vector3(0, 0, 0))

var div = document.getElementById('scene2-body');
var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(div.clientWidth, div.clientHeight);
console.log(div.clientWidth, div.clientHeight)

var canvas = renderer.domElement;
div.appendChild(canvas);

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.7);
pointLight.position.set(15, 5, 25);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(pointLight, ambientLight);

// Create the object slider
var sliderContainer = new THREE.Object3D();
scene.add(sliderContainer);
var objects = [];

// Load the 3D objects
var loader = new GLTFLoader();

await loader.loadAsync('assets/CartoonTree.gltf').then(object => {
    object.scene.position.set(-2, -0.2, 0);
    object.scene.scale.set(0.18, 0.18, 0.18)
    objects.push(object.scene)
    sliderContainer.add(object.scene);
});

await loader.loadAsync('assets/Mill.gltf').then(object => {
    object.scene.position.set(0, -0.2, 0);
    object.scene.rotation.set(0, 0.8, 0)
    objects.push(object.scene)
    sliderContainer.add(object.scene);
});

await loader.loadAsync('assets/Low-Poly-Racing-Car.gltf').then(object => {
    object.scene.position.set(2, -0.4, 0);
    object.scene.scale.set(0.7, 0.7, 0.7)
    object.scene.rotation.set(0, 4, 0)
    objects.push(object.scene)
    sliderContainer.add(object.scene);
});




// Create slider controls
var previousButton = document.getElementById('previous');
var nextButton = document.getElementById('next');
var sliderPosition = 0;

function moveNext() {
    if (sliderPosition < 1) {
        sliderPosition++;
        TweenMax.to(sliderContainer.position, 0.5, { x: sliderPosition * -2, ease: Power2.easeOut });

    }
    if (sliderPosition == 1) {
        nextButton.classList.add('invisible');
    } else if (sliderPosition != -1 && !previousButton.visibility) {
        previousButton.classList.remove('invisible');
    }
}
function movePrev() {
    if (sliderPosition > -1) {
        sliderPosition--;
        TweenMax.to(sliderContainer.position, 0.5, { x: sliderPosition * -2, ease: Power2.easeOut });
    }
    if (sliderPosition == -1) {
        previousButton.classList.add('invisible');
    } else if (sliderPosition != 1 && !nextButton.visibility) {
        nextButton.classList.remove('invisible');
    }
}

nextButton.addEventListener('click', function () {
    moveNext()
});

previousButton.addEventListener('click', function () {
    movePrev()
});

document.addEventListener('keydown', function (event) {
    if (event.code === 'ArrowLeft') {
        movePrev()
    } else if (event.code === 'ArrowRight') {
        moveNext()
    }
})

// Add interactivity to the carousel
var mouseDown = false;
var mouseX = 0;
var selectedObject;
var prevRotation = new THREE.Vector3();
var currentRotation = new THREE.Vector3();
function onMouseDown(event) {
    mouseDown = true;
    mouseX = event.clientX;
}
function onMouseMove(event) {
    if (mouseDown) {
        // var deltaX = event.clientX - mouseX;
        console.log(selectedObject)
        if (!selectedObject) {
            console.log(objects, 1 + sliderPosition)
            selectedObject = objects[1 + sliderPosition]
            prevRotation.x = selectedObject.rotation.x;
            prevRotation.y = selectedObject.rotation.y;
            prevRotation.z = selectedObject.rotation.z;
            currentRotation = prevRotation.copy()
        }
        //selectedObject.rotation.y += deltaX * 0.01;
        // Calculate the change in mouse position
        var deltaX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        var deltaY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

        // Update the rotation of the object based on the mouse movement
        currentRotation.y -= deltaX * 0.01;
        currentRotation.x -= deltaY * 0.01;

        // Limit the vertical rotation of the object to between -Math.PI/2 and Math.PI/2
        currentRotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, currentRotation.x));

        // Set the rotation of the object
        selectedObject.rotation.set(currentRotation.x, currentRotation.y, currentRotation.z);

        //mouseX = event.clientX;
    }
}

function onMouseUp(event) {
    mouseDown = false;
    if (selectedObject) {
        console.log(selectedObject.rotation, prevRotation)
        selectedObject.rotation.set(prevRotation.x, prevRotation.y, prevRotation.z)
        selectedObject = undefined;
        prevRotation = new THREE.Vector3();
    }
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