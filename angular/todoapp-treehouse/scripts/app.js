angular.module("todoListApp", [])

// MAIN CONTROLLER

// dataService is the name of a service being injected (DI)
.controller('mainCtrl', function($scope, dataService) { 
  
  $scope.helloService = dataService.hello;

  $scope.helloWorld = function(index) {
    console.log("Element " + index + " clicked. Setting focus to input not working properly yet");
  }
  
  dataService.getTodos(function(response) { 
    console.log(response.data);
    $scope.todos = response.data;
  });
  
  $scope.deleteTodo = function(todo, index) {
    dataService.deleteTodo(todo);
    $scope.todos.splice(index, 1) // splice is a standard js method used in todos array
  }
  
  $scope.saveTodos = function() {
    var editedItems = $scope.todos.filter(function(todo) {
      return todo.edited;
    });    
    dataService.saveTodos(editedItems);
  }
  
  $scope.addTodo = function() {
    var todo = { name: "New todo", completed: false };
    $scope.todos.unshift(todo);  // adds to the beginning - push(todo) would add to the end    
  };
})

// DATA SERVICE

// $http is a provider being injected to the service 
//REF https://docs.angularjs.org/api/ng/service/$http
.service('dataService', function($http) { 
  
  this.hello = function(){ 
    console.log ('Hello from the outside');
  };
  
  // get and then are chained methods of $http. 
  // getTodos must be called with a callback function as argument which must also have the response as its parameter. This way, the callback deals with the response data only after 'then' method has received it.
  this.getTodos = function(sucessCallback) {   
    $http.get('mock/todos.json').then(sucessCallback) 
  };
  
  this.deleteTodo = function(todo) {
    console.log ( todo.name + " has been deleted");
  };
  
  this.saveTodos = function(editedItems) {
    console.log ( editedItems.length + " items have been saved");
  };
});


//REF: http://fdietz.github.io/recipes-with-angular-js/consuming-external-services/requesting-json-data-with-ajax.html