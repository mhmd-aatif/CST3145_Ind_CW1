//the root Vue instance
let webstore = new Vue({
  el: "#app", // links to the div
  // the data option
  data: {
    sitename: "activitystore", // defines sitename
    products: products,
    order: {
      //order details
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      method: "Home",
      gift: "Send as a gift",
      sendGift: "Send as a gift",
      dontSendGift: "Do not send as a gift",
      cart: "",
    }, //order locations
    states: {
      DXB: "Dubai",
      SHJ: "Sharjah",
      ADH: "Abu Dhabi",
    }, //sort options
    sort: {
      by: "Price",
      order: "a",
    },
    search: "",
    cart: [], //creating cart array
    showProduct: true,
    showPlaceOrder: false,
    displayCart: [],
  },
  // the methods option
  methods: {
    //method for adding item
    addItem(product) {
      if (product.space > 0) {
        product.displaySpace -= 1;
        this.cart.push(product.id);
        this.displayCart.push({
          id: product.id,
          title: product.title,
          location: product.location,
          price: product.price,
          image: product.image,
          rating: product.rating,
        });
      }
    },
    //method for showing cart page
    showCheckout() {
      this.showProduct = this.showProduct ? false : true;
    },
    //method for disabling add to cart button
    canAdd(product) {
      return product.space > this.cartCount(product.id);
    },
    //method for checking number of same items in cart
    cartCount(id) {
      let count = 0;
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i] === id) {
          count++;
        }
      }
      return count;
    },
    //method for placing order
    submitForm() {
      let order = [];

      for (let i = 0; i < this.displayCart.length; i++) {
        order.push(this.displayCart[i].title);
      }

      let text = "";

      for (let i = 0; i < order.length; i++) {
        text += order[i] + ", ";
      }

      this.order.cart = text.slice(0, -2);
      this.showPlaceOrder = true;
    },
    //method for removing item from cart
    removeItem(product) {
      const objWithIdIndex = this.displayCart.findIndex(
        (obj) => obj.id === product.id
      );
      this.displayCart.splice(objWithIdIndex, 1);

      const index = this.cart.indexOf(product.id);
      if (index > -1) {
        // only splice array when item is found
        this.cart.splice(index, 1); // 2nd parameter means remove one item only
      }

      for (let j = 0; j < this.products.length; j++) {
        if (product.id === this.products[j].id) {
          this.products[j].displaySpace += 1;
        }
      }

      return this.displayCart;
    },
  },
  computed: {
    cartItemCount() {
      return this.cart.length || "";
    },
    //method for enabling cart page button
    canCheckOut() {
      return this.cart.length != 0;
    },
    //method for enabling place order button
    canPlaceOrder() {
      return (
        this.order.firstName.match(/^[A-Za-z]+$/) &&
        this.order.lastName.match(/^[A-Za-z]+$/) &&
        this.order.address != "" &&
        this.order.city.match(/^[A-Za-z]+$/) &&
        this.order.zip != "" &&
        this.order.state != ""
      );
    },
    //method for searching and sorting products
    sortedProducts() {
      if (this.search !== "") {
        return this.products.filter(
          (item) =>
            item.title.toLowerCase() === this.search.toLowerCase() ||
            item.location.toLowerCase() === this.search.toLowerCase()
        );
      } else {
        switch (this.sort.order) {
          case "a":
            x = 1;
            y = -1;
            break;
          case "d":
            x = -1;
            y = 1;
            break;
        }

        if (this.sort.by == "Subject") {
          function compare(a, b) {
            if (a.title > b.title) return x;
            if (a.title < b.title) return y;
            return 0;
          }
        } else if (this.sort.by == "Location") {
          function compare(a, b) {
            if (a.location > b.location) return x;
            if (a.location < b.location) return y;
            return 0;
          }
        } else if (this.sort.by == "Price") {
          function compare(a, b) {
            if (a.price > b.price) return x;
            if (a.price < b.price) return y;
            return 0;
          }
        } else if (this.sort.by == "Space") {
          function compare(a, b) {
            if (a.displaySpace > b.displaySpace) return x;
            if (a.displaySpace < b.displaySpace) return y;
            return 0;
          }
        }

        return this.products.sort(compare);
      }
    },
  },
});
