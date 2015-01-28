if(typeof(ModulesLoader)=="undefined")
{
	throw "ModulesLoaderV2.js is required to load script Helico.js" ; 
}
// Loads dependencies and initializes this module
ModulesLoader.requireModules(['threejs/three.min.js', 'myJS/ThreeLoadingEnv.js', 'myJS/ThreeRenderingEnv.js']) ;



function Helico(parent) {
	//	Loading env
	var Loader = new ThreeLoadingEnv();
	
	this.corp = Loader.load({filename: 'assets/helico/helicoCorp.obj', node: parent, name: 'helico'});
	this.corp.position.x = 0;
	this.corp.position.y = 0;
	this.corp.position.z = 0;
	
	this.turbineD = Loader.load({filename: 'assets/helico/turbine.obj', node: this.corp, name: 'turbineD'});
	this.turbineD.position.x = 8.5;
	this.turbineD.position.y = -3;
	this.turbineD.position.z = 4;
	
	this.turbineG = Loader.load({filename: 'assets/helico/turbine.obj', node: this.corp, name: 'turbineG'});
	this.turbineG.position.x = -8.5;
	this.turbineG.position.y = -3;
	this.turbineG.position.z = 4;
	
	this.turbineC = Loader.load({filename: 'assets/helico/turbine.obj', node: this.corp, name: 'turbineC'});
	this.turbineC.rotation.x = 1.57;
	this.turbineC.position.x = 0;
	this.turbineC.position.y = 0;
	this.turbineC.position.z = 4;
	
	this.axeD = Loader.load({filename: 'assets/helico/axe.obj', node: this.corp, name: 'axeD'});
	this.axeD.position.x = 8.5;
	this.axeD.position.y = -2;
	this.axeD.position.z = 4;
	
	this.axeG = Loader.load({filename: 'assets/helico/axe.obj', node: this.corp, name: 'axeG'});
	this.axeG.position.x = -8.5;
	this.axeG.position.y = -2;
	this.axeG.position.z = 4;
	
	this.axeC = Loader.load({filename: 'assets/helico/axe.obj', node: this.corp, name: 'axeC'});
	this.axeC.rotation.x = 1.57;
	this.axeC.position.x = 0;
	this.axeC.position.y = 0;
	this.axeC.position.z = 5;
	
	this.paleD1 = Loader.load({filename: 'assets/helico/pale2.obj', node: this.axeD, name: 'paleD1'});
	this.paleD1.position.x = 0;
	this.paleD1.position.y = 2;
	this.paleD1.position.z = 0;
	this.paleD2 = Loader.load({filename: 'assets/helico/pale2.obj', node: this.axeD, name: 'paleD2'});
	this.paleD2.position.x = 0;
	this.paleD2.position.y = 2;
	this.paleD2.position.z = 0;
	this.paleD2.rotation.y = 2.1;
	this.paleD3 = Loader.load({filename: 'assets/helico/pale2.obj', node: this.axeD, name: 'paleD3'});
	this.paleD3.position.x = 0;
	this.paleD3.position.y = 2;
	this.paleD3.position.z = 0;
	this.paleD3.rotation.y = -2.1;
	
	this.paleG1 = Loader.load({filename: 'assets/helico/pale2.obj', node: this.axeG, name: 'paleG1'});
	this.paleG1.position.x = 0;
	this.paleG1.position.y = 2;
	this.paleG1.position.z = 0;
	this.paleG2 = Loader.load({filename: 'assets/helico/pale2.obj', node: this.axeG, name: 'paleG2'});
	this.paleG2.position.x = 0;
	this.paleG2.position.y = 2;
	this.paleG2.position.z = 0;
	this.paleG2.rotation.y = 2.1;
	this.paleG3 = Loader.load({filename: 'assets/helico/pale2.obj', node: this.axeG, name: 'paleG3'});
	this.paleG3.position.x = 0;
	this.paleG3.position.y = 2;
	this.paleG3.position.z = 0;
	this.paleG3.rotation.y = -2.1;
	
	this.paleC1 = Loader.load({filename: 'assets/helico/pale2.obj', node: this.axeC, name: 'paleC1'});
	this.paleC1.position.x = 0;
	this.paleC1.position.y = 2;
	this.paleC1.position.z = 0;
	this.paleC2 = Loader.load({filename: 'assets/helico/pale2.obj', node: this.axeC, name: 'paleC2'});
	this.paleC2.position.x = 0;
	this.paleC2.position.y = 2;
	this.paleC2.position.z = 0;
	this.paleC2.rotation.y = 2.1;
	this.paleC3 = Loader.load({filename: 'assets/helico/pale2.obj', node: this.axeC, name: 'paleC3'});
	this.paleC3.position.x = 0;
	this.paleC3.position.y = 2;
	this.paleC3.position.z = 0;
	this.paleC3.rotation.y = -2.1;

	this.rotationPerSecond = 0;
	
	this.update = function() {
		this.axeD.rotateOnAxis(new THREE.Vector3(0,1,0), this.rotationPerSecond);
		this.axeG.rotateOnAxis(new THREE.Vector3(0,1,0), this.rotationPerSecond);
		this.axeC.rotateOnAxis(new THREE.Vector3(0,1,0), this.rotationPerSecond);
	};
	
	/* Oriente l'helico suivant l'axe Z et selon un vecteur vitesse */
	this.orientate = function(speedVector) {
		/* Calculer l'angle entre le vecteur Y de l'helico et le vecteur vitesse */
		var angle = Math.atan2(speedVector.x, speedVector.y);
		this.corp.rotation.z = -angle;
	};
	
	this.speed = function(speedVector) {	
		/* Rotation des pales */
		speedVector = new THREE.Vector3(speedVector.x, speedVector.y, 0);
		this.rotationPerSecond = speedVector.length()/300;
	};

	this.acceleration = function(accelVector) {
		/* Rotation des turbines */
		/*
		var angle = Math.atan2(accelVector.x, accelVector.y);
		this.turbineD.rotation.z = -angle;
		this.axeD.rotation.z = -angle;
		this.turbineG.rotation.z = 0.5;
		this.axeG.rotation.y = 0.5;
		*/
		
		/* Acceleration des pales */
		this.rotationPerSecond = this.rotationPerSecond + accelVector.length();
	}
}
