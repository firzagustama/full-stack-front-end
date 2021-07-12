'use strict';

angular.module('myApp.user.logout', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/logout', {
    template: '',
    controller: 'UserLogoutCtrl'
  });
}])
.value()
.controller('UserLogoutCtrl', ['apiUrl', 'showAlert', '$scope', '$rootScope', '$http', '$window', '$cookies', '$q', function(apiUrl, showAlert, $scope, $rootScope, $http, $window, $cookies, $q) {
    $http.post(apiUrl.userLogout, {})
    .then(function successCalback(response) {
        console.log(response);
        sessionStorage.removeItem('session');
        $rootScope.sessionKey = null;

        $window.location.href = '?#!/login';
    }, function errorCallback(response) {
        console.log(response);
        sessionStorage.removeItem('session');
        $rootScope.sessionKey = null;

        $window.location.href = '?#!/login';
    })
}]);


