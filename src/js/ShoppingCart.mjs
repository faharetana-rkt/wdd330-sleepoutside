import { renderListWithTemplate, getLocalStorage } from "./utils.mjs";

// Template para un ítem del carrito
function cartItemTemplate(product) {
  const imgUrl = product.Image || "../images/tents/tent.webp";
  return `
    <li class="cart-card divider">
      <a href="/product_pages/?product=${product.Id}" class="cart-card__image">
        <img src="${imgUrl}" alt="${product.Name}" />
      </a>
      <a href="/product_pages/?product=${product.Id}">
        <h2 class="card__name">${product.Name}</h2>
      </a>
      <p class="cart-card__color">${product.Colors?.[0]?.ColorName || ""}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${product.FinalPrice}</p>
    </li>
  `;
}

export default class ShoppingCart {
  constructor(key, listElement) {
    this.key = key; // clave en localStorage ("so-cart")
    this.listElement = listElement;
  }

  async init() {
    const cartItems = getLocalStorage(this.key) || [];
    this.renderList(cartItems);
  }

  renderList(cartItems) {
    renderListWithTemplate(
      cartItemTemplate,
      this.listElement,
      cartItems,
      "afterbegin",
      true
    );
  }
}
