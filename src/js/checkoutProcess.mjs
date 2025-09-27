// src/js/CheckoutProcess.mjs
import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
    this.services = new ExternalServices();
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSummary();
    this.calculateOrderTotal();
  }

  calculateItemSummary() {
    const summaryElement = document.querySelector(
      this.outputSelector + " #cartTotal"
    );
    const itemNumElement = document.querySelector(
      this.outputSelector + " #numberItems"
    );
    itemNumElement.innerText = this.list.length;

    const amounts = this.list.map((item) => item.FinalPrice);
    this.itemTotal = amounts.reduce((sum, item) => sum + item, 0);
    summaryElement.innerText = `$${this.itemTotal.toFixed(2)}`;
  }

  calculateOrderTotal() {
    this.tax = this.itemTotal * 0.06;
    this.shipping = this.list.length > 0 ? 10 + (this.list.length - 1) * 2 : 0;
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const tax = document.querySelector(`${this.outputSelector} #tax`);
    const shipping = document.querySelector(`${this.outputSelector} #shipping`);
    const orderTotal = document.querySelector(`${this.outputSelector} #total`);

    tax.innerText = `$${this.tax.toFixed(2)}`;
    shipping.innerText = `$${this.shipping.toFixed(2)}`;
    orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
  }


  packageItems(items) {
    return items.map((item) => ({
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: 1,
    }));
  }

    
  formDataToJSON(formElement) {
    const formData = new FormData(formElement);
    const convertedJSON = {};
    formData.forEach((value, key) => {
      convertedJSON[key] = value;
    });
    return convertedJSON;
  }

    
async checkout(formElement) {
  const order = this.formDataToJSON(formElement);

  // Add order metadata
  order.orderDate = new Date().toISOString();
  order.items = this.packageItems(this.list);
  order.orderTotal = this.orderTotal.toFixed(2);
  order.shipping = this.shipping;
  order.tax = this.tax.toFixed(2);

  try {
    // Try to submit the order
    const response = await services.checkout(order);
    console.log("Order success:", response);

    // Give user feedback
    alert("✅ Order placed successfully!");
    // (Optional) redirect to a success/confirmation page:
    // window.location.href = "/checkout/success.html";
  } catch (err) {
    // We expect errors from ExternalServices to look like:
    // { name: "servicesError", message: { error: "...", errors: [...] } }
    if (err.name === "servicesError") {
      console.error("Checkout failed:", err.message);

      // Flexible handling of different error shapes
      if (err.message.error) {
        alert(`❌ Checkout failed: ${err.message.error}`);
      } else if (err.message.errors) {
        alert(`❌ Checkout failed: ${err.message.errors.join(", ")}`);
      } else {
        alert("❌ Checkout failed: An unknown error occurred.");
      }
    } else {
      // Unexpected error (network issues, JS error, etc.)
      console.error("Unexpected error:", err);
      alert("Unexpected error. Please try again.");
    }
  }
}


}
