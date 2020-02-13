var productManagment = angular.module('productManagment', [
    'ngMaterial', 'ngAnimate', 'ngMessages', 'ngAria', 'ui.router',
    "AuthModule", "ProductModule", "httpRequestModule", "toastModule", "material.components.table"]);

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
            controller: "ProductController"
        }).state("/create", {
            url: '/create',
            templateUrl: "./modules/products/templates/create.html",
            controller: "ProductController"
        }).state("/edit", {
            url: '/edit',
            templateUrl: "./modules/products/templates/edit.html",
            controller: "ProductController"
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