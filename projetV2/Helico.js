if(typeof(ModulesLoader)=="undefined")
{
	throw "ModulesLoaderV2.js is required to load script FlyingVehicle.js" ; 
}
// Loads dependencies and initializes this module
ModulesLoader.requireModules(['threejs/three.min.js', 'myJS/ThreeLoadingEnv.js']) ;

function Helico(parent) {
	//	Loading env
	var Loader = new ThreeLoadingEnv();
	
	var corp = Loader.load({filename: 'assets/helico/helicoCorp.obj', node: parent, name: 'helico'});
	corp.position.x = 0;
	corp.position.y = 0;
	corp.position.z = 0;
	corp.rotation.y = 0;
	
	var turbineD = Loader.load({filename: 'assets/helico/turbine.obj', node: corp, name: 'turbineD'});
	turbineD.position.x = 8.5;
	turbineD.position.y = -3;
	turbineD.position.z = 4;
	
	var turbineG = Loader.load({filename: 'assets/helico/turbine.obj', node: corp, name: 'turbineG'});
	turbineG.position.x = -8.5;
	turbineG.position.y = -3;
	turbineG.position.z = 4;
	
	var turbineC = Loader.load({filename: 'assets/helico/turbine.obj', node: corp, name: 'turbineC'});
	turbineC.rotation.x = 1.57;
	turbineC.position.x = 0;
	turbineC.position.y = 0;
	turbineC.position.z = 4;
	
	var axeD = Loader.load({filename: 'assets/helico/axe.obj', node: corp, name: 'axeD'});
	axeD.position.x = 8.5;
	axeD.position.y = -2;
	axeD.position.z = 4;
	
	var axeG = Loader.load({filename: 'assets/helico/axe.obj', node: corp, name: 'axeG'});
	axeG.position.x = -8.5;
	axeG.position.y = -2;
	axeG.position.z = 4;
	
	var axeC = Loader.load({filename: 'assets/helico/axe.obj', node: corp, name: 'axeC'});
	axeC.rotation.x = 1.57;
	axeC.position.x = 0;
	axeC.position.y = 0;
	axeC.position.z = 5;
	
	var paleD1 = Loader.load({filename: 'assets/helico/pale2.obj', node: axeD, name: 'paleD1'});
	paleD1.position.x = 0;
	paleD1.position.y = 2;
	paleD1.position.z = 0;
	var paleD2 = Loader.load({filename: 'assets/helico/pale2.obj', node: axeD, name: 'paleD2'});
	paleD2.position.x = 0;
	paleD2.position.y = 2;
	paleD2.position.z = 0;
	paleD2.rotation.y = 2.1;
	var paleD3 = Loader.load({filename: 'assets/helico/pale2.obj', node: axeD, name: 'paleD3'});
	paleD3.position.x = 0;
	paleD3.position.y = 2;
	paleD3.position.z = 0;
	paleD3.rotation.y = -2.1;
	
	var paleG1 = Loader.load({filename: 'assets/helico/pale2.obj', node: axeG, name: 'paleG1'});
	paleG1.position.x = 0;
	paleG1.position.y = 2;
	paleG1.position.z = 0;
	var paleG2 = Loader.load({filename: 'assets/helico/pale2.obj', node: axeG, name: 'paleG2'});
	paleG2.position.x = 0;
	paleG2.position.y = 2;
	paleG2.position.z = 0;
	paleG2.rotation.y = 2.1;
	var paleG3 = Loader.load({filename: 'assets/helico/pale2.obj', node: axeG, name: 'paleG3'});
	paleG3.position.x = 0;
	paleG3.position.y = 2;
	paleG3.position.z = 0;
	paleG3.rotation.y = -2.1;
	
	var paleC1 = Loader.load({filename: 'assets/helico/pale2.obj', node: axeC, name: 'paleC1'});
	paleC1.position.x = 0;
	paleC1.position.y = 2;
	paleC1.position.z = 0;
	var paleC2 = Loader.load({filename: 'assets/helico/pale2.obj', node: axeC, name: 'paleC2'});
	paleC2.position.x = 0;
	paleC2.position.y = 2;
	paleC2.position.z = 0;
	paleC2.rotation.y = 2.1;
	var paleC3 = Loader.load({filename: 'assets/helico/pale2.obj', node: axeC, name: 'paleC3'});
	paleC3.position.x = 0;
	paleC3.position.y = 2;
	paleC3.position.z = 0;
	paleC3.rotation.y = -2.1;
}
