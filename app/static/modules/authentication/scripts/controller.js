angular.module('AuthModule', []).controller('AuthController',
    ['$scope', '$http', '$window', 'toastFactory',
        function ($scope, $http, $window, toastFactory) {
            $scope.login = function () {
                $http.post('/services/auth/login', $scope.userInfo)
                    .then(result => {
                        toastFactory.showSimpleToast(result.data.message);
                        $window.location.href='#/list';
                        sessionStorage.setItem('token', result.data.token);
                    }).catch(err => {
                        //Implement error
                        toastFactory.showSimpleToast(err.data.message);
                        console.log(err);
                    });
            }
            $scope.register = function () {
                $http.post('/services/auth/register', $scope.userInfo)
                    .then(data => {
                        sessionStorage.setItem('token', data.token);
                    }).catch(err => {
                        //Implement error
                        console.log(err);
                    });
            }
            $scope.logout = function () {
                $http.get('/services/auth/logout')
                    .then(data => {
                        //Implement logout
                    }).catch(err => {
                        //Implement error
                        console.log(err);
                    });
            }
        }]);