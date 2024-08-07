// js\Tooltip.js

export class Tooltip {
  constructor(glossary) {
    this.tooltipElement = document.createElement("div");
    this.tooltipElement.className = "tooltip";
    document.body.appendChild(this.tooltipElement);
    this.currentKeywordIndex = -1;
    this.keywords = [];
    this.glossary = glossary;

    document.addEventListener("click", this.handleDocumentClick.bind(this));
  }

  handleDocumentClick(event) {
    if (!this.tooltipElement.contains(event.target)) {
      this.hide();
      this.clearHighlight();
      this.currentKeywordIndex = -1;
    }
  }

  show(text, x, y) {
    this.tooltipElement.textContent = text;
    this.tooltipElement.style.left = `${x}px`;
    this.tooltipElement.style.top = `${y}px`;
    this.tooltipElement.style.display = "block";
  }

  hide() {
    this.tooltipElement.style.display = "none";
  }

  setKeywords(keywords) {
    this.keywords = keywords;
  }

  navigateKeywords(event) {
    if (this.keywords.length === 0) return;

    if (event.key === "ArrowRight") {
      this.currentKeywordIndex =
        (this.currentKeywordIndex + 1) % this.keywords.length;
    } else if (event.key === "ArrowLeft") {
      this.currentKeywordIndex =
        (this.currentKeywordIndex - 1 + this.keywords.length) %
        this.keywords.length;
    }

    this.highlightKeyword(this.keywords[this.currentKeywordIndex]);
  }

  selectKeyword(keywordElement) {
    this.highlightKeyword(keywordElement);
    this.currentKeywordIndex = Array.from(this.keywords).indexOf(
      keywordElement
    );
  }

  clearHighlight() {
    this.keywords.forEach((keyword) => {
      keyword.classList.remove("dimmed");
      keyword.classList.remove("active");
    });
  }

  highlightKeyword(keywordElement) {
    this.clearHighlight();
    this.keywords.forEach((keyword) => {
      if (keyword !== keywordElement) {
        keyword.classList.add("dimmed");
      } else {
        keyword.classList.add("active");
      }
    });

    // Прокрутка до активного ключевого слова
    keywordElement.scrollIntoView({ behavior: "smooth", block: "center" });

    const rect = keywordElement.getBoundingClientRect();
    const keywordText = keywordElement.dataset.keyword;
    const definition = this.glossary[keywordText] || "No definition available";
    this.show(
      definition,
      rect.left + window.scrollX,
      rect.bottom + window.scrollY
    );
  }
}
