import { loadHeaderFooter, renderNumberOfItemsBackpack } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  // Load header and footer
  await loadHeaderFooter();

  // rendering the superscript number of items in backpack
  renderNumberOfItemsBackpack(
    document.querySelector("#cart-numbers"),
    "so-cart",
  );
});
