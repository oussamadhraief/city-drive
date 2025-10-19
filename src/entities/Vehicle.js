import * as THREE from 'three';

export class Vehicle {
  constructor(scene) {
    this.scene = scene;
    this.speed = 0;
    this.maxSpeed = 30;
    this.acceleration = 15;
    this.deceleration = 10;
    this.turnSpeed = 2;
    this.rotation = 0;

    this.createMesh();
  }

  createMesh() {
    const carBody = new THREE.Group();

    const bodyGeometry = new THREE.BoxGeometry(2, 1, 4);
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xff4444 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.5;
    body.castShadow = true;
    carBody.add(body);

    const cabinGeometry = new THREE.BoxGeometry(1.8, 0.8, 2);
    const cabinMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
    cabin.position.y = 1.4;
    cabin.position.z = -0.3;
    cabin.castShadow = true;
    carBody.add(cabin);

    const wheelGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 16);
    const wheelMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });

    const wheelPositions = [
      { x: -1, z: 1.2 },
      { x: 1, z: 1.2 },
      { x: -1, z: -1.2 },
      { x: 1, z: -1.2 }
    ];

    wheelPositions.forEach(pos => {
      const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(pos.x, 0.4, pos.z);
      wheel.castShadow = true;
      carBody.add(wheel);
    });

    this.mesh = carBody;
    this.mesh.position.y = 0.5;
    this.scene.add(this.mesh);
  }

  update(movement, deltaTime) {
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
