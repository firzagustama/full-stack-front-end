'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  'ngCookies',
  'chart.js',
  'myApp.user',
  'myApp.user.logout',
  'myApp.employee',
  'myApp.company',
  'myApp.car',
  'myApp.chart'
])
.constant('env', 'local')
.constant('baseUrl', {
    local: 'http://127.0.0.1:8080',
    test: 'https://test.co.id',
    staging: 'https://staging.co.id',
    prod: 'https://prod.co.id',
})
.constant('showAlert', function(message) {
    var alertBox = angular.element(document.querySelector('#alertBox'));
    var alertMsg = angular.element(document.querySelector('#alertMsg'));

    alertBox.css('display','flex');
    alertBox.css('justify-content','center');
    alertMsg.html(message);
})
.service('apiUrl', function(env, baseUrl) {
    this.userLogin = baseUrl[env] + '/user/login';
    this.userLogout = baseUrl[env] + '/user/logout';
    this.userRegister = baseUrl[env] + '/user/register';
    this.employeeAll = baseUrl[env] + '/employee/';
    this.employeeCreate = baseUrl[env] + '/employee/create';
    this.employeeUpdate = baseUrl[env] + '/employee/update';
    this.employeeDelete = baseUrl[env] + '/employee/delete';
    this.companyAll = baseUrl[env] + '/company/';
    this.companyCreate = baseUrl[env] + '/company/create';
    this.companyUpdate = baseUrl[env] + '/company/update';
    this.companyDelete = baseUrl[env] + '/company/delete';
    this.carAll = baseUrl[env] + '/car/';
    this.carCreate = baseUrl[env] + '/car/create';
    this.carUpdate = baseUrl[env] + '/car/update';
    this.carDelete = baseUrl[env] + '/car/delete';
    this.chart = baseUrl[env] + '/chart';
})
.config(['$locationProvider', '$routeProvider', '$httpProvider', function($locationProvider, $routeProvider, $httpProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/login'});

    $httpProvider.defaults.headers.common = {
        'Authorization': sessionStorage.getItem('session'),
    }
}])
.controller('NavBarCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    $rootScope.sessionKey = sessionStorage.session;
}])

