// import { getLocalStorage, setLocalStorage } from "./utils.mjs";
// import ProductData from "./ProductData.mjs";

// const dataSource = new ProductData("tents");

// function addProductToCart(product) {
//   //To get the cart from local storage, or an empty array if there is nothing there
//   let cart = getLocalStorage("so-cart") || [];
//   //To add the product to the cart array
//   cart.push(product);
//   //To save the updated cart back to local storage
//   setLocalStorage("so-cart", cart);
// }
// // add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// // add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);

import { getLocalStorage, setLocalStorage } from "./utils.mjs";

const CART_KEY = "so-cart";

async function findTentById(id) {
  const res = await fetch("/json/tents.json");
  const tents = await res.json();
  return tents.find((t) => t.Id === id);
}

function normalizeItem(product) {
  return {
    Id: product.Id,
    Name: product.Name || product.NameWithoutBrand || "",
    Brand: product.Brand?.Name || "",
    FinalPrice: Number(product.FinalPrice || product.ListPrice || 0),
    Image:
      product.Image ||
      product.Images?.PrimaryMedium ||
      product.Images?.PrimarySmall ||
      "",
    Color:
      (product.Colors && product.Colors[0]?.ColorName) || product.Color || "",
    qty: 1,
  };
}

function addProductToCart(product) {
  // ✅ Read the existing cart (array), push/merge, then write it back
  const current = getLocalStorage(CART_KEY) || [];
  const item = normalizeItem(product);
  const existing = current.find((i) => i.Id === item.Id);

  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    current.push(item);
  }
  setLocalStorage(CART_KEY, current);
}

async function initAddToCart() {
  const btn = document.querySelector("#addToCart");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    const id = btn.dataset.id;
    if (!id) return;

    // this project’s product pages are tents, so look there
    const product = await findTentById(id);

    if (!product) {
      console.warn("Product not found for id:", id);
      return;
    }

    addProductToCart(product);

    // quick feedback
    btn.disabled = true;
    const old = btn.textContent;
    btn.textContent = "Added!";
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = old;
    }, 800);
  });
}

initAddToCart();
