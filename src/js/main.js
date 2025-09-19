import { renderNumberOfItemsBackpack, renderScrollingMessage, loadHeaderFooter } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  // Load header and footer dynamically
  await loadHeaderFooter();

  // Render the superscript number of items in backpack
  renderNumberOfItemsBackpack(document.querySelector("#cart-numbers"), "so-cart");

  // Render the scrolling message on the homepage
  renderScrollingMessage("scrolling-text");
});
