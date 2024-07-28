// js/Hymn.js

import { ExpandableText } from "./ExpandableText.js";

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
      }</strong> ${this.processText(line.text, line.keywords)}`;
      contentDiv.appendChild(lineElement);
    });

    // Initialize ExpandableText functionality
    new ExpandableText();
  }

  processText(text, keywords) {
    text = this.highlightKeywords(text, keywords);
    text = this.replaceParentheticalText(text);
    return text;
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

  replaceParentheticalText(text) {
    return text.replace(
      /\((.*?)\)/g,
      (match, p1) =>
        `<span class="expandable" data-hidden-text="${p1}">&#9679;</span>`
    );
  }
}
