var zombiePivot = new THREE.Group();
scene.add(zombiePivot);
scene.updateMatrixWorld(true);

var zombieHeadGeo = new THREE.BoxGeometry(0.67, 0.67, 0.67);
var zombieHeadCube = new THREE.Mesh(zombieHeadGeo,zombieMaterials);
zombieHeadCube.position.set(0,3-(1-0.67)/2,0);
zombiePivot.add(zombieHeadCube);

var zombieBodyGeo = new THREE.BoxGeometry(0.67, 1, 0.67/2);
var zombieBodyCube = new THREE.Mesh(zombieBodyGeo,zombieBodyMaterials);
zombieBodyCube.position.set(0,2,0);
zombiePivot.add(zombieBodyCube);

var zombieLeftLegGeo = new THREE.BoxGeometry(0.67/2, 1, 0.67/2);
var zombieLeftLegCube = new THREE.Mesh(zombieLeftLegGeo, zombieLeftLegMaterials);
zombieLeftLegCube.position.set(0-0.67/4,1,0);
zombiePivot.add(zombieLeftLegCube);

var zombieRightLegGeo = new THREE.BoxGeometry(0.67/2, 1, 0.67/2);
var zombieRightLegCube = new THREE.Mesh(zombieRightLegGeo, zombieLeftLegMaterials);
zombieRightLegCube.position.set(0+0.67/4,1,0);
zombiePivot.add(zombieRightLegCube);

var zombieArmLeftGeo = new THREE.BoxGeometry(0.67/2, 1, 0.67/2);
var zombieArmLeftCube = new THREE.Mesh(zombieArmLeftGeo, zombieArmMaterials);
zombieArmLeftCube.position.set(-0.67/4-0.33,2,0);
zombiePivot.add(zombieArmLeftCube);

var zombieArmRightGeo = new THREE.BoxGeometry(0.67/2, 1, 0.67/2);
var zombieArmRightCube = new THREE.Mesh(zombieArmRightGeo, zombieArmRightMaterials);
zombieArmRightCube.position.set(0.67/4+0.33,2,0);
zombiePivot.add(zombieArmRightCube);

var zombieWrapperGeo = new THREE.CylinderGeometry( 0.67, 0.67, 2.67, 20 );
var zombieWrapperMesh = new THREE.Mesh(zombieWrapperGeo, new THREE.MeshBasicMaterial({ visible: false }));
zombieWrapperMesh.position.set(0,0.5+2.67/2,0);
zombiePivot.add(zombieWrapperMesh);

var light = new THREE.PointLight( 0xff0000, 1, 100 );
light.position.set( 2,2,2 );
scene.add( light );

//zombiePivot.position.y -= 12;
//zombiePivot.position.x += 5;
//zombiePivot.position.z += 7;