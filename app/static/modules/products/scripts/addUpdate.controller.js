angular.module('CreateProductModule', []).
    controller('AddUpdateController',
        ['$scope', '$http','toastFactory', '$filter', '$mdBottomSheet',
            function ($scope, $http, toastFactory) {
                let categoriesList = [];
                let selectedItem = JSON.parse(sessionStorage.getItem("selectedItem"));
                let categoryTmp = [];
                $scope.firstCatChildes = [];
                $scope.secondCatChildes = [];
                $scope.lastCatChildes = [];
                $scope.productInfo = {};
                $scope.productInfo.images = [];
                $scope.editMode = false;

                const getProductImages = function (product_id) {
                    $http.defaults.headers.common.Authorization = sessionStorage.getItem('token');
                    $http.get(productUrls.baseproductUrl+productUrls.getProductImages + product_id)
                        .then(result => {
                            $scope.productInfo.images = [];
                            result.data.body.forEach(img => {
                                $scope.productInfo.images.push(img.image);
                            });
                        }).catch(err => {
                            checkAuthentication(err);
                            toastFactory.showSimpleToast(err.data.message);
                            if (err.data.auth === false) {
                                window.location.href = "#/login";
                            }
                        });
                };
                const checkAuthentication = function (err) {
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
                            if ($scope.editMode) {
                                categoryTmp.push(selectedItem.categoryName);
                                $scope.productInfo.categoryName = getSelectedProductCategoryChain(selectedItem);
                            }
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
                        $http.post(productUrls.baseproductUrl, $scope.productInfo)
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
                            $http.put(productUrls.baseproductUrl + selectedItem.product_id, $scope.productInfo)
                                .then(result => {
                                    toastFactory.showSimpleToast('Product update succesfully');
                                    window.location.href = '#/list';
                                }).catch(err => {
                                    checkAuthentication(err);
                                    toastFactory.showSimpleToast(err.data.message);
                                    console.log(err);
                                });
                        }
                    }
                };
                const getSelectedProductCategoryChain = function (currentCat) {
                    let currentCatObj = categoriesList.filter(item => { return item.category_id === currentCat.category_id });
                    categoriesList.forEach(catItem => {
                        if (catItem.category_id === currentCatObj[0].parent_id) {
                            categoryTmp.push(catItem.title);
                            getSelectedProductCategoryChain(catItem);
                        }
                    });

                    let finalResult = '';
                    for (var iCat = categoryTmp.length - 1; iCat >= 0; iCat--) {
                        finalResult += categoryTmp[iCat];
                        if (iCat != 0)
                            finalResult += '>';
                    }
                    return finalResult;
                };
                if (window.location.href.split('?', 2)[1]) {
                    if (selectedItem) {
                        if (selectedItem.product_id == window.location.href.split('?', 2)[1]) {
                            $scope.editMode = true;
                            $scope.productInfo = selectedItem;
                            getProductImages(selectedItem.product_id);
                        } else {
                            toastFactory.showSimpleToast('Something went wrong!');
                            window.location.href = "#/list";
                            $scope.editMode = true;
                        }
                    }
                    $scope.editMode
                }
            }]);