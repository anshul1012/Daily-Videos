/**
 * Created by achaturvedi on 8/18/2015.
 */
var app = angular.module('myApp', ['ngRoute']);
app.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/home',{
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        }).
        when('/login',{
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        }).
        when('/play/:id',{
            templateUrl: 'views/player.html',
            controller: 'PlayerController'
        }).
        otherwise({
            redirectTo: '/login'
        });
}]);