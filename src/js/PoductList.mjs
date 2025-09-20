import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    const imgUrl = product.Image || "../images/tents/tents.webp"
    return `<li class="product-card">
            <a href="product_pages/?product=${product.Id}">
              <img
                src="${imgUrl}"
                alt="${product.NameWithoutBrand}"
                onerror="this.onerror=null; this.src='../images/tents/tent.webp';"
              />
              <h3 class="card__brand">${product.Brand.Name}</h3>
              <h2 class="card__name">${product.NameWithoutBrand}</h2>
              <p class="product-card__price">$${product.ListPrice}</p>
            </a>
            </li>`
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const productList = await this.dataSource.getData(this.category);
        // this.renderList(productList, this.listElement);
        this.renderList(productList);
    }

    // renderList(list, listElement) {
    //     const templateArray = list.map(productCardTemplate);
    //     listElement.innerHTML = "";
    //     listElement.insertAdjacentHTML("afterbegin", templateArray.join(""));
    // }

    renderList(productList) {
        renderListWithTemplate(productCardTemplate, this.listElement, productList, "afterbegin", true);
    }
};