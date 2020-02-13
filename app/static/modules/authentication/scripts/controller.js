angular.module('AuthModule', []).controller('AuthController',
    ['$scope', '$http', 'toastFactory',
        function ($scope, $http, toastFactory) {
            $scope.login = function () {
                $http.post(apiBaseUrl+authUrls.login, $scope.userInfo)
                    .then(result => {
                        toastFactory.showSimpleToast(result.data.message);
                        window.location.href='#/list';
                        sessionStorage.setItem('token', result.data.token);
                    }).catch(err => {
                        //Implement error
                        toastFactory.showSimpleToast(err.data.message);
                        console.log(err);
                    });
            }
            $scope.register = function () {
                $http.post(apiBaseUrl+authUrls.register, $scope.userInfo)
                    .then(data => {
                        sessionStorage.setItem('token', data.token);
                        toastFactory.showSimpleToast(result.data.message);
                    }).catch(err => {
                        toastFactory.showSimpleToast(err.data.message);
                    });
            }
            $scope.logout = function () {
                $http.get(apiBaseUrl+authUrls.logout)
                    .then(data => {
                        //Implement logout
                    }).catch(err => {
                        //Implement error
                        console.log(err);
                    });
            }
        }]);