export class MobileControls {
  constructor(controls) {
    this.controls = controls;
    this.isMobile = this.checkMobile();
    
    if (this.isMobile) {
      this.createUI();
      this.setupTouchControls();
    }
  }

  checkMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
      || window.innerWidth < 768;
  }

  createUI() {
    const container = document.createElement('div');
    container.className = 'mobile-controls';
    container.innerHTML = `
      <div class="joystick-left">
        <button class="control-btn" data-key="left">←</button>
        <div class="vertical-controls">
          <button class="control-btn" data-key="forward">↑</button>
          <button class="control-btn" data-key="backward">↓</button>
        </div>
        <button class="control-btn" data-key="right">→</button>
      </div>
    `;
    document.body.appendChild(container);
  }

  setupTouchControls() {
    const buttons = document.querySelectorAll('.control-btn');
    
    buttons.forEach(button => {
      const key = button.getAttribute('data-key');
      
      button.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.controls.keys[key] = true;
        button.classList.add('active');
      });

      button.addEventListener('touchend', (e) => {
        e.preventDefault();
        this.controls.keys[key] = false;
        button.classList.remove('active');
      });

      button.addEventListener('touchcancel', (e) => {
        e.preventDefault();
        this.controls.keys[key] = false;
        button.classList.remove('active');
      });
    });
  }
}
