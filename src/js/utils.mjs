// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

/**
 * Recupera un parámetro de la URL (ej. ?product=123 → getParam("product") devuelve "123")
 */
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

/**
 * Renderiza una lista en el DOM usando una función plantilla
 * @param {Function} templateFn - Función que devuelve un string HTML para un item
 * @param {HTMLElement} parentElement - Elemento del DOM donde insertar
 * @param {Array} list - Array de items a renderizar
 * @param {string} position - Dónde insertar HTML ("afterbegin", "beforeend", etc.)
 * @param {boolean} clear - Si true, limpia parentElement antes de insertar
 */
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  if (clear) {
    parentElement.innerHTML = ""; // limpia contenido si se pide
  }

  const htmlStrings = list.map(templateFn).join("");
  parentElement.insertAdjacentHTML(position, htmlStrings);
}
