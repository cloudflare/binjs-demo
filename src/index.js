import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import moment from "moment";
import { range } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import bluebird from "bluebird";
import jquery from "jquery";
import * as THREE from "three";

window["$"] = jquery;
window.Promise = bluebird;

function run() {
  console.log("it's", moment().toString());

  range(1, 20).pipe(
    filter(x => x % 2 === 1),
    map(x => x + x)
  ).subscribe(x => console.log(x));

  init();
  animate();
}

ReactDOM.render(<App />, document.getElementById('root'));

window.onload = () => {
  run();
}

var geometry, material, mesh;
var camera, scene, renderer;

function init() {
  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
  camera.position.z = 1;

  scene = new THREE.Scene();

  geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
  material = new THREE.MeshNormalMaterial();

  mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

}

function animate() {
  requestAnimationFrame( animate );

  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;

  renderer.render( scene, camera );
}
