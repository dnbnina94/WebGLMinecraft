var chickenCube = new THREE.BoxGeometry(0.4*13*4/100 + 0.4*104/100,1,0.4*13*4/100 + 0.4*104/100);
var chickenMesh = new THREE.Mesh(chickenCube, new THREE.MeshBasicMaterial({ visible: false }));
chickenMesh.position.set(2,1,2);
scene.add(chickenMesh);
addToColliders(chickenMesh);

var chickenBodyGeo = new THREE.BoxGeometry(0.4, 0.4*78/100, 0.4*78/100);
var chickenBodyMesh = new THREE.Mesh(chickenBodyGeo, chickenBodyMaterials);
chickenMesh.add(chickenBodyMesh);
chickenBodyMesh.position.y -= (0.5 - 0.4*78/100/2 - 0.4*65/100);

var chickenWingGeo = new THREE.BoxGeometry(0.4*78/100, 0.4*52/100, 0.4*13/100);
var chickenWingMeshLeft = new THREE.Mesh(chickenWingGeo, chickenWingMaterials);
chickenBodyMesh.add(chickenWingMeshLeft);
chickenWingMeshLeft.position.z += chickenBodyMesh.geometry.parameters.width/2 - chickenWingMeshLeft.geometry.parameters.depth/2;
chickenWingMeshLeft.position.y += (chickenBodyMesh.geometry.parameters.height - chickenWingMeshLeft.geometry.parameters.height)/2;

var chickenWingMeshRight = new THREE.Mesh(chickenWingGeo, chickenWingMaterials);
chickenBodyMesh.add(chickenWingMeshRight);
chickenWingMeshRight.position.z -= chickenBodyMesh.geometry.parameters.width/2 - chickenWingMeshRight.geometry.parameters.depth/2;
chickenWingMeshRight.position.y += (chickenBodyMesh.geometry.parameters.height - chickenWingMeshRight.geometry.parameters.height)/2;

var chickenLegGeo = new THREE.BoxGeometry(0.0001,0.4*65/100, 0.4*13/100);
var chickenLegLeftMesh = new THREE.Mesh(chickenLegGeo, chickenLegMaterial);
chickenLegLeftMesh.position.y -= (chickenBodyMesh.geometry.parameters.height + chickenLegLeftMesh.geometry.parameters.height)/2;
chickenLegLeftMesh.position.z += chickenLegLeftMesh.geometry.parameters.depth + chickenLegLeftMesh.geometry.parameters.depth/2;
chickenBodyMesh.add(chickenLegLeftMesh);

var chickenLegRightMesh = chickenLegLeftMesh.clone();
chickenLegRightMesh.position.z -= chickenLegRightMesh.geometry.parameters.depth*3;
chickenBodyMesh.add(chickenLegRightMesh);

var chickenFootGeo = new THREE.BoxGeometry(0.4*13*2/100, 0.0001, 0.4*13*3/100);
var chickenFootMeshLeft = new THREE.Mesh(chickenFootGeo, chickenLegMaterial);
chickenLegLeftMesh.add(chickenFootMeshLeft);
chickenFootMeshLeft.position.y -= chickenLegLeftMesh.geometry.parameters.height/2;
chickenFootMeshLeft.position.x -= chickenFootMeshLeft.geometry.parameters.width/2;

var chickenFootMeshRight = new THREE.Mesh(chickenFootGeo, chickenLegMaterial);
chickenLegRightMesh.add(chickenFootMeshRight);
chickenFootMeshRight.position.y -= chickenLegRightMesh.geometry.parameters.height/2;
chickenFootMeshRight.position.x -= chickenFootMeshRight.geometry.parameters.width/2;

var chickenToeGeo = new THREE.BoxGeometry(0.4*13/100, 0.0001, 0.4*13/100);
var chickenToeMeshLeft = new THREE.Mesh(chickenToeGeo, chickenLegMaterial);
chickenFootMeshLeft.add(chickenToeMeshLeft);
chickenToeMeshLeft.position.x -= chickenFootMeshLeft.geometry.parameters.width/2 + chickenToeMeshLeft.geometry.parameters.width/2;

var chickenToeMeshRight = new THREE.Mesh(chickenToeGeo, chickenLegMaterial);
chickenFootMeshRight.add(chickenToeMeshRight);
chickenToeMeshRight.position.x -= chickenFootMeshRight.geometry.parameters.width/2 + chickenToeMeshRight.geometry.parameters.width/2;

var chickenHeadGeo = new THREE.BoxGeometry(0.4*13*3/100,0.4*78/100,0.4*52/100);
var chickenHeadMesh = new THREE.Mesh(chickenHeadGeo, chickenHeadMaterials);
chickenBodyMesh.add(chickenHeadMesh);
chickenHeadMesh.position.x -= (chickenBodyMesh.geometry.parameters.width + chickenHeadMesh.geometry.parameters.width)/2 - 0.4*13/100;
chickenHeadMesh.position.y += (chickenBodyMesh.geometry.parameters.height + chickenHeadMesh.geometry.parameters.height)/2 - 0.4*13*2/100;

var chickenBeakGeo = new THREE.BoxGeometry(0.4*13*2/100,0.4*13*2/100,0.4*52/100);
var chickenBeakMesh = new THREE.Mesh(chickenBeakGeo, chickenBeakMaterials);
chickenHeadMesh.add(chickenBeakMesh);
chickenBeakMesh.position.x -= (chickenHeadMesh.geometry.parameters.width + chickenBeakMesh.geometry.parameters.width)/2;

var chickenWattleGeo = new THREE.BoxGeometry(0.4*13/100,0.4*13*2/100,0.4*13*2/100);
var chickenWattleMesh = new THREE.Mesh(chickenWattleGeo, chickenWattleMaterial);
chickenHeadMesh.add(chickenWattleMesh);
chickenWattleMesh.position.x -= (chickenHeadMesh.geometry.parameters.width + chickenWattleMesh.geometry.parameters.width)/2;
chickenWattleMesh.position.y -= (chickenHeadMesh.geometry.parameters.height - chickenWattleMesh.geometry.parameters.height)/2;

function chickenAnimation() {
	var currentZombieHeadPosition = new THREE.Vector3();
	currentZombieHeadPosition.setFromMatrixPosition(zombieHeadCube.matrixWorld);
	var currentChickenBodyPosition = new THREE.Vector3();
	currentChickenBodyPosition.setFromMatrixPosition(chickenBodyMesh.matrixWorld);
	var c = Math.sqrt(Math.pow(currentChickenBodyPosition.x - currentZombieHeadPosition.x,2) + Math.pow(currentChickenBodyPosition.z - currentZombieHeadPosition.z,2));
	var normalizedVector = new THREE.Vector3();
	normalizedVector.x = currentZombieHeadPosition.x;
	normalizedVector.z = currentChickenBodyPosition.z;
	var a = Math.sqrt(Math.pow(normalizedVector.x - currentZombieHeadPosition.x,2) + Math.pow(normalizedVector.z - currentZombieHeadPosition.z,2));

	var angle = Math.asin(a/c);

	if (currentZombieHeadPosition.x < currentChickenBodyPosition.x && currentZombieHeadPosition.z < currentChickenBodyPosition.z)
		chickenBodyMesh.rotation.y += (-angle - chickenBodyMesh.rotation.y);
	if (currentZombieHeadPosition.x < currentChickenBodyPosition.x && currentZombieHeadPosition.z > currentChickenBodyPosition.z)
		chickenBodyMesh.rotation.y += (angle - chickenBodyMesh.rotation.y);
	if (currentZombieHeadPosition.x > currentChickenBodyPosition.x && currentZombieHeadPosition.z < currentChickenBodyPosition.z)
		chickenBodyMesh.rotation.y += (angle - chickenBodyMesh.rotation.y) - Math.PI;
	if (currentZombieHeadPosition.x > currentChickenBodyPosition.x && currentZombieHeadPosition.z > currentChickenBodyPosition.z)
		chickenBodyMesh.rotation.y += (-angle - chickenBodyMesh.rotation.y) - Math.PI;
}

var wingsAngle = Math.PI/25;
var wingsFlappingDirectionCount = 13;
var wingsFlappingCount = 6;
var flapWings = false;

setInterval(function(){ flapWings = true }, 5000);

function wingsOscilation() {

	if (wingsFlappingDirectionCount != 0) {
		rotateAboutPoint(chickenWingMeshLeft,
					 	new THREE.Vector3(0,0+chickenBodyMesh.geometry.parameters.height/2,0+chickenBodyMesh.geometry.parameters.depth/2),
					 	new THREE.Vector3(1,0,0),
					 	-wingsAngle);
		rotateAboutPoint(chickenWingMeshRight,
						new THREE.Vector3(0,0+chickenBodyMesh.geometry.parameters.height/2,0-chickenBodyMesh.geometry.parameters.depth/2),
						new THREE.Vector3(1,0,0),
						wingsAngle);
		wingsFlappingDirectionCount--;
	} else {
		wingsFlappingDirectionCount = 13;
		wingsAngle *= -1;
		wingsFlappingCount--;
		if(wingsFlappingCount == 0) {
			wingsFlappingCount = 6;
			flapWings = false;
		}
	}
}