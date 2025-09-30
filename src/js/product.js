import {
  getParam,
  loadHeaderFooter,
  renderNumberOfItemsBackpack,
  renderDiscount,
  checkDiscount,
} from "./utils.mjs";

import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeaderFooter();

  // Get product id from URL
  const productId = getParam("product");

  // Create ExternalServices instance
  const dataSource = new ExternalServices();

  // Create ProductDetails instance
  const productDetails = new ProductDetails(productId, dataSource);

  // Render product detail
  productDetails.init();

  // Render Discount
  renderDiscount(
    checkDiscount(await dataSource.findProductById(productId)),
    document.querySelector(".discount-container"),
    "../images/discount.svg",
  );

  // rendering the superscript number of items in backpack
  renderNumberOfItemsBackpack(
    document.querySelector("#cart-numbers"),
    "so-cart",
  );
});
