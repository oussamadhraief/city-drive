import * as THREE from 'three';

export class Scene {
  constructor() {
    this.instance = new THREE.Scene();
    this.instance.background = new THREE.Color(0xd4b3e8);
    this.instance.fog = new THREE.Fog(0xd4b3e8, 100, 300);
    
    this.setupLights();
  }

  setupLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    this.instance.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xfff8e1, 1.5);
    directionalLight.position.set(30, 50, 40);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.left = -100;
    directionalLight.shadow.camera.right = 100;
    directionalLight.shadow.camera.top = 100;
    directionalLight.shadow.camera.bottom = -100;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.bias = -0.0001;
    this.instance.add(directionalLight);

    const hemisphereLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 0.5);
    this.instance.add(hemisphereLight);
  }
}
