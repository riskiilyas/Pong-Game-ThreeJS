/*
Things that can be done :
1. Life system
2. Scoring
3. Multiple characters
4. More patterns
5. Borders for player
6. Backgrounds
7. More complex shapes
8. Music
9. Shoot the boss
10. Powerups
11. Camera that follows the player
*/

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as Entity from "./entities.js";

let cooldown = false;
let scorep1 = 0;
let scorep2 = 0;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 18, 20);

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
});

renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
const light = new THREE.DirectionalLight(0x121212, 1);
light.castShadow = true;

// Set up shadow properties for the light
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500;

// Set the position and target of the light
light.position.set(0, 10, 0);
light.target.position.set(0, 0, 0);
scene.add(light);
scene.add(light.target);

// // skybox
// const textureLoadersky = new THREE.TextureLoader();

// const frontTexture = textureLoadersky.load('assets/field.jpg');
// const backTexture = textureLoadersky.load('assets/field.jpg');
// const topTexture = textureLoadersky.load('assets/field.jpg');
// const bottomTexture = textureLoadersky.load('assets/field.jpg');
// const leftTexture = textureLoadersky.load('assets/field.jpg');
// const rightTexture = textureLoadersky.load('assets/field.jpg');
// const materials = [
//   new THREE.MeshBasicMaterial({ map: rightTexture }),   // Right face
//   new THREE.MeshBasicMaterial({ map: leftTexture }),    // Left face
//   new THREE.MeshBasicMaterial({ map: topTexture }),     // Top face
//   new THREE.MeshBasicMaterial({ map: bottomTexture }),  // Bottom face
//   new THREE.MeshBasicMaterial({ map: backTexture }),    // Back face
//   new THREE.MeshBasicMaterial({ map: frontTexture })    // Front face
// ];
// const geometrysky = new THREE.BoxGeometry(100, 100, 100);
// const skybox = new THREE.Mesh(geometry, materials);
// skybox.scale.set(-1, 1, 1);
// scene.add(skybox);

// const light = new THREE.DirectionalLight(0x121212, 1);
//   light.position.y = 3;
//   light.position.z = 8;
//   light.castShadow = true;
//   scene.add(light);

scene.add(new THREE.AmbientLight(0xffffff, 0.5));
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("assets/field.jpg");

const material = new THREE.MeshStandardMaterial({
  map: texture,
  shadowSide: THREE.FrontSide,
});

const geometry = new THREE.BoxGeometry(31, 0.5, 23);
const ground = new THREE.Mesh(geometry, material);
ground.position.set(0, -1, 0);
ground.rotation.y = Math.PI / 2; // Rotate 90 degrees (π/2 radians)
ground.receiveShadow = true;
scene.add(ground);

const textureLoaderterr = new THREE.TextureLoader();
const textureterr = textureLoaderterr.load("assets/terr.jpeg");

const materialterr = new THREE.MeshStandardMaterial({
  map: textureterr,
  shadowSide: THREE.FrontSide,
});

const geometryterr = new THREE.BoxGeometry(310, 0.4, 230);
const groundterr = new THREE.Mesh(geometryterr, materialterr);
groundterr.position.set(0, -1, 0);
groundterr.rotation.y = Math.PI / 2; // Rotate 90 degrees (π/2 radians)
groundterr.receiveShadow = true;
scene.add(groundterr);

//   const textureLoader = new THREE.TextureLoader();
//   const texture = textureLoader.load('assets/field.png');
//   const material = new THREE.MeshStandardMaterial({ map: texture });
//   const geometry = new THREE.BoxGeometry(1, 1, 1);
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// const ground = new Entity.Box({
//     width: 20,
//     height: 0.5,
//     depth: 50,
//     color: '#0369a1',
//     position: {
//       x: 0,
//       y: -1,
//       z: 0
//     }
//   });
//   ground.receiveShadow = true;
//   scene.add(ground);

const loader = new GLTFLoader();
let ball;
loader.load("assets/ball2/scene.gltf", function (gltf) {
  ball = gltf.scene;
  // Set the desired center point
  // var center = new THREE.Vector3(1, 0.2, 0);

  // // Adjust the position based on the center point
  // ball.position.sub(center);
  // You can manipulate the loaded model here if needed
  // ball.position.y = -0.5;
  scene.add(ball);
});

load_buildings(-15, 0);
load_buildings(-15, 10);
load_buildings(-15, 20);
load_buildings(-15, -10);
load_buildings(-15, -20);
load_buildings(15, 0);
load_buildings(15, 10);
load_buildings(15, 20);
load_buildings(15, -10);
load_buildings(15, -20);

function load_buildings(x, z) {
  let paddle;
  loader.load("assets/building/scene.gltf", function (gltf) {
    paddle = gltf.scene;

    // You can manipulate the loaded model here if needed
    // ball.position.y = -0.5;
    scene.add(paddle);
    paddle.position.y = -0.5;
    paddle.position.x = x;
    paddle.position.z = z;
    if (x > 0) {
      paddle.rotation.y = Math.PI;
    }
  });
}

load_trees(0, 50);
load_trees(0, -50);
load_trees(50, -50);
load_trees(50, 50);
load_trees(-50, -50);
load_trees(-50, 50);
load_trees(50, 0);
load_trees(-50, 0);

function load_trees(x, z) {
  let paddle;
  loader.load("assets/trees/scene.gltf", function (gltf) {
    paddle = gltf.scene;

    // You can manipulate the loaded model here if needed
    // ball.position.y = -0.5;
    scene.add(paddle);
    paddle.position.y = -0.5;
    paddle.position.x = x;
    paddle.position.z = z;
    if (z < 0) {
      paddle.rotation.y = Math.PI;
    }
  });
}

let paddle;
loader.load("assets/goal/scene.gltf", function (gltf) {
  paddle = gltf.scene;

  // You can manipulate the loaded model here if needed
  // ball.position.y = -0.5;
  paddle.scale.x = 0.01;
  paddle.scale.y = 0.01;
  paddle.scale.z = 0.015;
  paddle.position.y = -0.5;
  paddle.position.z = 13;
  paddle.rotateY(Math.PI / 2);
  scene.add(paddle);

  // if(z<0){
  //   paddle.rotation.y = Math.PI;
  // }
});

const loaderp2 = new GLTFLoader();
let paddle2;
loaderp2.load("assets/goal/scene.gltf", function (gltf) {
  paddle2 = gltf.scene;

  // You can manipulate the loaded model here if needed
  // ball.position.y = -0.5;
  paddle2.scale.x = 0.01;
  paddle2.scale.y = 0.01;
  paddle2.scale.z = 0.015;
  paddle2.position.y = -0.5;
  paddle2.position.z = -13;
  paddle2.rotateY((Math.PI * 3) / 2);
  scene.add(paddle2);

  // if(z<0){
  //   paddle.rotation.y = Math.PI;
  // }
});

const player = new Entity.Box({
  width: 4,
  height: 0.75,
  depth: 0.75,
  color: 0x3489eb,
  position: {
    x: 0,
    y: 0,
    z: 9,
  },
});
player.receiveShadow = true;
player.castShadow = true;
scene.add(player);

const enemy = new Entity.Box({
  width: 4,
  height: 0.75,
  depth: 0.75,
  color: 0xeb4034,

  position: {
    x: 0,
    y: 0,
    z: -9,
  },
});
enemy.receiveShadow = true;
enemy.castShadow = true;
scene.add(enemy);

const enemies = [];

function update_difficulty() {
  let modes = "";
  if (difficulty == 1) modes = "Easy";
  else if (difficulty == 2) modes = "Medium";
  else if (difficulty == 3) modes = "Hard";
  else modes = "Impossible";

  const h1Element = document.getElementById("mode");
  h1Element.textContent = "Mode: " + modes;
}

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  shift: {
    pressed: false,
  },
};

window.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "KeyR":
      scorep1 = 0;
      scorep2 = 0;
      updatescore();
      break;
    case "KeyD":
      keys.s.pressed = true;
      break;

    case "KeyA":
      keys.w.pressed = true;
      break;
    case "Digit1":
      enemy_speed = 0.2;
      difficulty = 1;
      update_difficulty();
      break;
    case "Digit2":
      enemy_speed = 0.5;
      difficulty = 2;
      update_difficulty();
      break;
    case "Digit3":
      enemy_speed = 0.7;
      difficulty = 3;
      update_difficulty();

      break;
    case "Digit4":
      enemy_speed = 2;
      difficulty = 4;
      update_difficulty();

      break;
    case "Space":
      // keys.space.pressed = true
      acceleration = 0.5;
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.code) {
    case "KeyD":
      keys.s.pressed = false;
      break;

    case "KeyA":
      keys.w.pressed = false;

      break;
    case "Space":
      // keys.space.pressed = false
      acceleration = 0;
      break;
  }
});

let speedModifier = 1;
let vb_x = Math.random() - 0.5;
let player_turn = true;
let vb_z = player_turn ? 0.2 : -0.2;
let enemy_speed = 0.15;
let difficulty = 1;
let acceleration = 0;

let cooldown_started = false;
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  if (cooldown) {
    setTimeout(() => {
      vb_x = Math.random() - 0.5;
      vb_z = player_turn ? 0.2 : -0.2;
      cooldown_started = false;
      player.position.x = 0;
      player.position.y = 0;
      player.position.z = 9;

      enemy.position.x = 0;
      enemy.position.y = 0;
      enemy.position.z = -9;

      ball.position.x = 1;
      ball.position.y = 0.2;
      ball.position.z = 0;
    }, 1000);
    cooldown_started = true;
    cooldown = false;
    return;
  } else if (cooldown_started) return;

  updateCollision();
  updateBullets();
  check_player_boundary();
  ball.position.z += vb_z;
  ball.position.x += vb_x;

  player.velocity.x = 0;
  player.velocity.z = 0;
  if (keys.a.pressed) player.velocity.z = 0.3 * speedModifier + acceleration;
  else if (keys.d.pressed)
    player.velocity.z = -0.3 * speedModifier - acceleration;

  if (keys.s.pressed) player.velocity.x = 0.3 * speedModifier + acceleration;
  else if (keys.w.pressed)
    player.velocity.x = -0.3 * speedModifier - acceleration;

  // if (keys.shift.pressed) {
  //   player.material.color.set('#f41173');
  //   player.scale.set(0.75,0.75,0.75);
  //   speedModifier = 0.6;
  // }
  // else {
  //   player.material.color.set('#00ff00');
  //   player.scale.set(1,1,1);
  //   speedModifier = 1.25;
  // }
  enemy.position.x +=
    enemy.position.x < ball.position.x ? enemy_speed : -enemy_speed;
  if (Math.abs(enemy.position.x - ball.position.x) <= Math.abs(enemy_speed))
    enemy.position.x = ball.position.x;
  enemy.update(ground);
  player.update(ground);
}

function updatescore() {
  const h1Element = document.getElementById("score");
  h1Element.textContent = "Score: " + scorep1 + " - " + scorep2;
  player_turn = !player_turn;
  cooldown = true;
}

function check_player_boundary() {
  if (camera.position.y < 0) camera.position.y = 0;
  if (player.position.x > 8) player.position.x = 8;
  if (player.position.x < -8) player.position.x = -8;
  if (player.position.z < 0) player.position.z = 0;
  if (player.position.z > 12) player.position.z = 12;
  if (ball.position.x > 9 || ball.position.x < -11) {
    ball.position.x = ball.position.x > 0 ? 9 : -11;
    if (vb_x > 0.5) {
      vb_x *= -1;
    } else {
      vb_x *= -1;
    }
  }
  if (ball.position.z > 12 || ball.position.z < -12) {
    ball.position.z = ball.position.z > 0 ? 12 : -12;
    if (vb_z > 0.5) {
      vb_z *= -1;
    } else {
      vb_z *= -1;
    }

    if (ball.position.x < 3 && ball.position.x > -4.3) {
      if (ball.position.z > 0) {
        scorep2++;
      } else {
        scorep1++;
      }
      updatescore();
    }
  }

  const box1 = new THREE.Box3().setFromObject(player);
  const box2 = new THREE.Box3().setFromObject(ball);
  if (box1.intersectsBox(box2)) {
    vb_z *= -1.1;
    do {
      if (vb_z > 0) ball.position.z += 1;
      else ball.position.z -= 1;
    } while (Math.abs(ball.position.z - player.position.z) < 1.5);
    if (player.velocity.x != 0) {
      vb_x += player.velocity.x / 2;
      // if(player.velocity.x<0&&vb_x<0||player.velocity.x>0&&vb_x>0) vb_x*=-0.5;
    }
    // if(player.velocity.z!=0) {
    //   vb_z = player.velocity.z + -vb_z/4;
    //   if(player.velocity.z>0&&vb_z>0||player.velocity.z>0&&vb_z>0) vb_z*=-0.5;
    // }
  }

  const box3 = new THREE.Box3().setFromObject(enemy);
  if (box3.intersectsBox(box2)) {
    vb_z *= -1.1;
    do {
      if (vb_z > 0) ball.position.z += 1;
      else ball.position.z -= 1;
    } while (Math.abs(ball.position.z - enemy.position.z) < 1.5);
    // if(vb_z>0.5) {
    //   vb_z *= -0.8;
    // } else {
    //   vb_z *= -1;
    // }
  }

  if (vb_z > 2) vb_z = 2;
  if (vb_z < -2) vb_z = -2;
  if (vb_x > 2) vb_x = 2;
  if (vb_x < -2) vb_x = -2;
}

//create pattern, then after delay remove pattern
//pattern updates in animate
//setInterval must be higher than setTimeout

function updateBullets() {
  if (enemies.length !== 0) {
    enemies.forEach((enemy) => {
      enemy.update();
    });
  }
}

function updateCollision() {
  enemies.forEach((enemy) => {
    let collision = Entity.boxCollision(player, enemy);
    if (collision && !enemy.collided) {
      console.log("hit");
      enemy.velocity.z = enemy.velocity.z * -1;
      enemy.collided = true;

      if (player.velocity.x != 0) {
        enemy.velocity.x += player.velocity.x / 2;
      }
    } else if (!collision) {
      enemy.collided = false;
    }
    if (enemy.position.x > 9 || enemy.position.x < -9) {
      enemy.position.x = enemy.position.x > 0 ? 9 : -9;
      enemy.velocity.x *= -1;
    }
    if (enemy.position.z > 12 || enemy.position.z < -12) {
      enemy.position.z = enemy.position.z > 0 ? 12 : -12;
      enemy.velocity.z *= -1;
    }
  });
}

function addButton() {
  // Create a button element
  var button = document.createElement("button");
  button.textContent = "<<";
  button.setAttribute(
    "style",
    "width: 200px;height:200px;margin: 16px;font-size:48px;  user-select: none;"
  );

  // Add touch start event listener
  button.addEventListener("touchstart", function () {
    keys.w.pressed = true;
  });

  // Add touch end event listener
  button.addEventListener("touchend", function () {
    keys.w.pressed = false;
  });

  // Create a container for the button
  var buttonContainer = document.createElement("div");
  buttonContainer.id = "button-container";
  buttonContainer.appendChild(button);

  var button2 = document.createElement("button");
  button2.textContent = ">>";
  button2.setAttribute(
    "style",
    "width: 200px;height:200px;margin: 16px;font-size:48px;  user-select: none;  "
  );
  // Add touch start event listener
  button2.addEventListener("touchstart", function () {
    keys.s.pressed = true;
  });

  // Add touch end event listener
  button2.addEventListener("touchend", function () {
    keys.s.pressed = false;
  });

  buttonContainer.appendChild(button2);

  // Append the container to the document body
  document.body.appendChild(buttonContainer);

  var buttonR = document.createElement("button");
  buttonR.textContent = "R";
  buttonR.setAttribute(
    "style",
    "width: 100px;height:50px;margin: 16px;font-size:16px;  user-select: none;  "
  );

  // Add touch start event listener
  buttonR.addEventListener("click", function () {
    console.log("Touch started!");
    scorep1 = 0;
    scorep2 = 0;
    updatescore();
  });

  // Append the container to the document body
  document.getElementById("overlay").appendChild(buttonR);

  var button1 = document.createElement("button");
  button1.textContent = "1";
  button1.setAttribute(
    "style",
    "width: 100px;height:50px;margin: 16px;font-size:16px;  user-select: none;  "
  );

  // Add touch start event listener
  button1.addEventListener("click", function () {
    enemy_speed = 0.1;
    difficulty = 1;
    update_difficulty();
  });

  // Append the container to the document body
  document.getElementById("overlay").appendChild(button1);

  var button2 = document.createElement("button");
  button2.textContent = "2";
  button2.setAttribute(
    "style",
    "width: 100px;height:50px;margin: 16px;font-size:16px;  user-select: none;  "
  );

  // Add touch start event listener
  button2.addEventListener("click", function () {
    enemy_speed = 0.25;
    difficulty = 2;
    update_difficulty();
  });

  // Append the container to the document body
  document.getElementById("overlay").appendChild(button2);

  var button3 = document.createElement("button");
  button3.textContent = "3";
  button3.setAttribute(
    "style",
    "width: 100px;height:50px;margin: 16px;font-size:16px;  user-select: none;  "
  );
  // Add touch start event listener
  button3.addEventListener("click", function () {
    enemy_speed = 0.4;
    difficulty = 3;
    update_difficulty();
  });

  // Append the container to the document body
  document.getElementById("overlay").appendChild(button3);

  var button4 = document.createElement("button");
  button4.textContent = "4";
  button4.setAttribute(
    "style",
    "width: 100px;height:50px;margin: 16px;font-size:16px;  user-select: none;  "
  );

  // Add touch start event listener
  button4.addEventListener("click", function () {
    enemy_speed = 2;
    difficulty = 4;
    update_difficulty();
  });

  // Append the container to the document body
  document.getElementById("overlay").appendChild(button4);
}

// Check if the device is a mobile device
var isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

// If the device is a mobile device, add the button
if (isMobile) {
  addButton();
}

/*
more patterns = slower
need a way to clear bullets
  1. by timer -> bullets will disappear after a certain amount of time
  2. by out of bounds -> if out of bounds, then delete
*/
// setInterval(animateProjectiles, 3200);

// animateProjectiles();
animate();
