import {
  getLocalStorage,
  renderNumberOfItemsBackpack,
  loadHeaderFooter,
} from "./utils.mjs";

function renderCartContents() {
  // adding a check to see if the cart is empty
  const cartItems = getLocalStorage("so-cart");
  if (cartItems === null) {
    document.querySelector(".product-list").textContent = "Your cart is empty!";
  } else {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
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

function getCartTotal(cartItems) {
  const totalHTML = document.querySelector(".cart-total");
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

loadHeaderFooter();

renderCartContents();
const removeButtons = document.querySelectorAll(".remove");
removeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.parentElement.parentElement.remove();
    let cart = JSON.parse(localStorage.getItem("so-cart")) || [];

    const index = cart.findIndex((item) => item.Id === button.id);
    cart.splice(index, 1);

    localStorage.setItem("so-cart", JSON.stringify(cart));

    getCartTotal("so-cart");
  });
});

getCartTotal("so-cart");

// function to render the superscript number of items in backpack
renderNumberOfItemsBackpack(document.querySelector("#cart-numbers"), "so-cart");
