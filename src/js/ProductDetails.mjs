import { getLocalStorage, setLocalStorage, renderNumberOfItemsBackpack } from "./utils.mjs";
import { buildImageUrl } from "./ExternalServices.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    document.title = `Sleep Outside | ${this.product.Name}`;

    const addToCartBtn = document.querySelector("#addToCart");
    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", this.addProductToCart.bind(this));
    }
  }

  addProductToCart() {
    let cart = getLocalStorage("so-cart") || [];

    cart.push(this.product);

    setLocalStorage("so-cart", cart);

    // Update the number of items in the cart icon
    renderNumberOfItemsBackpack(
      document.querySelector("#cart-numbers"),
      "so-cart"
    );
  }

  renderProductDetails() {
    const container = document.querySelector(".product-detail");
    if (container) {
      container.innerHTML = productDetailsTemplate(this.product);
    }
  }
}

// --- Helpers ---
function productDetailsTemplate(product) {
  const imgUrl = buildImageUrl(product.Images?.PrimaryLarge);

  return `
    <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img class="divider"
         src="${imgUrl}"
         alt="${product.NameWithoutBrand}" />
    <p class="product-card__price">$${product.ListPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">${product.DescriptionHtmlSimple}</p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>`;
}
