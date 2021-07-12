'use strict';

angular.module('myApp.user', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'user/user.html',
    controller: 'UserCtrl'
  });
}])
.value()
.controller('UserCtrl', ['apiUrl', 'showAlert', '$rootScope', '$scope', '$http', '$window', '$cookies', '$q', function(apiUrl, showAlert, $rootScope, $scope, $http, $window, $cookies, $q) {
    if (sessionStorage.getItem('session') != null) {
        $rootScope.sessionKey = sessionStorage.getItem('session');
        return $window.location.href = '?#!/dashboard'
    }

    $scope.login = function() {
        // check if null
        if ($scope.loginId == null || $scope.loginId == "") {
            showAlert("Username / Email Address can't be blank");
            return;
        }
        if ($scope.password == null || $scope.password == "") {
            showAlert("Password can't be blank");
            return;
        }

        var loginId = $scope.loginId;
        var isUsingEmail = new RegExp(".*@.*\\..*").exec(loginId) != null;
        console.log(isUsingEmail);

        // compose requestBody
        var requestBody = {};
        if (isUsingEmail) {
            requestBody.email = loginId;
        } else {
            requestBody.username = loginId;
        }
        requestBody.password = $scope.password
        console.log(requestBody);

        // login request
        $http.post(apiUrl.userLogin, requestBody)
        .then(function successCallback(response) {
            // set cookies
            $cookies = response.headers('session');

            // set session (for local testing purposes)
            var sessionKey = response.headers('session');
            sessionStorage.setItem('session', sessionKey)

            $http.defaults.headers.common.Authorization = sessionKey;
            $rootScope.sessionKey = sessionKey;

            $window.location.href = '?#!/dashboard';
        }, function errorCallback(response) {
            console.log(response);
            showAlert(response.data.errorMsg);
        });
    }
    $scope.register = function() {
            if ($scope.username == null || $scope.username == "") {
                return showAlert("Username can't be blank");
            }
            if ($scope.email == null || $scope.email == "") {
                return showAlert("Email Address can't be blank");
            }
            if ($scope.password == null || $scope.password.length < 8) {
                return showAlert("Password can't be blank or must be more than 8");
            }

            // compose requestBody
            var requestBody = {
                "username": $scope.username,
                "email": $scope.email,
                "password": $scope.password
            };
            console.log("Request Body", requestBody);

            // register
            $http.post(apiUrl.userRegister, requestBody)
            .then(function successCallback(response) {
                sessionStorage.setItem('session', response.headers('session'));
                $http.defaults.headers.common.Authorization = response.headers('session');
                $rootScope.sessionKey = response.headers('session');

                $window.location.href = '?#!/employee';
            }, function errorCallback(response) {
                showAlert(response.data.errorMsg);
            });
        }
}]);


