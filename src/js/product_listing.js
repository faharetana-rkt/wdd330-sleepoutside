// src/js/product-listing.js
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

// Load header and footer dynamically
loadHeaderFooter();

// Get category from URL
const category = getParam("category");

// Create data source
const dataSource = new ProductData();

// Get the element where the products will render
const listElement = document.querySelector(".product-list");

// Create ProductList instance
const myList = new ProductList(category, dataSource, listElement);

// Render products
myList.init();

// Update page title with category
const titleElement = document.querySelector(".products h2");
if (titleElement && category) {
  // Capitalize first letter
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  titleElement.textContent = `Top Products: ${formattedCategory}`;
}
