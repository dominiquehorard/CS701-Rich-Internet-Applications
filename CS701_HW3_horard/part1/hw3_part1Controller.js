angular.module('myApp', [])
.controller('CartControler', function ($scope) {

    $scope.defaultBooks = [];

    //if statement to check local storage for JSON objects to populate the page with
    if (localStorage.getItem("books_horard") === null) {
        $scope.defaultBooks = [
            {title: 'Absolute Java', qty: 1, price: 114.95},
            {title: 'Pro HTML5',     qty: 2, price: 27.95},
            {title: 'Head First HTML5', qty: 1, price: 27.89}
        ];
    }

    else {
        $scope.defaultBooks = JSON.parse(localStorage.books_horard)
    }


      $scope.removeBook = function(index) {
        //removing the book from within the controller scope at the specified index
        //specifying that we are only deleting that one item
        $scope.defaultBooks.splice(index, 1);
      }
      
      $scope.addBook = function() {

          //pushing a new book object to the defaultBooks array
          //the view will update automatically with the new array object
          $scope.defaultBooks.push({
              title: 'New Book',
              qty: 1,
              price: 10.99
          })

      }

      $scope.saveBooks = function() {

          //sending the JSON object to local storage
          localStorage.setItem("books_horard",JSON.stringify($scope.defaultBooks))

      }
      
      $scope.updateTotal = function() {
          let total = 0;

          /*looping through the json object multiplying the price by the quantity*/
          /*both values can be dynamically changed in the application and that will take effect here*/
          for (let i = 0; i < $scope.defaultBooks.length; i++) {
              total += $scope.defaultBooks[i].price * $scope.defaultBooks[i].qty;
          }

          return total;
      }
        

    }
);
 