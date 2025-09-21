import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const params = new URLSearchParams(window.location.search);
const category = params.get("category");
const productId = params.get("product");

//just to change the Top Products header
const topHeader = document.querySelector("#topProductsHeader");
topHeader.insertAdjacentHTML("beforeend", `: ${category}`);

const dataSource = new ProductData(import.meta.env.VITE_SERVER_URL);

if (category) {
  const listElement = document.querySelector(".product-list");
  const productList = new ProductList(category, dataSource, listElement);
  productList.init();
}

if (productId) {
  const productDetail = new ProductDetails(productId, dataSource);
  productDetail.init();
}

loadHeaderFooter();
