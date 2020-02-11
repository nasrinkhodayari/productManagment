var app = angular.module('productManagment', [
    "ngRoute",
    "AuthModule",
    "ProductModule",
    "httpRequestModule"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/login", {
            templateUrl: "./modules/authentication/templates/login.html",
            controller: "AuthController"
        })
        .when("/register", {
            templateUrl: "./modules/authentication/templates/register.html",
            controller: "AuthController"
        })
        .when("/list", {
            templateUrl: "./modules/products/templates/list.html",
            controller: "ProductController"
        })
        .when("/creat", {
            templateUrl: "./modules/products/templates/creat.html",
            controller: "ProductController"
        })
        .when("/edit", {
            templateUrl: "./modules/products/templates/edit.html",
            controller: "ProductController"
        });
});