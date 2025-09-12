// src/js/ProductList.mjs
import { renderListWithTemplate } from "./utils.mjs";

// Template function to build one product card
function productCardTemplate(product) {
  const imageUrl = product.Image || "/images/placeholder.png";

  return `
    <li class="product-card">
      <a href="/product_pages/index.html?product=${product.Id}">
        <img
          src="${imageUrl}"
          alt="${product.Name}"
          onerror="this.src='/images/placeholder.png'"
        />
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const products = await this.dataSource.getData(this.category);
    this.renderList(products);
  }

  renderList(products) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      products,
      "afterbegin",
      true // limpiamos antes de renderizar
    );
  }
}
