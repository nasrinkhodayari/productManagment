var productManagment = angular.module('productManagment', [
    'ngMaterial', 'ngAnimate', 'ngMessages', 'ngAria', 'ui.router',
    "AuthModule", "ProductModule", "toastModule", "material.components.table"]);

(function (app) {
    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('login', {
            url: '/',
            templateUrl: "./modules/authentication/templates/login.html",
            controller: "AuthController"
        }).state('register', {
            url: '/register',
            templateUrl: "./modules/authentication/templates/register.html",
            controller: "AuthController"
        }).state("/list", {
            url: '/list',
            templateUrl: "./modules/products/templates/list.html",
            controller: "ProductListController"
        }).state("/addUpdate", {
            url: '/addUpdate',
            templateUrl: "./modules/products/templates/addUpdate.html",
            controller: "AddUpdateController"
        });
    }]);
    app.directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    });
})(productManagment);