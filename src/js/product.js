import { getLocalStorage, setLocalStorage, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
 
const dataSource = new ProductData("tents");
 
function addProductToCart(product) {
  //To get the cart from local storage, or an empty array if there is nothing there
  let cart = getLocalStorage("so-cart") || [];
  //To add the product to the cart array
  cart.push(product);
  //To save the updated cart back to local storage
  setLocalStorage("so-cart", cart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}
 
// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
 
const productId = getParam("product");
 
console.log(dataSource.findProductById(productId));
 
 