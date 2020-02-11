angular.module('AuthModule', []).controller('AuthController',
    ['$scope', '$http', function ($scope, $http) {
        $scope.login = function () {
            $http.post('/services/auth/login', $scope.userInfo)
                .then(result => {
                    sessionStorage.setItem('token', result.data.token);
                }).catch(err => {
                    //Implement error
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