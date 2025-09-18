import { loadHeaderFooter, getLocalStorage, setLocalStorage, renderNumberOfItemsBackpack } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  // Load header and footer
  await loadHeaderFooter();

  // Update cart item number in header
  const cartIcon = document.querySelector("#cart-numbers");
  if (cartIcon) {
    renderNumberOfItemsBackpack(cartIcon, "so-cart");
  }

  // Checkout form handling
  const form = document.getElementById("checkout-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Here you could handle form submission, e.g.:
      // - Validate form
      // - Clear cart from localStorage
      // - Show confirmation message
      alert("Purchase completed! Thank you.");
      setLocalStorage("so-cart", []);
      renderNumberOfItemsBackpack(cartIcon, "so-cart");
      form.reset();
    });
  }
});
