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
				"lib/chrono.js",
				"Helico.js",
				"Car.js"
			]) ;
			// Loads modules contained in includes and starts main function
			ModulesLoader.loadModules(start) ;
		}
);

// Global vars
this.RC = null;
this.car = null;
this.maxLap = 1;
this.CARx = -220; 
this.CARy = 100; 
this.CARz = 0;
this.CARtheta = 0;

function init() {
	this.maxLap = document.getElementById("maxLapInput").value;
	
	// Create the vehicule
	if (document.getElementById("helico").checked) {
		this.car = new Helico(CARx, CARy, CARz, CARtheta);
		this.car.corp.add(this.RC.camera[0]);
	} else {
		this.car = new Car(this.CARx, this.CARy, this.CARz, this.CARtheta);
		this.car.mesh.add(this.RC.camera[0]);
	}
	this.RC.addToScene(this.car.getRoot());	
}
	
function start(){
	//	---------------------------------------------------------------------------- 			
	//	local vars
	//	----------------------------------------------------------------------------
	
	// Gestion camera
	var modeCamera = 0;
	
	// Comptage des tours
	var currentPlane = 0;
	var previousPlane = 0;
	var numLap = 0;
	var finish = false;
	
	// Affichage du record
	var bestTime = localStorage.getItem("bestTime");
	if (bestTime != null) {
		document.getElementById("bestTime").innerHTML = "PB. "+timeToString(eval(bestTime));
	}
	
	//	keyPressed
	var currentlyPressedKeys = {};
	
	// car speed
	var dt = 0.05; 
	var dx = 1.0;

	//	rendering env
	this.RC =  new ThreeRenderingEnv();
	//	lighting env
	var Lights = new ThreeLightingEnv('rembrandt','neutral','spot',RC,5000);
	//	Loading env
	var Loader = new ThreeLoadingEnv();
	
	// Creates the vehicle (handled by physics)
	var vehicle = new FlyingVehicle({
		position: new THREE.Vector3(this.CARx, this.CARy, this.CARz),
		zAngle : CARtheta+Math.PI/2.0,
	}) ;

	//	Meshes
	Loader.loadMesh('assets','border_Zup_02','obj',	this.RC.scene,'border',	-340,-340,0,'front');
	Loader.loadMesh('assets','ground_Zup_03','obj',	this.RC.scene,'ground',	-340,-340,0,'front');
	Loader.loadMesh('assets','circuit_Zup_02','obj',this.RC.scene,'circuit',	-340,-340,0,'front');
	//Loader.loadMesh('assets','tree_Zup_02','obj',	this.RC.scene,'trees',	-340,-340,0,'double');
	Loader.loadMesh('assets','arrivee_Zup_01','obj',	this.RC.scene,'decors',	-340,-340,0,'front');
		
	//	Skybox
	Loader.loadSkyBox('assets/maps',['px','nx','py','ny','pz','nz'],'jpg', this.RC.scene, 'sky',4000);

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
			modeCamera = (modeCamera+1)%3;
		}
		currentlyPressedKeys[event.keyCode] = false;
	}

	function handleKeys() {
		if (currentlyPressedKeys[67]) // (C) debug
		{
			// debug scene
			this.RC.scene.traverse(function(o){
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
	function  onWindowResize() {this.RC.onWindowResize(window.innerWidth,window.innerHeight);}
	//	---------------------------------------------------------------------------

	function render() {
		requestAnimationFrame(render);
		
		// Deplacement vehicule
		if (!finish) {
			handleKeys();
			moveVehicule();
		}
		
		// Listener de changement de block
		var activePlane = NAV.findActive(NAV.x, NAV.y);
		if (activePlane != currentPlane) {
			currentPlane = activePlane;
			handleChangePlane();
		}
		
		var carPos = new THREE.Vector3(NAV.x, NAV.y, NAV.z);
		renderingCamera(activePlane, carPos);
	};
	
	function moveVehicule() {
		// Vehicle stabilization
		vehicle.goUp(vehicle.weight()/4.0, vehicle.weight()/4.0, vehicle.weight()/4.0, vehicle.weight()/4.0);
		vehicle.stopAngularSpeedsXY();
		vehicle.stabilizeSkid(50);
		vehicle.stabilizeTurn(1000);
		
		var oldPosition = vehicle.position.clone();
		vehicle.update(1.0/60);
		var newPosition = vehicle.position.clone();
		newPosition.sub(oldPosition);
		
		// NAV
		NAV.move(newPosition.x, newPosition.y, 150, 10);
		
		// carPosition
		this.car.setPosition(NAV.x, NAV.y, NAV.z);

		// Updates the vehicle
		this.car.position.x = NAV.x;
		this.car.position.y = NAV.y;
		
		// Updates carFloorSlope
		this.car.setMatrix(NAV.localMatrix(CARx, CARy));

		// Updates carRotationZ
		this.car.setRotationZ(vehicle.angles.z - Math.PI / 2.0);
		
		if (document.getElementById("helico").checked) {
			this.car.speed(vehicle.speed.clone());
			this.car.acceleration(vehicle.acceleration.clone());
			this.car.update(this.RC.scene);
		}
	}
		
	// La voiture change de block (plane)
	function handleChangePlane() {
		if (currentPlane > previousPlane) {
			if (currentPlane == 1) {
				handleNewLap();
			}
			previousPlane = currentPlane % (NAV.planeSet.length - 1);
		}
	}
	
	// La voiture passe la ligne d'arrivée
	function handleNewLap() {
		if (numLap > 0) {
			var chronoTime = chronoGetTime();
			
			// temps au tour
			var node = document.createElement("LI");
			var textnode = document.createTextNode(numLap+". "+timeToString(chronoTime));
			node.appendChild(textnode);
			document.getElementById("lapTime").appendChild(node);
			
			// meilleur temps
			var bestTime = localStorage.getItem("bestTime");
			if (bestTime == null || chronoTime < bestTime) {
				localStorage.setItem("bestTime", chronoTime);
				document.getElementById("bestTime").innerHTML = "PB. "+timeToString(chronoTime);
			}
		} else {
			// premier tour
			document.getElementById("maxLap").innerHTML = " / "+this.maxLap;
			document.getElementById("lap").style.display = "block";
			recordingReplay = true;
			chronoInit();
		}
		
		if (numLap == this.maxLap) {
			//fin
			chronoStop();
			var totalTime = chronoGetTotalTime();
			document.getElementById("separator").style.display = "block";
			document.getElementById("totalTime").innerHTML = timeToString(totalTime);
			finish = true;
		} else {
			chronoRestart();
			numLap++;
			document.getElementById("numLap").innerHTML = numLap;
		}
	}
	
	function timeToString(time){
		time = new Date(time);
		var msec = ("00"+time.getMilliseconds()).slice(-3);
		var sec = ("0"+time.getSeconds()).slice(-2);
		var min = ("0"+time.getMinutes()).slice(-2);
		return min+":"+sec+":"+msec;
	}

	function renderingCamera(activePlane, carPos) {
		// Parametrage des cameras
		if (modeCamera == 0) {
			// mode third person
			this.RC.camera[0].position.x = 0.0;
			this.RC.camera[0].position.z = 10.0;
			this.RC.camera[0].position.y = -25.0;
			this.RC.camera[0].rotation.x = 85.0 * 3.14159 / 180.0;
			this.RC.renderer.render(this.RC.scene, this.RC.camera[0]); 
		} else if (modeCamera == 1) {
			// mode top view
			this.RC.camera[9].rotation.x = 0;
			this.RC.camera[9].position.x = NAV.x;
			this.RC.camera[9].position.y = NAV.y;
			this.RC.camera[9].position.z = NAV.z+50+vehicle.speed.length()*2;
			this.RC.renderer.render(this.RC.scene, this.RC.camera[9]);
		} else {
			// mode cinematique
			switch (activePlane) {
				case "0":
					this.RC.renderer.render(this.RC.scene, this.RC.camera[1]);
					break;
				case "1":
				case "2":
				case "3":
				case "4":
					this.RC.camera[2].up = new THREE.Vector3(0,0,1);
					this.RC.camera[2].lookAt(carPos);
					this.RC.renderer.render(this.RC.scene, this.RC.camera[2]);
					break;
				case "5":
				case "6":
				case "7":
					this.RC.renderer.render(this.RC.scene, this.RC.camera[3]);
					break;
				case "8":
				case "9":
				case "10":
				case "11":
					this.RC.renderer.render(this.RC.scene, this.RC.camera[4]);
					break;
				case "12":
				case "13":
				case "14":
					this.RC.camera[5].up = new THREE.Vector3(0,0,1);
					this.RC.camera[5].lookAt(carPos);
					this.RC.renderer.render(this.RC.scene, this.RC.camera[5]);
					break;
				case "15":
				case "16":
				case "17":
				case "18":
				case "19":
					this.RC.renderer.render(this.RC.scene, this.RC.camera[6]);
					break;
				case "20":
				case "21":
				case "22":
					this.RC.camera[7].up = new THREE.Vector3(0,0,1);
					this.RC.camera[7].lookAt(carPos);
					this.RC.renderer.render(this.RC.scene, this.RC.camera[7]);
					break;
				case "23":
				case "24":
				case "25":
				case "26":
				case "27":
				case "28":
				case "29":
					this.RC.renderer.render(this.RC.scene, this.RC.camera[8]);
					break;
				default:
					this.RC.renderer.render(this.RC.scene, this.RC.camera[0]);
					break;
			}
		}
	}

	render(); 
}
