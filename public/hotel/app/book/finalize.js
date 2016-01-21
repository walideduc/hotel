/**
 * Created by walid on 13/01/16.
 */

'use strict';

angular.module('myApp.finalize', ['ngRoute','ui.materialize'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/finalize', {
            templateUrl: 'book/finalize.html',
            controller: 'FinalizeController'
        });
    }])

    .controller('FinalizeController', function($scope,$http,reservationData,$location) {

        $scope.start_dt;
        $scope.end_dt;
        $scope.room_info;
        $scope.occupancy;
        $scope.reservation_info;
        $scope.reser_done;
        $scope.customer={};

        $scope.init = function(){


            $scope.start_dt = reservationData.getValue('start_dt');
            $scope.end_dt = reservationData.getValue('end_dt');
            $scope.occupancy=reservationData.getValue('occupancy');;
            $scope.room_info=reservationData.getValue('room_info');

            if($scope.room_info==null){
                $location.path('/book');
            }
        };

        $scope.init();

        $scope.book = function(){

            var reservationInfo;
            console.log($scope.customer);

            reservationInfo = {
                'customer':$scope.customer,
                'room_info':$scope.room_info,
                'start_dt':$scope.start_dt,
                'end_dt':$scope.end_dt,
                'occupancy':$scope.occupancy
            };
            console.log(reservationInfo);
            $http.post('/api/createreservation',reservationInfo).success(function(data){
                console.log(data);
                $scope.reser_done=true;
                $scope.reservation_info = data;


            });
        }
    }
);