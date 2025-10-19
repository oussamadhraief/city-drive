export class Loader {
  constructor() {
    this.progress = 0;
    this.createUI();
  }

  createUI() {
    const container = document.createElement('div');
    container.className = 'loader-overlay';
    container.innerHTML = `
      <div class="loader-container">
        <h1 class="loader-title">City Drive</h1>
        <div class="loader-bar">
          <div class="loader-progress"></div>
        </div>
        <p class="loader-text">Loading city...</p>
      </div>
    `;
    document.body.appendChild(container);
    
    this.overlay = container;
    this.progressBar = container.querySelector('.loader-progress');
    this.loaderText = container.querySelector('.loader-text');
    
    this.startAnimation();
  }

  startAnimation() {
    this.interval = setInterval(() => {
      this.progress += Math.random() * 15;
      if (this.progress > 95) {
        this.progress = 95;
      }
      this.updateProgress(this.progress);
    }, 200);
  }

  updateProgress(value) {
    this.progressBar.style.width = `${value}%`;
  }

  complete() {
    clearInterval(this.interval);
    this.updateProgress(100);
    this.loaderText.textContent = 'Ready!';
    
    setTimeout(() => {
      this.overlay.classList.add('fade-out');
      setTimeout(() => {
        this.overlay.remove();
      }, 500);
    }, 300);
  }
}
