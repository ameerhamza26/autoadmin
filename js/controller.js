var app=angular.module('Autotek.controller', [])

app.controller('LoginCtrl', function($scope, $rootScope, $window, $state, User, localStorageService, $location, NavigateState) {
    $scope.user = {};
    localStorageService.remove("access_token");

    if (localStorageService.get('pagereload') == null) {
        console.log("in page reload if")
        $window.location.reload();
        localStorageService.set('pagereload', '1');
    }

    var params = {
        'grant_type': 'password',
        'username': $scope.user.username,
        'password': $scope.user.password,
        'client_id': 'Android02',
        'client_secret': '21B5F798-BE55-42BC-8AA8-0025B903DC3B',
        'scope': 'app1'
    };
    $scope.Iserror = false;
    $scope.loginLoaderShow = false;
    $scope.login = function(data) {

        $scope.loginLoaderShow = true;
        var params = {
            'grant_type': 'password',
            'username': $scope.user.username,
            'password': $scope.user.password,
            'client_id': 'Android02',
            'client_secret': '21B5F798-BE55-42BC-8AA8-0025B903DC3B',
            'scope': 'app1'
        };
        console.log("in login", params)
        User.login(params).success(function(res) {

                if (localStorageService.isSupported) {
                    localStorageService.set("access_token", res);

                    User.getUser().success(function(res) {
                            $scope.loginLoaderShow = false;
                            var loggedInUser = {
                                user: res
                            }
                            localStorageService.set("loggedInUser", loggedInUser);
                            //NavigateState.navigate('dashboard');
                            if (localStorageService.get('pageLanguage') == 'en') {
                                NavigateState.navigate('dashboard');
                            } else {
                                window.location = "/arabic/index.html"
                            }
                        })
                        .error(function(err) {
                            console.log(err);
                            $scope.Iserror = true;
                            $scope.loginLoaderShow = false;
                            User.getSaleAgent().success(function(res) {
                                    loggedInUser = { user: res }
                                    $rootScope.name = res.FirstName;
                                    localStorageService.set("loggedInUser", loggedInUser);
                                    console.log(res);
                                    //  $ionicLoading.hide();
                                    if (localStorageService.get('pageLanguage') == 'en') {
                                        NavigateState.navigate('dashboard');
                                    } else {
                                        window.location = "/arabic/index.html"
                                    }
                                })
                                .error(function(err) {
                                    //$ionicLoading.hide();
                                })
                        });
                }
                
            })
            .error(function(err) {
                console.log('error', err);

                $scope.Iserror = true;
                $scope.loginLoaderShow = false;
            })
    }

    if (localStorageService.get('pageLanguage') == null) {
        $scope.lng = 'en';
        localStorageService.set('pageLanguage', $scope.lng);
    } else {
        $scope.lng = localStorageService.get('pageLanguage');
    }

    $scope.get_language = function(value1) {
        console.log($scope.lng)
        localStorageService.set('pageLanguage', $scope.lng);
    }

    $scope.go = function(language) {
        console.log(language)
        localStorageService.set('pageLanguage', language);
    }

})

app.controller('LogoutCtrl', function($scope, $rootScope, NavigateState, localStorageService, $location, $state) {
    $scope.user = localStorageService.get("loggedInUser").user;
    $scope.userName = $scope.user.FirstName;
    $scope.logout = function() {
        if (localStorageService.get('access_token')) {
            localStorageService.remove("access_token");
            localStorageService.remove("loggedInUser");
            NavigateState.navigate('login')
            return true;

        } else {
            return false;
        }
    }

})

app.controller('DashboardApiCtrl', function($scope, User, $http, $state) {
    console.log('dashboard called');

    User.getDashboardStats().success(function(res) {

            $scope.NoOfCustomersToday = res.NoOfCustomersToday;

            $scope.NoOfCustomersThisWeek = res.NoOfCustomersThisWeek;

            $scope.NoOfCustomersThisMonth = res.NoOfCustomersThisMonth;

            $scope.NoOfCustomersThisYear = res.NoOfCustomersThisYear;


            $scope.ConversionRate = res.ConversionRate;

            $scope.BounceRate = res.BounceRate;

            $scope.NoOfSalesAgents = res.NoOfSalesAgents;

            $scope.NoOfSalesOrders = res.NoOfSalesOrders;

        })
        .error(function(err) {
            console.log('The error', err);
        })
})



app.controller('AppSingleuser', function($scope, User, $stateParams, $state) {
        $scope.isDataLoading = true;
        console.log('app single user called')
        $scope.deleteId = $stateParams.id;
        $scope.updateUser = {};
        $scope.NewPassword = "";
        console.log($scope.updateUser)
        console.log($scope.deleteId);
        User.getCustopmerOrder(14).success(function(res) {
                console.log('orders', res);
            })
            .error(function(err) {
                console.log(err);
            })
        User.getSingleAppUser($stateParams.id).success(function(res) {
                $scope.singleUser = res[0];
                // console.log($scope.singleUser)
                $scope.isDataLoading = false;
            })
            .error(function(err) {
                console.log(err);
                $scope.isDataLoading = false;
            })
            // Change Password Function Starts //
        $scope.ChangePassword = function(singleUser) {
                $scope.switchBool = function(value) {
                    $scope[value] = !$scope[value];
                };
                $scope.loaderr = true;
                $scope.showSuccessAlert = false;
                $scope.showErrorAlert = false;
                $scope.errorText = "";
                $scope.passwordCustom = {
                    "User_GUID": $scope.singleUser.User_GUID,
                    "NewPassword": $scope.NewPassword
                }
                User.changePassword($scope.passwordCustom).success(function() {
                        console.log(res);
                        $scope.loaderr = false;
                        $scope.showSuccessAlert = true;
                    })
                    .error(function(err) {
                        console.log(err);
                        $scope.loaderr = false
                        $scope.errorText = err.Message;
                        $scope.showErrorAlert = true;
                    })
            }
            // Change Password Function Starts //
        $scope.deleteUser = function(deleteId) {
            $scope.switchBool = function(value) {
                $scope[value] = !$scope[value];
            };
            $scope.loaderr = true;
            $scope.showSuccessAlert = false;
            $scope.showErrorAlert = false;
            $scope.errorText = "";
            User.deleteSingleAppUser(deleteId).success(function(res) {
                    console.log(res);
                    console.log('delete method called success');
                    $scope.loaderr = false;
                    $scope.showSuccessAlert = true;
                })
                .error(function(err) {
                    console.log(err);
                    $scope.loaderr = false
                    $scope.errorText = err.Message;
                    $scope.showErrorAlert = true;
                })
        }
        $scope.navigateToUpdate = function(id) {
                $state.go('updateMobileUser', { id: id });
            }
            // $scope.singleUser={
            //         "Id" : $scope.singleUser.Id, "FirstName" : "TestUpdated" , "LastName" : "001" , 
            //         "MobileNumber" : "0000333999", "EmailAddress" : "test@gmail.com",
            //         "ERPReference" : "ERP_0003"
            //     }

        $scope.updateAppUser = function(singleUser) {
            $scope.switchBool = function(value) {
                $scope[value] = !$scope[value];
            };
            $scope.loaderr = true;
            $scope.showSuccessAlert = false;
            $scope.showErrorAlert = false;
            $scope.errorText = "";
            $scope.singleUsercustom = {
                "Id": $scope.singleUser.Id,
                "FirstName": $scope.singleUser.FirstName,
                "LastName": $scope.singleUser.LastName,
                "MobileNumber": $scope.singleUser.MobileNumber,
                "EmailAddress": $scope.singleUser.EmailAddress,
                "ERPReference": $scope.singleUser.referenceNo
            }

            console.log('singleUserrrr', $scope.singleUsercustom);
            User.UpdateSingleAppUser($scope.singleUsercustom).success(function(res) {
                    console.log(res);
                    $scope.loaderr = false;
                    $scope.showSuccessAlert = true;
                    console.log('successfuly updated');
                    $scope.isDataLoading = false;
                })
                .error(function function_name(err) {
                    console.log(err);
                    $scope.loaderr = false
                    $scope.errorText = err.Message;
                    $scope.showErrorAlert = true;
                    $scope.isDataLoading = false;
                })
        }
    })
app.controller('SingleSalesAgent', function($scope, User, $stateParams, $state) {
        $scope.isDataLoading = true;
        $scope.getStatus = function(value6) {
            if ($scope.SingleSalesAgent.Status == "Active") {
                $scope.SingleSalesAgent.status = false;
            } else {
                $scope.SingleSalesAgent.status = true;
            }
        }
        $scope.getComissionType = function(value3) {
            if ($scope.SingleSalesAgent.AgentCommission == "Percentage") {
                $scope.SingleSalesAgent.CommissionType = false;
            } else {
                $scope.SingleSalesAgent.CommissionType = true;
            }
        }
        $scope.onChangeCompany = function() {
                console.log($scope.SingleSalesAgent.AffiliateCompanyId.Id);
            }
            //---------Update Sales Agent Starts-------//
        $scope.updateSingleSalesAgent = function(SingleSalesAgent) {
                $scope.switchBool = function(value) {
                    $scope[value] = !$scope[value];
                };
                $scope.loaderr = true;
                $scope.showSuccessAlert = false;
                $scope.showErrorAlert = false;
                $scope.errorText = "";
                $scope.singleSalesAgentCustom = {
                    "Id": $scope.SingleSalesAgent.Id,
                    "firstname": $scope.SingleSalesAgent.FirstName,
                    "lastname": $scope.SingleSalesAgent.LastName,
                    "ContactNumber": $scope.SingleSalesAgent.ContactNumber,
                    "EmailAddress": $scope.SingleSalesAgent.EmailAddress,
                    "AffiliateCompanyId": $scope.SingleSalesAgent.AffiliateCompanyId.Id,
                    "Address": $scope.SingleSalesAgent.Address,
                    "ERPReference": $scope.SingleSalesAgent.ERPReference,
                    "isActive": $scope.SingleSalesAgent.status,
                    "CommissionDetails": [{
                        "CommissionRate": $scope.SingleSalesAgent.CommissionStructure,
                        "IsPercentage": $scope.SingleSalesAgent.CommissionType,
                        "BankDetails": $scope.SingleSalesAgent.BankDetials
                    }]
                }
                console.log('singleUserrrr', $scope.singleSalesAgentCustom);
                User.UpdateSalesAgents($scope.singleSalesAgentCustom).success(function(res) {
                        console.log(res);
                        $scope.loaderr = false;
                        $scope.showSuccessAlert = true;
                        console.log('Sale Agent successfuly updated');
                        $scope.isDataLoading = false;
                    })
                    .error(function function_name(err) {
                        console.log(err);
                        $scope.loaderr = false
                        $scope.errorText = err.Message;
                        $scope.showErrorAlert = true;
                        $scope.isDataLoading = false;
                    })
            }
            //---------Update Sales Agent Ends-------//

        $scope.deleteId = $stateParams.id;
        console.log($scope.deleteId);
        User.getSingleSalesAgent($stateParams.id).success(function(res) {
                $scope.SingleSalesAgent = res[0];
                console.log($scope.SingleSalesAgent)
                $scope.isDataLoading = false;
            })
            .error(function(err) {
                console.log(err);
                $scope.isDataLoading = false;
            })
        $scope.navigateToUpdate = function(id) {
                $state.go('updateSalesAgents', { id: id });
            }
            //---------- Delete Agent Starts ----------
        $scope.deleteAgent = function(deleteId) {
                $scope.switchBool = function(value) {
                    $scope[value] = !$scope[value];
                };
                $scope.loaderr = true;
                $scope.showSuccessAlert = false;
                $scope.showErrorAlert = false;
                $scope.errorText = "";
                User.deleteAgent(deleteId).success(function(res) {
                        console.log(res);
                        console.log('delete method called success');
                        $scope.loaderr = false;
                        $scope.showSuccessAlert = true;
                    })
                    .error(function(err) {
                        console.log(err);
                        $scope.loaderr = false
                        $scope.errorText = err.Message;
                        $scope.showErrorAlert = true;
                    })
            }
            //-----------Delete Agents Ends------

        User.getCompanies().success(function(res) {
                $scope.Companies = res;
            })
            .error(function(err) {
                console.log(err);
            })
            ///---------Update sales Agents Starts-----///
        $scope.updateSalesAgents = function(SingleSalesAgent) {
                $scope.singleSalesAgentCustom = {
                    "Id": "6",
                    "firstname": "John",
                    "lastname": "Jimmy",
                    "ContactNumber": "5554444",
                    "EmailAddress": "email@gmail.com",
                    "AffiliateCompanyId": 1,
                    "Address": "9999999",
                    "ERPReference": "ERP-Company-002",
                    "isActive": "true",
                    "CommissionDetails": [{
                        "CommissionRate": "4.0",
                        "IsPercentage": "true",
                        "BankDetails": "9999-c SAMBA Bank, Riyadh, Saudi Arabia"
                    }]
                }
            }
            ///---------Update sales Agents Ends-----///
    })
app.controller('SingleCompany', function($scope, User, $stateParams, $state) {
        $scope.isDataLoading = true;
        $scope.deleteId = $stateParams.id;
        console.log($scope.deleteId);
        User.getSingleCompany($stateParams.id).success(function(res) {
                $scope.SingleCompany = res[0];
                console.log($scope.SingleCompany)
                $scope.isDataLoading = false;
            })
            .error(function(err) {
                console.log(err);
                $scope.isDataLoading = false;
            })
        $scope.navigateToUpdate = function(id) {
            $state.go('updateCompany', { id: id });
        }
        $scope.getStatus = function(value2) {
            if ($scope.SingleCompany.AccountStatus == "Active") {
                $scope.SingleCompany.AccountStatus = false;
            } else {
                $scope.SingleCompany.AccountStatus = true;
            }
        }
        $scope.getComissionType = function(value3) {
            if ($scope.SingleCompany.CompanyCommissionType == "Percentage") {
                $scope.SingleCompany.CompanyCommissionType = false;
            } else {
                $scope.SingleCompany.CompanyCommissionType = true;
            }
        }


        $scope.updateCompany = function(SingleCompany) {
                $scope.switchBool = function(value) {
                    $scope[value] = !$scope[value];
                };
                $scope.loaderr = true;
                $scope.showSuccessAlert = false;
                $scope.showErrorAlert = false;
                $scope.errorText = "";
                $scope.singleCompanyCustom = {
                    "Id": $scope.SingleCompany.Id,
                    "CompanyName": $scope.SingleCompany.CompanyName,
                    "CompanyNameInArabic": $scope.SingleCompany.CompanyName,
                    "PhoneNumber": $scope.SingleCompany.ContactPhone,
                    "EmailAddress": $scope.SingleCompany.ContactEmail,
                    "Address": "Jeddah, KSA",
                    "IsActive": $scope.SingleCompany.AccountStatus,
                    "ERPReference": $scope.SingleCompany.CompanyErpRerence,
                    "Contacts": [{
                        "PersonName": $scope.SingleCompany.ContactPerson,
                        "TelephoneNumber": $scope.SingleCompany.ContactPhone,
                        "EmailAddress": $scope.SingleCompany.ContactEmail,
                        "OtherContactDetails": $scope.SingleCompany.OtherContact
                    }, {
                        "PersonName": $scope.SingleCompany.ContactPerson1,
                        "TelephoneNumber": $scope.SingleCompany.ContactPhone1,
                        "EmailAddress": $scope.SingleCompany.ContactEmail1,
                        "OtherContactDetails": $scope.SingleCompany.OtherContact
                    }],
                    "ComissionDetails": [{
                        "CommissionRate": $scope.SingleCompany.CompanyCommission,
                        "IsPercentage": $scope.SingleCompany.CompanyCommissionType,
                        "PaymentMethod": $scope.SingleCompany.OtherPaymentMethods,
                        "BankDetails": $scope.SingleCompany.BankAccountDetails
                    }]
                }
                User.UpdateCompany($scope.singleCompanyCustom).success(function(res) {
                        console.log(res);
                        // console.log(SingleCompany)
                        $scope.loaderr = false;
                        $scope.showSuccessAlert = true;
                        console.log('company successfuly updated');
                        $scope.isDataLoading = false;
                    })
                    .error(function function_name(err) {
                        console.log(err);
                        $scope.loaderr = false
                        $scope.errorText = err.Message;
                        $scope.showErrorAlert = true;
                        $scope.isDataLoading = false;
                    })
            }
            //--------- Delete Company ---------
        $scope.deleteCompany = function(deleteId) {
                $scope.switchBool = function(value) {
                    $scope[value] = !$scope[value];
                };
                $scope.loaderr = true;
                $scope.showSuccessAlert = false;
                $scope.showErrorAlert = false;
                $scope.errorText = "";
                User.deleteCompany(deleteId).success(function(res) {
                        console.log(res);
                        console.log('delete method called success');
                        $scope.loaderr = false;
                        $scope.showSuccessAlert = true;
                    })
                    .error(function(err) {
                        console.log(err);
                        $scope.loaderr = false
                        $scope.errorText = err.Message;
                        $scope.showErrorAlert = true;
                    })
            }
            //----------Delete Company End-------

    })
app.controller('SinglePromotion', function($scope, User, $stateParams, $state) {
        $scope.isDataLoading = true;
        $scope.navigateToUpdate = function(id) {
            $state.go('updatePromotion', { id: id });
        }
        $scope.deleteId = $stateParams.id;
        console.log($scope.deleteId);
        User.getSinglePromotion($stateParams.id).success(function(res) {
                $scope.Singlepromotion = res[0];
                console.log($scope.Singlepromotion)
                $scope.isDataLoading = false;
            })
            .error(function(err) {
                console.log(err);
                $scope.isDataLoading = false;
            })

        User.getTriggers().success(function(res) {
                $scope.allTriggers = res;
            })
            .error(function(err) {
                console.log(err);
            })
        $scope.getStatus = function(value5) {
            if ($scope.Singlepromotion.Status == "Active") {
                $scope.Singlepromotion.status = false;
            } else {
                $scope.Singlepromotion.status = true;
            }
        }
        $scope.updatePromotions = function(Singlepromotion) {

                $scope.switchBool = function(value) {
                    $scope[value] = !$scope[value];
                };
                $scope.loaderr = true;
                $scope.showSuccessAlert = false;
                $scope.showErrorAlert = false;
                $scope.errorText = "";
                console.log($scope.Singlepromotion.Trigger.Id);
                $scope.singlePromotionCustom = {
                    "Id": $scope.Singlepromotion.Id,
                    "DiscountCriteriaId": $scope.Singlepromotion.Trigger.Id,
                    "CouponCode": $scope.Singlepromotion.templateCoupen,
                    "Description_EN": $scope.Singlepromotion.Title_EN,
                    "Description_AR": $scope.Singlepromotion.Title_AR,
                    "IsActive": $scope.Singlepromotion.status,
                    "EndDate": $scope.Singlepromotion.ExpiresOn
                }
                console.log("update object", $scope.singlePromotionCustom);
                User.UpdatePromotion($scope.singlePromotionCustom).success(function(res) {
                        $scope.loaderr = false;
                        $scope.showSuccessAlert = true;
                        console.log(res);
                        console.log('Promotion successfuly updated');
                        $scope.isDataLoading = false;
                    })
                    .error(function function_name(err) {
                        console.log(err);
                        $scope.loaderr = false
                        $scope.errorText = err.Message;
                        $scope.showErrorAlert = true;
                        $scope.isDataLoading = false;
                    })
            }
            //---------- Delete Promotion Starts ----------
        $scope.deletePromotions = function(deleteId) {
                $scope.switchBool = function(value) {
                    $scope[value] = !$scope[value];
                };
                $scope.loaderr = true;
                $scope.showSuccessAlert = false;
                $scope.showErrorAlert = false;
                $scope.errorText = "";
                User.deletePromotion(deleteId).success(function(res) {
                        console.log(res);
                        console.log('delete method called success');
                        $scope.loaderr = false;
                        $scope.showSuccessAlert = true;
                    })
                    .error(function(err) {
                        console.log(err);
                        $scope.loaderr = false
                        $scope.errorText = err.Message;
                        $scope.showErrorAlert = true;
                    })
            }
            //-----------Delete Promotion Ends------

    })

app.controller('annualHolidayConrtoller',function($scope, User, $http,$state,$rootScope,$filter,$window){
        $scope.startDate="";
        $scope.endDate="";
        $scope.title="";
        $scope.isDataLoading = true;
        $scope.allHolidays=[];
        $scope.testDate="";
        $scope.startdate="";
        $scope.enddate="";
        $scope.changeSrartDate="";
        $scope.changeEndDate="";
        $scope.ttl="";
        $scope.id="";
        $scope.newObject = {};
        $scope.showgrid=true;
        $scope.updateBtnShow=false;
        $scope.saveBtnShow=true;

        $scope.addAnnualHolday= function(){
             
              $scope.switchBool = function(value) {
                    $scope[value] = !$scope[value];
                };
                $scope.loaderr = true;
                $scope.showSuccessAlert = false;
                $scope.showSuccessAlertDelete = false;
                $scope.showErrorAlert = false;
                $scope.errorText = "";


            if($scope.startdate != "" && $scope.enddate != "" && $scope.ttl != ""){
                var params = "grant_type=client_credentials&client_id=Android01&client_secret=21B5F798-BE55-42BC-8AA8-0025B903DC3B&scope=app1";
                var formatedStartDate = $filter("date")($scope.startdate,'yyyy-MM-dd');
                var formatedEndDate = $filter("date")($scope.enddate,'yyyy-MM-dd');
                $scope.holdayObject={
                    "StartDate":formatedStartDate,
                    "EndDate":formatedEndDate,
                    "Title" : $scope.ttl
                } 
                console.log('formated startdate when update',formatedStartDate);
                console.log('formated enddate when update',formatedEndDate);
                // $scope.user.UserName = $scope.user.MobileNumber;
                var url = "http://autotecauth.azurewebsites.net/identity/connect/token";
                $http.post(url, params,{ 
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
                }).success(function(result){
                    $http.post('http://autotecapi.azurewebsites.net/api/annualholiday',$scope.holdayObject,{
                        headers: {
                                'Authorization': "Bearer" + " " + result.access_token
                            }
                    }).success(function(res){
                        console.log(res)
                        console.log('in add holiday scucess')
                        $scope.loaderr = false;
                        $scope.showSuccessAlert = true;
                        $scope.isDataLoading = false;
                        $window.location.reload();
                    })
                    .error(function(err){
                        $scope.loaderr = false
                        $scope.errorText = err.Message;
                        $scope.showErrorAlert = true;
                        console.log(err)
                        $scope.isDataLoading = false;
                    })
                    
                })

            } else{
                alert("Please fill all the fields first");
                $scope.loaderr = false;
            }
            
        }
        
        User.getHolidays().success(function(res){
            $scope.allHolidays=res;
            console.log(res,'response')
            $scope.isDataLoading = false;
        })
        .error(function(err){
            console.log(err)
            $scope.isDataLoading = false;
        })
        $scope.deleteHoliday=function(deleteIdd){
            $scope.switchBool = function(value) {
                    $scope[value] = !$scope[value];
                };
            User.deleteHoliday(deleteIdd).success(function(res){
                console.log(res,'res')
                 $scope.loaderr = false;
                $scope.showSuccessAlertDelete = true;
                $window.location.reload();
            })
            .error(function(err){
                console.log(err)
                $scope.loaderr = false
                $scope.errorText = err.Message;
                $scope.showErrorAlert = true;
            })
        }
        
        $scope.navigateToUpdateHoliday = function(object1) {
            console.log("SSSS",$scope.allHolidays )
             
             $scope.startdate = $filter("date")(object1.StartDate,'yyyy-MM-dd');
             $scope.enddate = $filter("date")(object1.EndDate,'yyyy-MM-dd');
            $scope.ttl = object1.Title;
            $scope.id = object1.Id;
            $scope.updateBtnShow=true;
            $scope.saveBtnShow=false;
            $scope.showgrid=false;      
            console.log($scope.startdate,'start date')
            console.log($scope.enddate ,'end date')
            // console.log($scope.ttl,'title')
            // console.log(object1.EndDate,'end date')
        }
    $scope.update1=function(){

        if($scope.startdate != null && $scope.enddate != null && $scope.ttl != ""){

        var formatedStartDate = $filter("date")($scope.startdate,'yyyy-MM-dd');
        var formatedEndDate = $filter("date")($scope.enddate,'yyyy-MM-dd');
            
        console.log('formated startdate when update',formatedStartDate);
        console.log('formated enddate when update',formatedEndDate);
            $scope.updateHolidayObject={
                    "Id":$scope.id,
                    "StartDate":formatedStartDate,
                    "EndDate" : formatedEndDate,
                    "Title" : $scope.ttl
                }

                console.log($scope.updateHolidayObject,'updated object')
                User.UpdateHoliday($scope.updateHolidayObject).success(function(res){
                    console.log(res);
                    console.log('successfuly updated');
                    $scope.showgrid=true;
                    $window.location.reload();
                    // $scope.isDataLoading = false;
                })
                .error(function(err){
                    console.log(err);
                });
        } else{
            alert('Please fill all the fields first');
        }
    }
    

})
app.controller('serviceQueryCtrl', function($scope, User, $http,$state,$rootScope,$window){

        $scope.serviceTitleEn="";
        $scope.serviceTitleAr="";
        $scope.serviceDuration="";
        $scope.serviceDescEn = "";
        $scope.serviceDescAR = "";
        $scope.id="";
        $scope.showgrid=true;
        $scope.updateBtnShow=false;
        $scope.saveBtnShow=true;
        $scope.customService={};
        $scope.allServices=[];
        $scope.isDataLoading = true;
        $scope.saveBtnShow=true;
        
        $scope.addService= function(){
             
              $scope.switchBool = function(value) {
                $scope[value] = !$scope[value];
            };
            $scope.loaderr = true;
            $scope.showSuccessAlert = false;
            $scope.showSuccessAlertDelete = false;
            $scope.showErrorAlert = false;
            $scope.errorText = "";

            if($scope.serviceTitleEn != "" && $scope.serviceTitleAr != "" && $scope.serviceDuration != "" && $scope.serviceDescEn != "" && $scope.serviceDescAR != ""){
            var params = "grant_type=client_credentials&client_id=Android01&client_secret=21B5F798-BE55-42BC-8AA8-0025B903DC3B&scope=app1";
            $scope.customService={
                "Title_Eng" :$scope.serviceTitleEn,
                "Title_Ar":$scope.serviceTitleAr,
                "DurationInMin" : $scope.serviceDuration,
                "Description_Eng" : $scope.serviceDescEn,
                "Description_Ar":$scope.serviceDescAR
            } 
            console.log('holiday object',$scope.holdayObject)
                // $scope.user.UserName = $scope.user.MobileNumber;
                var url = "http://autotecauth.azurewebsites.net/identity/connect/token";
                $http.post(url, params,{ 
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
                }).success(function(result){
                    $http.post('http://autotecapi.azurewebsites.net/api/service',$scope.customService,{
                        headers: {
                                'Authorization': "Bearer" + " " + result.access_token
                            }
                    }).success(function(res){
                        console.log(res)
                        console.log('in add holiday scucess')
                        $scope.loaderr = false;
                        $scope.showSuccessAlert = true;
                        $scope.isDataLoading = false;
                        $window.location.reload();
                    })
                    .error(function(err){
                        $scope.loaderr = false;
                        $scope.errorText = err.Message;
                        $scope.showErrorAlert = true;
                        console.log(err)
                        $scope.isDataLoading = false;
                    })
                    
                })
            }else{
                alert("Please fill all the fields first");
                $scope.loaderr = false;
            }
        
        }
        
             User.getServices().success(function(res){
            $scope.allServices=res;
            console.log(res,'response service')
            $scope.isDataLoading = false;
        })
        .error(function(err){
            console.log(err)
            $scope.isDataLoading = false;
        })
        
        $scope.DeleteService=function(deleteIdd){
            $scope.switchBool = function(value) {
                    $scope[value] = !$scope[value];
                };
            User.deleteService(deleteIdd).success(function(res){
                console.log(res,'res')
                 $scope.loaderr = false;
                $scope.showSuccessAlertDelete = true;
                $window.location.reload();
            })
            .error(function(err){
                console.log(err)
                $scope.loaderr = false
                $scope.errorText = err.Message;
                $scope.showErrorAlert = true;
            })
        }
        $scope.navigateToServiceUpdate=function(serviceObject){
             $scope.id= serviceObject.Id;
            $scope.serviceTitleEn=serviceObject.Title_Eng;
            $scope.serviceTitleAr=serviceObject.Title_Ar;
            $scope.serviceDuration=serviceObject.DurationInMin;
            $scope.serviceDescEn = serviceObject.Description_Eng;
            $scope.serviceDescAR = serviceObject.Description_Ar;
            $scope.updateBtnShow=true;
            $scope.saveBtnShow=false;
            $scope.showgrid=false;
        }
        $scope.updateService=function(){
           
            if($scope.serviceTitleEn != "" && $scope.serviceTitleAr != "" && $scope.serviceDuration != "" && $scope.serviceDescEn != "" && $scope.serviceDescAR != ""){
                 $scope.customService={
                  "Id" :$scope.id,
                  "Title_Eng" : $scope.serviceTitleEn,
                  "Title_Ar" : $scope.serviceTitleAr, 
                  "DurationInMin" : $scope.serviceDuration, 
                  "Description_Eng" : $scope.serviceDescEn , 
                  "Description_Ar" :$scope.serviceDescAR 
                 }
                User.UpdateService($scope.customService).success(function(res){
                  console.log(res)
                   $scope.showgrid=true;
                   $window.location.reload();
               })
                .error(function(err){
                console.log(err);
            })
            }  else{
                alert("Please fill all the fields first");
            }
           
        }

})

app.controller('addNewAppUser', function($scope, User, $http) {
        $scope.regex = '^[a-zA-Z]+[a-zA-Z0-9._-]+@[a-z]+\.[a-z.]{2,5}$';
        $scope.addUser = {};
        $scope.register = function() {
            // console.log($scope.user)
            // console.log('errors occured');
            $scope.switchBool = function(value) {
                $scope[value] = !$scope[value];
            };
            $scope.loaderr = true;
            $scope.showSuccessAlert = false;
            $scope.showErrorAlert = false;
            $scope.errorText = "";

            var errors = [];
            // if ($scope.addUser.FirstName == null || $scope.addUser.FirstName == "") {
            //     errors.push({ message: 'Name is required' })
            // }

            // if ($scope.addUser.MobileNumber == null || $scope.addUser.MobileNumber == "") {
            //     errors.push({ message: 'Number is required' })
            // }

            // if ($scope.addUser.EmailAddress == null || $scope.addUser.EmailAddress == "") {
            //     errors.push({ message: 'Email is required' });
            // } else {
            //     var email = $scope.addUser.EmailAddress.match($scope.regex);
            //     if (email == null) {
            //         errors.push({ message: 'Not a valid email' });
            //     }
            // }

            // if ($scope.user.User.Password == null || $scope.user.User.Password == "") {
            //     errors.push({ message: 'Password is required' })
            // }




            if (errors.length != 0) {
                console.log('errors occured');
                $scope.errorText = "Email, Phone Number Or Address is Empty";
                $scope.showErrorAlert = true;
                $scope.switchBool = function(value) {
                    $scope[value] = !$scope[value];
                    $scope.loaderr = false;
                };

            } else {
                var params = "grant_type=client_credentials&client_id=Android01&client_secret=21B5F798-BE55-42BC-8AA8-0025B903DC3B&scope=app1";
                // $scope.addUser.UserName = $scope.addUser.MobileNumber;
                // $scope.usercustom = {
                //     'User' : $scope.addUser,

                // }
                // console.log($scope.usercustom)

                $scope.usercustom = {
                    "FirstName": $scope.addUser.FirstName,
                    "LastName": $scope.addUser.LastName,
                    "MobileNumber": $scope.addUser.MobileNumber,
                    "EmailAddress": $scope.addUser.EmailAddress,
                    "User": {
                        "UserName": $scope.addUser.MobileNumber,
                        "Password": $scope.addUser.Password
                    }
                };
                console.log($scope.usercustom);
                //.User= $scope.user
                var url = "http://autotecauth.azurewebsites.net/identity/connect/token";
                $http.post(url, params, {
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
                    }).success(function(result) {
                        $http.post('http://autotecapi.azurewebsites.net/api/CustomerRegistration', $scope.usercustom, {
                                headers: {
                                    'Authorization': "Bearer" + " " + result.access_token
                                }
                            }).success(function(res) {
                                console.log(res);
                                $scope.loaderr = false;
                                $scope.showSuccessAlert = true;
                                // $ionicLoading.hide();
                                // var alertPopup = $ionicPopup.alert({
                                //     title: 'Success!',
                                //     template: 'A verication key is sent through SMS!'
                                // });
                                console.log('user addess success')
                                    // alertPopup.then(function(res) {
                                    //     $rootScope.navigate('home')
                                    //         //console.log('Thank you for not eating my delicious ice cream cone');
                                    // });
                            })
                            .error(function(err) {
                                var error = [{ message: err.Message }]
                                $scope.loaderr = false
                                $scope.errorText = err.Message;
                                $scope.showErrorAlert = true;
                                // $ionicLoading.hide();
                                // $scope.deactivate(error)
                            })
                    })
                    .error(function(error) {

                        $ionicLoading.hide();
                    })
                    //$ionicSlideBoxDelegate.slide(index);

            }
        }
    })
app.controller('addNewPromotion', function($state, $scope, User, $http) {
        User.getTriggers().success(function(res) {
                $scope.allTriggers = res;
            })
            .error(function(err) {
                console.log(err);
            })

        $scope.regex = '^[a-zA-Z]+[a-zA-Z0-9._-]+@[a-z]+\.[a-z.]{2,5}$';
        $scope.addPromotion = {};
        //  console.log($scope.addPromotion.Trigger);
        // $scope.getId=function(value4){
        //     return $scope.addPromotion.Trigger;
        // }
        if ($scope.addPromotion.Status == "Active") {
            $scope.addPromotion.status = "false";
        } else {
            $scope.addPromotion.status = "true";
        }

        $scope.AddPromotion = function() {
            console.log($scope.addPromotion.Trigger.Id);
            // console.log($scope.user)
            // console.log('errors occured');
            $scope.switchBool = function(value) {
                $scope[value] = !$scope[value];
            };
            $scope.loaderr = true;
            $scope.showSuccessAlert = false;
            $scope.showErrorAlert = false;
            $scope.errorText = "";

            var errors = [];
            // if ($scope.addUser.FirstName == null || $scope.addUser.FirstName == "") {
            //     errors.push({ message: 'Name is required' })
            // }

            // if ($scope.addUser.MobileNumber == null || $scope.addUser.MobileNumber == "") {
            //     errors.push({ message: 'Number is required' })
            // }

            // if ($scope.addUser.EmailAddress == null || $scope.addUser.EmailAddress == "") {
            //     errors.push({ message: 'Email is required' });
            // } else {
            //     var email = $scope.addUser.EmailAddress.match($scope.regex);
            //     if (email == null) {
            //         errors.push({ message: 'Not a valid email' });
            //     }
            // }

            // if ($scope.user.User.Password == null || $scope.user.User.Password == "") {
            //     errors.push({ message: 'Password is required' })
            // }




            if (errors.length != 0) {
                console.log('errors occured');
                $scope.errorText = "Email, Phone Number Or Address is Empty";
                $scope.showErrorAlert = true;
                $scope.switchBool = function(value) {
                    $scope[value] = !$scope[value];
                    $scope.loaderr = false;
                };

            } else {
                var params = "grant_type=client_credentials&client_id=Android01&client_secret=21B5F798-BE55-42BC-8AA8-0025B903DC3B&scope=app1";
                // $scope.addUser.UserName = $scope.addUser.MobileNumber;
                // $scope.usercustom = {
                //     'User' : $scope.addUser,

                // }
                // console.log($scope.usercustom)

                $scope.promotionCustom = {
                    "DiscountCriteriaId": $scope.addPromotion.Trigger.Id,
                    "CouponCode": $scope.addPromotion.templateCoupen,
                    "Description_EN": $scope.addPromotion.titelEn,
                    "Description_AR": $scope.addPromotion.titelAr,
                    "IsActive": $scope.addPromotion.status,
                    "EndDate": $scope.addPromotion.ExpiresOn
                };
                console.log($scope.promotionCustom);
                //.User= $scope.user
                var url = "http://autotecauth.azurewebsites.net/identity/connect/token";
                $http.post(url, params, {
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
                    }).success(function(result) {
                        $http.post('http://autotecapi.azurewebsites.net/api/discountoffers', $scope.promotionCustom, {
                                headers: {
                                    'Authorization': "Bearer" + " " + result.access_token
                                }
                            }).success(function(res) {
                                console.log(res);
                                $scope.loaderr = false;
                                $scope.showSuccessAlert = true;
                                // $ionicLoading.hide();
                                // var alertPopup = $ionicPopup.alert({
                                //     title: 'Success!',
                                //     template: 'A verication key is sent through SMS!'
                                // });
                                console.log('user addess success')
                                    // alertPopup.then(function(res) {
                                    //     $rootScope.navigate('home')
                                    //         //console.log('Thank you for not eating my delicious ice cream cone');
                                    // });
                            })
                            .error(function(err) {
                                var error = [{ message: err.Message }]
                                $scope.loaderr = false
                                $scope.errorText = err.Message;
                                $scope.showErrorAlert = true;
                            })
                    })
                    .error(function(error) {

                        $ionicLoading.hide();
                    })


            }
        }
    })
app.controller('addNewSalesAgent', function($state, $scope, User, $http) {

        $scope.navigateToUpdate = function(id) {
            $state.go('updateCompany', { id: id });
        }
        $scope.getStatus = function(value6) {
            if ($scope.addSalesAgent.Status == "Active") {
                $scope.addSalesAgent.status = false;
            } else {
                $scope.addSalesAgent.status = true;
            }
        }
        $scope.getComissionType = function(value3) {
            if ($scope.addSalesAgent.AgentCommission == "Percentage") {
                $scope.addSalesAgent.CommissionType = false;
            } else {
                $scope.addSalesAgent.CommissionType = true;
            }
        }

        User.getCompanies(0, 10).success(function(res) {
                $scope.allCompanies = res;
            })
            .error(function(err) {
                console.log(err);
            })
        $scope.onChangeCompany = function() {
            console.log($scope.addSalesAgent.companeSelected.Id);
        }
        $scope.regex = '^[a-zA-Z]+[a-zA-Z0-9._-]+@[a-z]+\.[a-z.]{2,5}$';
        $scope.addSalesAgent = {};
        $scope.registerSalesAgent = function() {
            // console.log($scope.user)
            // console.log('errors occured');
            $scope.switchBool = function(value) {
                $scope[value] = !$scope[value];
            };
            $scope.loaderr = true;
            $scope.showSuccessAlert = false;
            $scope.showErrorAlert = false;
            $scope.errorText = "";

            var errors = [];
            // if ($scope.addUser.FirstName == null || $scope.addUser.FirstName == "") {
            //     errors.push({ message: 'Name is required' })
            // }

            // if ($scope.addUser.MobileNumber == null || $scope.addUser.MobileNumber == "") {
            //     errors.push({ message: 'Number is required' })
            // }

            // if ($scope.addUser.EmailAddress == null || $scope.addUser.EmailAddress == "") {
            //     errors.push({ message: 'Email is required' });
            // } else {
            //     var email = $scope.addUser.EmailAddress.match($scope.regex);
            //     if (email == null) {
            //         errors.push({ message: 'Not a valid email' });
            //     }
            // }

            // if ($scope.user.User.Password == null || $scope.user.User.Password == "") {
            //     errors.push({ message: 'Password is required' })
            // }




            if (errors.length != 0) {
                console.log('errors occured');
                $scope.errorText = "Email, Phone Number Or Address is Empty";
                $scope.showErrorAlert = true;
                $scope.switchBool = function(value) {
                    $scope[value] = !$scope[value];
                    $scope.loaderr = false;
                };

            } else {
                var params = "grant_type=client_credentials&client_id=Android01&client_secret=21B5F798-BE55-42BC-8AA8-0025B903DC3B&scope=app1";
                // $scope.addUser.UserName = $scope.addUser.MobileNumber;
                // $scope.usercustom = {
                //     'User' : $scope.addUser,

                // }
                // console.log($scope.usercustom)

                $scope.singleAgentCustom = {
                    "firstname": $scope.addSalesAgent.firstName,
                    "lastname": $scope.addSalesAgent.lastName,
                    "ContactNumber": $scope.addSalesAgent.Contact,
                    "EmailAddress": $scope.addSalesAgent.Email,
                    "AffiliateCompanyId": $scope.addSalesAgent.companeSelected.Id,
                    "Address": $scope.addSalesAgent.Address,
                    "ERPReference": $scope.addSalesAgent.AgentErpReference,
                    "isActive": $scope.addSalesAgent.status,
                    "CommissionDetails": [{
                        "CommissionRate": $scope.addSalesAgent.commRate,
                        "IsPercentage": $scope.addSalesAgent.CommissionType,
                        "BankDetails": $scope.addSalesAgent.BankDetails
                    }]
                };
                console.log($scope.singleAgentCustom);
                //.User= $scope.user
                var url = "http://autotecauth.azurewebsites.net/identity/connect/token";
                $http.post(url, params, {
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
                    }).success(function(result) {
                        $http.post('http://autotecapi.azurewebsites.net/api/salesagents', $scope.singleAgentCustom, {
                                headers: {
                                    'Authorization': "Bearer" + " " + result.access_token
                                }
                            }).success(function(res) {
                                console.log(res);
                                $scope.loaderr = false;
                                $scope.showSuccessAlert = true;
                                // $ionicLoading.hide();
                                // var alertPopup = $ionicPopup.alert({
                                //     title: 'Success!',
                                //     template: 'A verication key is sent through SMS!'
                                // });
                                console.log('user addess success')
                                    // alertPopup.then(function(res) {
                                    //     $rootScope.navigate('home')
                                    //         //console.log('Thank you for not eating my delicious ice cream cone');
                                    // });
                            })
                            .error(function(err) {
                                var error = [{ message: err.Message }]
                                $scope.loaderr = false
                                $scope.errorText = err.Message;
                                $scope.showErrorAlert = true;
                                // $ionicLoading.hide();
                                // $scope.deactivate(error)
                            })
                    })
                    .error(function(error) {

                        $ionicLoading.hide();
                    })
                    //$ionicSlideBoxDelegate.slide(index);

            }
        }
    })

    .controller('profile_details_page', function($state, $scope, User) {
        console.log("This is profile_details_page controller");

        // == Setting Customers Profile Information == //

        // $scop.customer_name = localStorageService.get('userName');
        // $scop.customer_name = localStorageService.get();
        // $scop.customer_name = localStorageService.get();
        // $scop.customer_name = localStorageService.get();
        // $scop.customer_name = localStorageService.get();
        // $scop.customer_name = localStorageService.get();
        // $scop.customer_name = localStorageService.get();
        // $scop.customer_name = localStorageService.get();
        // $scop.customer_name = localStorageService.get();
        // $scop.customer_name = localStorageService.get();
        // $scop.customer_name = localStorageService.get();
        // $scop.customer_name = localStorageService.get();
        // $scop.customer_name = localStorageService.get();
        // $scop.customer_name = localStorageService.get();
        // $scop.customer_name = localStorageService.get();


        User.getOrderHistory()
            .success(function(res) {
                // console.log('Sales History', res);
                if (res != null || res != "") {
                    $scope.salesHistory = res;
                }
            })
            .error(function(err) {
                console.log('error', err);
            })

        User.getCustomerPromotionOffers()
            .success(function(res) {
                console.log('All Customer Promotion Offers', res);
                if (res != null || res != "") {
                    // $scope.consumedPromotions = res;
                }
            })
            .error(function(err) {
                console.log('error', err);
            })


        User.getConsumedPromotionOffers()
            .success(function(res) {
                console.log('All Consumed Promotion Offers', res);
                if (res != null || res != "") {
                    $scope.consumedOffers = res;
                }
            })
            .error(function(err) {
                console.log('error', err);
            })

        User.getAvailablePromotionOffers()
            .success(function(res) {
                console.log('All Available Promotion Offers', res);
                if (res != null || res != "") {
                    // $scope.consumedPromotions = res;
                }
            })
            .error(function(err) {
                console.log('error', err);
            })


    })

app.controller('BranchSetupCtrl', function($scope,User) {

    $scope.branchNameEn="";
    $scope.brancNameAr="";
    $scope.branchAddress="";
    $scope.latitude="";
    $scope.longitude="";
    $scope.cityId="";
    $scope.allCities =[];
    $scope.showgrid=true;
    $scope.updateBtnShow=false;
    $scope.saveBtnShow=true;
    $scope.isDataLoading=true;
    User.getCities().success(function(res){
        $scope.allCities=res;
        console.log('cities',$scope.allCities.CityName)
    })
    .error(function(err){
        console.log(err)
    })
    $scope.getId = function() {
            console.log($scope.cityId.CityId);
        }
            $scope.addBranch= function(){
             
              $scope.switchBool = function(value) {
                    $scope[value] = !$scope[value];
                };
                $scope.loaderr = true;
                $scope.showSuccessAlert = false;
                $scope.showSuccessAlertDelete = false;
                $scope.showErrorAlert = false;
                $scope.errorText = "";


            if($scope.branchNameEn !="" && $scope.brancNameAr !=""  && $scope.branchAddress !="" && $scope.latitude !="" && $scope.longitude !=""){
                var params = "grant_type=client_credentials&client_id=Android01&client_secret=21B5F798-BE55-42BC-8AA8-0025B903DC3B&scope=app1";
                $scope.brancObject={
                    "CityId":$scope.cityId.CityId,
                    "BranchName":$scope.branchNameEn,
                    "BranchNameInArabic" : $scope.brancNameAr,
                    "Address" : $scope.branchAddress,
                    "Longitude" : $scope.longitude,
                    "Latitude" : $scope.latitude
                } 
                var url = "http://autotecauth.azurewebsites.net/identity/connect/token";
                $http.post(url, params,{ 
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
                }).success(function(result){
                    $http.post('http://autotecapi.azurewebsites.net/api/branch',$scope.brancObject,{
                        headers: {
                                'Authorization': "Bearer" + " " + result.access_token
                            }
                    }).success(function(res){
                        console.log(res)
                        console.log('in add branch scucess')
                        $scope.loaderr = false;
                        $scope.showSuccessAlert = true;
                        $scope.isDataLoading = false;
                        $window.location.reload();
                    })
                    .error(function(err){
                        $scope.loaderr = false
                        $scope.errorText = err.Message;
                        $scope.showErrorAlert = true;
                        console.log(err)
                        $scope.isDataLoading = false;
                    })
                    
                })

            } else{
                alert("Please fill all the fields first");
                $scope.loaderr = false;
            }
            
        }

        
        

    $scope.tabs = [
        true, false, false, false
    ]
    $scope.tabclick  = function(ind) {
        for (var i =0; i< $scope.tabs.length; i++) {
            if (i == ind) {
                $scope.tabs[i] = true;
            }
            else {
                $scope.tabs[i] = false;
            }
        }
    }
})

app.controller('SignupCtrl', ['$scope', '$rootScope', '$http', '$state', '$location', function($scope, $rootScope, $http, $state, $location) {

    $scope.user = {};
    $scope.user.MobileNumber = "";
    var User = {
        UserName: "",
        Password: ""
    };
    $scope.regex = '^[a-zA-Z]+[a-zA-Z0-9._-]+@[a-z]+\.[a-z.]{2,5}$';

    $scope.register = function(user) {
        var errors = [];
        if ($scope.user.FirstName == null || $scope.user.FirstName == "") {
            errors.push({ message: 'First Name is required' })
        }

        if ($scope.user.MobileNumber == null || $scope.user.MobileNumber == "") {
            errors.push({ message: 'Mobile Number is required' })
        }

        if ($scope.user.Password == null || $scope.user.Password == "") {
            errors.push({ message: 'Password is required' })
        }

        if ($scope.user.EmailAddress == null || $scope.user.EmailAddress == "") {
            errors.push({ message: 'Email is required' });
        } else {
            var email = $scope.user.EmailAddress.match($scope.regex);
            if (email == null) {
                console.log("Error-4a");
                errors.push({ message: 'Not a valid email' });
            }
        }

        // if ($scope.user.LastName == null || $scope.user.LastName == "") {
        //     errors.push({ message: 'Last Name is required' })
        // }


        //  if ($scope.user.ReferredById == null || $scope.user.ReferredById == "Select Reference") {
        //     errors.push({ message: 'Reference is required' })
        // }


        //  if ($scope.user.PromoKey == null || $scope.user.PromoKey == "") {
        //     errors.push({ message: 'Promo Key is required' })
        // }

        if (errors.length != 0) {
            $scope.register_error_message = "Failed to Add Customer";
            for (var i = 0; i < errors.length; i++) {
                if (errors[i].message == "First Name is required") {
                    $scope.register_error_message_firstname = errors[i].message;;
                }

                if (errors[i].message == "Mobile Number is required") {
                    $scope.register_error_message_mobileno = errors[i].message;;
                }

                if (errors[i].message == "Password is required") {
                    $scope.register_error_message_password = errors[i].message;;
                }

                if (errors[i].message == "Not a valid email" || errors[i].message == "Email is required") {
                    $scope.register_error_message_email = errors[i].message;
                }
            };

        } else {
            var params = "grant_type=client_credentials&client_id=Android01&client_secret=21B5F798-BE55-42BC-8AA8-0025B903DC3B&scope=app1";
            User['UserName'] = $scope.user.MobileNumber;
            User['Password'] = $scope.user.Password;
            $scope.user.User = User;
            $scope.user.Id = null;
            var url = "http://autotecauth.azurewebsites.net/identity/connect/token";
            $http.post(url, params, {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
                })
                .success(function(result) {
                    $http.post('http://autotecapi.azurewebsites.net/api/CustomerRegistration', $scope.user, {
                            headers: {
                                'Authorization': "Bearer" + " " + result.access_token
                            }
                        }).success(function(res) {
                            if (res == "Customer has been registerd succesfully") {
                                console.log("Customer Registered Successfully");
                                $scope.register_error_message = "Customer Registered Successfully";
                                $location.path('/mobileappusers');
                            } else {
                                console.log("Failed to Register Customer");
                                $scope.register_error_message = "Failed to Register Customer";
                            }
                        })
                        .error(function(err) {
                            if (err.Message == "" || err.Message != null) {
                                if (err.Message == "User name not available") {
                                    console.log("Failed to Add Customer");
                                } else {

                                }
                            } else {

                            }
                        })
                })
                .error(function(error) {
                    console.log("API calling Error", error);
                    $scope.register_error_message = "Failed to Add Customer";
                })

        }
    }

}])


// .controller("MyCtrl", function($scope) {

//   $scope.open = function() {
//     $scope.showModal = true;
//   };

//   $scope.ok = function() {
//     $scope.showModal = false;
//   };

//   $scope.cancel = function() {
//     $scope.showModal = false;
//   };

// })
app.service('NavigateState', function($state, localStorageService) {
    this.navigate = function(state, params) {
        //      $rootScope.navigate=function(state,params){
        var lang = localStorageService.get('pageLanguage');
        //     console.log(lang);
        if (lang == 'en') {
            if (params) {
                $state.go(state, params)
            } else {
                $state.go(state)
            }
        } else {
            if (params) {
                $state.go(state + 'a', params)
            } else {
                $state.go(state + 'a')
            }
        }

    }
})
