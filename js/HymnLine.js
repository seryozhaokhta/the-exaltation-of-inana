// js/HymnLine.js

import { gsap } from "/node_modules/gsap/index.js";

export default class HymnLine {
  constructor({
    number,
    sumerian_text,
    transliterations,
    translation,
    explanation,
  }) {
    this.number = number;
    this.sumerian_text = sumerian_text;
    this.transliterations = transliterations;
    this.translation = translation;
    this.explanation = explanation;
    this.isExpanded = false;
  }

  render() {
    const lineElement = document.createElement("div");
    lineElement.classList.add("hymn-line");

    lineElement.innerHTML = `
      <h2>Line ${this.number}</h2>
      <p class="sumerian-text">${this.sumerian_text}</p>
      <p class="transliteration">${this.transliterations.transliteration}</p>
      <p class="word-by-word">${this.transliterations.word_by_word}</p>
      <p class="simplified">${this.transliterations.simplified}</p>
      <p class="translation">${this.translation}</p>
      <div class="explanation">
          <strong>Explanation:</strong>
          <p>${this.explanation}</p>
      </div>
    `;

    return lineElement;
  }

  renderTranslationText() {
    const translationElement = document.createElement("span");
    translationElement.classList.add("translation-line");

    translationElement.innerHTML = `
      <span>${this.translation}</span>
      <button class="toggle-details">+</button>
      <span class="details">
        <p class="sumerian-text">${this.sumerian_text}</p>
        <p class="transliteration">${this.transliterations.transliteration}</p>
        <p class="word-by-word">${this.transliterations.word_by_word}</p>
        <p class="simplified">${this.transliterations.simplified}</p>
        <div class="explanation">
          <strong>Explanation:</strong>
          <p>${this.explanation}</p>
        </div>
      </span>
    `;

    const toggleButton = translationElement.querySelector(".toggle-details");
    const detailsElement = translationElement.querySelector(".details");
    gsap.set(detailsElement, { height: 0, opacity: 0, display: "none" });

    toggleButton.addEventListener("click", () => {
      this.isExpanded = !this.isExpanded;

      const allTranslationLines =
        document.querySelectorAll(".translation-line");

      // Закрываем другие строки
      allTranslationLines.forEach((line) => {
        if (line !== translationElement) {
          const otherDetailsElement = line.querySelector(".details");
          if (
            otherDetailsElement &&
            gsap.getProperty(otherDetailsElement, "height") !== "0px"
          ) {
            const otherToggleButton = line.querySelector(".toggle-details");
            if (otherToggleButton) otherToggleButton.textContent = "+";

            gsap
              .timeline()
              .to(otherDetailsElement, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.inOut",
              })
              .to(otherDetailsElement, {
                height: 0,
                duration: 0.6,
                ease: "power2.inOut",
                onComplete: () =>
                  gsap.set(otherDetailsElement, { display: "none" }),
              });
          }
        }
      });

      // Анимация для активной строки
      if (this.isExpanded) {
        gsap
          .timeline()
          .set(detailsElement, { display: "block" })
          .to(detailsElement, {
            height: "auto",
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          });

        toggleButton.textContent = "-";
        gsap.to(allTranslationLines, {
          opacity: 0.5,
          duration: 0.6,
          ease: "power2.out",
        });
        gsap.to(translationElement, {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        });
      } else {
        gsap
          .timeline()
          .to(detailsElement, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut",
          })
          .to(detailsElement, {
            height: 0,
            duration: 0.6,
            ease: "power2.inOut",
            onComplete: () => gsap.set(detailsElement, { display: "none" }),
          });

        toggleButton.textContent = "+";
        gsap.to(allTranslationLines, {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        });
      }
    });

    return translationElement;
  }
}
