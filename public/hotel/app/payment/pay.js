'use strict'
angular.module('myApp.pay', ['ngRoute', 'angularPayments','ui.materialize'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/pay/:resev_id', {
            templateUrl: 'payment/pay.html',
            controller: 'PayController'
        });
    }])
    .controller('PayController', function ($scope, $http, reservationData, $location, $routeParams) {
        $scope.res_id = $routeParams.resev_id;
        $scope.paid = false;

        $scope.handelStripe = function (status, response) {
            console.log(response);
            if (response.error) {
                $scope.paid = false;
                $scope.message = "Error from Stripe.com";
            } else {
                var $payInfo = {
                    'token': response.id,
                    'customer_id': $scope.reservation_info.customer_id,
                    'total': $scope.reservation_info.total_price
                };
                console.log($payInfo);
                $http.post('/api/payreservation', $payInfo)
                    .success(function(data){
                            console.log(data);
                            $scope.message = data.message;
                            if (data.status == 'OK') {
                                $scope.paid = true;
                            } else {
                                $scope.paid = false;
                            }
                        }
                );
                    // $http.post('/api/payreservation', $payInfo)
                    //.then(
                    //    function (data) {
                    //        console.log(data);
                    //        $scope.message = data.message;
                    //        if (data.status == 'OK') {
                    //            $scope.paid = true;
                    //        } else {
                    //            $scope.paid = false;
                    //        }
                    //    },
                    //    function (data) {
                    //        console.log(data);
                    //    }
                    //);
            }
        }
        $scope.init = function () {
            $scope.loaded = false;
            console.log($scope.res_id);
            $http.get('/api/reservation/'+$scope.res_id).success(function(data){
                $scope.reservation_info = data;
                console.log(data);
                $scope.loaded=true;
            });
            //$http.get('/api/reservation/' + $scope.res_id).then(function (data) {
            //    $scope.reservation_info = data;
            //    console.log(data);
            //    $scope.loaded = true;
            //}, function () {
            //    console.log('reservation not found');
            //})
        }
        $scope.init();
    });