'use strict';

var myApp = angular.module('myApp', ['ngAnimate', 'ngRoute']);

myApp
.config(function($routeProvider) {
//.config(function($routeProvider, $locationProvider) {

    $routeProvider
    .when('/test', {
        templateUrl: 'partials/test.html',
        controller: 'TodoListController'
    })
    .when('/lists', {
        templateUrl: 'partials/lists.html',
        controller: 'listsController'
    })
    .when('/', {
        controller:'mainCtrl'
    })
    .otherwise({
        redirectTo:'/'
    });
    // use the HTML5 History API
    //$locationProvider.html5Mode(true);
    //$locationProvider.html5Mode({
    //    enabled: true,
    //    requireBase: false
    //});
});