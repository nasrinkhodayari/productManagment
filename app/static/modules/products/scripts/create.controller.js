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
                $scope.editMode = false;
                let selectedItem = JSON.parse(sessionStorage.getItem("selectedItem"));

                if (window.location.href.split('?', 2)[1]) {
                    if (selectedItem) {
                        if (selectedItem.product_id == window.location.href.split('?', 2)[1]) {
                            $scope.editMode = true;
                            $scope.productInfo = selectedItem;
                        } else {
                            toastFactory.showSimpleToast('Something went wrong!');
                            window.location.href = "#/list";
                            $scope.editMode = true;
                        }
                    }
                    $scope.editMode
                }

                const getProductImages = function () {

                };
                const checkAuthentication = function(err){
                    if (err.data.auth === false) {
                        window.location.href = "#/login";
                      }
                };
                $scope.getMerchantsList = function () {
                    $http.defaults.headers.common.Authorization = sessionStorage.getItem('token');
                    $http.get('/services/merchants')
                        .then(result => {
                            $scope.merchantsList = result.data.body;
                        }).catch(err => {
                            checkAuthentication(err);
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
                            checkAuthentication(err);
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
                $scope.submitProduct = function () {
                    $http.defaults.headers.common.Authorization = sessionStorage.getItem('token');
                    if (!$scope.editMode) {
                        $http.post('/services/product', $scope.productInfo)
                            .then(result => {
                                toastFactory.showSimpleToast('Product added succesfully');
                                window.location.href = '#/list';
                            }).catch(err => {
                                checkAuthentication(err);
                                toastFactory.showSimpleToast(err.data.message);
                                console.log(err);
                            });
                    } else {
                        if (selectedItem) {
                            $http.put('/services/product/' + selectedItem.product_id, $scope.productInfo)
                                .then(result => {
                                    toastFactory.showSimpleToast('Product update succesfully');
                                    // window.location.href = '#/list';
                                }).catch(err => {
                                    checkAuthentication(err);
                                    toastFactory.showSimpleToast(err.data.message);
                                    console.log(err);
                                });
                        }
                    }
                };
            }]);