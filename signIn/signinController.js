// signInController.js

app.controller('signin', ['$scope', '$http', '$location','$window', function($scope, $http, $location,$window) {
  $scope.email = '';
  $scope.pass = '';

  $scope.signinfun = function() {
    const obj = {
      email: $scope.email,
      pass: $scope.pass
    };

    $http.post('http://localhost:3000/api/signin', obj)
      .then(function(response) {
        console.log(response.data.message);
        // alert(response.data.message);
        if (response.data.message === 'Sign in successful') {
          $window.open('/movieDashboard/dashboard.html','_self');
        }
      })
      .catch(function(error) {
        console.error('Error:', error);  // Log the entire error object
        const errorMessage = (error.data && error.data.message) ? error.data.message : 'An error occurred';
        alert(errorMessage);
      });
  };
}]);
