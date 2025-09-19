import ProductData from "./ProductData.mjs";
import ProductList from "./PoductList.mjs";
import { renderScrollingMessage, loadHeaderFooter, renderNumberOfItemsBackpack } from "./utils.mjs";

// Wait until DOM is loaded before running scripts
document.addEventListener("DOMContentLoaded", async () => {
  // Load header and footer
  await loadHeaderFooter();

  // Initialize product list
  const listElement = document.querySelector(".product-list");
  const dataSource = new ProductData("tents");
  const productList = new ProductList("tents", dataSource, listElement);
  productList.init();

  // Render the superscript number of items in backpack
  renderNumberOfItemsBackpack(document.querySelector("#cart-numbers"), "so-cart");

  // function to render the scrolling message on the homepage
  renderScrollingMessage("scrolling-text");
});


