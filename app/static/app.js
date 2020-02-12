var productManagment = angular.module('productManagment', [
    'ngMaterial', 'ngAnimate', 'ngMessages', 'ngAria', 'ui.router',
    "AuthModule", "ProductModule", "httpRequestModule","toastModule"]);

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
        })
            .state("/creat", {
                url: 'creat',
                templateUrl: "./modules/products/templates/creat.html",
                controller: "ProductController"
            })
            .state("/edit", {
                url: 'edit',
                templateUrl: "./modules/products/templates/edit.html",
                controller: "ProductController"
            });
    }]);
})(productManagment);