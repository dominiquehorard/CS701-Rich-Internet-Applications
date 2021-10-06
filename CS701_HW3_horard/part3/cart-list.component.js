angular.module("cartApp")
    .component('cartList', {
        templateUrl: 'cart-list/cart-list.template.html',
        /*controller property with all the same functionality as in part 1*/
        /*template should be using bindings and the controller's model properties*/
        /*https://docs.angularjs.org/tutorial/step_03*/
        controller: function CartListController() {

        //this is holding previous instance of the JSON object before they are modified
        this.undoArr = [];
        this.redoArr = [];

        let undoBtn = document.getElementById('undo');
        let redoBtn = document.getElementById('redo');

        undoBtn.disabled = true;
        redoBtn.disabled = true;

        //this will always be the last element in the array of snapshots
        /*this.lastSnapUndo = 0;
        this.lastSnapRedo = 0;
*/
        /*assigning all methods to the controller instead of the scope using the "this"
        * keyword
        * that will then be called in the template when we need to refer to the data*/

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

              //this will always be the last element in the array of snapshots
              /*this.lastSnapUndo += 1;*/

              //how we're creating a snapshot of the previous
              //setting the previous snap to the last instance of the default books array
              this.undoArr = this.defaultBooks.slice()

              this.defaultBooks.splice(index, 1);

              //removing the disabled attribute from the undo button now that there is something to undo
              undoBtn.disabled = false;

          }

          this.addBook = function() {

              //how we're creating a snapshot of the previous
              //setting the previous snap to the last instance of the default books
              this.undoArr = this.defaultBooks.slice()

              this.newBook = {
                  title: 'New Book',
                  qty: 1,
                  price: 10.99
              }

              //pushing new book to array
              this.defaultBooks.push(this.newBook)

              //removing the disabled attribute from the undo button now that there is something to undo
              undoBtn.disabled = false;

              //this will always be the last element in the array of snapshots
              //have to check that the snap array is greater than 1 increment counter
              /*if (this.previousSnapArr.length > 1) {
                  this.lastSnapUndo += 1;
              }*/

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

          this.undoAction = function() {

              /*if (this.lastSnapUndo >= 0) {
                    //enabling the redo once an undo is done
                    //need to wrap it in a conditional so it isn't active if some array length isn't > 0
                    document.getElementById('undo').disabled = false;

                    //need to check if the lastSnapUndo counter is
                    //if it is, do not subtract from the counter
                    //just set the defaultBooks are to previous snap

                    if (this.previousSnapArr.length > 1) {
                        //need to make the previousSnap the current JSON object
                        //reverting to the previous snapshot of defaultBooks prior to the splice
                        this.defaultBooks = this.previousSnapArr[this.lastSnapUndo];

                        //subtracting the counter to go to the most recent instance of the object
                        this.lastSnapUndo -= 1;

                        //removing that last snapshot to keep the length of the array the same
                        this.previousSnapArr.pop();
                    }

                    if (this.previousSnapArr.length === 1) {
                        this.defaultBooks = this.previousSnapArr[this.lastSnapUndo];

                        this.lastSnapUndo -= 1;

                        //removing that last snapshot to keep the length of the array the same
                        this.previousSnapArr.pop();
                    }

                    else {
                        this.defaultBooks = this.previousSnapArr[this.lastSnapUndo];

                        //removing that last snapshot to keep the length of the array the same
                        this.previousSnapArr.pop();
                    }

                    //sending that last snap to the snaps array for a redo if needed
                    /!*this.previousSnapArr.push(this.previousSnapArr[this.lastSnap]);*!/

                    //setting the redo button to active since we've made a change that can be redone
                    /!*document.getElementById('redo').disabled = false;*!/

                };*/

              this.redoArr = this.defaultBooks.slice();

              //setting the original array back to the last instance stored in the historical array
              this.defaultBooks = this.undoArr

              //setting the redo button to active since we've made a change that can be redone
              document.getElementById('redo').disabled = false;

              //enabling the button
              redoBtn.disabled = false;
            }

            //we're supposed to be redoing the undo
            this.redoAction = function() {

                //need to increment the last snap counter to look at the last item in the event
                //of an undo that needs to be redone
                /*this.lastSnap += 1*/

                //reverting to the previous snapshot of defaultBooks prior to the splice
                this.defaultBooks = this.redoArr;

                //setting the last snap counter back in the event of another undo
                /*this.lastSnap -= 1*/
            }
        }
      });
  