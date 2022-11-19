//the root Vue instance
let webstore = new Vue({
  el: "#app", // links to the div
  // the data option
  data: {
    sitename: "coursestore", // defines sitename
    products: products,
    order: {
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
    },
    states: {
      DXB: "Dubai",
      SHJ: "Sharjah",
      ADH: "Abu Dhabi",
    },
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
        });
      }
    },
    showCheckout() {
      this.showProduct = this.showProduct ? false : true;
    },
    canAdd(product) {
      return product.space > this.cartCount(product.id);
    },
    cartCount(id) {
      let count = 0;
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i] === id) {
          count++;
        }
      }
      return count;
    },
    submitForm() {
      /* alert(
        "Order Placed Successfully!\nTotal Courses : " +
          this.cart.length +
          "\nFirst Name : " +
          this.order.firstName +
          "\nLast Name : " +
          this.order.lastName +
          "\nAddress : " +
          this.order.address +
          "\nCity : " +
          this.order.city +
          "\nZip : " +
          this.order.zip +
          "\nEmirate : " +
          this.order.state +
          "\nGift : " +
          this.order.gift +
          "\nMethod : " +
          this.order.method
      ); */

      let order = [];

      for (let i = 0; i < this.displayCart.length; i++) {
        order.push(this.displayCart[i].title);
      }

      let text = "";

      for (let i = 0; i < order.length; i++) {
        text += order[i] + ", ";
      }

      /*     function getItem(id) {
        let data = JSON.parse(this.products);
        let product = data.filter((d) => d.id === id);

        document.getElementById("order").setInnerHTML +=
          "<p>" + product.title + "</p>";
      } */
      this.order.cart = text.slice(0, -2);
      this.showPlaceOrder = true;
    },
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
    canCheckOut() {
      return this.cart.length != 0;
    },
    canPlaceOrder() {
      return (
        this.order.firstName != "" &&
        this.order.lastName != "" &&
        this.order.address != "" &&
        this.order.city != "" &&
        this.order.zip != "" &&
        this.order.state != ""
      );
    },
    sortedProducts() {
      function compare(a, b) {
        if (a.price > b.price) return 1;
        if (a.price < b.price) return -1;
        return 0;
      }

      return this.products.sort(compare);
    },
  },
});
