angular.module('todoListApp').directive('todos', function() {
  return {
    templateUrl: 'templates/todos.html',
    controller: 'mainCtrl',
    replace: false  //default = false - if true, supresses the directive tag in the final html
  }
});