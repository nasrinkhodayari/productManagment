angular.module('CreateProductModule', []).
    controller('ProductCreateController',
        ['$scope', '$http', 'httpRequestFactory', 'toastFactory', '$filter', '$mdBottomSheet',
            function ($scope, $http, httpRequestFactory, toastFactory, $filter, $mdBottomSheet) {
                let categoriesList = [];
                $scope.firstCatChildes = [];
                $scope.secondCatChildes = [];
                $scope.lastCatChildes = [];
                $scope.productInfo = {};
                $scope.productInfo.images = [];

                $scope.getMerchantsList = function () {
                    $http.defaults.headers.common.Authorization = sessionStorage.getItem('token');
                    $http.get('/services/merchants')
                        .then(result => {
                            $scope.merchantsList = result.data.body;
                        }).catch(err => {
                            toastFactory.showSimpleToast(err.data.message);
                            if (err.data.auth === false) {
                                window.location.href = "#/login";
                            }
                        });
                };
                $scope.getMerchantsList();

                $scope.getCategoriesList = function () {
                    $http.defaults.headers.common.Authorization = sessionStorage.getItem('token');
                    $http.get('/services/categories')
                        .then(result => {
                            categoriesList = result.data.body;
                            $scope.parentCategories = [];
                            categoriesList.forEach(item => {
                                if (item.parent_id === 0)
                                    $scope.parentCategories.push(item);
                            });
                        }).catch(err => {
                            toastFactory.showSimpleToast(err.data.message);
                            if (err.data.auth === false) {
                                window.location.href = "#/login";
                            }
                        });
                };
                $scope.getCategoriesList();
                $scope.loadFirstChildes = function (catId) {
                    $scope.firstCatChildes = [];
                    $scope.secondCatChildes = [];
                    $scope.lastCatChildes = [];
                    categoriesList.forEach(item => {
                        if (item.parent_id == catId) {
                            $scope.firstCatChildes.push(item);
                        }
                    });
                    if ($scope.firstCatChildes.length === 0)
                        $scope.productInfo.category_id = catId;
                };
                $scope.loadSecondChildes = function (catId) {
                    categoriesList.forEach(item => {
                        if (item.parent_id == catId) {
                            $scope.secondCatChildes.push(item);
                        }
                    });
                    if ($scope.secondCatChildes.length === 0)
                        $scope.productInfo.category_id = catId;
                };
                $scope.loadLastChildes = function (catId) {
                    categoriesList.forEach(item => {
                        if (item.parent_id == catId) {
                            $scope.lastCatChildes.push(item);
                        }
                    });
                    if ($scope.lastCatChildes.length === 0)
                        $scope.productInfo.category_id = catId;
                };
                $scope.addNewProduct = function (cate) {
                    
                    $http.defaults.headers.common.Authorization = sessionStorage.getItem('token');
                    $http.post('/services/product', $scope.productInfo)
                        .then(result => {
                            toastFactory.showSimpleToast(result.data.message);
                            window.location.href = '#/list';
                        }).catch(err => {
                            toastFactory.showSimpleToast(err.data.message);
                            console.log(err);
                        });
                };
            }]);