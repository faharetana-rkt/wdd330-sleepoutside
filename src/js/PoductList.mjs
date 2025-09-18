import { renderListWithTemplate } from "./utils.mjs";

export function productCardTemplate(product) {
  const imageUrl = product.Image || "../images/tents/tent.webp";

  return `
    <li class="product-card">
      <a href="../product_pages/index.html?product=${product.Id}">
        <img
          src="${imageUrl}"
          alt="Image of ${product.NameWithoutBrand}"
          onerror="this.onerror=null; this.src='../images/tents/tent.webp';"
        />
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product.ListPrice}</p>
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
    const list = await this.dataSource.getData();
    this.renderList(list);
  }

  renderList(list) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      "afterbegin",
      true
    );
  }
}
