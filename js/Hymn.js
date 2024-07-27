// js\Hymn.js

export class Hymn {
  constructor(data) {
    this.lines = data.lines;
  }

  render() {
    const contentDiv = document.getElementById("content");

    this.lines.forEach((line) => {
      let lineText = line.text;
      const keywords = line.keywords;

      keywords.forEach((keyword) => {
        const regex = new RegExp(`\\b(${keyword})\\b`, "g");
        lineText = lineText.replace(
          regex,
          `<span class="keyword" data-keyword="${keyword}">$1</span>`
        );
      });

      const lineElement = document.createElement("p");
      lineElement.innerHTML = `<strong>${line.number}</strong> ${lineText}`;
      contentDiv.appendChild(lineElement);
    });
  }
}
