//app.js

angular.module('Autotek', ['ui.router', 'starter.controller', 'CoreApi', 'LocalStorageModule', 'starter.directive'])
    .config(function($stateProvider, $urlRouterProvider, localStorageServiceProvider) {

        $urlRouterProvider.otherwise('/dashboard');

        $stateProvider

            .state('app', {
            url: "/login",
            templateUrl: "/EnglishTemplates/login.html",
            controller: "LoginCtrl",
            resolve: {
                isLoggedIn: function(User) {
                    return User.isLoggedIn();
                }
            }

        })

        .state('logout', {
            url: "/logout",
            templateUrl: "/pages/login.html",
            controller: "LogoutCtrl"
        })


        .state('dashboard', {
            url: "/dashboard",
            templateUrl: "/pages/dashboard.html",
            resolve: {
                loginRequired: function(User) {
                    return User.loginRequired();
                }
            }
        })

        .state('salesagents', {
            url: "/salesagents",
            templateUrl: "/pages/salesagents.html",
            resolve: {
                loginRequired: function(User) {
                    return User.loginRequired();
                }
            }
        })

        .state('promotions', {
            url: "/promotion",
            templateUrl: "/pages/promotions.html",
            resolve: {
                loginRequired: function(User) {
                    return User.loginRequired();
                }
            }
        })

        .state('test', {
            url: "/test",
            templateUrl: "/companies/index.html",
            controller:"test",
            resolve: {
                loginRequired: function(User) {
                    return User.loginRequired();
                }
            }
        })

        .state('mobileappusers', {
            url: "/mobileappusers",
            templateUrl: "/appusers/index.html",
            controller: "mobile_app_users_page",
            resolve: {
                loginRequired: function(User) {
                    return User.loginRequired();
                }
            }
        })
         .state('addMobileUser', {
            url: "/addMobileUser",
            templateUrl: "appusers/manage.html",
            controller: "SignupCtrl"
        })
        .state('registration_page', {
            url: "/registration_page",
            templateUrl: "/pages/appusers/manage.html",
            controller: "SignupCtrl"
        })

        .state('profile_details_page', {
            url: "/profile_details_page",
            templateUrl: "/pages/appusers/detail.html",
            controller: "profile_details_page"
        })

        localStorageServiceProvider
            .setPrefix('Autotek');
    })

.config(["$locationProvider", function($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]);
