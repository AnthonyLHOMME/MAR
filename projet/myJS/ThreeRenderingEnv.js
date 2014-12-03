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
	this.scene.fog =  new THREE.FogExp2( 0x5876A4, 0.003 );

	// camera
	this.camera = [];
	this.camera.push(new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 5000 )); // camera TPS
	this.camera[0].position.set(0, 12, 25);
	this.camera.push(new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 5000 ));
	this.camera[1].position.set(-400, 20, -130);
	this.camera[1].rotation.y = -2;

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
		for(c in this.camera) {
			c.aspect = w / h;
			c.updateProjectionMatrix();
		}
		this.renderer.setSize( w, h );
	}


}
