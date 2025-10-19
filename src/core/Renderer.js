import * as THREE from 'three';

export class Renderer {
  constructor() {
    this.instance = new THREE.WebGLRenderer({ antialias: true });
    this.instance.setSize(window.innerWidth, window.innerHeight);
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    
    document.querySelector('#app').appendChild(this.instance.domElement);
  }

  resize() {
    this.instance.setSize(window.innerWidth, window.innerHeight);
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  render(scene, camera) {
    this.instance.render(scene, camera);
  }
}
