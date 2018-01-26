angular.module('todo',[])
  .controller('mainCtrl',function ($scope,$http) {
    $scope.todos = [];

    $http({
      url : '/api',
      method : 'get'
    }).then(function (res) {
      $scope.todos = res.data;
    })

    $scope.deleteTodo = function (id) {
      console.log(id);
      $http({
        url : '/deleteTodo',
        method : 'post',
        data : {id:id}
      }).then(function (res) {
        $scope.todos = res.data;
      })
    }

    $scope.addTodo = function () {
      $http({
        url : '/addTodo',
        method: 'post',
        data : {msg : $scope.newTodo}
      }).then(function (res) {
          $scope.newTodo = "";
          $scope.todos = res.data;
      })
    }

  })
