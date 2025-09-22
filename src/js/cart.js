import { loadHeaderFooter, renderNumberOfItemsBackpack } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";
import { getCartTotal } from "./ShoppingCart.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeaderFooter();

  const listElement = document.querySelector(".product-list");
  const totalElement = document.querySelector(".cart-total");
  const footerElement = document.querySelector(".cart-footer");

  const cart = new ShoppingCart(
    "so-cart",
    listElement,
    totalElement,
    footerElement,
  );
  cart.init();

  const removeButtons = document.querySelectorAll(".remove");
  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.parentElement.parentElement.remove();
      let items = JSON.parse(localStorage.getItem("so-cart")) || [];

      const index = items.findIndex((item) => item.Id === button.id);
      items.splice(index, 1);

      if (items.length !== 0) {
        getCartTotal("so-cart");
      }
      localStorage.setItem("so-cart", JSON.stringify(items));
    });
  });

  // function to render the number of items in the backpack
  renderNumberOfItemsBackpack(
    document.querySelector("#cart-numbers"),
    "so-cart",
  );

  // render total
  getCartTotal("so-cart");
});
