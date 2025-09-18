import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// Load header and footer dynamically
document.addEventListener("DOMContentLoaded", async () => {
  await loadHeaderFooter();

  // Get the product ID from URL (?product=xxx)
  const productId = getParam("product");

  // If no productId is found, don't continue
  if (!productId) {
    console.error("No product ID found in URL");
    return;
  }

  // Create a new data source for tents
  const dataSource = new ProductData("tents");

  // Create and initialize the product details renderer
  const product = new ProductDetails(productId, dataSource);
  product.init();
});
