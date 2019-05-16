import * as THREE from 'three'
import GLTFLoader from 'three-gltf-loader'
import { url } from '../config'
import consoleText from '../consoleTextEffect';

export default {
  init() {
    // JavaScript to be fired on the home page
    
    //scene
    let logo;
    let scene = new THREE.Scene();
    let renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0x282d3c);
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    //camera
    let camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 0.1, 1000 );
    const mouse = new THREE.Vector2();
    const targetLogo = new THREE.Vector2();
    const targetCamera = new THREE.Vector2();
    const windowHalf = new THREE.Vector2( window.innerWidth / 2, window.innerHeight / 2 );
    
    //meshes
    let loader = new GLTFLoader();
    let material = new THREE.MeshLambertMaterial({ color: 0x282d3c });
    let lamp = new THREE.HemisphereLight( 0x282d3c, 0x080820, 1 );
    let directionalLamp = new THREE.DirectionalLight({ color: 0x2ACCFF });
    directionalLamp.position.x += 300 ;
    directionalLamp.position.y += 90;
    directionalLamp.position.z += 50;
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
    $('main').append(renderer.domElement);
    
    //render
    const animate = () => {
      targetCamera.x = ( 1 - mouse.x ) * 0.00005;
      targetCamera.y = ( 1 - mouse.y ) * 0.00005;
      targetLogo.x = ( 1 - mouse.x ) * 0.005;
      targetLogo.y = ( 1 - mouse.y ) * 0.005;
      camera.rotation.x += 0.1 * ( targetCamera.y - camera.rotation.x );
      camera.rotation.y += 0.1 * ( targetCamera.x - camera.rotation.y );
      logo.rotation.x += 0.0025 * ( targetLogo.y - logo.rotation.x );
      logo.rotation.y += 0.0025 * ( targetLogo.x - logo.rotation.y );
      if(window.innerWidth >= 768) camera.fov = 45; 
      requestAnimationFrame( animate );
      renderer.render( scene, camera );
    }

    //loader
    loader.load(
      `${url}dist/images/3dLogo.gltf`,
      ( gltf ) => {
          // called when the resource is loaded
          logo = gltf.scene.children[2];
          logo.material = material;
          scene.add( logo );
          logo.position.z = -20;
          logo.position.y += 1;
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

    // terminal text effect
    consoleText(['Nicola Morelli', 'Creative web developer'], 'text', ['#f0ede5']);
    
  },
};
