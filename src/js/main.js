import { renderScrollingMessage, loadHeaderFooter, renderNumberOfItemsBackpack } from "./utils.mjs";

// Wait until DOM is loaded before running scripts
document.addEventListener("DOMContentLoaded", async () => {
  // Load header and footer
  await loadHeaderFooter();

  // Render the superscript number of items in backpack
  renderNumberOfItemsBackpack(document.querySelector("#cart-numbers"), "so-cart");

  // function to render the scrolling message on the homepage
  renderScrollingMessage("scrolling-text");
});


