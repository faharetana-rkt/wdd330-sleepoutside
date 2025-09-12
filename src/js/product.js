import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// 1. Create a data source (tents.json)
const dataSource = new ProductData("tents");
// 2. Get productId from URL (?product=xxx)
const productId = getParam("product");

// 3. Create ProductDetails and initialize it
const product = new ProductDetails(productId, dataSource);
product.init();
