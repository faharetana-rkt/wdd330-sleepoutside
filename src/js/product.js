import { getParam, renderNumberOfItemsBackpack } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const param = new URLSearchParams(window.location.search);
const category = param.get("category");

const productId = getParam("product");
const dataSource = new ProductData(category);
const product = new ProductDetails(productId, dataSource);
product.init();

// // add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// // add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);

// function to render the superscript number of items in backpack
renderNumberOfItemsBackpack(document.querySelector("#cart-numbers"), "so-cart");
