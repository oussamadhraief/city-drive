export class Controls {
  constructor() {
    this.keys = {
      forward: false,
      backward: false,
      left: false,
      right: false
    };

    this.setupEventListeners();
  }

  setupEventListeners() {
    window.addEventListener('keydown', (e) => this.onKeyDown(e));
    window.addEventListener('keyup', (e) => this.onKeyUp(e));
  }

  onKeyDown(event) {
    switch (event.key.toLowerCase()) {
      case 'w':
      case 'arrowup':
        this.keys.forward = true;
        break;
      case 's':
      case 'arrowdown':
        this.keys.backward = true;
        break;
      case 'a':
      case 'arrowleft':
        this.keys.left = true;
        break;
      case 'd':
      case 'arrowright':
        this.keys.right = true;
        break;
    }
  }

  onKeyUp(event) {
    switch (event.key.toLowerCase()) {
      case 'w':
      case 'arrowup':
        this.keys.forward = false;
        break;
      case 's':
      case 'arrowdown':
        this.keys.backward = false;
        break;
      case 'a':
      case 'arrowleft':
        this.keys.left = false;
        break;
      case 'd':
      case 'arrowright':
        this.keys.right = false;
        break;
    }
  }

  getMovement() {
    return {
      forward: this.keys.forward,
      backward: this.keys.backward,
      left: this.keys.left,
      right: this.keys.right
    };
  }
}
