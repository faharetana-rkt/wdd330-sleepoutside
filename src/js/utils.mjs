// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

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

// get parameters from the URL
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

// this is a function to render and insert the template literal strings inside a parent element
// templateFn is the function to use to map the list of product
// parent element is the parent element inside the DOM where we'll append the template literals
// list is the product list or an array of object
// position is the position where to insert inside DOM: beforebegin, afterbegin, beforeend, afterend
// clear is a boolean to check if we want to clear the parent element beforehand
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  // clear parentElement if clear is true
  if(clear) {
    parentElement.innerHTML = "";
  }
  const templateArray = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, templateArray.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if(callback) {
    callback(data);
  }
}

export async function loadTemplate(path){
    try{
      const response = await fetch(path);
      if(!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const template = await response.text();
        return template;
    
  } catch(error) {
    console.error('Error loading template:', error);
  }
}

export async function loadHeaderFooter() {
  try {
    // Load header template
    const headerTemplate = await loadTemplate("../partials/header.html");
    const headerElement = document.querySelector("#main-header");
    if (headerElement) {
      renderWithTemplate(headerTemplate, headerElement);
    }

    // Load footer template
    const footerTemplate = await loadTemplate("../partials/footer.html");
    const footerElement = document.querySelector("#main-footer");
    if (footerElement) {
      renderWithTemplate(footerTemplate, footerElement);
    }
  } catch (error) {
    console.error("Error loading header or footer:", error);
  }
}

// This is the function to render the superscript number of items in the backpack icon
export function renderNumberOfItemsBackpack(element, key) {
  // Get the array from localstorage, if the there's no array, instantiate an empty array
  let productArray = getLocalStorage(key) || [];
  // Display the length of the array inside the chose element
  element.innerHTML = productArray.length;
}