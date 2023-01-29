import * as THREE from './three.module.js';
import { FontLoader } from './FontLoader.js';
import { TextGeometry } from './TextGeometry.js';


//Delcaring Variables
let nameMesh = new THREE.Mesh();
let name = "JOSHUA";
let stars, starGeo;

//Creating Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  10,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Functions within Script
lighting();
text();
particles();


// Randomizing particle Position
function particles() {    
  const points = [];

  for (let i = 0; i < 6000; i++) {
    let star = new THREE.Vector3(
      Math.random() * 600 - 300,
      Math.random() * 600 - 300,
      Math.random() * 600 - 300
    );
    points.push(star);
  }                     

  // Creation of Start Container

  starGeo = new THREE.BufferGeometry().setFromPoints(points);   
  let sprite = new THREE.TextureLoader().load("assets/images/star.png");
  let starMaterial = new THREE.PointsMaterial({color: 0xf70EEFF, size: 0.7, map: sprite,});                                                           

  stars = new THREE.Points(starGeo, starMaterial); 
  
  
  
  scene.add(stars);
}                                                              

//Setting Particle Animation

function animateParticles() {

    starGeo.verticesNeedUpdate = true;
   
    stars.position.y -= 0.5;
    if (stars.position.y <= -230){
      stars.position.y = 230;
    }
    stars.position.y -= 0.5;

 
}

// Text Geometry 

function text() {
  const loader = new FontLoader();

  loader.load( './assets/fonts/Bebas_Neue_Regular_Regular.json', function ( font ) {
      
	  const textGeometry = new TextGeometry( name, {font: font, size: 5,height: 5,} );
    const texture = new THREE.TextureLoader().load("assets/textures/wooden.jpg");
    const textMaterial = new THREE.MeshPhongMaterial({map: texture});
    textGeometry.center();
    nameMesh = new THREE.Mesh(textGeometry, textMaterial);
    nameMesh.position.z = -5;
    scene.add(nameMesh);
  })
    
    camera.position.z = 15;
}

// Lighting

function lighting() {
  const light = new THREE.HemisphereLight(0x780a44, 0x1c3020, 1);
  scene.add(light);

  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(0, 0, 15);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  spotLight.shadow.camera.near = 500;
  spotLight.shadow.camera.far = 4000;
  spotLight.shadow.camera.fov = 30;
  scene.add(spotLight);
}

// Render

function animate() {
  requestAnimationFrame(animate);

  animateParticles();

  nameMesh.rotation.x += 0.008;
  nameMesh.rotation.y += 0.008;
  renderer.render(scene, camera);
}

animate();
