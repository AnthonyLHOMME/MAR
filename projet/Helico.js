if(typeof(ModulesLoader)=="undefined")
{
	throw "ModulesLoaderV2.js is required to load script Helico.js" ; 
}
// Loads dependencies and initializes this module
ModulesLoader.requireModules([
	"threejs/three.min.js",
	"myJS/ThreeLoadingEnv.js",
	"myJS/ThreeRenderingEnv.js",
	"MathExt.js",
	"Interpolators.js",
	"ParticleSystem.js"
]) ;


var Helico = function (x, y, z, theta) {
	//	Loading env
	var Loader = new ThreeLoadingEnv();
	
	this.position = new THREE.Object3D();
	this.position.position.x = x;
	this.position.position.y = y;
	this.position.position.z = z;
	
	this.floorSlope = new THREE.Object3D();
	this.floorSlope.matrixAutoUpdate = false;
	this.position.add(this.floorSlope);
	
	this.corp = Loader.load({filename: 'assets/helico/helicoCorp.obj', node: this.floorSlope, name: 'helico'});
	this.corp.position.x = 0;
	this.corp.position.y = 0;
	this.corp.position.z = 0;
	this.corp.rotation.z = theta;
	
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
	
	// Particule
	this.particleLeft = createParticleSystem();
	this.particleLeft.particleSystem.position.x = -8.6;
	this.particleLeft.particleSystem.position.y = -5;
	this.particleLeft.particleSystem.position.z = 3.9;
	this.particleLeft.particleSystem.rotation.x = 1.57;
	this.corp.add(this.particleLeft.particleSystem);
		
	this.particleRight = createParticleSystem();
	this.particleRight.particleSystem.position.x = 8.6;
	this.particleRight.particleSystem.position.y = -5;
	this.particleRight.particleSystem.position.z = 3.9;
	this.particleRight.particleSystem.rotation.x = 1.57;
	this.corp.add(this.particleRight.particleSystem);
	
	function createParticleSystem() {
		var particleEngine = new ParticleSystem.Engine_Class({
			particlesCount : 500,
			textureFile : "assets/particles/particle.png",
			blendingMode : THREE.AdditiveBlending
		});
		particleEngine.addModifier(new ParticleSystem.LifeTimeModifier_Class());
		//particleEngine.addModifier(new ParticleSystem.ForceModifier_Weight_Class());
		particleEngine.addModifier(new ParticleSystem.OpacityModifier_TimeToDeath_Class(new Interpolators.Linear_Class(1, 0)));
		particleEngine.addModifier(new ParticleSystem.ColorModifier_TimeToDeath_Class(new THREE.Color("#FFF"), new THREE.Color("#F00")));
		particleEngine.addModifier(new ParticleSystem.PositionModifier_EulerItegration_Class());
		
		var particleEmiter = new ParticleSystem.ConeEmitter_Class({
			cone: {
				center: new THREE.Vector3(0,0,0),
				height: new THREE.Vector3(0,0,1),
				radius: 0.3,
				flow: 	500
			},
			particle: {
				speed: 	  new MathExt.Interval_Class(5, 10),
				mass: 	  new MathExt.Interval_Class(0.1, 0.3),
				size:	  new MathExt.Interval_Class(0.1, 0.6),
				lifeTime: new MathExt.Interval_Class(1.0, 2.0)
			}
		});
		particleEngine.addEmitter(particleEmiter);
		
		return particleEngine;
	}
}

Helico.prototype.getRoot = function() {
	return this.position;
};

Helico.prototype.setPosition = function (x, y, z) {
	this.position.position.set(x, y, z);
};

Helico.prototype.setMatrix = function (matrix) {
	this.floorSlope.matrix.copy(matrix);
};

Helico.prototype.setRotationZ = function (angle) {
	this.corp.rotation.z = angle;
};


Helico.prototype.update = function(scene) {
	this.axeD.rotateOnAxis(new THREE.Vector3(0,1,0), this.rotationPerSecond);
	this.axeG.rotateOnAxis(new THREE.Vector3(0,1,0), this.rotationPerSecond);
	this.axeC.rotateOnAxis(new THREE.Vector3(0,1,0), this.rotationPerSecond);
	
	this.particleLeft.animate(0.05,scene);
	this.particleRight.animate(0.05,scene);
};

Helico.prototype.speed = function(speedVector) {	
	/* Rotation des pales */
	speedVector = new THREE.Vector3(speedVector.x, speedVector.y, 0);
	this.rotationPerSecond = speedVector.length()/300;
};

Helico.prototype.acceleration = function(accelVector) {
	/* Acceleration des pales */
	this.rotationPerSecond = this.rotationPerSecond + accelVector.length();
	
	/* Rotation des turbines */
	//var angle = Math.atan2(accelVector.x, accelVector.y);
	//this.turbineD.rotation.z = -this.corp.rotation.z;
	//this.turbineG.rotation.z = -this.corp.rotation.z;
}
