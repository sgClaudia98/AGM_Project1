import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// Setup


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

//scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);
//
function addStar() {
  const geometry = new THREE.SphereGeometry(0.1, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(100).fill().forEach(addStar);

// Background

// const spaceTexture = new THREE.TextureLoader().load('space.jpg');
const backgorundColor = new THREE.Color('black')
scene.background = backgorundColor;

// Hand
let hand;
function addHand() {
  var loader = new GLTFLoader();
  loader.load('assets/hand_low_poly/hand.gltf', function (gltf) {
    hand = gltf.scene;
    hand.position.z = -5;
    hand.position.x = 2;
    hand.position.y = 0;
    hand.rotation.y = -0.6;
    hand.scale.set(3, 3, 3)
    scene.add(hand)
  });
}

addHand()

function addSocial(path, position, geometry, rotateY) {
  var texture = new THREE.TextureLoader().load(path);
  var materialSocial = new THREE.MeshBasicMaterial({ map: texture });
  var mesh = new THREE.Mesh(geometry, materialSocial);
  mesh.position.set(position.x, position.y, position.z);
  mesh.rotateY(rotateY)
  return mesh;
}
var geometryBox = new THREE.BoxGeometry(3, 1.7, 1);
const webGL = addSocial('assets/webgl.png', { x: 10, y: -1, z: 5 }, geometryBox, -1.4)
scene.add(webGL);

geometryBox = new THREE.BoxGeometry(2, 1, 0.5);
const vuejs = addSocial('assets/01-vuejs.jpg', { x: 15, y: -0.85, z: 9.8 }, geometryBox, -1.5)
scene.add(vuejs)

geometryBox = new THREE.BoxGeometry(3, 1.7, 1);
const html5 = addSocial('assets/HTML5.png', { x: 15, y: -4, z: 9 }, geometryBox, -1.4)
scene.add(html5)

geometryBox = new THREE.BoxGeometry(2, 1, 0.5);
const react = addSocial('assets/react-logo.jpg', { x: 6, y: 1, z: 10.2 }, geometryBox, -1.8)
scene.add(react)

const socials = [webGL, vuejs, html5, react]

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * +0.001;

}

document.body.onscroll = () => {
  moveCamera();
}
moveCamera();
// move with mouse
var lastMousePos;
function onMouseMove(event) {
  // Calculate the position of the mouse in normalized device coordinates
  const mouse = new THREE.Vector2(
    (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1
  );
  if (lastMousePos) {
    // Set the position of the object to follow the mouse position
    socials.forEach(object => {

      object.position.x += (lastMousePos.x - mouse.x) * 0.3;
      object.position.y += (lastMousePos.y - mouse.y) * 0.3;


      object.rotation.x -= (lastMousePos.x - mouse.x) * 0.5;
      object.rotation.y += (lastMousePos.y - mouse.y) * 0.5;
      object.rotation.z -= (lastMousePos.y - mouse.y) * 0.5;
    })
  }
  lastMousePos = mouse
}
window.addEventListener('mousemove', onMouseMove);

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  if (hand) {
    // Calculate the new position of the hand based on a sine wave
    var rotation = Math.sin(Date.now() * 0.005);
    //hand.position.setY(yPosition);  

    hand.rotation.y += rotation * 0.01;
    hand.rotation.z += rotation * 0.04;
  }

  // moon.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
