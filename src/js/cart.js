import { loadHeaderFooter, renderNumberOfItemsBackpack } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";
import { getCartTotal } from "./ShoppingCart.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeaderFooter();

  const listElement = document.querySelector(".product-list");
  const totalElement = document.querySelector(".cart-total");
  const footerElement = document.querySelector(".cart-footer");

  const cart = new ShoppingCart("so-cart", listElement, totalElement, footerElement);
  cart.init();

  // function to render the number of items in the backpack
  renderNumberOfItemsBackpack(document.querySelector("#cart-numbers"), "so-cart");

  // render total
  getCartTotal("so-cart");
});