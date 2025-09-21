import { renderListWithTemplate } from "./utils.mjs";
import { buildImageUrl } from "./ProductData.mjs";

export function productCardTemplate(product) {
  const imgUrl = buildImageUrl(product.Images?.PrimaryMedium);

  return `
    <li class="product-card">
      <a href="/product_pages/index.html?product=${product.Id}">
        <img src="${imgUrl}" alt="Image of ${product.Name}" />
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product.ListPrice}</p>
      </a>
    </li>`;
}


export default class ProductList {
    constructor(category, dataSource, listElement){
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
    }
    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
    }
}

