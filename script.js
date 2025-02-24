// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load the GLTF model (Mazda RX7)
const loader = new THREE.GLTFLoader();

// Load the 3D model
loader.load(
    'models/mazda_rx7_stylised.glb',  // Path to your GLB file
    function(gltf) {
        const carModel = gltf.scene;  // The loaded 3D model
        carModel.scale.set(1, 1, 1);  // Scale the model (adjust size)
        carModel.position.set(0, 0, 0);  // Position the model in the scene
        carModel.castShadow = true;  // Enable shadows for the car model
        scene.add(carModel);  // Add the car model to the scene
    },
    undefined,  // onProgress callback (optional)
    function(error) {
        console.error('An error occurred loading the model:', error);
    }
);

// Set up the ground (a simple plane for the car to move on)
const groundGeometry = new THREE.PlaneGeometry(200, 200);
const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = - Math.PI / 2;
scene.add(ground);

// Set up basic lighting
const light = new THREE.PointLight(0xffffff, 1, 500);
light.position.set(0, 10, 0);
scene.add(light);

// Set the camera position
camera.position.z = 10;

// Movement controls for the car
let carSpeed = 0.1;
let carRotationSpeed = 0.05;
let moveForward = false;
let moveBackward = false;
let turnLeft = false;
let turnRight = false;

// Listen for key events for movement
document.addEventListener('keydown', (event) => {
    if (event.key === 'w') moveForward = true;
    if (event.key === 's') moveBackward = true;
    if (event.key === 'a') turnLeft = true;
    if (event.key === 'd') turnRight = true;
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'w') moveForward = false;
    if (event.key === 's') moveBackward = false;
    if (event.key === 'a') turnLeft = false;
    if (event.key === 'd') turnRight = false;
});

// Update the car's position based on movement
function animate() {
    requestAnimationFrame(animate);

    // Move the car
    if (moveForward) carModel.position.z -= carSpeed;
    if (moveBackward) carModel.position.z += carSpeed;

    // Rotate the car
    if (turnLeft) carModel.rotation.y += carRotationSpeed;
    if (turnRight) carModel.rotation.y -= carRotationSpeed;

    // Render the scene
    renderer.render(scene, camera);
}

// Start the animation loop
animate();
