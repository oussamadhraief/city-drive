import * as THREE from 'three';

export class Camera {
  constructor() {
    this.instance = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    
    this.distance = 15;
    this.height = 6;
    this.horizontalAngle = 0;
    this.verticalAngle = 0.3;
    this.lookAtOffset = new THREE.Vector3(0, 2, 0);
    this.target = null;

    this.isDragging = false;
    this.previousMouseX = 0;
    this.previousMouseY = 0;

    this.setupControls();
  }

  setupControls() {
    window.addEventListener('mousedown', (e) => {
      if (e.button === 2) {
        this.isDragging = true;
        this.previousMouseX = e.clientX;
        this.previousMouseY = e.clientY;
      }
    });

    window.addEventListener('mouseup', (e) => {
      if (e.button === 2) {
        this.isDragging = false;
      }
    });

    window.addEventListener('mousemove', (e) => {
      if (this.isDragging) {
        const deltaX = e.clientX - this.previousMouseX;
        const deltaY = e.clientY - this.previousMouseY;

        this.horizontalAngle -= deltaX * 0.005;
        this.verticalAngle = Math.max(
          -Math.PI / 3,
          Math.min(Math.PI / 3, this.verticalAngle - deltaY * 0.005)
        );

        this.previousMouseX = e.clientX;
        this.previousMouseY = e.clientY;
      }
    });

    window.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  setTarget(target) {
    this.target = target;
  }

  update(target) {
    if (!target) return;

    const offsetX = Math.sin(this.horizontalAngle) * this.distance * Math.cos(this.verticalAngle);
    const offsetZ = Math.cos(this.horizontalAngle) * this.distance * Math.cos(this.verticalAngle);
    const offsetY = this.height + Math.sin(this.verticalAngle) * this.distance;

    const desiredPosition = new THREE.Vector3(
      target.position.x + offsetX,
      target.position.y + offsetY,
      target.position.z + offsetZ
    );

    this.instance.position.lerp(desiredPosition, 0.1);

    const lookAtPosition = target.position.clone().add(this.lookAtOffset);
    this.instance.lookAt(lookAtPosition);
  }

  resize() {
    this.instance.aspect = window.innerWidth / window.innerHeight;
    this.instance.updateProjectionMatrix();
  }
}
