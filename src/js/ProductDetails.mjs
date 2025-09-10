import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;     // the product id from the URL
    this.product = {};              // will hold the actual product data
    this.dataSource = dataSource;   // where to fetch product data (ProductData instance)
  }

  // Initialize: fetch product and render details
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    if (!this.product) {
      document.querySelector(".product-main").innerHTML = "<p>Product not found</p>";
      return;
    }

    this.renderProductDetails();
    this.addAddToCartListener();
  }

  // Save this product to cart
  addProductToCart() {
    let cart = getLocalStorage("so-cart") || [];
    cart.push(this.product);
    setLocalStorage("so-cart", cart);
  }

  // Create HTML for product details
  renderProductDetails() {
    const details = document.createElement("section");
    details.classList.add("product-detail");

    details.innerHTML = `
      <h2 class="product-name">${this.product.Name}</h2>
      <img src="${this.product.Image}" alt="${this.product.Name}" class="product-image" />
      <p class="product-description">${this.product.Description}</p>
      <p class="product-price">$${this.product.FinalPrice}</p>
      <button id="addToCart">Add to Cart</button>
    `;

    document.querySelector(".product-main").appendChild(details);
  }

  // Attach "Add to Cart" button behavior
  addAddToCartListener() {
    document.querySelector("#addToCart").addEventListener("click", () => {
      this.addProductToCart();
    });
  }
}
