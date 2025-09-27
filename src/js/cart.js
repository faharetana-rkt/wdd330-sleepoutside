import { loadHeaderFooter, renderNumberOfItemsBackpack } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";
import { getCartTotal } from "./ShoppingCart.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeaderFooter();

  const listElement = document.querySelector(".product-list");

  const cart = new ShoppingCart("so-cart", listElement);
  cart.init();

  listElement.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove")) {
      const button = e.target;

      // Remove the item from the DOM
      button.closest("li").remove();

  
      let items = JSON.parse(localStorage.getItem("so-cart")) || [];
      const index = items.findIndex((item) => item.Id === button.id);
      if (index !== -1) {
        items.splice(index, 1);
      }
      localStorage.setItem("so-cart", JSON.stringify(items));


      getCartTotal("so-cart");

  
      renderNumberOfItemsBackpack(
        document.querySelector("#cart-numbers"),
        "so-cart"
      );
    }
  });

  // Initial render of cart number and total
  renderNumberOfItemsBackpack(document.querySelector("#cart-numbers"), "so-cart");
  getCartTotal("so-cart");
});
