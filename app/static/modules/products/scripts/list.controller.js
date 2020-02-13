angular.module('ProductModule', ["CreateProductModule"]).
  controller('ProductListController',
    ['$scope', '$http', 'httpRequestFactory', 'toastFactory', '$filter', '$mdBottomSheet',
      function ($scope, $http, httpRequestFactory, toastFactory, $filter, $mdBottomSheet) {

        $scope.pageItems = 5;
        $scope.selectedContent = '';
        $scope.headers = [
          {
            contentField: 'default_image',
            contentType: 'image',
            label: 'DefaultImage'
          },
          {
            contentField: 'title',
            contentType: 'text',
            label: 'Name'
          }, {
            contentField: 'categoryName',
            contentType: 'text',
            label: 'Category'
          }, {
            contentField: 'price',
            contentType: 'text',
            label: 'Price'
          }, {
            contentField: 'available',
            contentType: 'text',
            label: 'Status'
          }
        ];
        $scope.loadDatas = function () {
          $http.defaults.headers.common.Authorization = sessionStorage.getItem('token');
          $http.get('/services/product')
            .then(result => {
              $scope.contents = result.data.body;
            }).catch(err => {
              toastFactory.showSimpleToast(err.data.message);
              if (err.data.auth === false) {
                window.location.href = "#/login";
              }
            });
        };
        $scope.loadDatas();
        $scope.selectOperation = function (checked, selectedContent) {
          console.log('Is it checked ? ' + checked);
          console.log(selectedContent);
        };
        $scope.doBulkDelete = function () {
          alert('wait to I come back :) I am implementing add new product');
        };
        $scope.doSearch = function (productName) {
          $http.defaults.headers.common.Authorization = sessionStorage.getItem('token');
          $http.get('/services/product/' + productName)
            .then(result => {
              $scope.contents = result.data.body;
            }).catch(err => {
              toastFactory.showSimpleToast(err.data.message);
              if (err.data.auth === false) {
                window.location.href = "#/login";
              }
            });
        };
        $scope.doDelete = function (selectedContent, $event) {
          $mdBottomSheet.show({
            controller: function ($scope) {
              $scope.deleteItem = function () {
                $mdBottomSheet.hide();
              };
            },
            targetEvent: $event,
            template: '<md-bottom-sheet class="md-grid"><span flex></span><md-button aria-label="Delete" ng-click="deleteItem()"><i class="material-icons md-18">delete</i></md-button></md-bottom-sheet>'
          }).then(function () {
            let records = [];
            records.push(selectedContent.product_id);
            let items = JSON.stringify({ ids: selectedContent.product_id });
            $http.defaults.headers.common.Authorization = sessionStorage.getItem('token');
            $http.delete('/services/product/' + records)
              .then(result => {
                $scope.loadDatas();
              }).catch(err => {
                toastFactory.showSimpleToast(err.data.message);
                if (err.data.auth && err.data.auth === false) {
                  window.location.href = "#/login";
                }
              });
          });
        };
       
      }]);