angular.module("cartApp")
    .component('cartList', {
        templateUrl: 'cart-list/cart-list.template.html',
        /*controller property with all the same functionality as in part 1*/
        /*template should be using bindings and the controller's model properties*/
        /*https://docs.angularjs.org/tutorial/step_03*/
        controller: function CartListController() {

        /*assigning all methods to the controller instead of the scope using the "this"
        * keyword
        * that will then be called in the template when we need to refer to the data*/
            this.defaultBooks = []

            if (localStorage.getItem("books_horard") === null) {
                this.defaultBooks = [
                    {title: 'Absolute Java', qty: 1, price: 114.95},
                    {title: 'Pro HTML5',     qty: 2, price: 27.95},
                    {title: 'Head First HTML5', qty: 1, price: 27.89}
                ];
            }

            else {
                this.defaultBooks = JSON.parse(localStorage.books_horard)
            }


          this.removeBook = function(index) {
              this.defaultBooks.splice(index, 1);
          }

          this.addBook = function() {
              this.defaultBooks.push({
                  title: 'New Book',
                  qty: 1,
                  price: 10.99
              })
          }

          this.saveBooks = function() {
              localStorage.setItem("books_horard",JSON.stringify(this.defaultBooks))
          }

          this.updateTotal = function() {
              var total = 0;

              for (let i = 0; i < this.defaultBooks.length; i++) {
                  total += this.defaultBooks[i].price * this.defaultBooks[i].qty;
              }

              return total;
          }

        console.log(this.defaultBooks);
        }
      });
  