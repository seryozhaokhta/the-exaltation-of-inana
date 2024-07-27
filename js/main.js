// js\main.js

import { Hymn } from "./Hymn.js";
import { Tooltip } from "./Tooltip.js";

document.addEventListener("DOMContentLoaded", () => {
  fetch("hymn.json")
    .then((response) => response.json())
    .then((hymnData) => {
      const hymn = new Hymn(hymnData);
      hymn.render();

      fetch("glossary.json")
        .then((response) => response.json())
        .then((glossaryData) => {
          const tooltip = new Tooltip(glossaryData);
          const keywords = document.querySelectorAll(".keyword");

          keywords.forEach((keyword) => {
            keyword.addEventListener("mouseover", (event) => {
              if (tooltip.currentKeywordIndex === -1) {
                const rect = event.target.getBoundingClientRect();
                const keywordText = event.target.dataset.keyword;
                const definition =
                  glossaryData[keywordText] || "No definition available";
                tooltip.show(
                  definition,
                  rect.left + window.scrollX,
                  rect.bottom + window.scrollY
                );
              }
            });

            keyword.addEventListener("mouseout", () => {
              if (tooltip.currentKeywordIndex === -1) {
                tooltip.hide();
              }
            });

            keyword.addEventListener("click", (event) => {
              tooltip.selectKeyword(event.target);
            });
          });

          tooltip.setKeywords(keywords);

          document.addEventListener("keydown", (event) => {
            tooltip.navigateKeywords(event);
          });
        })
        .catch((error) => console.error("Error loading the glossary:", error));
    })
    .catch((error) => console.error("Error loading the hymn:", error));
});
