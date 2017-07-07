Array.prototype.toURL = function() {
    return this.join('/');
};

var toQueryString = function(obj) {
    var out = new Array();
    for (key in obj) {
        out.push(key + '=' + encodeURIComponent(obj[key]));
    }
    return out.join('&');
};

angular.module('CoreApi', ['CoreApiUtilities'])

.constant('lagConfig', {
    appName: 'Autotek',
    appVersion: '1.0.0',
    apiAuthUrl: 'http://autotecauth.azurewebsites.net/',
    apiUrl: 'http://autotecapi.azurewebsites.net/'

})

.factory('httpService', ['$http', 'lagConfig', 'Utils', function($http, lagConfig, Utils) {
    return {
        $http: $http,
        lagConfig: lagConfig,
        Utils: Utils
    }
}])

.service('User', ['httpService', '$location', 'localStorageService', function(httpService, $location, localStorageService) {

    // checking user is logged in or not
    this.isAuthenticated = function() {
        if (localStorageService.get('access_token')) {
            return true;
        } else {
            return false;
        }
    }

    this.login = function(param) {
        var params = httpService.Utils.getStringParams(param);
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('identity', 'connect', 'token'), '', true);
        return httpService.$http.post(url, params, config);
    }
    this.changePassword = function(passwordchange) {
        // var params = httpService.Utils.getStringParams(param);
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'users', 'changepassword'));
        return httpService.$http.post(url, passwordchange, config);
    }
     this.addHoliday = function(holidayCustom) {
        // var params = httpService.Utils.getStringParams(param);
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'annualholiday'));
        return httpService.$http.post(url, holidayCustom, config);
    }



    this.getUser = function() {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'Customer'));
        return httpService.$http.get(url, config);
    }

    this.loginRequired = function() {

        if (this.isAuthenticated()) {
            return true;
        } else {
            $location.path('/login');
        }
    }

    this.isLoggedIn = function() {

        if (this.isAuthenticated()) {
            $location.path('/dashboard');
        } else {
            return;
        }
    }

    this.getDashboardStats = function() {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'dashboard/0'));
        return httpService.$http.get(url, config);
    }

    this.getCustomers = function(pageNumber, pageSize) {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'Customers', pageNumber, pageSize));
        return httpService.$http.get(url, config);
    }

    this.getCompanies = function(pageNumber, pageSize) {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'companies', pageNumber, pageSize));
        return httpService.$http.get(url, config);
    }
    this.getHolidays = function(pageNumber, pageSize) {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'annualholiday', pageNumber, pageSize));
        return httpService.$http.get(url, config);
    }
    this.getServices = function(pageNumber, pageSize) {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'service', pageNumber, pageSize));
        return httpService.$http.get(url, config);
    }

    this.getCompaniesCount = function(param1, param2) {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'companies', 'count', param1, param2));
        return httpService.$http.get(url, config);
    }

    this.getCustomersCount = function(param1,param2, param3) {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'customers', 'count', param1, param2, param3));
        return httpService.$http.get(url, config);
    }

    this.saleAgentsCount = function(param1,param2, param3) {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'salesagents', 'count', param1, param2, param3));
        return httpService.$http.get(url, config);
    }

    this.getPromotionsCount = function(param1,param2, param3, param4) {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'discountoffers', 'count', param1, param2, param3, param4));
        return httpService.$http.get(url, config);
    }


    this.getTriggers = function(pageNumber, pageSize) {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'discountoffers', 'triggers'));
        return httpService.$http.get(url, config);
    }

    this.getCities = function(pageNumber, pageSize) {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'cities'));
        return httpService.$http.get(url, config);
    }
    this.getBranches = function(pageNumber, pageSize) {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'branch'));
        return httpService.$http.get(url, config);
    }
    this.getPromotions = function(pageNumber, pageSize) {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'discountoffers', pageNumber, pageSize));
        return httpService.$http.get(url, config);
    }
    this.getSalesAgents = function(pageNumber, pageSize) {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'salesagents', pageNumber, pageSize));
        return httpService.$http.get(url, config);
    }
    this.getSaleAgent = function() {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'salesagent'));
        console.log("FINAL URL", url);
        return httpService.$http.get(url, config);
    }
    this.getSingleAppUser = function(Id) {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'customers', Id));
        return httpService.$http.get(url, config);
    }
    this.deleteSingleAppUser = function(Id) {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'customers', Id));
        return httpService.$http.delete(url, config);
    }
    this.deleteHoliday = function(Id) {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'annualholiday', Id));
        return httpService.$http.delete(url, config);
    }
    this.deleteService= function(Id) {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'service', Id));
        return httpService.$http.delete(url, config);
    }
    this.deleteCompany = function(Id) {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'companies', Id));
        return httpService.$http.delete(url, config);
    }
    this.deleteAgent = function(Id) {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'salesagents', Id));
        return httpService.$http.delete(url, config);
    }
    this.deletePromotion = function(Id) {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'discountoffers', Id));
        return httpService.$http.delete(url, config);
    }
     this.UpdateHoliday = function(Holiday) {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'annualholiday'));
        return httpService.$http.put(url, Holiday, config);
    }
    this.UpdateService= function(Holiday) {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'service'));
        return httpService.$http.put(url, Holiday, config);
    }
    this.UpdateSingleAppUser = function(user, Id) {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'customers'));
        return httpService.$http.put(url, user, config);
    }
    this.UpdateCompany = function(company) {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'Companies'));
        return httpService.$http.put(url, company, config);
    }
    this.UpdateSalesAgents = function(SaleAgent) {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'salesagents'));
        return httpService.$http.put(url, SaleAgent, config);
    }
    this.UpdatePromotion = function(promotion) {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'discountoffers'));
        return httpService.$http.put(url, promotion, config);
    }
    this.getSingleSalesAgent = function(Id) {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'salesagents', Id));
        return httpService.$http.get(url, config);
    }
    this.getSingleCompany = function(Id) {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'companies', Id));
        return httpService.$http.get(url, config);
    }
    this.getSinglePromotion = function(Id) {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'discountoffers', Id));
        return httpService.$http.get(url, config);
    }
    this.searchSingleAppUser = function(Name, Email, contact, pageNumber, pageSize) {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'customers', Name, Email, contact, pageNumber, pageSize));
        return httpService.$http.get(url, config);
    }
    this.searchSingleCompany = function(CompanyName, ContactPerson, pageNumber, pageSize) {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'companies', CompanyName, ContactPerson, pageNumber, pageSize));
        return httpService.$http.get(url, config);
    }
    this.getReport = function(month) {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'salesagents', 'report', 'monthlycommission', month));
        return httpService.$http.get(url, config);
    }
    this.getReport1 = function(month) {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'customerorders', 'report', 'monthlycommission', month));
        return httpService.$http.get(url, config);
    }
    this.getCustopmerOrder = function(Id) {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'customerorders', Id));
        return httpService.$http.get(url, config);
    }
    this.searchSingleAgent = function(Name, CompanyName, Mobile, pageNumber, pageSize) {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'salesagents', Name, CompanyName, Mobile, pageNumber, pageSize));
        return httpService.$http.get(url, config);
    }
    this.searchSinglePromotion = function(titleAR, titleEN, Trigger, Status, pageNumber, pageSize) {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'discountoffers', titleAR, titleEN, Trigger, Status, pageNumber, pageSize));
        return httpService.$http.get(url, config);
    }
    this.getOrderHistory = function(pageNumber, pageSize) {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'CustomerOrder', pageNumber, pageSize));
        return httpService.$http.get(url, config);
    }

    this.getCustomerPromotionOffers = function() {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'CustomerOffer'));
        return httpService.$http.get(url, config);
    }

    this.getConsumedPromotionOffers = function() {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'consumedoffers'));
        return httpService.$http.get(url, config);
    }

    this.getAvailablePromotionOffers = function() {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'availableoffers'));
        return httpService.$http.get(url, config);
    }


}])


.service('Appointment', ['httpService', function(httpService) {
    this.get = function() {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'CustomerAppointments', '1', '4'));
        return httpService.$http.get(url, config);
    }

    this.getBranches = function(cityId) {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'Branches', cityId));
        return httpService.$http.get(url, config);
    }

    this.getAvailableDays = function(branchId, year, month) {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'AvailableAppointmentDays', branchId, year, month));
        return httpService.$http.get(url, config);
    }

    this.getAvailableSlots = function(branchId, year, month, day) {
        var config = httpService.Utils.getHeader();
        var url = httpService.Utils.buildUrl(new Array('api', 'AvailableAppointmentSlots', branchId, year, month, day));
        return httpService.$http.get(url, config);
    }
}])

angular.module('CoreApiUtilities', [])

.factory('Utils', function(lagConfig, localStorageService) {

    var makeHeader = function() {
        var access_token = localStorageService.get('access_token');
        if (access_token != null) {
            return config = {
                headers: {
                    'Authorization': "Bearer" + " " + access_token.access_token
                }
            };
        } else {
            return config = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
            };
        }
    }

    var makeString = function(queryStringSet) {
        var param = "";
        if (queryStringSet !== false) {
            param += '?' + toQueryString(queryStringSet);
        }
        param = param.substr(1);
        return param;
    }

    var defaultOffsetLimit = { offset: 0, limit: 5 }

    var buildUrl = function(urlSet, queryStringSet, isAuthUrl) {


        queryStringSet = queryStringSet || false;
        if (!isAuthUrl) {
            var url = lagConfig.apiUrl;
        } else {
            var url = lagConfig.apiAuthUrl;
        }

        if (Object.prototype.toString.call(urlSet) === '[object Array]') {
            url += urlSet.toURL();
        }
        if (queryStringSet !== false) {
            url += '?' + toQueryString(queryStringSet);
        }
        return url;
    }

    return {
        getHeader: makeHeader,
        buildUrl: buildUrl,
        defaultOffsetLimit: defaultOffsetLimit,
        getStringParams: makeString
    };
})
