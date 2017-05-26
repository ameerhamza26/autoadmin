app.controller('mobile_app_users_page', function($state, $scope, $http, $location, User) {
        console.log("This is mobile_app_users_page controller");

        $scope.user_registration_page = function(_type) {
            console.log("This is user_registration_page controller");
            $state.go('registration_page');
        }
        $scope.mobileAppCustomers = [];
        $scope.searchName = "";
        $scope.searchEmail = "";
        $scope.searchNumber = "";
        $scope.searchStatus = " ";
        $scope.page_number = "";
        $scope.inc_dec = "";
        $scope.increment = "";

        $scope.fieldsReset = function() {
            $scope.searchName = "";
            $scope.searchEmail = "";
            $scope.searchNumber = "";
            $scope.searchStatus = " ";
        }
        $scope.inc_dec = 0;
        $scope.page_number = 10;

        $scope.limits = [{
            value: '10',
            text: '10'
        }, {
            value: '20',
            text: '20'
        }];
        var pageNumber = 0;
        var pageSize = 4;

        $scope.isDataLoading = true;
        $scope.totalPages = 0;
        console.log("total pgaes", $scope.totalPages)
        User.getCustomersCount('0ns', '0ns', '0ns').success(function(res) {
                console.log('assyty', res)
                $scope.totalPages = parseInt(res / $scope.page_number);
                console.log("totalpages", $scope.totalPages)
                User.getCustomers($scope.inc_dec, $scope.page_number).success(function(res) {
                        // console.log('All Customers', res);
                        if (res != null || res != "") {
                            $scope.customers = res;
                            // console.log(res)
                            for (var i = 0; i < res.length; i++) {
                                $scope.mobileAppCustomers.push({
                                    Id: res[i].Id,
                                    FirstName: res[i].FirstName,
                                    LastName: res[i].LastName,
                                    MobileNumber: res[i].MobileNumber,
                                    EmailAddress: res[i].EmailAddress,
                                    ReferrerAgent: res[i].ReferrerAgent,
                                    ReferrerCompany: res[i].ReferrerCompany,
                                    RegisteredOn: res[i].RegisteredOn,
                                    Status: res[i].Status,
                                })
                            }
                            $scope.isDataLoading = false;
                        }
                    })
                    .error(function(err) {
                        console.log('error', err);
                        $scope.isDataLoading = false;
                    })
            })
            .error(function(err) {
                console.log(err);
            })



        $scope.dec_value = function(inc_dec) {
            console.log("decrement", inc_dec, $scope.totalPages)
            if ($scope.totalPages != 0) {
                if (inc_dec >= $scope.totalPages) {
                    $scope.inc_dec--;
                    $scope.isDataLoading = true;
                    User.getCustomers($scope.inc_dec, $scope.page_number).success(function(res) {
                            // console.log('All Customers', res);
                            $scope.mobileAppCustomers = [];
                            if (res != null || res != "") {
                                $scope.customers = res;
                                console.log("dec obj", res)
                                for (var i = 0; i < res.length; i++) {
                                    $scope.mobileAppCustomers.push({
                                        Id: res[i].Id,
                                        FirstName: res[i].FirstName,
                                        LastName: res[i].LastName,
                                        MobileNumber: res[i].MobileNumber,
                                        EmailAddress: res[i].EmailAddress,
                                        ReferrerAgent: res[i].ReferrerAgent,
                                        ReferrerCompany: res[i].ReferrerCompany,
                                        RegisteredOn: res[i].RegisteredOn,
                                        Status: res[i].Status,
                                    })
                                }
                                $scope.isDataLoading = false;
                            }
                        })
                        .error(function(err) {
                            console.log('error', err);
                            $scope.isDataLoading = false;
                        })
                }
            }


        }



        $scope.inc_value = function(inc_dec) {
            console.log("increment value", inc_dec, $scope.totalPages)
            if (inc_dec < $scope.totalPages) {
                $scope.inc_dec++;
                $scope.isDataLoading = true;
                User.getCustomers($scope.inc_dec, $scope.page_number).success(function(res) {
                        // console.log('All Customers', res);
                        if (res != null || res != "") {
                            $scope.customers = res;
                            $scope.mobileAppCustomers = [];
                            console.log('increment', res)
                            for (var i = 0; i < res.length; i++) {
                                $scope.mobileAppCustomers.push({
                                    Id: res[i].Id,
                                    FirstName: res[i].FirstName,
                                    LastName: res[i].LastName,
                                    MobileNumber: res[i].MobileNumber,
                                    EmailAddress: res[i].EmailAddress,
                                    ReferrerAgent: res[i].ReferrerAgent,
                                    ReferrerCompany: res[i].ReferrerCompany,
                                    RegisteredOn: res[i].RegisteredOn,
                                    Status: res[i].Status,
                                })
                            }
                            $scope.isDataLoading = false;
                        }

                    })
                    .error(function(err) {
                        console.log('error', err);
                        $scope.isDataLoading = false;
                    })

            }

        }
        $scope.pageChange = function() {
            console.log($scope.page_number);
            $scope.isDataLoading = true;
            $scope.totalPages = 0;
            $scope.mobileAppCustomers = [];
            console.log("total pgaes", $scope.totalPages)
            User.getCustomersCount('0ns', '0ns', '0ns').success(function(res) {
                    console.log('assyty', res)
                    $scope.totalPages = parseInt(res / $scope.page_number);
                    console.log("totalpages", $scope.totalPages)
                    User.getCustomers($scope.inc_dec, $scope.page_number).success(function(res) {
                            // console.log('All Customers', res);
                            if (res != null || res != "") {
                                $scope.customers = res;
                                // console.log(res)
                                for (var i = 0; i < res.length; i++) {
                                    $scope.mobileAppCustomers.push({
                                        Id: res[i].Id,
                                        FirstName: res[i].FirstName,
                                        LastName: res[i].LastName,
                                        MobileNumber: res[i].MobileNumber,
                                        EmailAddress: res[i].EmailAddress,
                                        ReferrerAgent: res[i].ReferrerAgent,
                                        ReferrerCompany: res[i].ReferrerCompany,
                                        RegisteredOn: res[i].RegisteredOn,
                                        Status: res[i].Status,
                                    })
                                }
                                $scope.isDataLoading = false;
                            }
                        })
                        .error(function(err) {
                            console.log('error', err);
                            $scope.isDataLoading = false;
                        })
                })
                .error(function(err) {
                    console.log(err);
                })
        }
        $scope.pageChangeValue = function(inc_dec) {
            $scope.mobileAppCustomers = [];


        }

        $scope.user = {};
        $scope.user.MobileNumber = "";
        // var User = {
        //     UserName: "",
        //     Password: ""
        // };




        //---------- Get Single  App User Starts----------------

        $scope.getSingleUser = function(id) {
            $state.go('appuserdetail', { id: id });
        }

        //---------- Get Single App User Ends----------------

        // ---------Search App User Starts--------------
        $scope.searchByParameter = function(searchName, searchEmail, searchNumber) {
            console.log(searchName)

            if ($scope.searchName != "") {
                $scope.isDataLoading = true;
                User.searchSingleAppUser($scope.searchName, "0ns", "0ns", $scope.inc_dec, $scope.page_number).success(function(res) {
                        console.log('search success', res)
                        $scope.mobileAppCustomers = [];
                        if (res != null || res != "") {
                            // $scope.customers = res;
                            // console.log(res)
                            for (var i = 0; i < res.length; i++) {
                                $scope.mobileAppCustomers.push({
                                    Id: res[i].Id,
                                    FirstName: res[i].FirstName,
                                    LastName: res[i].LastName,
                                    MobileNumber: res[i].MobileNumber,
                                    EmailAddress: res[i].EmailAddress,
                                    ReferrerAgent: res[i].ReferrerAgent,
                                    ReferrerCompany: res[i].ReferrerCompany,
                                    RegisteredOn: res[i].RegisteredOn,
                                    Status: res[i].Status,
                                })
                            }
                        }
                        $scope.isDataLoading = false;
                    })
                    .error(function(err) {
                        console.log(err)
                        $scope.isDataLoading = false;
                    })


            } else if ($scope.searchEmail != "") {
                console.log($scope.searchEmail)

                User.searchSingleAppUser("0ns", $scope.searchEmail, "0ns", $scope.inc_dec, $scope.page_number).success(function(res) {
                        console.log('search success', res)
                        console
                        $scope.mobileAppCustomers = [];
                        if (res != null || res != "") {
                            // $scope.customers = res;
                            // console.log(res)
                            for (var i = 0; i < res.length; i++) {
                                $scope.mobileAppCustomers.push({
                                    Id: res[i].Id,
                                    FirstName: res[i].FirstName,
                                    LastName: res[i].LastName,
                                    MobileNumber: res[i].MobileNumber,
                                    EmailAddress: res[i].EmailAddress,
                                    ReferrerAgent: res[i].ReferrerAgent,
                                    ReferrerCompany: res[i].ReferrerCompany,
                                    RegisteredOn: res[i].RegisteredOn,
                                    Status: res[i].Status,
                                })
                            }
                        }
                    })
                    .error(function(err) {
                        console.log(err)
                    })

            } else if ($scope.searchNumber != "") {
                console.log('hello')
                User.searchSingleAppUser("0ns", "0ns", $scope.searchNumber, $scope.inc_dec, $scope.page_number).success(function(res) {
                        console.log('search success', res)
                        $scope.mobileAppCustomers = [];
                        if (res != null || res != "") {
                            // $scope.customers = res;
                            // console.log(res)
                            for (var i = 0; i < res.length; i++) {
                                $scope.mobileAppCustomers.push({
                                    Id: res[i].Id,
                                    FirstName: res[i].FirstName,
                                    LastName: res[i].LastName,
                                    MobileNumber: res[i].MobileNumber,
                                    EmailAddress: res[i].EmailAddress,
                                    ReferrerAgent: res[i].ReferrerAgent,
                                    ReferrerCompany: res[i].ReferrerCompany,
                                    RegisteredOn: res[i].RegisteredOn,
                                    Status: res[i].Status,
                                })
                            }
                        }
                    })
                    .error(function(err) {
                        console.log(err)
                    })
            } else {
                User.searchSingleAppUser("0ns", "0ns", "0ns", $scope.inc_dec, $scope.page_number).success(function(res) {
                        console.log('search success', res)
                        $scope.mobileAppCustomers = [];
                        if (res != null || res != "") {
                            // $scope.customers = res;
                            // console.log(res)
                            for (var i = 0; i < res.length; i++) {
                                $scope.mobileAppCustomers.push({
                                    Id: res[i].Id,
                                    FirstName: res[i].FirstName,
                                    LastName: res[i].LastName,
                                    MobileNumber: res[i].MobileNumber,
                                    EmailAddress: res[i].EmailAddress,
                                    ReferrerAgent: res[i].ReferrerAgent,
                                    ReferrerCompany: res[i].ReferrerCompany,
                                    RegisteredOn: res[i].RegisteredOn,
                                    Status: res[i].Status,
                                })
                            }
                        }
                    })
                    .error(function(err) {
                        console.log(err)
                    })
            }

        }

    })