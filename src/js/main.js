import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { renderNumberOfItemsBackpack, renderScrollingMessage, loadHeaderFooter } from "./utils.mjs";

const listElement = document.querySelector(".product-list");

const dataSource = new ProductData("tents");

const productList = new ProductList("tents", dataSource, listElement);
productList.init();

loadHeaderFooter();

// function to render the superscript number of items in backpack
renderNumberOfItemsBackpack(document.querySelector("#cart-numbers"), "so-cart");

// function to render the scrolling message on the homepage
renderScrollingMessage("scrolling-text");
