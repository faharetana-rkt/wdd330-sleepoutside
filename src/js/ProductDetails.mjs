import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;   // the ID from URL (?product=xxx)
    this.product = {};            // will hold the product details
    this.dataSource = dataSource; // ProductData instance (fetches JSON)
  }

  // Initialize: fetch data, render product, attach button listener
  async init() {
    // 1. Fetch product details
    this.product = await this.dataSource.findProductById(this.productId);

    // 2. If product not found, show a message
    if (!this.product) {
      document.querySelector(".product-main").innerHTML = "<p>Product not found</p>";
      return;
    }

    // 3. Render product details into the page
    this.renderProductDetails();

    // 4. Add listener to "Add to Cart" button
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
    // ^ `.bind(this)` is required so that "this" inside addProductToCart
    // refers to the class instance, not the button element
  }

  // Add this product to the cart
  // addProductToCart() {
  //   const cartItems = getLocalStorage("so-cart") || [];
  //   cartItems.push(this.product);
  //   setLocalStorage("so-cart", cartItems);
  // }
  // ProductDetails.mjs
async addProductToCart(e) {
  const productId = e.target.dataset.id;
  // get fresh data to avoid stale info
  const product = await this.dataSource.findProductById(productId);

  let cartItems = getLocalStorage("so-cart") || [];
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
}


  // Render the product details dynamically
  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  document.querySelector('h2').textContent = product.Brand.Name;
  document.querySelector('h3').textContent = product.NameWithoutBrand;

  const productImage = document.getElementById('productImage');
  productImage.src = product.Image;
  productImage.alt = product.NameWithoutBrand;

  document.getElementById('productPrice').textContent = product.FinalPrice;
  document.getElementById('productColor').textContent = product.Colors[0].ColorName;
  document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

  document.getElementById('addToCart').dataset.id = product.Id;
}
