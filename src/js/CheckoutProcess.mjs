import {getLocalStorage} from "./utils.mjs";

// export default class CheckoutProcess {
//     constructor(key, outputSelector) {
//         this.key = key;

//     }
//     displaySubtotal(cart, parentElement) {
//         let total = 0;
//         cart.forEach(item => {
//             total = total + item.FinalPrice;
//         });
//         parentElement.innerHTML = `$ ${total}`;
//     }

//     displayTotal(subtotal, parentTax, parentShipping, parentTotal, cart) {
//         let tax = subtotal * 0.06;
//         let shipping = 10;
//         if (cart.length > 1) {
//             shipping = 2 * (cart.length - 1);
//         }
//         let total = tax + shipping + subtotal;
//         parentTax.innerHTML = `$ ${tax}`;
//         parentShipping.innerHTML = `$ ${shipping}`;
//         parentTotal.innerHTML = `$ ${total}`;
//     }
// }

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
    this.itemCount = 0;
  }
  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSubTotal();
  }
  calculateItemSubTotal() {
    // calculate and display the total dollar amount of the items in the cart, and the number of items.
    this.itemTotal = 0;
    this.itemCount = 0;
    this.list.forEach(item => {
      // Assuming items have FinalPrice and Quantity properties
      const price = item.FinalPrice || item.price || 0;
      const quantity = item.Quantity || item.quantity || 1;
      this.itemTotal += price * quantity;
      this.itemCount += quantity;
    });
    this.displayItemSummary();
  }
    calculateOrderTotal() {
    // calculate the tax and shipping amounts
    this.tax = this.itemTotal * 0.06; // 6% sales tax
    // Shipping: $10 for first item + $2 for each additional item
    if (this.itemCount > 0) {
      this.shipping = 10 + (this.itemCount - 1) * 2;
    } else {
      this.shipping = 0;
    }
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
    // display the totals
    this.displayOrderTotals();
  }
}

function packageItems(items) {
  return items.map(item => ({id: item.Id, name: item.Name, price: item.FinalPrice, quantity: 1}));
}

async function checkout(form) {
  
}