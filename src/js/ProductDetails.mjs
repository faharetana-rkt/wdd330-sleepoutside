// src/js/ProductDetails.mjs
import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { buildImageUrl } from "./ExternalServices.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // Obtener detalles del producto desde la API
    this.product = await this.dataSource.findProductById(this.productId);

    // Renderizar el detalle del producto
    this.renderProductDetails();

    // Actualizar el título del documento dinámicamente
    document.title = `Sleep Outside | ${this.product.Name}`;

    // Agregar listener al botón "Add to Cart"
    const addToCartBtn = document.querySelector("#addToCart");
    if (addToCartBtn) {
      addToCartBtn.addEventListener(
        "click",
        this.addProductToCart.bind(this)
      );
    }
  }

  addProductToCart() {
    // Obtener carrito desde localStorage o crear uno vacío
    let cart = getLocalStorage("so-cart") || [];

    // Agregar el producto actual
    cart.push(this.product);

    // Guardar carrito actualizado en localStorage
    setLocalStorage("so-cart", cart);
  }

  renderProductDetails() {
    const container = document.querySelector(".product-detail");
    if (container) {
      container.innerHTML = productDetailsTemplate(this.product);
    }
  }
}

// --- Helpers ---
function productDetailsTemplate(product) {
  const imgUrl = buildImageUrl(product.Images?.PrimaryLarge);

  return `
    <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img class="divider"
         src="${imgUrl}"
         alt="${product.NameWithoutBrand}" />
    <p class="product-card__price">$${product.ListPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">${product.DescriptionHtmlSimple}</p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>`;
}
