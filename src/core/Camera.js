import * as THREE from 'three';

export class Camera {
  constructor() {
    this.instance = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    
    this.offset = new THREE.Vector3(0, 8, 15);
    this.lookAtOffset = new THREE.Vector3(0, 2, 0);
    this.target = null;
  }

  setTarget(target) {
    this.target = target;
  }

  update(target) {
    if (!target) return;

    const desiredPosition = target.position.clone().add(this.offset);
    this.instance.position.lerp(desiredPosition, 0.1);

    const lookAtPosition = target.position.clone().add(this.lookAtOffset);
    this.instance.lookAt(lookAtPosition);
  }

  resize() {
    this.instance.aspect = window.innerWidth / window.innerHeight;
    this.instance.updateProjectionMatrix();
  }
}
