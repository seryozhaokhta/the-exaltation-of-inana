// js/HymnVisualizer.js

import HymnLine from "./HymnLine.js";
import { gsap } from "/node_modules/gsap/index.js";

export default class HymnVisualizer {
  constructor(data) {
    this.data = data;
    this.lines = [];
    this.isReadingMode = false;
  }

  render(containerId) {
    const container = document.getElementById(containerId);

    this.data.lines.forEach((lineData) => {
      const hymnLine = new HymnLine(lineData);
      this.lines.push(hymnLine);
      container.appendChild(hymnLine.render());
    });
  }

  toggleReadingMode() {
    this.isReadingMode = !this.isReadingMode;
    const container = document.getElementById("hymn-container");

    gsap.to(container, {
      x: this.isReadingMode ? 100 : -100,
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        container.innerHTML = "";

        if (this.isReadingMode) {
          const paragraphContainer = document.createElement("div");
          paragraphContainer.classList.add("reading-mode");

          this.lines.forEach((line) => {
            const translationText = line.renderTranslationText();
            paragraphContainer.appendChild(translationText);
            paragraphContainer.appendChild(document.createTextNode(" "));
          });

          container.appendChild(paragraphContainer);
        } else {
          this.lines.forEach((line) => {
            container.appendChild(line.render());
          });
        }

        gsap.fromTo(
          container,
          { x: this.isReadingMode ? -100 : 100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          }
        );
      },
    });
  }
}
