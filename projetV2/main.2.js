/**
 *  ThreeJS test file using the ThreeRender class
 */

//Loads all dependencies
requirejs(['ModulesLoaderV2.js'], function()
		{ 
			// Level 0 includes
			ModulesLoader.requireModules(["threejs/three.min.js"]) ;
			ModulesLoader.requireModules([
				"myJS/ThreeRenderingEnv.js", 
				"myJS/ThreeLightingEnv.js",
				"myJS/ThreeLoadingEnv.js",
				"myJS/navZ.js",
				"FlyingVehicle.js",
				"lib/chrono.js"
			]) ;
			// Loads modules contained in includes and starts main function
			ModulesLoader.loadModules(start) ;
		}
) ;

function start(){
	//	----------------------------------------------------------------------------
	//	MAR 2014 - nav test
	//	author(s) : Cozot, R. and Lamarche, F.
	//	date : 11/16/2014
	//	last : 11/25/2014


	//	---------------------------------------------------------------------------- 			
	//	global vars
	//	----------------------------------------------------------------------------
	
	// Memorise le numero du bloc courant
	var currentPlane = 0;

	// Comptage des tours
	var listCheckpointPlane = [1,4,6,13,16,21,26,29];
	var nbCheckpointCrossed = listCheckpointPlane.length;
	var numLap = 0;
	var maxLap = 3;
	
	// Mode cinématique
	var isModeCine = false;
	
	//	keyPressed
	var currentlyPressedKeys = {};
	
	// car Position
	var CARx = -220; 
	var CARy = 100; 
	var CARz = 0;
	var CARtheta = 0 ; 
	// car speed
	var dt = 0.05; 
	var dx = 1.0;

	// Best score (if available)
	var bestTime = localStorage.getItem("bestTime");
	if (bestTime != null) {
		var mins = ("0"+((bestTime/60000>>0)%60)).slice(-2);
		var seconds = ("0"+(bestTime/1000>>0)%60).slice(-2);
		var millisecs = ("00"+bestTime%1000).slice(-3);
		document.getElementById("record").innerHTML = mins + ":" + seconds + ":" + millisecs;
	}

	// Creates the vehicle (handled by physics)
	var vehicle = new FlyingVehicle({
		position: new THREE.Vector3(CARx, CARy, CARz),
		zAngle : CARtheta+Math.PI/2.0,
	}) ;
	
	//	rendering env
	var RC =  new ThreeRenderingEnv();

	//	lighting env
	var Lights = new ThreeLightingEnv('rembrandt','neutral','spot',RC,5000);

	//	Loading env
	var Loader = new ThreeLoadingEnv();

	//	Meshes
	Loader.loadMesh('assets','border_Zup_02','obj',	RC.scene,'border',	-340,-340,0,'front');
	Loader.loadMesh('assets','ground_Zup_03','obj',	RC.scene,'ground',	-340,-340,0,'front');
	Loader.loadMesh('assets','circuit_Zup_02','obj',RC.scene,'circuit',	-340,-340,0,'front');
	//Loader.loadMesh('assets','tree_Zup_02','obj',	RC.scene,'trees',	-340,-340,0,'double');
	Loader.loadMesh('assets','arrivee_Zup_01','obj',	RC.scene,'decors',	-340,-340,0,'front');
		
	//	Car
	// car Translation
	var car0 = new THREE.Object3D(); 
	car0.name = 'car0'; 
	RC.addToScene(car0); 
	// initial POS
	car0.position.x = CARx;
	car0.position.y = CARy;
	car0.position.z = CARz;
	// car Rotation floor slope follow
	var car1 = new THREE.Object3D(); 
	car1.name = 'car1';
	car0.add(car1);
	// car vertical rotation
	var car2 = new THREE.Object3D(); 
	car2.name = 'car2';
	car1.add(car2);
	car2.rotation.z = CARtheta ;
	// the car itself 
	// simple method to load an object
	var car3 = Loader.load({filename: 'assets/car_Zup_01.obj', node: car2, name: 'car3'}) ;
	car3.position.z= +0.25 ;
	// attach the scene camera to car
	car3.add(RC.camera[0]) ;
	RC.camera[0].position.x = 0.0 ;
	RC.camera[0].position.z = 10.0 ;
	RC.camera[0].position.y = -25.0 ;
	RC.camera[0].rotation.x = 85.0*3.14159/180.0 ;
		
	//	Skybox
	Loader.loadSkyBox('assets/maps',['px','nx','py','ny','pz','nz'],'jpg', RC.scene, 'sky',4000);

	//	Planes Set for Navigation 
	// 	z up 
	var NAV = new navPlaneSet(
					new navPlane('p01',	-260, -180,	 -80, 120,	+00,+00,'px')); 	// 01	
	NAV.addPlane(	new navPlane('p02', -260, -180,	 120, 200,	+00,+20,'py')); 	// 02		
	NAV.addPlane(	new navPlane('p03', -260, -240,	 200, 240,	+20,+20,'px')); 	// 03		
	NAV.addPlane(	new navPlane('p04', -240, -160,  200, 260,	+20,+20,'px')); 	// 04		
	NAV.addPlane(	new navPlane('p05', -160,  -80,  200, 260,	+20,+40,'px')); 	// 05		
	NAV.addPlane(	new navPlane('p06',  -80,  -20,  200, 260,	+40,+60,'px')); 	// 06		
	NAV.addPlane(	new navPlane('p07',  -20,  +40,  140, 260,	+60,+60,'px')); 	// 07		
	NAV.addPlane(	new navPlane('p08',    0,  +80,  100, 140,	+60,+60,'px')); 	// 08		
	NAV.addPlane(	new navPlane('p09',   20, +100,   60, 100,	+60,+60,'px')); 	// 09		
	NAV.addPlane(	new navPlane('p10',   40, +100,   40,  60,	+60,+60,'px')); 	// 10		
	NAV.addPlane(	new navPlane('p11',  100,  180,   40, 100,	+40,+60,'nx')); 	// 11		
	NAV.addPlane(	new navPlane('p12',  180,  240,   40,  80,	+40,+40,'px')); 	// 12		
	NAV.addPlane(	new navPlane('p13',  180,  240,    0,  40,	+20,+40,'py')); 	// 13 		
	NAV.addPlane(	new navPlane('p14',  200,  260,  -80,   0,	+00,+20,'py')); 	// 14		
	NAV.addPlane(	new navPlane('p15',  180,  240, -160, -80,	+00,+40,'ny')); 	// 15		
	NAV.addPlane(	new navPlane('p16',  160,  220, -220,-160,	+40,+40,'px')); 	// 16	
	NAV.addPlane(	new navPlane('p17',   80,  160, -240,-180,	+40,+40,'px')); 	// 17	
	NAV.addPlane(	new navPlane('p18',   20,   80, -220,-180,	+40,+40,'px')); 	// 18	
	NAV.addPlane(	new navPlane('p19',   20,   80, -180,-140,	+40,+60,'py')); 	// 19	
	NAV.addPlane(	new navPlane('p20',   20,   80, -140,-100,	+60,+80,'py')); 	// 20	
	NAV.addPlane(	new navPlane('p21',   20,   60, -100, -40,	+80,+80,'px')); 	// 21		
	NAV.addPlane(	new navPlane('p22',  -80,   20, -100, -40,	+80,+80,'px')); 	// 22		
	NAV.addPlane(	new navPlane('p23', -140,  -80, -100, -40,	+80,+80,'px')); 	// 23		
	NAV.addPlane(	new navPlane('p24', -140,  -80, -140,-100,	+60,+80,'py')); 	// 24		
	NAV.addPlane(	new navPlane('p25', -140,  -80, -200,-140,	+40,+60,'py')); 	// 25		
	NAV.addPlane(	new navPlane('p26', -100,  -80, -240,-200,	+40,+40,'px')); 	// 26		
	NAV.addPlane(	new navPlane('p27', -220, -100, -260,-200,	+40,+40,'px')); 	// 27	
	NAV.addPlane(	new navPlane('p28', -240, -220, -240,-200,	+40,+40,'px')); 	// 28	
	NAV.addPlane(	new navPlane('p29', -240, -180, -200,-140,	+20,+40,'ny')); 	// 29	
	NAV.addPlane(	new navPlane('p30', -240, -180, -140, -80,	+0,+20,'ny')); 		// 30			
	NAV.setPos(CARx,CARy,CARz); 
	NAV.initActive();
	
	// DEBUG
	//NAV.debug();
	//var navMesh = NAV.toMesh();
	//RC.addToScene(navMesh);
	
	//	---------------------------------------------------------------------------
	//	event listener
	//	---------------------------------------------------------------------------
	//	resize window
	window.addEventListener( 'resize', onWindowResize, false );
	
	//	keyboard callbacks 
	document.onkeydown = handleKeyDown;
	document.onkeyup = handleKeyUp;
	//	---------------------------------------------------------------------------


	//	---------------------------------------------------------------------------
	//	callback functions
	//	---------------------------------------------------------------------------
	function handleKeyDown(event) { currentlyPressedKeys[event.keyCode] = true;}
	function handleKeyUp(event) {
		if (currentlyPressedKeys[80]) {
			// (P) Change camera
			isModeCine = !isModeCine;
		}
		currentlyPressedKeys[event.keyCode] = false;
	}

	function handleKeys() {
		if (currentlyPressedKeys[67]) // (C) debug
		{
			// debug scene
			RC.scene.traverse(function(o){
				console.log('object:'+o.name+'>'+o.id+'::'+o.type);
			});
		}				
		if (currentlyPressedKeys[68]) // (D) Right
		{
			vehicle.turnRight(1000) ;
		}
		if (currentlyPressedKeys[81]) // (Q) Left 
		{		
			vehicle.turnLeft(1000) ;
		}
		if (currentlyPressedKeys[90]) // (Z) Up
		{
			vehicle.goFront(1200, 1200) ;
		}
		if (currentlyPressedKeys[83]) // (S) Down 
		{
			vehicle.brake(100) ;
		}
	}

	//	window resize
	function  onWindowResize() {RC.onWindowResize(window.innerWidth,window.innerHeight);}
	//	---------------------------------------------------------------------------

	function render() {
		requestAnimationFrame( render );
		handleKeys();
		
		// Vehicle stabilization 
		vehicle.stabilizeSkid(50) ; 
		vehicle.stabilizeTurn(1000) ;
		var oldPosition = vehicle.position.clone() ;
		vehicle.update(1.0/60) ;
		var newPosition = vehicle.position.clone() ;
		newPosition.sub(oldPosition) ;
		// NAV
		NAV.move(newPosition.x, newPosition.y, 150,10) ;
		
		// Updates the vehicle
		vehicle.position.x = NAV.x ;
		vehicle.position.y = NAV.Y ;
		// Updates car0
		car0.position.set(NAV.x, NAV.y, NAV.z) ;
		// Updates car1
		car1.matrixAutoUpdate = false;		
		car1.matrix.copy(NAV.localMatrix(CARx,CARy));
		// Updates car2
		car2.rotation.z = vehicle.angles.z-Math.PI/2.0 ;
		
		// Listener de changement de block
		var activePlane = NAV.findActive(NAV.x, NAV.y);
		if (activePlane != currentPlane) {
			currentPlane = activePlane;
			handleChangePlane(activePlane);
		}
		
		var carPos = new THREE.Vector3(NAV.x, NAV.y, NAV.z);
		renderingCamera(activePlane, carPos);
		
		// DEBUG
		//document.getElementById("block").innerHTML = activePlane;
	};
	
	// La voiture change de block (plane)
	function handleChangePlane(plane) {
		if (plane == 1 && nbCheckpointCrossed == listCheckpointPlane.length) {
			nbCheckpointCrossed = 0;
			handleNewLap();
		}
		if (plane == listCheckpointPlane[nbCheckpointCrossed]) {
			nbCheckpointCrossed++;
		}
	}
	
	// La voiture passe la ligne d'arrivée
	function handleNewLap() {
		if (numLap > 0) {
			chronoStringTime = chronoGetStringTime();
			chronoTime = chronoGetTime();
			var node = document.createElement("LI");
			var textnode = document.createTextNode(numLap+". "+chronoStringTime);
			node.appendChild(textnode);
			document.getElementById("lapTime").appendChild(node);
			var bestTime = localStorage.getItem("bestTime");
			if (bestTime == null || chronoTime < bestTime) {
				localStorage.setItem("bestTime", chronoTime);
				var mins = ("0"+((chronoTime/60000>>0)%60)).slice(-2);
				var seconds = ("0"+(chronoTime/1000>>0)%60).slice(-2);
				var millisecs = ("00"+chronoTime%1000).slice(-3);
				document.getElementById("record").innerHTML = mins + ":" + seconds + ":" + millisecs;
			}

		}
		chronoRestart();
		numLap++;
		document.getElementById("lap").innerHTML = numLap+" / "+maxLap;
	}

	function renderingCamera(activePlane, carPos) {
		// Parametrage des cameras
		if (isModeCine) {
			// mode cinematique
			switch (activePlane) {
				case "0":
					RC.renderer.render(RC.scene, RC.camera[1]);
					break;
				case "1":
				case "2":
				case "3":
				case "4":
					RC.camera[2].up = new THREE.Vector3(0,0,1);
					RC.camera[2].lookAt(carPos);
					RC.renderer.render(RC.scene, RC.camera[2]);
					break;
				case "5":
				case "6":
				case "7":
					RC.renderer.render(RC.scene, RC.camera[3]);
					break;
				case "8":
				case "9":
				case "10":
				case "11":
					RC.renderer.render(RC.scene, RC.camera[4]);
					break;
				case "12":
				case "13":
				case "14":
					RC.camera[5].up = new THREE.Vector3(0,0,1);
					RC.camera[5].lookAt(carPos);
					RC.renderer.render(RC.scene, RC.camera[5]);
					break;
				case "15":
				case "16":
				case "17":
				case "18":
				case "19":
					RC.renderer.render(RC.scene, RC.camera[6]);
					break;
				case "20":
				case "21":
				case "22":
					RC.camera[7].up = new THREE.Vector3(0,0,1);
					RC.camera[7].lookAt(carPos);
					RC.renderer.render(RC.scene, RC.camera[7]);
					break;
				case "23":
				case "24":
				case "25":
				case "26":
				case "27":
				case "28":
				case "29":
					RC.renderer.render(RC.scene, RC.camera[8]);
					break;
				default:
					RC.renderer.render(RC.scene, RC.camera[0]);
					break;
			}
		} else {
			// mode third person
			RC.renderer.render(RC.scene, RC.camera[0]); 
		}
	}

	render(); 
}
