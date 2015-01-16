// ThreeRenderingEnv
//----------------------------------------------------------------------------------------
// RC
//----------------------------------------------------------------------------------------
// constructor
function ThreeRenderingEnv(){
	// attributes
	// --------------------------------------

	// scene
	this.scene = new THREE.Scene() ;
	this.scene.name = 'root' ;
	//this.scene.fog =  new THREE.FogExp2( 0x5876A4, 0.003 );

	// camera
	this.camera = [];
	this.camera.push(new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 5000)); // camera TPS
	this.camera.push(new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 5000));
	this.camera[1].position.set(-260, 140, 5);
	this.camera[1].rotation.x = 1.57;
	this.camera[1].rotation.y = -2.57;
	this.camera.push(new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 5000));
	this.camera[2].position.set(-175, 195, 40);
	this.camera.push(new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 5000));
	this.camera[3].position.set(50, 270, 90);
	this.camera[3].rotation.x = 1.8;
	this.camera[3].rotation.y = 2.5;
	this.camera.push(new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 5000));
	this.camera[4].position.set(-20, 100, 100);
	this.camera[4].rotation.x = 2;
	this.camera[4].rotation.y = -1.8;
	this.camera[4].rotation.z = 0.5;
	this.camera.push(new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 5000));
	this.camera[5].position.set(260, -80, 5);
	this.camera.push(new THREE.PerspectiveCamera(100, window.innerWidth/window.innerHeight, 0.1, 5000));
	this.camera[6].position.set(120, -250, 50);
	this.camera[6].rotation.x = 1.57;
	this.camera.push(new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 5000));
	this.camera[7].position.set(-90, -40, 100);
	this.camera.push(new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 5000));
	this.camera[8].position.set(-155, -280, 90);
	this.camera[8].rotation.x = 1;
	
	// renderer
	this.renderer = new THREE.WebGLRenderer(); 
	// default background color
	this.renderer.setClearColor(0x404080, 1);
	this.renderer.shadowMapEnabled = true;
	this.renderer.shadowMapType = THREE.PCFShadowMap;
	// render size
	this.renderer.setSize( window.innerWidth, window.innerHeight ); 


	// init
	// --------------------------------------
	// add a canvas to display the scene
	document.body.appendChild( this.renderer.domElement ); 


	// methods
	// --------------------------------------
	// add
	this.addToScene = function(obj3d){this.scene.add(obj3d);}
	
	// onWindoResize
	this.onWindowResize = function(w,h) {
		for(c of this.camera) {
			c.aspect = w / h;
			c.updateProjectionMatrix();
		}
		this.renderer.setSize( w, h );
	}
}
