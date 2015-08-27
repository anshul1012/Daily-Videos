app.controller('LogoutController', ['$scope','$location','$window', function($scope,$location,$window){
    $scope.goToLogin = function(){

        $location.path('/');
        $window.location.reload();
        //$scope.$apply();
    };
}]);