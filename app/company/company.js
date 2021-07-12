'use strict';

angular.module('myApp.company', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/company', {
    templateUrl: 'company/company.html',
    controller: 'CompanyCtrl'
  });
}])
.value()
.controller('CompanyCtrl', ['apiUrl', 'showAlert', '$scope', '$rootScope', '$http', '$window', function(apiUrl, showAlert, $scope, $rootScope, $http, $window) {
    if (sessionStorage.getItem('session') == null) {
        return $window.location.href = '?#!/login';
    }
    $rootScope.sessionKey = sessionStorage.getItem('session');
    $rootScope.navlink = 'company'
    $rootScope.title = 'Company'

    var fetch = function() {
        var page = $scope.currentPage - 1, size = 5;
        var requestBody = {
            "page": page,
            "size": size
        };

        $http.post(apiUrl.companyAll, requestBody)
        .then(function successCallback(response) {
            console.log(response);
            $scope.companies = response.data.companies;
            $scope.totalPage = Math.ceil(response.data.count / size);
            console.log($scope.totalPage);
        }, function errorCallback(response) {
            console.log(response);
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
        $scope.address = null;
        $scope.phoneNumber = null;
    }
    $scope.update = function(operation, data) {
        console.log(data);
        $scope.currOperation = operation;
        $scope.id = data.id;
        $scope.name = data.name;
        $scope.address = data.address;
        $scope.phoneNumber = data.phoneNumber;
    }
    $scope.save = function() {
        console.log($scope.currOperation);
        var requestBody = {
            "id": $scope.id,
            "name": $scope.name,
            "address": $scope.address,
            "phoneNumber": $scope.phoneNumber,
        }
        console.log("RequestBody", requestBody);
        var url = $scope.currOperation == 'Add' ? apiUrl.companyCreate : apiUrl.companyUpdate;
        console.log("URL", url);

        $http.post(url, requestBody)
        .then(function successCallback(response) {
            showAlert("Success " + $scope.currOperation + " company")
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
        $http.post(apiUrl.companyDelete, requestBody)
        .then(function successCallback(response) {
            showAlert("Success Remove company");
            fetch();
        }, function errorCallback(response) {
            showAlert(response.data.errorMsg);
        })
    }
}]);


