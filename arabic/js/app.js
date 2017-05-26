//app.js

angular.module('AutotekArabic', ['ui.router', 'AutotekArabic.controller', 'CoreApi', 'LocalStorageModule', 'AutotekArabic.directive'])
    .config(function($stateProvider, $urlRouterProvider,localStorageServiceProvider) {

        $urlRouterProvider.otherwise('dashboarda');

        $stateProvider

            .state('dashboarda', {
            url: "/dashboarda",
            templateUrl: "../arabic/ArabicPages/dashboard.html",
            controller:"DashboardApiCtrl"
        })
        .state('login', {
            url: "/login",
            templateUrl: "../EnglishTemplates/login.html",
            controller: "LoginCtrl",
        })
        // .state('logout', {
        //     url: "/logout",
        //     templateUrl: "/EnglishTemplates/login.html",
        //     controller: "LogoutCtrl"
        // })
        // // .state('app', {
        // //     url: "/",
        // //     abstract: true,
        // //     template: '<ui-view/>'
        // //    // templateUrl: "/EnglishTemplates/dashboard.html"
        // // })

        // .state('dashboard', {
        //     url: "/dashboard",
        //     templateUrl: "/EnglishTemplates/dashboard.html"
        // })
        // .state('salesagents', {
        //     url: "/salesagents",
        //     templateUrl: "/EnglishTemplates/agents/index.html",
        //     controller:"salesAgentsCtrl"
        //     // resolve: {
        //     //     loginRequired: function(User) {
        //     //         return User.loginRequired();
        //     //     }
        //     // }
        // })

        // .state('promotions', {
        //     url: "/promotion",
        //     templateUrl: "/EnglishTemplates/promotions/index.html",
        //     controller:"PromotionCtrl"
        //     // resolve: {
        //     //     loginRequired: function(User) {
        //     //         return User.loginRequired();
        //     //     }
        //     // }
        // })

        // .state('companies', {
        //     url: "/companies",
        //     templateUrl: "/EnglishTemplates/companies/index.html",
        //     controller: "companiesCtrl"
        //     // resolve: {
        //     //     loginRequired: function(User) {
        //     //         return User.loginRequired();
        //     //     }
        //     // }
        // })

        // .state('mobileappusers', {
        //     url: "/mobileappusers",
        //     templateUrl: "/EnglishTemplates/appusers/index.html",
        //     controller: "mobile_app_users_page",
        //     // resolve: {
        //     //     loginRequired: function(User) {
        //     //         return User.loginRequired();
        //     //     }
        //     // }
        // })
        //     .state('addMobileUser', {
        //     url: "/addMobileUser",
        //     templateUrl: "/EnglishTemplates/appusers/manage.html",
        //     controller: "mobile_app_users_page"
        // })
        .state('appuserdetail', {
            url: "/appuser/:id",
            templateUrl: "/ArabicPages/appusers/detail.html",
            controller:"AppSingleuser",
        })
          .state('updateMobileUser', {
            url: "/updateMobileUser/:id",
            templateUrl: "../arabic/ArabicPages/appusers/update.html",
            controller: "AppSingleuser"
        })
        //  .state('saleAgentdetail', {
        //     url: "/salesagent/:id",
        //     templateUrl: "/EnglishTemplates/agents/detail.html",
        //     controller:"SingleSalesAgent",
        // })
        //      .state('companydetail', {
        //     url: "/company/:id",
        //     templateUrl: "/EnglishTemplates/companies/detail.html",
        //     controller:"SingleCompany",
        // })
        // .state('registration_page', {
        //     url: "/registration_page",
        //     templateUrl: "/EnglishTemplates/appusers/manage.html",
        //     controller: "SignupCtrl"
        // })

        // .state('profile_details_page', {
        //     url: "/profile_details_page",
        //     templateUrl: "/EnglishTemplates/appusers/detail.html",
        //     controller: "profile_details_page"
        // })

        // //----- Arabic Routes -----//
        .state('appusersa',{
            url:"/appusersa",
            templateUrl:"../arabic/ArabicPages/appusers/index.html",
            controller:"mobile_app_users_page"
        })
          .state('addMobileUser', {
            url: "/addMobileUser",
            templateUrl: "../arabic/ArabicPages/appusers/manage.html",
            controller: "addNewAppUser"
        })
           .state('appuseradetail', {
            url: "/appuseradetail/:id",
            templateUrl: "../arabic/ArabicPages/appusers/detail.html",
            controller:"AppSingleuser",
        })
        .state('companiesa', {
            url: "/companiesa",
            templateUrl: "../arabic/ArabicPages/companies/index.html",
            controller:"companiesCtrl"
        })
             .state('addCompany', {
            url: "/addCompany",
            templateUrl: "../arabic/ArabicPages/companies/manage.html",
            controller: "companiesCtrl"
        })
           .state('companyadetail', {
            url: "/companyadetail/:id",
            templateUrl: "../arabic/ArabicPages/companies/detail.html",
            controller:"SingleCompany",
        })
           .state('companyaUpdate', {
            url: "/companyaUpdate/:id",
            templateUrl: "../arabic/ArabicPages/companies/update.html",
            controller:"SingleCompany",
        })
         .state('PromotionaUpdate', {
            url: "/PromotionaUpdate/:id",
            templateUrl: "../arabic/ArabicPages/promotions/update.html",
            controller:"SinglePromotion",
        })
        .state('updateaSalesAgent', {
            url: "/updateaSalesAgent/:id",
            templateUrl: "../arabic/ArabicPages/agents/update.html",
            controller:"SingleSalesAgent",
        })
         .state('agentsa', {
            url: "/agentsa",
            templateUrl: "../arabic/ArabicPages/agents/index.html",
            controller:"salesAgentsCtrl"
        })
           .state('agentadetail', {
            url: "/agentadetail/:id",
            templateUrl: "../arabic/ArabicPages/agents/detail.html",
            controller:"SingleSalesAgent",
        })
         .state('promotionsa', {
            url: "/promotionsa",
            templateUrl: "../arabic/ArabicPages/promotions/index.html",
            controller:"PromotionCtrl"
        })
         .state('saleAgentsReportsa', {
            url: "/saleAgentsReportsa",
            templateUrl: "../arabic/ArabicPages/reports/salesagentsreports.html",
            controller: "salesAgentsCtrl"
        })
         .state('companiesReportsa', {
            url: "/companiesReportsa",
            templateUrl: "../arabic/ArabicPages/reports/companiesreports.html",
            controller: "companiesCtrl"
        })
             .state('addPromotion', {
            url: "/addPromotion",
            templateUrl: "../arabic/ArabicPages/promotions/manage.html",
            controller: "addNewPromotion"
        })
          .state('addAgent', {
            url: "/addAgent",
            templateUrl: "../arabic/ArabicPages/agents/manage.html",
            controller: "addNewSalesAgent"
        })
           .state('Promotionadetail', {
            url: "/Promotionadetail/:id",
            templateUrl: "../arabic/ArabicPages/promotions/detail.html",
            controller:"SinglePromotion",
        })
        //  .state('dashboarda', {
        //     url: "/dashboarda",
        //     templateUrl: "/ArabicPages/dashboard.html"
        // })
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


       if (state == 'dashboarda') {
           $rootScope.actives = [true,false,false,false,false,false,false];
       }
       if (state == 'appusersa') {
           $rootScope.actives = [false, true,false,false,false,false,false];
       }
       if (state == 'companiesa') {
           $rootScope.actives = [false, false,true,false,false,false,false];
       }
       if (state == 'agentsa') {
           $rootScope.actives = [false, false,false,true,false,false,false];
       }
        if (state == 'promotionsa') {
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
   if (currentUrl.includes("dashboarda")) {
       $rootScope.actives = [true,false,false,false,false,false,false];
   }
   if (currentUrl.includes("appusersa")) {
        $rootScope.actives = [false, true,false,false,false,false,false];
   }
   if (currentUrl.includes("companies")) {
       $rootScope.actives = [false, false,true,false,false,false,false];
   }
   if (currentUrl.includes("agentsa")) {
       $rootScope.actives = [false, false,false,true,false,false,false];
   }
   if (currentUrl.includes("promotionsa")) {
       $rootScope.actives = [false, false,false,false,true,false,false];
   }
   if (currentUrl.includes("saleAgentsReports")) {
       $rootScope.actives = [false, false,false,false,false,true,false];
   }
   if (currentUrl.includes("companiesReports")) {
       $rootScope.actives = [false, false,false,false,false,false,true];
   }
})