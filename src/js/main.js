import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// create data source for tents
const dataSource = new ProductData("tents");

// get the target element for rendering
const listElement = document.querySelector(".product-list");

// create product list and render
const productList = new ProductList("tents", dataSource, listElement);
productList.init();
