import ProductData from "./ProductData.mjs";
import ProductList from "./PoductList.mjs";
import { loadHeaderFooter, renderNumberOfItemsBackpack, getParam } from "./utils.mjs";

// Wait until DOM is loaded before running scripts
document.addEventListener("DOMContentLoaded", async () => {
  // Load header and footer
  await loadHeaderFooter();

  // Initialize product list
  const listElement = document.querySelector(".product-list");
  const category = getParam("category");
  const dataSource = new ProductData(category);
  const productList = new ProductList(category, dataSource, listElement);
  productList.init();

  // Render the superscript number of items in backpack
  renderNumberOfItemsBackpack(document.querySelector("#cart-numbers"), "so-cart");
});


