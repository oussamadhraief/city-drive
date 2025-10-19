export class ControlsUI {
  constructor() {
    this.createUI();
  }

  createUI() {
    const container = document.createElement('div');
    container.className = 'controls-ui';
    container.innerHTML = `
      <h3>Controls</h3>
      <p><strong>W/↑</strong> Forward</p>
      <p><strong>S/↓</strong> Backward</p>
      <p><strong>A/←</strong> Turn Left</p>
      <p><strong>D/→</strong> Turn Right</p>
      <p><strong>Right Click + Drag</strong> Look Around</p>
      <p><strong>Mouse Wheel</strong> Zoom In/Out</p>
    `;
    document.body.appendChild(container);
  }
}
