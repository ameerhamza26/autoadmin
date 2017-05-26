app.controller('PromotionCtrl', function($state, $scope, User, $http) {
        console.log("Promotion controller called")
        $scope.searchTitle_EN = "";
        $scope.searchTitle_AR = "";
        $scope.searchTrigger = "";
        $scope.searchStatus = "";
        $scope.triggerTxt = "";
        $scope.triggerId = "";
        $scope.fieldsReset = function() {
            $scope.searchTitle_EN = "";
            $scope.searchTitle_AR = "";
            $scope.searchTrigger = "";
            $scope.searchStatus = "";
        }
        $scope.isDataLoading = true;
        $scope.promotions = [];
        $scope.inc_dec = 0;
        $scope.page_number = 10;
        $scope.limits = [{
            value: '10',
            text: '10'
        }, {
            value: '20',
            text: '20'
        }];
        $scope.pageChange = function() {
            $scope.totalpages = 0;
            $scope.isDataLoading = true;
            $scope.promotions = [];
            User.getPromotionsCount('0ns', '0ns', '0ns', '0ns').success(function(res) {
                    console.log("Res", res)

                    $scope.totalpages = parseInt(res / $scope.page_number);

                    User.getPromotions($scope.inc_dec, $scope.page_number).success(function(res) {
                            console.log('All Prmotions', res);
                            if (res != null || res != "") {
                                //  console.log("Promotions offers")
                                // console.log(res)
                                for (var i = 0; i < res.length; i++) {
                                    $scope.promotions.push({
                                        Id: res[i].Id,
                                        CreatedOn: res[i].CreatedOn,
                                        ExpiresOn: res[i].ExpiresOn,
                                        Status: res[i].Status,
                                        Title_AR: res[i].Title_AR,
                                        Title_EN: res[i].Title_EN,
                                        Trigger: res[i].Trigger,
                                    })
                                }
                            }
                            $scope.isDataLoading = false;
                        })
                        .error(function(err) {
                            console.log('error', err);
                            $scope.isDataLoading = false;
                        })
                })
                .error(function(err) {
                    console.log("errr", err)
                })
        }
        $scope.pageChangeValue = function(inc_dec) {
            $scope.mobileAppCustomers = [];


        }
        $scope.dec_value = function(inc_dec) {
            if ($scope.totalpages != 0) {
                if (inc_dec => $scope.totalpages) {
                    $scope.inc_dec--;
                    $scope.isDataLoading = true;
                    $scope.promotions = []
                    User.getPromotions($scope.inc_dec, $scope.page_number).success(function(res) {
                            // console.log('All Customers', res);
                            // $scope.companies=[];
                            if (res != null || res != "") {
                                // $scope.customers = res;
                                // console.log(res)
                                for (var i = 0; i < res.length; i++) {
                                    $scope.promotions.push({
                                        Id: res[i].Id,
                                        CreatedOn: res[i].CreatedOn,
                                        ExpiresOn: res[i].ExpiresOn,
                                        Status: res[i].Status,
                                        Title_AR: res[i].Title_AR,
                                        Title_EN: res[i].Title_EN,
                                        Trigger: res[i].Trigger,
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

            if (inc_dec < $scope.totalpages) {
                $scope.inc_dec++;
                $scope.isDataLoading = true;
                User.getPromotions($scope.inc_dec, $scope.page_number).success(function(res) {
                        // console.log('All Customers', res);
                        //$scope.companies = [];
                        if (res != null || res != "") {
                            $scope.customers = res;
                            $scope.promotions = [];
                            console.log('increment', res)
                            for (var i = 0; i < res.length; i++) {
                                $scope.promotions.push({
                                    Id: res[i].Id,
                                    CreatedOn: res[i].CreatedOn,
                                    ExpiresOn: res[i].ExpiresOn,
                                    Status: res[i].Status,
                                    Title_AR: res[i].Title_AR,
                                    Title_EN: res[i].Title_EN,
                                    Trigger: res[i].Trigger,
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

        $scope.totalpages = 0;
        User.getPromotionsCount('0ns', '0ns', '0ns', '0ns').success(function(res) {
                console.log("Res", res)

                $scope.totalpages = parseInt(res / $scope.page_number);

                User.getPromotions($scope.inc_dec, $scope.page_number).success(function(res) {
                        console.log('All Prmotions', res);
                        if (res != null || res != "") {
                            //  console.log("Promotions offers")
                            // console.log(res)
                            for (var i = 0; i < res.length; i++) {
                                $scope.promotions.push({
                                    Id: res[i].Id,
                                    CreatedOn: res[i].CreatedOn,
                                    ExpiresOn: res[i].ExpiresOn,
                                    Status: res[i].Status,
                                    Title_AR: res[i].Title_AR,
                                    Title_EN: res[i].Title_EN,
                                    Trigger: res[i].Trigger,
                                })
                            }
                        }
                        $scope.isDataLoading = false;
                    })
                    .error(function(err) {
                        console.log('error', err);
                        $scope.isDataLoading = false;
                    })
            })
            .error(function(err) {
                console.log("errr", err)
            })


        $scope.getSinglePromotion = function(id) {
            $state.go('Promotiondetail', { id: id });
        }
        $scope.NewPromotion = {};

        /// ----- New Promotion Code starts----

        $scope.regex = '^[a-zA-Z]+[a-zA-Z0-9._-]+@[a-z]+\.[a-z.]{2,5}$';

        $scope.registerPromotion = function() {
            console.log($scope.NewPromotion)
            $scope.switchBool = function(value) {
                $scope[value] = !$scope[value];
            };
            $scope.loaderr = true;
            $scope.showSuccessAlert = false;
            $scope.showErrorAlert = false;
            $scope.errorText = "";
            var errors = [];
            if ($scope.NewPromotion.titelEn == null || $scope.NewPromotion.titelEn == "") {
                errors.push({ message: 'Name is required' })
            }

            if ($scope.NewPromotion.Status == null || $scope.NewPromotion.Status == "") {
                errors.push({ message: 'Number is required' })
            }



            // if ($scope.user.User.Password == null || $scope.user.User.Password == "") {
            //     errors.push({ message: 'Password is required' })
            // }




            if (errors.length != 0) {
                console.log('errors occured');

            } else {
                var params = "grant_type=client_credentials&client_id=Android01&client_secret=21B5F798-BE55-42BC-8AA8-0025B903DC3B&scope=app1";
                // $scope.user.UserName = $scope.user.MobileNumber;

                var url = "http://autotecauth.azurewebsites.net/identity/connect/token";
                $scope.Promotioncustom = {
                    'Promotion': $scope.NewPromotion,
                }
                console.log($scope.Promotioncustom)
                    //.User= $scope.user
                $http.post(url, params, {
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
                    }).success(function(result) {
                        $http.post('http://autotecapi.azurewebsites.net/api/discountoffers', $scope.Promotioncustom, {
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
        User.getTriggers().success(function(res) {
                $scope.allTriggers = res;
            })
            .error(function(err) {
                console.log(err);
            })
        $scope.getId = function() {
            console.log($scope.triggerId.TriggerText);
        }
        $scope.searchTrigger = $scope.triggerId.TriggerText;
        //------ Search Single Promotion Starts---------////
        $scope.searchPromotionByParameter = function(searchTitle_EN, searchTitle_AR, searchTrigger, searchStatus) {
                console.log($scope.searchTitle_EN);
                if ($scope.searchTitle_EN != "") {
                    User.searchSinglePromotion($scope.searchTitle_EN, "0ns", "0ns", "0ns", $scope.inc_dec, $scope.page_number).success(function(res) {
                            $scope.promotions = [];
                            if (res != null || res != "") {
                                for (var i = 0; i < res.length; i++) {
                                    $scope.promotions.push({
                                        Id: res[i].Id,
                                        CreatedOn: res[i].CreatedOn,
                                        ExpiresOn: res[i].ExpiresOn,
                                        Status: res[i].Status,
                                        Title_AR: res[i].Title_AR,
                                        Title_EN: res[i].Title_EN,
                                        Trigger: res[i].Trigger,
                                    })
                                }
                            }
                        })
                        .error(function(err) {
                            console.log(err);
                        })
                } else if ($scope.searchTitle_AR != "") {
                    User.searchSinglePromotion("0ns", $scope.searchTitle_AR, "0ns", "0ns", $scope.inc_dec, $scope.page_number).success(function(res) {
                            $scope.promotions = [];
                            if (res != null || res != "") {
                                for (var i = 0; i < res.length; i++) {
                                    $scope.promotions.push({
                                        Id: res[i].Id,
                                        CreatedOn: res[i].CreatedOn,
                                        ExpiresOn: res[i].ExpiresOn,
                                        Status: res[i].Status,
                                        Title_AR: res[i].Title_AR,
                                        Title_EN: res[i].Title_EN,
                                        Trigger: res[i].Trigger,
                                    })
                                }
                            }
                        })
                        .error(function(err) {
                            console.log(err);
                        })
                } else if ($scope.searchTrigger != "") {
                    User.searchSinglePromotion("0ns", "0ns", $scope.searchTrigger, "0ns", $scope.inc_dec, $scope.page_number).success(function(res) {
                            $scope.promotions = [];
                            if (res != null || res != "") {
                                for (var i = 0; i < res.length; i++) {
                                    $scope.promotions.push({
                                        Id: res[i].Id,
                                        CreatedOn: res[i].CreatedOn,
                                        ExpiresOn: res[i].ExpiresOn,
                                        Status: res[i].Status,
                                        Title_AR: res[i].Title_AR,
                                        Title_EN: res[i].Title_EN,
                                        Trigger: res[i].Trigger,
                                    })
                                }
                            }
                        })
                        .error(function(err) {
                            console.log(err);
                        })
                } else if ($scope.searchStatus != "") {
                    User.searchSinglePromotion("0ns", "0ns", "0ns", $scope.searchStatus, $scope.inc_dec, $scope.page_number).success(function(res) {
                            $scope.promotions = [];
                            if (res != null || res != "") {
                                for (var i = 0; i < res.length; i++) {
                                    $scope.promotions.push({
                                        Id: res[i].Id,
                                        CreatedOn: res[i].CreatedOn,
                                        ExpiresOn: res[i].ExpiresOn,
                                        Status: res[i].Status,
                                        Title_AR: res[i].Title_AR,
                                        Title_EN: res[i].Title_EN,
                                        Trigger: res[i].Trigger,
                                    })
                                }
                            }
                        })
                        .error(function(err) {
                            console.log(err);
                        })
                } else {
                    User.searchSinglePromotion("0ns", "0ns", "0ns", "0ns", $scope.inc_dec, $scope.page_number).success(function(res) {
                        $scope.promotions = [];
                        if (res != null || res != "") {
                            for (var i = 0; i < res.length; i++) {
                                $scope.promotions.push({
                                    Id: res[i].Id,
                                    CreatedOn: res[i].CreatedOn,
                                    ExpiresOn: res[i].ExpiresOn,
                                    Status: res[i].Status,
                                    Title_AR: res[i].Title_AR,
                                    Title_EN: res[i].Title_EN,
                                    Trigger: res[i].Trigger,
                                })
                            }
                        }
                    })

                }
            }
            //------Search Single Promotion Ends-------------///
    })