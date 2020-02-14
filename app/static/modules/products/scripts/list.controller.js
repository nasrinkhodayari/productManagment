angular.module('ProductModule', ["CreateProductModule"]).
  controller('ProductListController',
    ['$scope', '$http', 'toastFactory', '$mdBottomSheet',
      function ($scope, $http, toastFactory, $mdBottomSheet) {

        $scope.pageItems = 5;
        $scope.selectedContent = '';
        let selectedContentForDelete = [];

        const deleteOperation = function (records) {
          $http.delete(productUrls.baseproductUrl + JSON.stringify(records))
            .then(result => {
              selectedContentForDelete = [];
              $scope.loadDatas();
            }).catch(err => {
              toastFactory.showSimpleToast(err.data.message);
              if (err.data.auth === false) {
                window.location.href = "#/login";
              }
            });
        }
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
          $http.get(productUrls.baseproductUrl)
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
          if (checked)
            selectedContentForDelete.push(selectedContent.product_id);
          else {
            selectedContentForDelete.splice(selectedContentForDelete.indexOf(selectedContent.product_id), 1);
          }
        };
        $scope.doBulkDelete = function () {
          if (selectedContentForDelete.length === 0) {
            toastFactory.showSimpleToast('Please select some item for delete.');
            return;
          }
          if (confirm("Are you sure to delete this items?"))
            deleteOperation(selectedContentForDelete);
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
        $scope.doAction = function (selectedContent, $event) {
          $mdBottomSheet.show({
            controller: function ($scope) {
              $scope.deleteItem = function () {
                $mdBottomSheet.hide();
                if (confirm("Are you sure to delete this item?")) {
                  $http.defaults.headers.common.Authorization = sessionStorage.getItem('token');
                  deleteOperation(selectedContent.product_id);
                }
              };
              $scope.editItem = function () {
                $mdBottomSheet.hide();
                sessionStorage.setItem('selectedItem', JSON.stringify(selectedContent));
                window.location.href = "#/addUpdate?" + selectedContent.product_id;
              };
            },
            targetEvent: $event,
            template: '<md-bottom-sheet class="md-grid"><span flex></span><md-button aria-label="Delete" ng-click="deleteItem()"><i class="tiny-delete-button material-icons md-18">delete</i></md-button><md-button aria-label="Edit" ng-click="editItem()"><i class="tiny-edit-button material-icons md-18">edit</i></md-button></md-bottom-sheet>'
          }).then(function () {

          });
        };
      }]);