'use strict';

angular.module('myApp.chart', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'chart/chart.html',
    controller: 'ChartCtl'
  });
}])
.value()
.controller('ChartCtl', ['apiUrl', 'showAlert', '$scope', '$rootScope', '$http', '$window', function(apiUrl, showAlert, $scope, $rootScope, $http, $window) {
    if (sessionStorage.getItem('session') == null) {
        return $window.location.href = '?#!/login';
    }
    $rootScope.sessionKey = sessionStorage.getItem('session');
    $rootScope.navlink = 'dashboard';
    $rootScope.title = 'Dashboard';
    $scope.option = 1;



    $scope.updateChart = function(option) {
        $scope.option = option;
        fetch();
    }

    var fetch = function() {
        $http.post(apiUrl.chart, {"option": $scope.option})
        .then(function successCallback(response) {
            $scope.labels = response.data.label;
            $scope.data = response.data.data;
        }, function errorCallback(response) {
            console.log(response);
            showAlert(response.data.errorMsg);
        });
    }
    fetch();
}]);


