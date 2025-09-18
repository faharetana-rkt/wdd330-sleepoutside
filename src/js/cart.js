import { renderNumberOfItemsBackpack } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const listElement = document.querySelector(".product-list");
  const totalElement = document.querySelector(".cart-total");
  const footerElement = document.querySelector(".cart-footer");

  const cart = new ShoppingCart("so-cart", listElement, totalElement, footerElement);
  cart.init();

  // actualizar el número en la mochila
  renderNumberOfItemsBackpack(document.querySelector("#cart-numbers"), "so-cart");
});
