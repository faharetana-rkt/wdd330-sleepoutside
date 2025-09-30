// src/js/checkout.js
import { loadHeaderFooter, renderNumberOfItemsBackpack } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  // Load header and footer
  await loadHeaderFooter();

  // Render number of items in backpack
  renderNumberOfItemsBackpack(
    document.querySelector("#cart-numbers"),
    "so-cart",
  );

  // Initialize checkout process
  const checkout = new CheckoutProcess("so-cart", ".checkout-summary");
  checkout.init();

  // Recalculate totals when ZIP code field loses focus
  document.querySelector("#zip").addEventListener("blur", () => {
    checkout.calculateOrderTotal();
  });

  // Handle form submission
  const form = document.forms["checkout"];
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // check form validity
    const isValid = form.checkValidity();
    form.reportValidity();

    if (isValid) {
      checkout.checkout(form);
    }
  });
});
