// js\Hymn.js

export class Hymn {
  constructor(data) {
    this.lines = data.lines;
  }

  render() {
    const contentDiv = document.getElementById("content");

    this.lines.forEach((line) => {
      const lineElement = document.createElement("p");
      lineElement.innerHTML = `<strong>${
        line.number
      }</strong> ${this.highlightKeywords(line.text, line.keywords)}`;
      contentDiv.appendChild(lineElement);
    });
  }

  highlightKeywords(text, keywords) {
    keywords.forEach((keyword) => {
      const regex = new RegExp(`\\b(${keyword})\\b`, "g");
      text = text.replace(
        regex,
        `<span class="keyword" data-keyword="${keyword}">$1</span>`
      );
    });
    return text;
  }
}
