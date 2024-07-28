// js/ExpandableText.js

export class ExpandableText {
  constructor() {
    this.initExpandableText();
  }

  initExpandableText() {
    const contentDiv = document.getElementById("content");
    contentDiv.querySelectorAll(".expandable").forEach((element) => {
      const hiddenText = element.dataset.hiddenText;
      element.innerHTML = "&#9679;"; // Black circle
      element.style.cursor = "pointer";

      element.addEventListener("click", () => {
        if (element.classList.contains("expanded")) {
          element.innerHTML = "&#9679;"; // Black circle
          element.classList.remove("expanded");
        } else {
          element.innerHTML = hiddenText;
          element.classList.add("expanded");
        }
      });
    });
  }
}
