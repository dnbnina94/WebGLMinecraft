function addToColliders(mesh) {
	colliders.push(mesh);
}

function wallFloorMaker(x,y,z,width,depth,height,materials) {
	var currX = x;
	var currY = y;
	var currZ = z;
	var currWidth = width;
	var currHeight = height;
	var currDepth = depth;
	var size;

	if (width == 0)
		size = depth*height;
	if (height == 0)
		size = width*depth;
	if (depth == 0)
		size = width*height;

	for (var i=0; i<size; i++) {
		var geometry = new THREE.BoxGeometry(1,1,1);
		var cube = new THREE.Mesh(geometry,materials);
		cube.position.set(currX,currY,currZ);
		cube.name = currX + "," + currY + "," + currZ;
		if (width == 0) {
			currZ++;
			currDepth--;
			if (currDepth == 0) {
				currDepth = depth;
				currZ = z;
				currY--;
			}
		}
		if (height == 0) {
			currX++;
			currWidth--;
			if (currWidth == 0) {
				currWidth = width;
				currX = x;
				currZ++;
			}
		}
		if (depth == 0) {
			currX++;
			currWidth--;
			if (currWidth == 0) {
				currWidth = width;
				currX = x;
				currY--;
			}
		}
		scene.add(cube);
		addToColliders(cube);
	}
}

function objectRemover(x,y,z,width,depth,height) {
	var currX = x;
	var currY = y;
	var currZ = z;
	var currWidth = width;
	var currHeight = height;
	var currDepth = depth;
	var size;

	if (width == 0)
		size = depth*height;
	if (height == 0)
		size = width*depth;
	if (depth == 0)
		size = width*height;

	for (var i=0; i<size; i++) {
		var objName = currX + "," + currY + "," + currZ;
		scene.remove(scene.getObjectByName(objName));
		if (width == 0) {
			currZ++;
			currDepth--;
			if (currDepth == 0) {
				currDepth = depth;
				currZ = z;
				currY--;
			}
		}
		if (height == 0) {
			currX++;
			currWidth--;
			if (currWidth == 0) {
				currWidth = width;
				currX = x;
				currZ++;
			}
		}
		if (depth == 0) {
			currX++;
			currWidth--;
			if (currWidth == 0) {
				currWidth = width;
				currX = x;
				currY--;
			}
		}
	}
}

function flowerMaker(flowerLeftMaterial, flowerRightMaterial, flowerPivot, x, y, z, yRotation) {
	flowerPivot.position.set(x-0.5/2,y,z);
	scene.add(flowerPivot);

	var flowerLeftMaterial = new THREE.MeshBasicMaterial({
		map: new THREE.TextureLoader().load(flowerLeftMaterial),
		side: THREE.DoubleSide,
		transparent: true,
		depthWrite: false
	});

	var flowerRightMaterial = new THREE.MeshBasicMaterial({
		map: new THREE.TextureLoader().load(flowerRightMaterial),
		side: THREE.DoubleSide,
		transparent: true,
		depthWrite: false
	});

	var flowerGeo = new THREE.PlaneGeometry(0.5,1,1);
	var flowerLeftPlane1 = new THREE.Mesh(flowerGeo, flowerLeftMaterial);
	flowerPivot.add(flowerLeftPlane1);
	flowerLeftPlane1.name = "flowerLeftPlane1";
	//addToColliders(flowerLeftPlane1);

	var flowerRightPlane1 = new THREE.Mesh(flowerGeo, flowerRightMaterial);
	flowerRightPlane1.position.x += 0.5;
	flowerPivot.add(flowerRightPlane1);
	flowerRightPlane1.name = "flowerRightPlane1";
	//addToColliders(flowerRightPlane1);

	var flowerLeftPlane2 = new THREE.Mesh(flowerGeo, flowerLeftMaterial);
	flowerLeftPlane2.position.x += 0.5/2;
	flowerLeftPlane2.position.z += -0.5/2;
	flowerLeftPlane2.rotation.y += -Math.PI/2;
	flowerPivot.add(flowerLeftPlane2);
	flowerLeftPlane2.name = "flowerLeftPlane2";
	//addToColliders(flowerLeftPlane2);

	var flowerRightPlane2 = new THREE.Mesh(flowerGeo, flowerRightMaterial);
	flowerRightPlane2.position.x += 0.5/2;
	flowerRightPlane2.position.z += 0.5/2;
	flowerRightPlane2.rotation.y += -Math.PI/2;
	flowerPivot.add(flowerRightPlane2);
	flowerRightPlane2.name = "flowerRightPlane2";
	//addToColliders(flowerRightPlane2);

	flowerPivot.rotation.y += yRotation;
}

var minHeight = 4;
var maxHeight = 4;
var minVolume = 5;
var maxVolume = 5;

function treeMaker(position) {
	var lastPosition = position;
	var height = Math.floor(Math.random() * (maxHeight - minHeight + 1) ) + minHeight;
	var volume = Math.floor(Math.random() * (maxVolume - minVolume + 1) ) + minVolume;
	volume += volume % 2 == 0 ? 0 : 1;
	for (var i=0; i<height; i++) {
		var treeGeo = new THREE.BoxGeometry(1,1,1);
		var treeMesh = new THREE.Mesh(treeGeo, treeMaterials);
		treeMesh.position.set(lastPosition.x, lastPosition.y, lastPosition.z);
		scene.add(treeMesh);
		addToColliders(treeMesh);
		lastPosition.y += 1;
	}
	for (var i=0; i<volume; i++) {
		for (var j=0; j<volume; j++) {
			for (var k=0; k<volume; k++) {
				if (leafSpawn(i,j,k,volume)) {
					var leafGeo = new THREE.BoxGeometry(1,1,1);
					var leafMesh = new THREE.Mesh(leafGeo, treeLeavesMaterials);
					leafMesh.position.x = lastPosition.x - Math.round(volume / 2) + i;
					leafMesh.position.y = lastPosition.y - Math.round(volume / 2) + j;
					leafMesh.position.z = lastPosition.z - Math.round(volume / 2) + k;
					//if (!(leafMesh.position.x == position.x && leafMesh.position.z == position.z && leafMesh.position.y < (position.y + height)))
						scene.add(leafMesh);
				}
			}
		}
	}
}

function leafSpawn(x,y,z,volume) {
	var a = Math.abs(-Math.round(volume / 2) + x);
    var b = Math.abs(-Math.round(volume / 2) + y);
	var c = Math.abs(-Math.round(volume / 2) + z);
	var distance = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2) + Math.pow(c, 2));
	if (distance < Math.round(volume/2) && Math.floor(Math.random() * (volume + 1)) > distance)
		return true;
	return false;
}

wallFloorMaker(-2,0,-2,5,5,0,dirtMaterials);
wallFloorMaker(-2,-1,-2,5,5,0,stoneMaterial);
wallFloorMaker(-2,-2,-2,5,0,4,stoneMaterial);
wallFloorMaker(2,-2,-1,0,4,4,stoneMaterial);
wallFloorMaker(-2,-6,-2,5,5,0,stoneBlockMaterial);
//wallFloorMaker(1,-6,3,10,5,0,stoneMaterial);
//wallFloorMaker(-5,-6,3,5,5,0,stoneMaterial);
objectRemover(-1,-3,-2,2,0,2);
wallFloorMaker(-1,-3,-2,2,0,2,windowMaterial);
objectRemover(2,-3,0,0,2,2);
wallFloorMaker(2,-3,0,0,2,2,windowMaterial);

var flowerRedPivot = new THREE.Group();
flowerMaker("img/flowerRedLeft.png", "img/flowerRedRight.png", flowerRedPivot, -2, 1, 2, 0);

var flowerYellowPivot = new THREE.Group();
flowerMaker("img/flowerYellowLeft.png", "img/flowerYellowRight.png", flowerYellowPivot, 1, 1, 1, 0);

var flowerWhitePivot = new THREE.Group();
flowerMaker("img/flowerWhiteLeft.png", "img/flowerWhiteRight.png", flowerWhitePivot, -1, 1, -1, 0);

var elevatorGeo = new THREE.BoxGeometry(1,0.5,1);
var elevatorMesh = new THREE.Mesh(elevatorGeo, woodenPlankMaterials);
elevatorMesh.position.set(-3,0+0.5/2,0);
elevatorMesh.name = "elevator";
elevatorMesh.direction = -1;
elevatorMesh.count = 6;
scene.add(elevatorMesh);
addToColliders(elevatorMesh);

var chestGeo = new THREE.BoxGeometry(2,1,1);
var chestMesh = new THREE.Mesh(chestGeo, chestMaterials);
chestMesh.position.set(-0.5,-5,-1);
scene.add(chestMesh);
addToColliders(chestMesh);

var furnaceGeo = new THREE.BoxGeometry(1,1,1);
var furnaceMesh = new THREE.Mesh(furnaceGeo, furnaceMaterials);
furnaceMesh.position.set(1,-5,2);
furnaceMesh.rotation.y -= Math.PI/2;
scene.add(furnaceMesh);
addToColliders(furnaceMesh);

var furnaceMesh1 = furnaceMesh.clone();
furnaceMesh1.position.y += 1;
scene.add(furnaceMesh1);
addToColliders(furnaceMesh1);

var craftingTableGeo = new THREE.BoxGeometry(1,1,1);
var craftingTableMesh = new THREE.Mesh(craftingTableGeo, craftingTableMaterials);
craftingTableMesh.position.set(1,-5,-1);
scene.add(craftingTableMesh);
addToColliders(craftingTableMesh);

var cobwebGeo = new THREE.PlaneGeometry(1,1,1);
var cobwebMesh = new THREE.Mesh(cobwebGeo, cobwebMaterial);
cobwebMesh.position.set(0,0.51/2,0);
cobwebMesh.rotation.x += Math.PI/2;
elevatorMesh.add(cobwebMesh);

treeMaker(new THREE.Vector3(2,1,-2));

wallFloorMaker(-0.5,-6,3,2,5,0,stoneBlockMaterial);
wallFloorMaker(-0.5,-6,8,5,2,0,stoneBlockMaterial);
wallFloorMaker(4.5,-6,6.5,5,5,0,stoneBlockMaterial);
wallFloorMaker(4.5,-2,6.5,5,0,4,stoneMaterial);
wallFloorMaker(8.5,-2,7.5,0,4,4,stoneMaterial);

var bedGeo = new THREE.BoxGeometry(2,0.5,1);
var bedMesh = new THREE.Mesh(bedGeo, bedMaterials);
bedMesh.position.set(7,-5 - (0.5 - bedMesh.geometry.parameters.height/2),8.5);
scene.add(bedMesh);
addToColliders(bedMesh);

var bedMesh2 = bedMesh.clone();
bedMesh2.position.z += 1;
scene.add(bedMesh2);
addToColliders(bedMesh2);

var bookshelfGeo = new THREE.BoxGeometry(1,1,1);
var bookshelfMesh = new THREE.Mesh(bookshelfGeo, bookshelfMaterials);
bookshelfMesh.position.set(7.5,-5,7.5);
scene.add(bookshelfMesh);
addToColliders(bookshelfMesh);

var bookshelfMesh2 = bookshelfMesh.clone();
bookshelfMesh2.position.z += 3;
scene.add(bookshelfMesh2);
addToColliders(bookshelfMesh2);

objectRemover(5.5,-3,6.5,2,0,2);
wallFloorMaker(5.5,-3,6.5,2,0,2,windowMaterial);
wallFloorMaker(4.5,-1,6.5,5,5,0,stoneMaterial);
wallFloorMaker(4.5,0,6.5,5,5,0,dirtMaterials);

var elevatorMesh2 = new THREE.Mesh(elevatorGeo, woodenPlankMaterials);
elevatorMesh2.position.set(6.5,-6+0.5/2,11.5);
elevatorMesh2.name = "elevator";
elevatorMesh2.direction = -1;
elevatorMesh2.count = 6;
scene.add(elevatorMesh2);
addToColliders(elevatorMesh2);

var cobwebMesh2 = new THREE.Mesh(cobwebGeo, cobwebMaterial);
cobwebMesh2.position.set(0,0.51/2,0);
cobwebMesh2.rotation.x += Math.PI/2;
elevatorMesh2.add(cobwebMesh2);

var paintingGeo = new THREE.BoxGeometry(0.01,1,2);
var paintingMesh = new THREE.Mesh(paintingGeo, paintingMaterial);
paintingMesh.position.set(8,-3,9);
scene.add(paintingMesh);
addToColliders(paintingMesh);

wallFloorMaker(4.5,-7,6.5,5,5,0,stoneMaterial);
wallFloorMaker(4.5,-12,6.5,5,5,0,stoneMaterial);
wallFloorMaker(4.5,-8,6.5,5,0,4,stoneMaterial);
wallFloorMaker(8.5,-8,7.5,0,4,4,stoneMaterial);

var railGeo = new THREE.BoxGeometry(1,0.01,1);
var railMesh = new THREE.Mesh(railGeo, railMaterial);
railMesh.position.set(7.5,-11.5,8.5);
railMesh.rotation.y += Math.PI/2;
scene.add(railMesh);

var currRailMesh = railMesh;
for (var i=0; i<3; i++) {
	var railMeshCopy = currRailMesh.clone();
	railMeshCopy.position.x -= 1;
	scene.add(railMeshCopy);
	currRailMesh = railMeshCopy;
}
