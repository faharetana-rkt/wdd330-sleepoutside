import { renderListWithTemplate, getLocalStorage } from "./utils.mjs";
import { buildImageUrl } from "./ProductData.mjs";

// this is the template for the cart
function cartItemTemplate(item) {
  const imgUrl = buildImageUrl(item.Images?.PrimaryLarge);
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${imgUrl}"
      alt="${item.Name}"
      onerror="this.onerror=null; this.src='../images/tents/tent.webp'";
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1<button class="remove" id="${item.Id}">X</button></p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

export function getCartTotal(cartItems) {
  const totalHTML = document.querySelector(".list-total");
  const hide = document.querySelector(".hide");
  let cart = JSON.parse(localStorage.getItem(cartItems)) || [];
  if (cart.length != 0) {
    hide.classList.remove("hide");
  }
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].FinalPrice;
  }
  totalHTML.innerHTML = "Total: $" + total.toFixed(2);
}


export default class ShoppingCart {
  constructor(key, listElement) {
    this.key = key; // from local storage ("so-cart")
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