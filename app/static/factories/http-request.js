angular.module('httpRequestModule', []).
    factory('httpRequestFactory', function ($http) {
        $http.defaults.headers.common.Authorization = sessionStorage.getItem('token');
        const httpGet = (url) => {
            $http.get(url)
                .then(data => {
                }).catch(err => {
                    //Implement error
                    console.log(err);
                });
        };
        const httpPost = (url, input) => {
            $http.post(url, input, config)
                .then(data => {
                }).catch(err => {
                    //Implement error
                    console.log(err);
                });
        };
        const httpPut = (url, input) => {
            $http.put(url, input, config)
                .then(data => {
                }).catch(err => {
                    //Implement error
                    console.log(err);
                });
        };
        const httpDelete = (url, input) => {
            $http.delete(url, input, config)
                .then(data => {
                }).catch(err => {
                    //Implement error
                    console.log(err);
                });
        };

        return {
            httpDelete: httpDelete,
            httpGet: httpGet,
            httpPost: httpPost,
            httpPut: httpPut
        }
    });