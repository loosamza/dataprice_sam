var app = angular.module('app', ['ngSanitize', 'ngResource', 'ngMaterial', 'md.data.table']);


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
    $scope.orderBook = {};
    //Your $http request
    bxFactory.getMarketData().then(function (response) {
        // console.log(response.data);
        for (var key in response.data) {
            if (response.data[key].primary_currency === 'THB') {
                $scope.marketDataList.push(response.data[key]);
            }
        }

        $scope.marketDataList.forEach(function (value) {
            bxFactory.getOrderBook(value.pairing_id).then(function (currencyRes) {
                $scope.orderBook[value.secondary_currency] = [];
                $scope.orderBook[value.secondary_currency].push(currencyRes.data);

            })
        });
        console.log($scope.marketDataList);
        console.log($scope.orderBook);
    });


    console.log('mainController');
});



