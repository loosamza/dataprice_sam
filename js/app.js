var app = angular.module('app', ['ngSanitize', 'ngResource', 'ngMaterial']);


// --------------- Factory ------------------
app.factory('bxFactory', function ($http) {

    var nodeUrl = 'http://localhost:3000/getData';
    var url = 'https://bx.in.th/api/';

    var factory = {};

    factory.getMarketData = function () {
        return $http.post(nodeUrl, {url: url});
    }

    factory.getCurrencyPairings = function () {
        return $http.post(nodeUrl, {url: url + 'pairing/'})
    }

    factory.getOrderBook = function (pairingId) {
        return $http.post(nodeUrl, {url: url + 'orderbook/?pairing=' + pairingId});
    }

    factory.getRecentTrades = function (pairingId) {
        return $http.post(nodeUrl, {url: url + 'trade/?pairing=' + pairingId})
    }

    return factory;

});


app.controller('mainController', function (bxFactory, $scope, $window) {

    $scope.marketDataList = [];
    //Your $http request
    bxFactory.getMarketData().then(function (response) {
        // console.log(response.data);
        for (var key in response.data) {
            if (response.data[key].primary_currency === 'THB') {
                $scope.marketDataList.push(response.data[key]);
            }
        }
        console.log($scope.marketDataList);
    });

    console.log('mainController');
});



