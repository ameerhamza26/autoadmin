var app=angular.module('AutotekArabic.controller', [])

app.controller('LoginCtrl', function($scope,$rootScope, $state, User, localStorageService, $location, NavigateState ) {
    $scope.user = {};
    localStorageService.remove("access_token");
    var params = {
        'grant_type': 'password',
        'username': $scope.user.username,
        'password': $scope.user.password,
        'client_id': 'Android02',
        'client_secret': '21B5F798-BE55-42BC-8AA8-0025B903DC3B',
        'scope': 'app1'
    };
    $scope.Iserror=false;
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
        
        User.login(params).success(function(res) {

                if (localStorageService.isSupported) {
                    localStorageService.set("access_token", res);

                    User.getUser().success(function(res) {
                            $scope.loginLoaderShow = false;
                            var loggedInUser = {
                                user: res
                            }
                            localStorageService.set("loggedInUser", loggedInUser);
                            if (localStorageService.get('pageLanguage') == 'en') {
                            NavigateState.navigate('dashboard');
                            }
                            else {
                            window.location = "/arabic/index.html"
                            }
                            //NavigateState.navigate('dashboard');
                            
                    })
                        .error(function(err) {
                            console.log(err);
                             $scope.Iserror=true;
                             $scope.loginLoaderShow = false;
                        });
                }
            })
            .error(function(err) {
                console.log('error', err);

                  $scope.Iserror=true;
                  $scope.loginLoaderShow = false;
            })
    }
               
           if (localStorageService.get('pageLanguage') == null) {
                $scope.lng='en';
               localStorageService.set('pageLanguage',$scope.lng);
           }     
           else {
               $scope.lng = localStorageService.get('pageLanguage') ;
           }
                
             $scope.get_language=function(value1){
            console.log($scope.lng)
            localStorageService.set('pageLanguage',$scope.lng);
          }
          
        $scope.go=function(language){
            console.log(language)
            localStorageService.set('pageLanguage',language);
        }
      
})

app.controller('LogoutCtrl', function($scope, NavigateState,localStorageService, $location, $state) {
    console.log('logout controller')
    $scope.user = localStorageService.get("loggedInUser").user;
    $scope.userName = $scope.user.FirstName;
    $scope.logout = function() {
            
        if (localStorageService.get('access_token')) {
            localStorageService.remove("access_token");
            localStorageService.remove("loggedInUser");
            window.location="/";
            return true;

        } else {
            return false;
        }
    }

})

app.controller('DashboardApiCtrl', function($scope, User) {

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

app.controller('AppSingleuser',function($scope,User,$stateParams,$state){
        $scope.isDataLoading = true;
        $scope.NewPassword="";
        User.getSingleAppUser($stateParams.id).success(function(res){
            $scope.singleUser=res[0];
            console.log($scope.singleUser);
            $scope.isDataLoading = false;
        })
        .error(function(err){
            console.log(err);
            $scope.isDataLoading = false;
        })
        /// chane password function starts///
         $scope.ChangePassword= function(singleUser){
             $scope.switchBool = function (value) {
                    $scope[value] = !$scope[value];
                };
                $scope.loaderr=true;
                $scope.showSuccessAlert = false;
                $scope.showErrorAlert = false;
                $scope.errorText="";
                $scope.passwordCustom={
                    "User_GUID" :$scope.singleUser.User_GUID,
                    "NewPassword":$scope.NewPassword
                }
            User.changePassword($scope.passwordCustom).success(function(){
                    console.log(res);
                    $scope.loaderr=false;
                    $scope.showSuccessAlert = true;
            })
            .error(function(err){
                console.log(err);
                    $scope.loaderr=false
                    $scope.errorText=err.Message;
                    $scope.showErrorAlert = true;
            })
       }
         /// chane password function starts///
     $scope.deleteUser=function(deleteId){
            $scope.switchBool = function (value) {
            $scope[value] = !$scope[value];
            };
            $scope.loaderr=true;
            $scope.showSuccessAlert = false;
            $scope.showErrorAlert = false;
            $scope.errorText="";
            User.deleteSingleAppUser(deleteId).success(function(res){
                console.log(res);
                console.log('delete method called success');
                   $scope.loaderr=false;
                   $scope.showSuccessAlert = true;
            })
            .error(function(err){
                console.log(err);
                   $scope.loaderr=false
                    $scope.errorText=err.Message;
                    $scope.showErrorAlert = true;
            })
        }
           $scope.navigateToUpdate=function(id){
                 $state.go('updateMobileUser',{id:id});
        }
        $scope.updateAppUser=function(singleUser){
               $scope.switchBool = function (value) {
                    $scope[value] = !$scope[value];
                };
                $scope.loaderr=true;
                $scope.showSuccessAlert = false;
                $scope.showErrorAlert = false;
                $scope.errorText="";
                User.UpdateSingleAppUser(singleUser).success(function(res){
                    console.log(res);
                     $scope.loaderr=false;
                    $scope.showSuccessAlert = true;
                    console.log('successfuly updated');
                    $scope.isDataLoading = false;
                })
                .error(function function_name(err) {
                    console.log(err);
                        $scope.loaderr=false
                        $scope.errorText=err.Message;
                        $scope.showErrorAlert = true;
                        $scope.isDataLoading = false;
                })
        }
})
app.controller('addNewAppUser',function($scope, User,$http){
 $scope.regex = '^[a-zA-Z]+[a-zA-Z0-9._-]+@[a-z]+\.[a-z.]{2,5}$';
         $scope.addUser={};
        $scope.register = function() {
        // console.log($scope.user)
        // console.log('errors occured');
        $scope.switchBool = function (value) {
        $scope[value] = !$scope[value];
            };
        $scope.loaderr=true;
        $scope.showSuccessAlert = false;
        $scope.showErrorAlert = false;
        $scope.errorText="";

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
              $scope.errorText="Email, Phone Number Or Address is Empty";
                            $scope.showErrorAlert = true;
                            $scope.switchBool = function (value) {
        $scope[value] = !$scope[value];
        $scope.loaderr=false;
            };

        } else {
            var params = "grant_type=client_credentials&client_id=Android01&client_secret=21B5F798-BE55-42BC-8AA8-0025B903DC3B&scope=app1";
            // $scope.addUser.UserName = $scope.addUser.MobileNumber;
            // $scope.usercustom = {
            //     'User' : $scope.addUser,
               
            // }
            // console.log($scope.usercustom)

            $scope.usercustom={ 
                "FirstName" : $scope.addUser.FirstName , "LastName" : $scope.addUser.LastName ,
                 "MobileNumber" : $scope.addUser.MobileNumber,
                  "EmailAddress" : $scope.addUser.EmailAddress,
                "User" : { "UserName": $scope.addUser.MobileNumber ,
                 "Password" : $scope.addUser.Password}
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
                            $scope.loaderr=false;
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
                            $scope.loaderr=false
                            $scope.errorText=err.Message;
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
app.controller('SingleSalesAgent',function($scope,User,$stateParams,$state){
         $scope.isDataLoading = true;
        $scope.getStatus=function(value6){
                if($scope.SingleSalesAgent.Status=="Active"){
                    $scope.SingleSalesAgent.status=false;
                }
                else
                {
                   $scope.SingleSalesAgent.status=true; 
                }
          }
             $scope.getComissionType=function(value3){
                if($scope.SingleSalesAgent.AgentCommission=="Percentage"){
                    $scope.SingleSalesAgent.CommissionType=false;
                }
                else
                {
                   $scope.SingleSalesAgent.CommissionType=true; 
                }
          }
          $scope.onChangeCompany=function(){
                console.log($scope.SingleSalesAgent.AffiliateCompanyId.Id);
            }
            //---------Update Sales Agent Starts-------//
                $scope.updateSingleSalesAgent=function(SingleSalesAgent){
                     $scope.switchBool = function (value) {
                    $scope[value] = !$scope[value];
                };
                    $scope.loaderr=true;
                    $scope.showSuccessAlert = false;
                    $scope.showErrorAlert = false;
                    $scope.errorText="";
                    $scope.singleSalesAgentCustom={ 
                        "Id": $scope.SingleSalesAgent.Id, "firstname":$scope.SingleSalesAgent.FirstName, "lastname":$scope.SingleSalesAgent.LastName, "ContactNumber":$scope.SingleSalesAgent.ContactNumber,
                        "EmailAddress": $scope.SingleSalesAgent.EmailAddress , "AffiliateCompanyId" : $scope.SingleSalesAgent.AffiliateCompanyId.Id, 
                        "Address": $scope.SingleSalesAgent.Address, "ERPReference" : $scope.SingleSalesAgent.ERPReference, "isActive" : $scope.SingleSalesAgent.status,
                        "CommissionDetails" : [{"CommissionRate": $scope.SingleSalesAgent.CommissionStructure, "IsPercentage" : $scope.SingleSalesAgent.CommissionType,
                           "BankDetails" : $scope.SingleSalesAgent.BankDetials
                          }]
                        }
                    console.log('singleUserrrr',$scope.singleSalesAgentCustom);
                    User.UpdateSalesAgents($scope.singleSalesAgentCustom).success(function(res){
                    console.log(res);
                    $scope.loaderr=false;
                    $scope.showSuccessAlert = true;
                    console.log('Sale Agent successfuly updated');
                    $scope.isDataLoading = false;
                })
                .error(function function_name(err) {
                    console.log(err);
                        $scope.loaderr=false
                        $scope.errorText=err.Message;
                        $scope.showErrorAlert = true;
                         $scope.isDataLoading = false;
                })
             }
             //---------Update Sales Agent Ends-------//

         $scope.deleteId=$stateParams.id;
        console.log($scope.deleteId);
        User.getSingleSalesAgent($stateParams.id).success(function(res){
            $scope.SingleSalesAgent=res[0];
            console.log($scope.SingleSalesAgent);
            $scope.isDataLoading = false;
        })
        .error(function(err){
            console.log(err);
            $scope.isDataLoading = false;
        })
        $scope.navigateToUpdate=function(id){
            $state.go('updateaSalesAgent',{id:id});
        }
        //---------- Delete Agent Starts ----------
           $scope.deleteAgent=function(deleteId){
            $scope.switchBool = function (value) {
            $scope[value] = !$scope[value];
            };
            $scope.loaderr=true;
            $scope.showSuccessAlert = false;
            $scope.showErrorAlert = false;
            $scope.errorText="";
            User.deleteAgent(deleteId).success(function(res){
                console.log(res);
                console.log('delete method called success');
                   $scope.loaderr=false;
                   $scope.showSuccessAlert = true;
            })
            .error(function(err){
                console.log(err);
                   $scope.loaderr=false
                    $scope.errorText=err.Message;
                    $scope.showErrorAlert = true;
            })
        }
        //-----------Delete Agents Ends------
        
            User.getCompanies().success(function(res){
                $scope.Companies=res;
            })
            .error(function(err){
                console.log(err);
            })
        ///---------Update sales Agents Starts-----///
                $scope.updateSalesAgents=function(SingleSalesAgent){
                $scope.singleSalesAgentCustom={ "Id": "6", "firstname":"John", "lastname":"Jimmy", "ContactNumber":"5554444", "EmailAddress": "email@gmail.com" , "AffiliateCompanyId" : 1, 
                    "Address": "9999999", "ERPReference" : "ERP-Company-002", "isActive" : "true",
                    "CommissionDetails" : [{"CommissionRate": "4.0", "IsPercentage" : "true",
                    "BankDetails" : "9999-c SAMBA Bank, Riyadh, Saudi Arabia"
                    }]
                }
            }
        ///---------Update sales Agents Ends-----///
})
app.controller('SingleCompany',function($scope,User,$stateParams,$state){
    $scope.isDataLoading = true;
            $scope.deleteId=$stateParams.id;
            console.log($scope.deleteId);
        User.getSingleCompany($stateParams.id).success(function(res){
            $scope.SingleCompany=res[0];
            console.log($scope.SingleCompany);
            $scope.isDataLoading = false;
        })
        .error(function(err){
            console.log(err);
         $scope.isDataLoading = false;
        })
             $scope.navigateToUpdate=function(id){
                 $state.go('companyaUpdate',{id:id});
        }
         $scope.getStatus=function(value2){
                if($scope.SingleCompany.AccountStatus=="Active"){
                    $scope.SingleCompany.status=false;
                }
                else
                {
                   $scope.SingleCompany.status=true; 
                }
          }
             $scope.getComissionType=function(value3){
                if($scope.SingleCompany.CompanyCommissionType=="Percentage"){
                    $scope.SingleCompany.CommissionType=false;
                }
                else
                {
                   $scope.SingleCompany.CommissionType=true; 
                }
          }
  

         $scope.updateCompany=function(SingleCompany){
             $scope.switchBool = function (value) {
                    $scope[value] = !$scope[value];
                };
                $scope.loaderr=true;
                $scope.showSuccessAlert = false;
                $scope.showErrorAlert = false;
                $scope.errorText="";
                   $scope.singleCompanyCustom={
                "Id" :$scope.SingleCompany.Id,
                "CompanyName" : $scope.SingleCompany.CompanyName , "CompanyNameInArabic" : $scope.SingleCompany.CompanyName , 
                "PhoneNumber" : $scope.SingleCompany.ContactPhone, "EmailAddress" : $scope.SingleCompany.ContactEmail,
                "Address" : "Jeddah, KSA", "IsActive" : $scope.SingleCompany.status, "ERPReference" :$scope.SingleCompany.CompanyErpRerence,
                "Contacts" : [{
                    "PersonName" : $scope.SingleCompany.ContactPerson,
                    "TelephoneNumber" : $scope.SingleCompany.ContactPhone,
                    "EmailAddress" : $scope.SingleCompany.ContactEmail,
                    "OtherContactDetails" :$scope.SingleCompany.OtherContact
                },
                {
                    "PersonName" : $scope.SingleCompany.ContactPerson1,
                    "TelephoneNumber" : $scope.SingleCompany.ContactPhone1,
                    "EmailAddress" : $scope.SingleCompany.ContactEmail1,
                    "OtherContactDetails" : $scope.SingleCompany.OtherContact
                }
                ],
                "ComissionDetails" : [{
                    "CommissionRate" : $scope.SingleCompany.CompanyCommission,
                    "IsPercentage" : $scope.SingleCompany.CommissionType,
                    "PaymentMethod" : $scope.SingleCompany.OtherPaymentMethods,
                    "BankDetails" : $scope.SingleCompany.BankAccountDetails
                }]
            }
                User.UpdateCompany($scope.singleCompanyCustom).success(function(res){
                    console.log(res);
                    // console.log(SingleCompany)
                     $scope.loaderr=false;
                    $scope.showSuccessAlert = true;
                    console.log('company successfuly updated');
                    $scope.isDataLoading = false;
                })
                .error(function function_name(err) {
                    console.log(err);
                     $scope.loaderr=false
                        $scope.errorText=err.Message;
                        $scope.showErrorAlert = true;
                        $scope.isDataLoading = false;
                })
        }
        //--------- Delete Company ---------
        $scope.deleteCompany=function(deleteId){
            $scope.switchBool = function (value) {
            $scope[value] = !$scope[value];
            };
            $scope.loaderr=true;
            $scope.showSuccessAlert = false;
            $scope.showErrorAlert = false;
            $scope.errorText="";
            User.deleteCompany(deleteId).success(function(res){
                console.log(res);
                console.log('delete method called success');
                   $scope.loaderr=false;
                   $scope.showSuccessAlert = true;
            })
            .error(function(err){
                console.log(err);
                   $scope.loaderr=false
                    $scope.errorText=err.Message;
                    $scope.showErrorAlert = true;
            })
        }
        //----------Delete Company End-------

})
app.controller('addNewSalesAgent',function($state, $scope, User,$http){

     $scope.navigateToUpdate=function(id){
                 $state.go('updateaSalesAgent',{id:id});
        }
         $scope.getStatus=function(value6){
                if($scope.addSalesAgent.Status=="Active"){
                    $scope.addSalesAgent.status=false;
                }
                else
                {
                   $scope.addSalesAgent.status=true; 
                }
          }
             $scope.getComissionType=function(value3){
                if($scope.addSalesAgent.AgentCommission=="Percentage"){
                    $scope.addSalesAgent.CommissionType=false;
                }
                else
                {
                   $scope.addSalesAgent.CommissionType=true; 
                }
          }

            User.getCompanies().success(function(res){
                $scope.allCompanies=res;
            })
            .error(function(err){
                console.log(err);
            })
            $scope.onChangeCompany=function(){
                console.log($scope.addSalesAgent.companeSelected.Id);
            }
     $scope.regex = '^[a-zA-Z]+[a-zA-Z0-9._-]+@[a-z]+\.[a-z.]{2,5}$';
         $scope.addSalesAgent={};
        $scope.registerSalesAgent = function() {
        // console.log($scope.user)
        // console.log('errors occured');
        $scope.switchBool = function (value) {
        $scope[value] = !$scope[value];
            };
        $scope.loaderr=true;
        $scope.showSuccessAlert = false;
        $scope.showErrorAlert = false;
        $scope.errorText="";

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
              $scope.errorText="Email, Phone Number Or Address is Empty";
                $scope.showErrorAlert = true;
                $scope.switchBool = function (value) {
                    $scope[value] = !$scope[value];
                    $scope.loaderr=false;
                 };

        } else {
            var params = "grant_type=client_credentials&client_id=Android01&client_secret=21B5F798-BE55-42BC-8AA8-0025B903DC3B&scope=app1";
            // $scope.addUser.UserName = $scope.addUser.MobileNumber;
            // $scope.usercustom = {
            //     'User' : $scope.addUser,
               
            // }
            // console.log($scope.usercustom)

            $scope.singleAgentCustom={ 
                "firstname" : $scope.addSalesAgent.firstName , "lastname" : $scope.addSalesAgent.lastName ,
                 "ContactNumber" : $scope.addSalesAgent.Contact,
                  "EmailAddress" : $scope.addSalesAgent.Email,"AffiliateCompanyId":$scope.addSalesAgent.companeSelected.Id,
                  "Address": $scope.addSalesAgent.Address,"ERPReference" : $scope.addSalesAgent.AgentErpReference,
                  "isActive" : $scope.addSalesAgent.status,
                "CommissionDetails" : [{ "CommissionRate": $scope.addSalesAgent.commRate ,
                 "IsPercentage"  : $scope.addSalesAgent.CommissionType,"BankDetails":$scope.addSalesAgent.BankDetails
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
                            $scope.loaderr=false;
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
                            $scope.loaderr=false
                            $scope.errorText=err.Message;
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

app.controller('addNewPromotion',function($state, $scope, User,$http){
    User.getTriggers().success(function(res){
        $scope.allTriggers=res;
    })
    .error(function(err){
        console.log(err);
    })
    
    $scope.regex = '^[a-zA-Z]+[a-zA-Z0-9._-]+@[a-z]+\.[a-z.]{2,5}$';
         $scope.addPromotion={};
        //  console.log($scope.addPromotion.Trigger);
        // $scope.getId=function(value4){
        //     return $scope.addPromotion.Trigger;
        // }
         if($scope.addPromotion.Status=="Active")
         {
             $scope.addPromotion.status="false";
         }
         else{
             $scope.addPromotion.status="true";
         }
            
        $scope.AddPromotion = function() {
            console.log($scope.addPromotion.Trigger.Id);
        // console.log($scope.user)
        // console.log('errors occured');
        $scope.switchBool = function (value) {
        $scope[value] = !$scope[value];
            };
        $scope.loaderr=true;
        $scope.showSuccessAlert = false;
        $scope.showErrorAlert = false;
        $scope.errorText="";

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
              $scope.errorText="Email, Phone Number Or Address is Empty";
                            $scope.showErrorAlert = true;
                            $scope.switchBool = function (value) {
        $scope[value] = !$scope[value];
        $scope.loaderr=false;
            };

        } else {
            var params = "grant_type=client_credentials&client_id=Android01&client_secret=21B5F798-BE55-42BC-8AA8-0025B903DC3B&scope=app1";
            // $scope.addUser.UserName = $scope.addUser.MobileNumber;
            // $scope.usercustom = {
            //     'User' : $scope.addUser,
               
            // }
            // console.log($scope.usercustom)

            $scope.promotionCustom={ 
                "DiscountCriteriaId" : $scope.addPromotion.Trigger.Id , "CouponCode" : $scope.addPromotion.templateCoupen ,
                 "Description_EN" : $scope.addPromotion.titelEn,"Description_AR" : $scope.addPromotion.titelAr,
                  "IsActive" : $scope.addPromotion.status,"EndDate":$scope.addPromotion.ExpiresOn
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
                            $scope.loaderr=false;
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
                            $scope.loaderr=false
                            $scope.errorText=err.Message;
                            $scope.showErrorAlert = true;
                        })
                })
                .error(function(error) {
                    
                            $ionicLoading.hide();
                })
               

        }
    }
})
app.controller('SinglePromotion',function($scope,User,$stateParams,$state){
    $scope.isDataLoading = true;
    $scope.navigateToUpdate=function(id){
                 $state.go('PromotionaUpdate',{id:id});
        }
      $scope.deleteId=$stateParams.id;
            console.log($scope.deleteId);
        User.getSinglePromotion($stateParams.id).success(function(res){
            $scope.Singlepromotion=res[0];
            console.log($scope.Singlepromotion);
            $scope.isDataLoading = false;
        })
        .error(function(err){
            console.log(err);
            $scope.isDataLoading = false;
        })
        
        User.getTriggers().success(function(res){
                $scope.allTriggers=res;
            })
            .error(function(err){
                console.log(err);
            })
               $scope.getStatus=function(value5){
                if($scope.Singlepromotion.Status=="Active"){
                    $scope.Singlepromotion.status=false;
                }
                else
                {
                   $scope.Singlepromotion.status=true; 
                }
          }
           $scope.updatePromotions=function(Singlepromotion){
              
                 $scope.switchBool = function (value) {
                    $scope[value] = !$scope[value];
                };
                $scope.loaderr=true;
                $scope.showSuccessAlert = false;
                $scope.showErrorAlert = false;
                $scope.errorText="";
               console.log($scope.Singlepromotion.Trigger.Id);
               $scope.singlePromotionCustom={
                    "Id":$scope.Singlepromotion.Id,"DiscountCriteriaId":$scope.Singlepromotion.Trigger.Id,
                    "CouponCode" :$scope.Singlepromotion.templateCoupen,
                    "Description_EN" :$scope.Singlepromotion.Title_EN,"Description_AR" :$scope.Singlepromotion.Title_AR,
                    "IsActive" :$scope.Singlepromotion.status,"EndDate" :$scope.Singlepromotion.ExpiresOn
               }
               console.log("update object",$scope.singlePromotionCustom);
                User.UpdatePromotion($scope.singlePromotionCustom).success(function(res){
                    $scope.loaderr=false;
                    $scope.showSuccessAlert = true;
                    console.log(res);
                    console.log('Promotion successfuly updated');
                    $scope.isDataLoading = false;
                })
                .error(function function_name(err) {
                    console.log(err);
                     $scope.loaderr=false
                    $scope.errorText=err.Message;
                    $scope.showErrorAlert = true;
                    $scope.isDataLoading = false;
                })
        }
         //---------- Delete Promotion Starts ----------
           $scope.deletePromotions=function(deleteId){
            $scope.switchBool = function (value) {
            $scope[value] = !$scope[value];
            };
            $scope.loaderr=true;
            $scope.showSuccessAlert = false;
            $scope.showErrorAlert = false;
            $scope.errorText="";
            User.deletePromotion(deleteId).success(function(res){
                console.log(res);
                console.log('delete method called success');
                   $scope.loaderr=false;
                   $scope.showSuccessAlert = true;
            })
            .error(function(err){
                console.log(err);
                   $scope.loaderr=false
                    $scope.errorText=err.Message;
                    $scope.showErrorAlert = true;
            })
        }
        //-----------Delete Promotion Ends------

})
app.controller('profile_details_page', function($state, $scope, User) {
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
    this.navigate = function(state,params) {
             //      $rootScope.navigate=function(state,params){
        var lang=localStorageService.get('pageLanguage');
        //     console.log(lang);
             if(lang=='en'){
                 if(params){
                         $state.go(state,params)
                 }
                 else{
                     $state.go(state)
                 }
             }
             else{
                 if(params){
                    $state.go(state + 'a',params)
                }
                else{
                    $state.go(state +'a')
                }
            }
        
    }
})
