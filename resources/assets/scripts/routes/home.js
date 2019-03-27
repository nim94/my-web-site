import * as THREE from 'three'
import GLTFLoader from 'three-gltf-loader'
import { url } from '../config' 

export default {
  init() {
    // JavaScript to be fired on the home page
    
    //scene
    let small_circle, circle, logotype;
    let scene = new THREE.Scene();
    let renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0x282d3c);
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    //camera
    let camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
    const mouse = new THREE.Vector2();
    const targetSmallCircle = new THREE.Vector2();
    const targetCamera = new THREE.Vector2();
    const targetCircle = new THREE.Vector2();
    const windowHalf = new THREE.Vector2( window.innerWidth / 2, window.innerHeight / 2 );
    
    //meshes
    let loader = new GLTFLoader();
    let material = new THREE.MeshLambertMaterial({ color: 0x282d3c });
    let lamp = new THREE.HemisphereLight( 0x282d3c, 0x080820, 1 );
    let directionalLamp = new THREE.DirectionalLight({ color: 0x282d3c, position: (-20,-20,-10) });
    directionalLamp.target.z = -20;
    scene.add( camera, lamp, directionalLamp );
    
    //events
    const onMouseMove = event => {
      mouse.x = ( event.clientX - windowHalf.x );
      mouse.y = ( event.clientY - windowHalf.y );
    }
    const onTouchMove = event => {
      mouse.x = ( event.touches[0].clientX - windowHalf.x );
      mouse.y = ( event.touches[0].clientY - windowHalf.y );
    }
    const onResize = () => {
      var factor = 1; // percentage of the screen
      var w = window.innerWidth * factor;
      var h = window.innerHeight * factor;
      windowHalf.set( w / 2, h / 2 );
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();  
      animate();
    }
    document.addEventListener( 'mousemove', onMouseMove, false );
    document.addEventListener( 'touchmove', onTouchMove, false );
    window.addEventListener( 'resize', onResize, false );
    document.body.appendChild(renderer.domElement);
    
    //render
    const animate = () => {
      targetSmallCircle.x = ( 1 - mouse.x ) * 0.005;
      targetSmallCircle.y = ( 1 - mouse.y ) * 0.005;
      targetCamera.x = ( 1 - mouse.x ) * 0.000025;
      targetCamera.y = ( 1 - mouse.y ) * 0.000025;
      targetCircle.x = ( 1 - mouse.x ) * 0.002;
      targetCircle.y = ( 1 - mouse.y ) * 0.002;
      camera.rotation.x += 0.1 * ( targetCamera.y - camera.rotation.x );
      camera.rotation.y += 0.1 * ( targetCamera.x - camera.rotation.y );
      small_circle.rotation.x += 0.01 * ( targetSmallCircle.y - small_circle.rotation.x );
      small_circle.rotation.y += 0.01 * ( targetSmallCircle.x - small_circle.rotation.y );
      circle.rotation.x += 0.01 * ( targetCircle.y - circle.rotation.x );
      circle.rotation.y += 0.01 * ( targetCircle.x - circle.rotation.y );
      requestAnimationFrame( animate );
      renderer.render( scene, camera );
    }

    //loader
    loader.load(
      `${url}dist/images/3dLogo.gltf`,
      ( gltf ) => {
          // called when the resource is loaded
          small_circle = gltf.scene.children[2];
          circle = gltf.scene.children[3];
          logotype = gltf.scene.children[4]
          small_circle.material = circle.material = logotype.material = material;
          scene.add( small_circle, circle, logotype );
          small_circle.position.z = -20;
          circle.position.z = -20;
          logotype.position.z = -20;
          console.log(logotype.material);
          animate();
      },
      ( xhr ) => {
          // called while loading is progressing
          console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded` );
      },
      ( error ) => {
          // called when loading has errors
          console.error( 'An error happened', error );
      }
    );

  },
  finalize() {
    // JavaScript to be fired on the home page, after the init JS

    //header home style
    const margin = $('html').attr('margin');
    $('header').css({ 
      'position': 'absolute', 
      'left': 0, 
      'top': margin, 
      'background-color': 'transparent', 
    });
  },
};
