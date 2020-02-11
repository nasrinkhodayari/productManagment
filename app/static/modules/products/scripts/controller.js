angular.module('ProductModule', []).
    controller('ProductController',
        ['$scope', 'httpRequestFactory', function ($scope,httpRequestFactory) {
debugger
            httpRequestFactory.httpGet('/services/product');
        }]);