var textureLoader = new THREE.TextureLoader();

var dirtMaterials = [
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/dirtSide.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/dirtSide.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/dirtUp.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/dirtDown.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/dirtSide.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/dirtSide.png" ) } )
];

var stoneMaterial = new THREE.MeshBasicMaterial({ map: textureLoader.load("img/stone_texture.jpg") });

var woodenPlankMaterials = [
	new THREE.MeshBasicMaterial( {map: textureLoader.load( "img/woodPlankSide.jpg" )} ),
	new THREE.MeshBasicMaterial( {map: textureLoader.load( "img/woodPlankSide.jpg" )} ),
	new THREE.MeshBasicMaterial( {map: textureLoader.load( "img/woodPlank.jpg" )} ),
	new THREE.MeshBasicMaterial( {map: textureLoader.load( "img/woodPlank.jpg" )} ),
	new THREE.MeshBasicMaterial( {map: textureLoader.load( "img/woodPlankSide.jpg" )} ),
	new THREE.MeshBasicMaterial( {map: textureLoader.load( "img/woodPlankSide.jpg" )} )
];

var woodenPlankMaterial1 = new THREE.MeshBasicMaterial({ map: textureLoader.load("img/woodPlankSide.jpg"), transparent: true, depthWrite: false });

var windowMaterial = new THREE.MeshBasicMaterial({ map: textureLoader.load("img/glass.png"), transparent: true, depthWrite: false });

var zombieMaterials = [
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/zonbieRight.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/zonbieLeft.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/zonbieUp.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/zonbieDown.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/zonbieFront.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/zonbieBack.png" ) } )
];

var zombieBodyMaterials = [
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/zonbieBodyRight.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/zonbieBodyLeft.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/zonbieBodyUp.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/zonbieBodyDown.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/zonbieBodyFront.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/zonbieBodyBack.png" ) } )
];

var zombieLeftLegMaterials = [
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/zonbieLeftLegRight.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/zonbieLeftLegLeft.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/zonbieLeftLegUp.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/zonbieLeftLegDown.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/zonbieLeftLegFront.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/zonbieLeftLegBack.png" ) } )
];

var zombieArmMaterials = [
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/zonbieArmRight.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/zonbieArmLeft.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/zonbieArmUp.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/zonbieArmDown.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/zonbieArmFront.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/zonbieArmBack.png" ) } )
];

var zombieArmRightMaterials = [
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/zonbieArmRightRight.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/zonbieArmRightLeft.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/zonbieArmRightUp.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/zonbieArmRightDown.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/zonbieArmRightFront.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/zonbieArmRightBack.png" ) } )
];

var chestMaterials = [
	new THREE.MeshBasicMaterial( { map: textureLoader.load("img/chestRight.png") } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load("img/chestLeft.png") } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load("img/chestUp.png") } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load("img/chestDown.png") } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load("img/chestFront.png") } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load("img/chestBack.png") } )
];

var furnaceMaterials = [
	new THREE.MeshBasicMaterial( { map: textureLoader.load("img/furnaceSide.jpg") } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load("img/furnaceSide.jpg") } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load("img/furnaceUp.jpg") } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load("img/furnaceDown.jpg") } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load("img/furnaceFront.jpg") } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load("img/furnaceSide.jpg") } )
];

var craftingTableMaterials = [
	new THREE.MeshBasicMaterial( { map: textureLoader.load("img/craftingTableSide.png") } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load("img/craftingTableSide.png") } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load("img/craftingTableUp.png") } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load("img/craftingTableDown.png") } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load("img/craftingTableFront.png") } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load("img/craftingTableFront.png") } ),
];

var cobwebMaterial = new THREE.MeshBasicMaterial({ map: textureLoader.load("img/cobweb.png"), transparent: true, depthWrite: false, side: THREE.DoubleSide });

var cherryBlossomLeavesMaterial = new THREE.MeshBasicMaterial({ map: textureLoader.load("img/cherryBlossomLeaves.png"), transparent: true, depthWrite: false, side: THREE.DoubleSide });
var treeLeavesMaterials = new THREE.MeshBasicMaterial({ map: textureLoader.load("img/treeLeaves.gif"), transparent: true, depthWrite: false, side: THREE.DoubleSide });

var treeMaterials = [
	new THREE.MeshBasicMaterial( { map: textureLoader.load("img/treeSide.jpg") } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load("img/treeSide.jpg") } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load("img/treeUp.jpg") } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load("img/treeUp.jpg") } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load("img/treeSide.jpg") } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load("img/treeSide.jpg") } ),
];

var chickenBodyMaterials = [
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/chicken/bodyBack.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/chicken/bodyFront.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/chicken/bodyUp.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/chicken/bodyDown.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/chicken/bodySide.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/chicken/bodySide.png" ) } )
];

var chickenWingMaterials = [
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/chicken/wingFront.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/chicken/wingFront.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/chicken/wingUp.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/chicken/wingUp.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/chicken/wingSide.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/chicken/wingSide.png" ) } )
];

var chickenLegMaterial = new THREE.MeshBasicMaterial({ color: 0xDBC766, side: THREE.DoubleSide });

var chickenHeadMaterials = [
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/chicken/headBack1.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/chicken/headFront.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/chicken/headUp.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/chicken/headUp.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/chicken/headSide.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/chicken/headSide.png" ) } )
];

var chickenBeakMaterials = [
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/chicken/beakDown.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/chicken/beakFront.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/chicken/beakUp.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/chicken/beakDown.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/chicken/beakSide.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/chicken/beakSide.png" ) } )
];

var chickenWattleMaterial = new THREE.MeshBasicMaterial({ color: 0xB00000, side: THREE.DoubleSide });

var stoneBlockMaterial = new THREE.MeshBasicMaterial({ map: textureLoader.load( "img/stoneBlock.png" ) });

var bedMaterials = [
	new THREE.MeshBasicMaterial( { map: textureLoader.load("img/bedBack.png"), transparent: true } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load("img/bedFront.png"), transparent: true } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load("img/bedUp.png"), transparent: true } ),
	new THREE.MeshBasicMaterial( { visible: false } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load("img/bedLeft.png"), transparent: true } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load("img/bedRight.png"), transparent: true } )
];

var bookshelfMaterials = [
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/bookshelfSide.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/bookshelfSide.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/bookshelfUp.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/bookshelfUp.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/bookshelfSide.png" ) } ),
	new THREE.MeshBasicMaterial( { map: textureLoader.load( "img/bookshelfSide.png" ) } )
];

var paintingMaterial = new THREE.MeshBasicMaterial({ map: textureLoader.load( "img/painting.jpg" ), side: THREE.DoubleSide });
var railMaterial = new THREE.MeshBasicMaterial({ map: textureLoader.load( "img/rail.png" ), transparent: true });

