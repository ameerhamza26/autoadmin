//app.js

angular.module('Autotek', ['ui.router', 'Autotek.controller', 'CoreApi', 'LocalStorageModule', 'Autotek.directive'])
    .config(function($stateProvider, $urlRouterProvider,localStorageServiceProvider) {

        $urlRouterProvider.otherwise('login');

        $stateProvider

            .state('login', {
            url: "/login",
            templateUrl: "/EnglishTemplates/login.html",
            controller: "LoginCtrl",
        })
        .state('logina', {
            url: "/logina",
            templateUrl: "/EnglishTemplates/login.html",
            controller: "LoginCtrl",
        })
        .state('logout', {
            url: "/logout",
            templateUrl: "/EnglishTemplates/login.html",
            controller: "LogoutCtrl"
        })
        // .state('app', {
        //     url: "/",
        //     abstract: true,
        //     template: '<ui-view/>'
        //    // templateUrl: "/EnglishTemplates/dashboard.html"
        // })

        .state('dashboard', {
            url: "/dashboard",
            templateUrl: "/EnglishTemplates/dashboard.html",
            controller:"DashboardApiCtrl"
        })
        .state('salesagents', {
            url: "/salesagents",
            templateUrl: "/EnglishTemplates/agents/index.html",
            controller:"salesAgentsCtrl"
            // resolve: {
            //     loginRequired: function(User) {
            //         return User.loginRequired();
            //     }
            // }
        })

        .state('promotions', {
            url: "/promotions",
            templateUrl: "/EnglishTemplates/promotions/index.html",
            controller:"PromotionCtrl"
            // resolve: {
            //     loginRequired: function(User) {
            //         return User.loginRequired();
            //     }
            // }
        })

        .state('holidays', {
            url: "/holidays",
            templateUrl: "/EnglishTemplates/holidays.html",
            //controller:"PromotionCtrl"
            // resolve: {
            //     loginRequired: function(User) {
            //         return User.loginRequired();
            //     }
            // }
        })

        .state('branchsetup', {
            url: "/branchsetup",
            templateUrl: "/EnglishTemplates/branchsetup.html",
            controller:"BranchSetupCtrl"
            // resolve: {
            //     loginRequired: function(User) {
            //         return User.loginRequired();
            //     }
            // }
        })

        .state('servicesetup', {
            url: "/servicesetup",
            templateUrl: "/EnglishTemplates/servicesetup.html",
            //controller:"BranchSetupCtrl"
            // resolve: {
            //     loginRequired: function(User) {
            //         return User.loginRequired();
            //     }
            // }
        })
        .state('companies', {
            url: "/companies",
            templateUrl: "/EnglishTemplates/companies/index.html",
            controller: "companiesCtrl"
            // resolve: {
            //     loginRequired: function(User) {
            //         return User.loginRequired();
            //     }
            // }
        })

        .state('mobileappusers', {
            url: "/mobileappusers",
            templateUrl: "/EnglishTemplates/appusers/index.html",
            controller: "mobile_app_users_page",
            // resolve: {
            //     loginRequired: function(User) {
            //         return User.loginRequired();
            //     }
            // }
        })
        .state('addMobileUser', {
            url: "/addMobileUser",
            templateUrl: "/EnglishTemplates/appusers/manage.html",
            controller: "addNewAppUser"
        })
           .state('addSalesAgent', {
            url: "/addSalesAgent",
            templateUrl: "/EnglishTemplates/agents/manage.html",
            controller: "addNewSalesAgent"
        })
            .state('addPromotion', {
            url: "/addPromotion",
            templateUrl: "/EnglishTemplates/promotions/manage.html",
            controller: "addNewPromotion"
        })
           .state('updateMobileUser', {
            url: "/updateMobileUser/:id",
            templateUrl: "/EnglishTemplates/appusers/update.html",
            controller: "AppSingleuser"
        })
            .state('updateCompany', {
            url: "/updateCompany/:id",
            templateUrl: "/EnglishTemplates/companies/update.html",
            controller: "SingleCompany"
        })
            .state('updatePromotion', {
            url: "/updatePromotion/:id",
            templateUrl: "/EnglishTemplates/promotions/update.html",
            controller: "SinglePromotion"
        })
         .state('updateSalesAgents', {
            url: "/updateSalesAgents/:id",
            templateUrl: "/EnglishTemplates/agents/update.html",
            controller: "SingleSalesAgent"
        })
           .state('addCompany', {
            url: "/addCompany",
            templateUrl: "/EnglishTemplates/companies/manage.html",
            controller: "companiesCtrl"
        })
        
        .state('appuserdetail', {
            url: "/appuser/:id",
            templateUrl: "/EnglishTemplates/appusers/detail.html",
            controller:"AppSingleuser",
        })
         .state('saleAgentdetail', {
            url: "/salesagent/:id",
            templateUrl: "/EnglishTemplates/agents/detail.html",
            controller:"SingleSalesAgent",
        })
             .state('companydetail', {
            url: "/company/:id",
            templateUrl: "/EnglishTemplates/companies/detail.html",
            controller:"SingleCompany",
        })
          .state('Promotiondetail', {
            url: "/promotion/:id",
            templateUrl: "/EnglishTemplates/promotions/detail.html",
            controller:"SinglePromotion",
        })
        .state('registration_page', {
            url: "/registration_page",
            templateUrl: "/EnglishTemplates/appusers/manage.html",
            controller: "SignupCtrl"
        })
         .state('saleAgentsReports', {
            url: "/saleAgentsReports",
            templateUrl: "/EnglishTemplates/reports/salesagentsreport.html",
            controller: "salesAgentsCtrl"
        })
         .state('companiesReports', {
            url: "/companiesReports",
            templateUrl: "/EnglishTemplates/reports/companiesreport.html",
            controller: "companiesCtrl"
        })
        .state('profile_details_page', {
            url: "/profile_details_page",
            templateUrl: "/EnglishTemplates/appusers/detail.html",
            controller: "profile_details_page"
        })

        //----- Arabic Routes -----//
        .state('appusersa',{
            url:"/appusersa",
            templateUrl:"/ArabicPages/appusers/index.html",
            controller:"mobile_app_users_page"
        })
        .state('companiesa', {
            url: "/companiesa",
            templateUrl: "/ArabicPages/companies/index.html",
            controller:"companiesCtrl"
        })
         .state('agentsa', {
            url: "/agentsa",
            templateUrl: "/ArabicPages/agents/index.html",
            controller:"salesAgentsCtrl"
        })
         .state('promotionsa', {
            url: "/promotionsa",
            templateUrl: "/ArabicPages/promotions/index.html",
            controller:"PromotionCtrl"
        })
         .state('dashboarda', {
            url: "/dashboarda",
            templateUrl: "/ArabicPages/dashboard.html"
        })
        //      $rootScope.navigate=function(state,params){
        //     var lang=localStorageService.get('pageLanguage');
        //     console.log(lang);
        //     if(lang=='en'){
        //         if(params){
        //                 $state.go(state,params)
        //         }
        //         else{
        //             $state.go(state)
        //         }
        //     }
        //     else{
        //         if(params){
        //             $state.go(state + 'a',params)
        //         }
        //         else{
        //             $state.go(state +'a')
        //         }
        //     }
        // }
        localStorageServiceProvider
            .setPrefix('Autotek');
    })
// .run(function(){
       
// })

.run(function($rootScope, $state, $location){
     
   $rootScope.actives = [true, false,false,false,false,false];
   $rootScope.navigateState = function(state) {
       $state.go(state)


       if (state == 'dashboard') {
           $rootScope.actives = [true,false,false,false,false,false,false];
       }
       if (state == 'mobileappusers') {
           $rootScope.actives = [false, true,false,false,false,false,false];
       }
       if (state == 'companies') {
           $rootScope.actives = [false, false,true,false,false,false,false];
       }
       if (state == 'salesagents') {
           $rootScope.actives = [false, false,false,true,false,false,false];
       }
        if (state == 'promotions') {
           $rootScope.actives = [false, false,false,false,true,false,false];
       }
        if (state == 'saleAgentsReports') {
           $rootScope.actives = [false, false,false,false,false,true,false];
       }
       if (state == 'companiesReports') {
           $rootScope.actives = [false, false,false,false,false,false,true];
       }
   }

   var currentUrl = $location.url();
   if (currentUrl.includes("dashboard")) {
       $rootScope.actives = [true,false,false,false,false,false,false];
   }
   if (currentUrl.includes("mobileappusers")) {
        $rootScope.actives = [false, true,false,false,false,false,false];
   }
   if (currentUrl.includes("companies")) {
       $rootScope.actives = [false, false,true,false,false,false,false];
   }
   if (currentUrl.includes("salesagents")) {
       $rootScope.actives = [false, false,false,true,false,false,false];
   }
   if (currentUrl.includes("promotions")) {
       $rootScope.actives = [false, false,false,false,true,false,false];
   }
   if (currentUrl.includes("saleAgentsReports")) {
       $rootScope.actives = [false, false,false,false,false,true,false];
   }
   if (currentUrl.includes("companiesReports")) {
       $rootScope.actives = [false, false,false,false,false,false,true];
   }
})