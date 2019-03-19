const THREE = require('three');

export default {
  init() {
    // JavaScript to be fired on the home page
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    var loader = new THREE.GLTFLoader();
  },
  finalize() {
    // JavaScript to be fired on the home page, after the init JS
  },
};
