import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class CityLoader {
  constructor(scene) {
    this.scene = scene;
    this.loader = new GLTFLoader();
  }

  async load() {
    try {
      const gltf = await this.loader.loadAsync('/BRP Sample Scene.glb');
      
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      this.scene.add(gltf.scene);
    } catch (error) {
      console.error('Error loading city model:', error);
      this.createFallbackCity();
    }
  }

  createFallbackCity() {
    const groundGeometry = new THREE.PlaneGeometry(200, 200);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x444444 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);

    const roadMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    
    const mainRoadGeometry = new THREE.PlaneGeometry(10, 200);
    const mainRoad = new THREE.Mesh(mainRoadGeometry, roadMaterial);
    mainRoad.rotation.x = -Math.PI / 2;
    mainRoad.position.y = 0.01;
    mainRoad.receiveShadow = true;
    this.scene.add(mainRoad);

    const crossRoadGeometry = new THREE.PlaneGeometry(200, 10);
    const crossRoad = new THREE.Mesh(crossRoadGeometry, roadMaterial);
    crossRoad.rotation.x = -Math.PI / 2;
    crossRoad.position.y = 0.01;
    crossRoad.receiveShadow = true;
    this.scene.add(crossRoad);

    const buildingMaterial = new THREE.MeshStandardMaterial({ color: 0x999999 });
    
    const buildingConfigs = [
      { x: -30, z: -30, width: 15, height: 20, depth: 15 },
      { x: 30, z: -30, width: 12, height: 25, depth: 12 },
      { x: -35, z: 25, width: 18, height: 15, depth: 18 },
      { x: 25, z: 30, width: 10, height: 30, depth: 10 },
      { x: -50, z: -50, width: 20, height: 18, depth: 20 },
      { x: 50, z: -50, width: 15, height: 22, depth: 15 },
      { x: -45, z: 50, width: 12, height: 28, depth: 12 },
      { x: 45, z: 45, width: 16, height: 16, depth: 16 }
    ];

    buildingConfigs.forEach(config => {
      const geometry = new THREE.BoxGeometry(config.width, config.height, config.depth);
      const building = new THREE.Mesh(geometry, buildingMaterial);
      building.position.set(config.x, config.height / 2, config.z);
      building.castShadow = true;
      building.receiveShadow = true;
      this.scene.add(building);
    });
  }
}
