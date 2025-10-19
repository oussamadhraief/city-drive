import * as THREE from 'three';
import { Scene } from './Scene';
import { Camera } from './Camera';
import { Renderer } from './Renderer';
import { CityLoader } from '../loaders/CityLoader';
import { Controls } from '../systems/Controls';
import { Vehicle } from '../entities/Vehicle';
import { ControlsUI } from '../ui/ControlsUI';
import { MobileControls } from '../ui/MobileControls';

export class App {
  constructor() {
    this.scene = new Scene();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.controls = new Controls();
    this.vehicle = new Vehicle(this.scene.instance);
    this.cityLoader = new CityLoader(this.scene.instance);
    this.ui = new ControlsUI();
    this.mobileControls = new MobileControls(this.controls);
    
    this.clock = new THREE.Clock();
    this.isRunning = false;

    this.setupEventListeners();
    this.init();
  }

  async init() {
    await this.cityLoader.load();
    this.camera.setTarget(this.vehicle.mesh);
  }

  setupEventListeners() {
    window.addEventListener('resize', () => this.onResize());
  }

  onResize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update(deltaTime) {
    const movement = this.controls.getMovement();
    this.vehicle.update(movement, deltaTime);
    if (this.vehicle.mesh) {
      this.camera.update(this.vehicle.mesh);
    }
  }

  render() {
    this.renderer.render(this.scene.instance, this.camera.instance);
  }

  animate() {
    if (!this.isRunning) return;
    
    requestAnimationFrame(() => this.animate());
    
    const deltaTime = this.clock.getDelta();
    this.update(deltaTime);
    this.render();
  }

  start() {
    this.isRunning = true;
    this.animate();
  }

  stop() {
    this.isRunning = false;
  }
}
