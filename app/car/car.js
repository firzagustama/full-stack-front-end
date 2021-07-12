'use strict';

angular.module('myApp.car', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/car', {
    templateUrl: 'car/car.html',
    controller: 'CarCtrl'
  });
}])
.value()
.controller('CarCtrl', ['apiUrl', 'showAlert', '$scope', '$rootScope', '$http', '$window' , function(apiUrl, showAlert, $scope, $rootScope, $http, $window) {
    if (sessionStorage.getItem('session') == null) {
        return $window.location.href = '?#!/login';
    }
    $rootScope.sessionKey = sessionStorage.getItem('session');
    $rootScope.title = 'Car';
    $rootScope.navlink = 'car';

    var fetch = function() {
        var page = $scope.currentPage - 1, size = 5;
        var requestBody = {
            "page": page,
            "size": size
        };

        $http.post(apiUrl.carAll, requestBody)
        .then(function successCallback(response) {
            console.log(response);
            $scope.cars = response.data.cars;
            $scope.totalPage = Math.ceil(response.data.count / size);
            console.log('total page:', $scope.totalPage);
        }, function errorCallback(response) {
            console.log('ERROR', response);
            if (response.status == 401) {
                $window.location.href = '?#!/login';
            }
        })
    }

    // page opened
    fetch();

    // goToPage
    $scope.goToPage = function(destinationPage) {
        $scope.currentPage = destinationPage;
        fetch();
    }

    // previousPage
    $scope.previousPage = function() {
        $scope.currentPage--;
        fetch();
    }

    // nextPage
    $scope.nextPage = function() {
        $scope.currentPage++;
        fetch();
    }

    // cud
    $scope.showModal = function(operation) {
        $scope.currOperation = operation;
        $scope.id = null;
        $scope.name = null;
        $scope.brand = null;
        $scope.price = null;
    }
    $scope.update = function(operation, data) {
        console.log(data);
        $scope.currOperation = operation;
        $scope.id = data.id;
        $scope.name = data.name;
        $scope.brand = data.brand;
        $scope.price = parseInt(data.price.amount.replaceAll('\.', ''));
    }
    $scope.save = function() {
        console.log($scope.currOperation);
        var requestBody = {
            "id": $scope.id,
            "name": $scope.name,
            "brand": $scope.brand,
            "price": $scope.price,
        }
        console.log("RequestBody", requestBody);
        var url = $scope.currOperation == 'Add' ? apiUrl.carCreate : apiUrl.carUpdate;
        console.log("URL", url);

        $http.post(url, requestBody)
        .then(function successCallback(response) {
            showAlert("Success " + $scope.currOperation + " car")
            fetch();
        }, function errorCallback(response) {
            showAlert(response.data.errorMsg);
        })
    }
    $scope.updateDeleteId = function(id) {
        console.log("delete id", id);
        $scope.deleteId = id;
    }
    $scope.remove = function() {
        var id = $scope.deleteId;
        console.log("delete id", id);
        var requestBody = {
            "id": id
        };
        $http.post(apiUrl.carDelete, requestBody)
        .then(function successCallback(response) {
            showAlert("Success Remove company");
            fetch();
        }, function errorCallback(response) {
            showAlert(response.data.errorMsg);
        })
    }
}]);


