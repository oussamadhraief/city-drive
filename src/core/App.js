import * as THREE from 'three';
import { Scene } from './Scene';
import { Camera } from './Camera';
import { Renderer } from './Renderer';
import { CityLoader } from '../loaders/CityLoader';

export class App {
  constructor() {
    this.scene = new Scene();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.cityLoader = new CityLoader(this.scene.instance);
    
    this.clock = new THREE.Clock();
    this.isRunning = false;

    this.setupEventListeners();
    this.init();
  }

  async init() {
    await this.cityLoader.load();
    this.camera.instance.position.set(30, 20, 30);
    this.camera.instance.lookAt(0, 0, 0);
  }

  setupEventListeners() {
    window.addEventListener('resize', () => this.onResize());
  }

  onResize() {
    this.camera.resize();
    this.renderer.resize();
  }

  render() {
    this.renderer.render(this.scene.instance, this.camera.instance);
  }

  animate() {
    if (!this.isRunning) return;
    
    requestAnimationFrame(() => this.animate());
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
