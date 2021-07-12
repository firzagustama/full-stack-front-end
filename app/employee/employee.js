'use strict';

angular.module('myApp.employee', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/employee', {
    templateUrl: 'employee/employee.html',
    controller: 'EmployeeCtrl'
  });
}])
.value()
.controller('EmployeeCtrl', ['apiUrl', 'showAlert', '$scope', '$rootScope', '$http', '$window', function(apiUrl, showAlert, $scope, $rootScope, $http, $window) {
    if (sessionStorage.getItem('session') == null) {
        return $window.location.href = '?#!/login';
    }
    $rootScope.sessionKey = sessionStorage.getItem('session');
    $rootScope.title = 'Employee'
    $rootScope.navlink = 'employee'

    var fetchEmployee = function() {
        var page = $scope.currentPage - 1, size = 5;
        var requestBody = {
            "page": page,
            "size": size
        };

        $http.post(apiUrl.employeeAll, requestBody)
        .then(function successCallback(response) {
            console.log(response);
            $scope.employees = response.data.employees;
            $scope.totalPage = Math.ceil(response.data.count / size);
            console.log($scope.totalPage);
        }, function errorCallback(response) {
            console.log(response);
            if (response.status == 401) {
                $window.location.href = '?#!/user/login';
            }
        })
    }

    // page opened
    fetchEmployee(apiUrl, showAlert, $scope, $http);

    // goToPage
    $scope.goToPage = function(destinationPage) {
        $scope.currentPage = destinationPage;
        fetchEmployee();
    }

    // previousPage
    $scope.previousPage = function() {
        $scope.currentPage--;
        fetchEmployee();
    }

    // nextPage
    $scope.nextPage = function() {
        $scope.currentPage++;
        fetchEmployee();
    }

    // cud
    $scope.showModal = function(operation) {
        $scope.currOperation = operation;
        $scope.id = null;
        $scope.name = null;
        $scope.gender = "Laki-laki";
        $scope.birthPlace = null;
        $scope.bod = null;
        $scope.address = null;
        $scope.phoneNumber = null;
    }
    $scope.update = function(operation, data) {
        console.log(data);
        $scope.currOperation = operation;
        $scope.id = data.id;
        $scope.name = data.name;
        $scope.gender = data.gender;
        $scope.birthPlace = data.birthPlace;
        $scope.bod = data.bod;
        $scope.address = data.address;
        $scope.phoneNumber = data.phoneNumber;
    }
    $scope.save = function() {
        console.log($scope.currOperation);
        var requestBody = {
            "id": $scope.id,
            "name": $scope.name,
            "gender": $scope.gender,
            "birthPlace": $scope.birthPlace,
            "bod": $scope.bod,
            "address": $scope.address,
            "phoneNumber": $scope.phoneNumber,
        }
        console.log("RequestBody", requestBody);
        var url = $scope.currOperation == 'Add' ? apiUrl.employeeCreate : apiUrl.employeeUpdate;
        console.log("URL", url);

        $http.post(url, requestBody)
        .then(function successCallback(response) {
            showAlert("Success " + $scope.currOperation + " employee")
            fetchEmployee();
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
        $http.post(apiUrl.employeeDelete, requestBody)
        .then(function successCallback(response) {
            showAlert("Success Remove employee");
            fetchEmployee();
        }, function errorCallback(response) {
            showAlert(response.data.errorMsg);
        })
    }

    $scope.gender = 'Laki-laki';

}]);


