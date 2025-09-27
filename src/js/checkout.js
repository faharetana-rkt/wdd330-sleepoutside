import { loadHeaderFooter, renderNumberOfItemsBackpack } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  // Load header and footer
  await loadHeaderFooter();

  // rendering the superscript number of items in backpack
  renderNumberOfItemsBackpack(
    document.querySelector("#cart-numbers"),
    "so-cart",
  );
  // Initialize checkout process
  const checkout = new CheckoutProcess("so-cart", ".checkout-summary");
  checkout.init();

  // Calculate order total when ZIP code field loses focus
  document.querySelector("#zip").addEventListener("blur", () => {
    checkout.calculateOrderTotal();
  });

 
  document.forms["checkout"].addEventListener("submit", (e) => {
    e.preventDefault();
    checkout.checkout(e.target);
  });

});
