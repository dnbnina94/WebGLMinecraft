function rotateAboutPoint(obj, point, axis, theta){
	obj.position.sub(point); // remove the offset
	obj.position.applyAxisAngle(axis, theta); // rotate the POSITION
	obj.position.add(point); // re-add the offset
  
	obj.rotateOnAxis(axis, theta); // rotate the OBJECT
}

var count = 0;
var dir = 1;

function oscilationRotation(obj, obj2, point, axis, theta) {
	if (dir == 1) {
		count++;
	} else {
		count--;
	}
	obj.position.sub(point);
	obj2.position.sub(point);
	obj.position.applyAxisAngle(axis, theta*dir);
	obj2.position.applyAxisAngle(axis, -theta*dir);
	obj.position.add(point);
	obj2.position.add(point);
	obj.rotateOnAxis(axis, theta*dir);
	obj2.rotateOnAxis(axis, -theta*dir);
	if (count == 14)
		dir = -1;
	if (count == -14)
		dir = 1;
}

var moving = false;
var xSpeed = 0.05;
var ySpeed = 0.05;

var elevatorMoving = false;
var elevator;
var forbiddenMoving = false;
var elevatorCount;
var elevatorDirection;
var inElevator = false;

var checked = false;
var t = 0;
var targetPoint;

function isInElevator(collider) {
	if (collider.name === "elevator" && !inElevator && !checked) {
		inElevator = true;
		elevator = collider;
		elevatorCount = elevator.count;
		elevatorDirection = elevator.direction;
		checked = true;
		forbiddenMoving = true;
		moveToCenter = true;
		targetPoint = new THREE.Vector3(collider.position.x, 0, collider.position.z);
	} 
	if (collider.name !== "elevator" && inElevator && !checked) {
		inElevator = false;
		checked = true;
	}
}

var moveToCenter = false;

function getToSpecificPoint() {
	var zombiePoint = new THREE.Vector3();
	zombiePoint.setFromMatrixPosition(zombieBodyCube.matrixWorld);
	var dt = 0.005;

	if (t < 1) {
		var distance = Math.sqrt(Math.pow(targetPoint.x - zombiePoint.x, 2) + Math.pow(targetPoint.z - zombiePoint.z, 2));
		t = dt/distance;
		zombiePivot.position.x = (1-t)*zombiePoint.x + t*targetPoint.x;
		zombiePivot.position.z = (1-t)*zombiePoint.z + t*targetPoint.z;
	} else {
		t = 0;
		moveToCenter = false;
		elevatorMoving = true;
	}

}

function isCollision(vector, zombieY) {
	var isColliding = false;
	for (var i=0; i<colliders.length; i++) {
		var minX = colliders[i].position.x - colliders[i].geometry.parameters.width/2;
		var maxX = colliders[i].position.x + colliders[i].geometry.parameters.width/2;
		var minZ = colliders[i].position.z - colliders[i].geometry.parameters.depth/2;
		var maxZ = colliders[i].position.z + colliders[i].geometry.parameters.depth/2;
		var minY = colliders[i].position.y - colliders[i].geometry.parameters.height/2;
		var maxY = colliders[i].position.y + colliders[i].geometry.parameters.height/2;

		if (vector.x >= minX && vector.x <= maxX && vector.z >= minZ && vector.z <= maxZ && zombieY >= minY && zombieY <= maxY) {
			isColliding = true;
			isInElevator(colliders[i]);
			break;
		}
	}
	return isColliding;
}

var k = 512;
var numOfPoints = k/3;

function cylinderPointsMaker(angle, direction, dirX, dirZ) {
	var cylinderPoints = [];
	for (var i=0; i<numOfPoints; i++) {
		var newVector = new THREE.Vector3();
		newVector.x = 0.67*Math.cos(angle)*dirX;
		newVector.z = 0.67*Math.sin(angle)*dirZ;
		cylinderPoints.push(newVector);
		var newVectorNeg = newVector.clone();
		(direction == 1) ? newVectorNeg.z = newVectorNeg.z * -1 : newVectorNeg.x = newVectorNeg.x * -1;
		cylinderPoints.push(newVectorNeg);
		angle += direction * Math.PI/k;
	}
	return cylinderPoints;
}

function isCollisionWall(array, currentZombieWrapperPosition, zombieBodyVector, zombieHeadVector, zombieLegsVector, normalizedVector) {
	var isColliding = false;
	for (var i=0; i<array.length; i++) {
		var testingVector = new THREE.Vector3();
		testingVector.addVectors(currentZombieWrapperPosition, array[i]);
		testingVector.add(normalizedVector);
		isColliding = isCollision(testingVector, zombieBodyVector.y);
		if (isColliding) {
			break;
		}
		isColliding = isCollision(testingVector, zombieHeadVector.y);
		if (isColliding) {
			break;
		}
		isColliding = isCollision(testingVector, zombieLegsVector.y);
		if (isColliding) {
			break;
		}
	}
	return isColliding;
}

function moveZombie(direction) {
	if (!moving) {
		rotateAboutPoint(zombieArmLeftCube, new THREE.Vector3(0.67/4+0.33,2+(1-0.67/2)/2,0), new THREE.Vector3(1, 0, 0), -Math.PI/2);
		rotateAboutPoint(zombieArmRightCube, new THREE.Vector3(0.67/4+0.33,2+(1-0.67/2)/2,0), new THREE.Vector3(1, 0, 0), -Math.PI/2);
		moving = true;
	}

	oscilationRotation(zombieLeftLegCube, zombieRightLegCube, new THREE.Vector3(0-0.67/4,1 + (1-0.67/2)/2,0), new THREE.Vector3(1, 0, 0), xSpeed);

	if (!forbiddenMoving) {

	var newZ = Math.cos(zombiePivot.rotation.y)*xSpeed*direction;
	var newX = Math.sin(zombiePivot.rotation.y)*xSpeed*direction;

	var directionVector = new THREE.Vector3(newX,0,newZ);
	var normalizedVectorX = new THREE.Vector3(newX,0,0);
	var normalizedVectorZ = new THREE.Vector3(0,0,newZ);

	var currentZombiePosition = new THREE.Vector3();
	currentZombiePosition.setFromMatrixPosition(zombiePivot.matrixWorld);

	var newZombiePositionX = new THREE.Vector3();
	newZombiePositionX.addVectors(currentZombiePosition, normalizedVectorX);

	var newZombiePositionZ = new THREE.Vector3();
	newZombiePositionZ.addVectors(currentZombiePosition, normalizedVectorZ);

	var currentZombieWrapperPosition = new THREE.Vector3();
	currentZombieWrapperPosition.setFromMatrixPosition(zombieWrapperMesh.matrixWorld);

	var dirX = (newX > 0) ? 1 : -1;
	var dirZ = (newZ > 0) ? 1 : -1;

	var zombieBottomVector = new THREE.Vector3();
	zombieBottomVector.setFromMatrixPosition(zombieBodyCube.matrixWorld);
	zombieBottomVector.y = zombieBottomVector.y - 0.5 - 1;

	var zombieBodyVector = new THREE.Vector3();
	zombieBodyVector.setFromMatrixPosition(zombieBodyCube.matrixWorld);

	var zombieHeadVector = new THREE.Vector3();
	zombieHeadVector.setFromMatrixPosition(zombieBodyCube.matrixWorld);
	zombieHeadVector.y += 0.5 + 0.67/2;

	var zombieLegsVector = new THREE.Vector3();
	zombieLegsVector.setFromMatrixPosition(zombieBodyCube.matrixWorld);
	zombieLegsVector.y -= 1;

	var vectorX = new THREE.Vector3();
	vectorX.x = 0.67*Math.cos(0)*dirX;

	var vectorsX = [];
	vectorsX.push(vectorX);
	var angle = Math.PI/k;
	cylinderPointsMaker(angle, direction, dirX, dirZ).forEach(function (point) {
		vectorsX.push(point);
	});

	var vectorZ = new THREE.Vector3();
	vectorZ.z = 0.67*Math.sin(Math.PI/2)*dirZ;

	var vectorsZ = [];
	vectorsZ.push(vectorZ);
	angle = Math.PI/2 - Math.PI/k;
	cylinderPointsMaker(angle, -1, dirX, dirZ).forEach(function (point) {
		vectorsZ.push(point);
	});

	var isCollisionWallX = isCollisionWall(vectorsX, currentZombieWrapperPosition, zombieBodyVector, zombieHeadVector, zombieLegsVector, normalizedVectorX);
	var isCollisionWallZ = isCollisionWall(vectorsZ, currentZombieWrapperPosition, zombieBodyVector, zombieHeadVector, zombieLegsVector, normalizedVectorZ);

	if (isCollision(newZombiePositionX, zombieBottomVector.y) && 
		!isCollisionWallX) {
		zombiePivot.position.add(normalizedVectorX);
		camera.position.x += newX;
	}
	if (isCollision(newZombiePositionZ, zombieBottomVector.y) && 
		!isCollisionWallZ) {
		zombiePivot.position.add(normalizedVectorZ);
		camera.position.z += newZ;
	}

	checked = false;

	}
}

function zombieAnimation() {
	if (keyboard.pressed("A")) {
		zombiePivot.rotation.y += ySpeed*100 *(Math.PI / 180);
	} else if (keyboard.pressed("D")) {
		zombiePivot.rotation.y += -ySpeed*100 *(Math.PI / 180);	
	}
	if (keyboard.pressed("W")) {
		chickenAnimation();
		moveZombie(1);
	} else if (keyboard.pressed("S")) {
		chickenAnimation();
		moveZombie(-1);
	} else {
		if (moving) {
			rotateAboutPoint(zombieArmLeftCube, new THREE.Vector3(0.67/4+0.33,2+(1-0.67/2)/2,0), new THREE.Vector3(1, 0, 0), Math.PI/2);
			rotateAboutPoint(zombieArmRightCube, new THREE.Vector3(0.67/4+0.33,2+(1-0.67/2)/2,0), new THREE.Vector3(1, 0, 0), Math.PI/2);
			
			while (count != 0)
				oscilationRotation(zombieLeftLegCube, zombieRightLegCube, new THREE.Vector3(0-0.67/4,1 + (1-0.67/2)/2,0), new THREE.Vector3(1, 0, 0), xSpeed);

			moving = false;
		}
	}
}

function moveElevator() {
	if (elevatorCount > 0) {
		zombiePivot.position.y += ySpeed*elevatorDirection;
		elevator.position.y += ySpeed*elevatorDirection;
		elevatorCount -= ySpeed;
		camera.position.y += ySpeed*elevatorDirection;
	} else {
		zombiePivot.position.y = Math.round(zombiePivot.position.y);
		elevator.position.y = Math.round(elevator.position.y) + 0.5/2;
		elevatorMoving = false;
		forbiddenMoving = false;
		elevator.direction = elevator.direction*-1;
	}
}