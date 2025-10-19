import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class Vehicle {
  constructor(scene) {
    this.scene = scene;
    this.speed = 0;
    this.maxSpeed = 25;
    this.acceleration = 12;
    this.deceleration = 8;
    this.turnSpeed = 1.8;
    this.rotation = 0;
    this.mesh = null;
    this.isLoaded = false;

    this.loadTruck();
  }

  async loadTruck() {
    const loader = new GLTFLoader();
    try {
      const gltf = await loader.loadAsync('/Orange Truck.glb');
      this.mesh = gltf.scene;
      
      this.mesh.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      this.mesh.position.y = 0;
      this.scene.add(this.mesh);
      this.isLoaded = true;
    } catch (error) {
      console.error('Error loading truck:', error);
      this.createFallbackTruck();
    }
  }

  createFallbackTruck() {
    const carBody = new THREE.Group();

    const bodyGeometry = new THREE.BoxGeometry(2, 1, 4);
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xff8800 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.5;
    body.castShadow = true;
    carBody.add(body);

    const cabinGeometry = new THREE.BoxGeometry(1.8, 0.8, 2);
    const cabinMaterial = new THREE.MeshStandardMaterial({ color: 0xffa500 });
    const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
    cabin.position.y = 1.4;
    cabin.position.z = -0.3;
    cabin.castShadow = true;
    carBody.add(cabin);

    this.mesh = carBody;
    this.mesh.position.y = 0;
    this.scene.add(this.mesh);
    this.isLoaded = true;
  }

  update(movement, deltaTime) {
    if (!this.isLoaded || !this.mesh) return;

    if (movement.forward) {
      this.speed = Math.min(this.speed + this.acceleration * deltaTime, this.maxSpeed);
    } else if (movement.backward) {
      this.speed = Math.max(this.speed - this.acceleration * deltaTime, -this.maxSpeed * 0.5);
    } else {
      if (this.speed > 0) {
        this.speed = Math.max(0, this.speed - this.deceleration * deltaTime);
      } else if (this.speed < 0) {
        this.speed = Math.min(0, this.speed + this.deceleration * deltaTime);
      }
    }

    if (Math.abs(this.speed) > 0.1) {
      if (movement.left) {
        this.rotation += this.turnSpeed * deltaTime;
      }
      if (movement.right) {
        this.rotation -= this.turnSpeed * deltaTime;
      }
    }

    this.mesh.rotation.y = this.rotation;

    const moveX = -Math.sin(this.rotation) * this.speed * deltaTime;
    const moveZ = -Math.cos(this.rotation) * this.speed * deltaTime;

    this.mesh.position.x += moveX;
    this.mesh.position.z += moveZ;
  }
}
