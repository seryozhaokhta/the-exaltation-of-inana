// js/Toolbar.js

export default class Toolbar {
  constructor(hymnVisualizer) {
    this.hymnVisualizer = hymnVisualizer;
  }

  render(containerId) {
    const container = document.getElementById(containerId);
    const button = document.createElement("button");
    button.textContent = "Toggle Reading Mode";
    button.addEventListener("click", () =>
      this.hymnVisualizer.toggleReadingMode()
    );
    container.appendChild(button);
  }
}
