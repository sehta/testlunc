'use strict';

/* Controllers */

angular.module('app')
    // Chart controller 
    .controller('LoginCtrl', ['$scope', '$http', '$state', '$timeout', 'clientId', function ($scope, $http, $state, $timeout, clientId) {

        $scope.login = {};
        $scope.loggedInUser = null;


        if (clientId.value != '')
            $state.go('app.dashboard');


        $scope.getlogin = function () {
            console.log($scope.login);
            var logininfo = { 'username': $scope.login.username.$modeValue, 'password': $scope.login.password.$modeValue };
            $.post('/login', logininfo, function (data, status, xhr) {
                alert("Updated user status");
            });
        };

        
        

      

        $http.get("/api/getLoggedInUser")
                         .success(function (data) {

                             if (data) {
                                 $scope.loggedInUser = data;
                                 console.log("User is logged in.", data);
                                 clientId.value = data;
                                 debugger;
                                 if (data.adminStatus == true) {
                                     $state.go('app.admindashboard');
                                 }
                                 else {
                                     $state.go('app.dashboard');
                                 }
                              

                             }
                             else
                                 console.log("User is not logged in.");

                         })
                         .error(function (data) {
                             console.log("Error:" + data);
                         });

        $scope.isRole = function (id) {
            return $scope.loggedInUser.role.indexOf(id) > -1;
        }

        $scope.refreshTest = function (portlet) {
            console.log("Refreshing...");
            // Timeout to simulate AJAX response delay
            $timeout(function () {
                $(portlet).portlet({
                    refresh: false
                });
            }, 2000);

        }


    }]);