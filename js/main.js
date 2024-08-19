// js/main.js

import HymnVisualizer from "./HymnVisualizer.js";
import Toolbar from "./Toolbar.js";

// Fetch the data from JSON
fetch("js/data.json")
  .then((response) => response.json())
  .then((data) => {
    const hymnVisualizer = new HymnVisualizer(data);
    hymnVisualizer.render("hymn-container");

    const toolbar = new Toolbar(hymnVisualizer);
    toolbar.render("toolbar-container");
  })
  .catch((error) => console.error("Error loading JSON:", error));
