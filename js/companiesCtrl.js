app.controller('companiesCtrl', function($state, $scope, User, $http) {
        console.log("companies controller called")
        console.log("test")
            // $scope.user_registration_page = function(_type) {
            //     console.log("This is user_registration_page controller");
            //     $state.go('registration_page');
            // }

        $scope.companies = [];
        // var pageNumber = 0;
        // var pageSize = 4;
        $scope.filterMonth = "";
        $scope.searchCompanyName = "";
        $scope.searchContactPerson = "";

        $scope.fieldsReset = function() {
            $scope.searchCompanyName = "";
            $scope.searchContactPerson = "";
        }
        $scope.resetFilter = function() {
            $scope.filterMonth = null;
            $scope.isDataLoading = true;
            User.getCompanies().success(function(res) {

                    console.log('All companies', res);
                    if (res != null || res != "") {
                        $scope.customers = res;
                        $scope.companies = [];
                        for (var i = 0; i < res.length; i++) {
                            $scope.companies.push({
                                Id: res[i].Id,
                                AccountStatus: res[i].AccountStatus,
                                CompanyName: res[i].CompanyName,
                                ContactPerson: res[i].ContactPerson,
                                TotalConverted: res[i].TotalConverted,
                                TotalRegistered: res[i].TotalRegistered,
                                TotalRerrals: res[i].TotalRerrals,
                                TotalSalesAgents: res[i].TotalSalesAgents,
                            })
                        }
                    }
                    $scope.isDataLoading = false;
                })
                .error(function(err) {
                    console.log('error', err);
                    $scope.isDataLoading = false;
                })
        }
        $scope.getMonth = function() {
            console.log($scope.filterMonth);
        }
        $scope.filterByMonth = function() {
            User.getReport($scope.filterMonth).success(function(res) {
                    // console.log('reportsss',res)
                    $scope.companies = [];
                    if (res != null || res != "") {
                        $scope.customers = res;
                        for (var i = 0; i < res.length; i++) {
                            $scope.companies.push({
                                Id: res[i].Id,
                                AccountStatus: res[i].AccountStatus,
                                CompanyName: res[i].CompanyName,
                                CurrentCommission: res[i].CurrentCommission,
                                ContactPerson: res[i].ContactPerson,
                                TotalConverted: res[i].TotalConverted,
                                TotalRegistered: res[i].TotalRegistered,
                                TotalRerrals: res[i].TotalRerrals,
                                TotalSalesAgents: res[i].TotalSalesAgents,
                            })
                        }
                    }
                })
                .error(function(err) {
                    console.log(err);
                })
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

        $scope.totalpages = 0;
        $scope.isDataLoading = true;
        User.getCompaniesCount('0ns', '0ns').success(function(res) {
                console.log(res)
                $scope.totalpages = parseInt(res / $scope.page_number);
                User.getCompanies($scope.inc_dec, $scope.page_number).success(function(res) {
                        console.log('All companies', res);
                        if (res != null || res != "") {
                            // $scope.companies = res;
                            for (var i = 0; i < res.length; i++) {
                                $scope.companies.push({
                                    Id: res[i].Id,
                                    AccountStatus: res[i].AccountStatus,
                                    CompanyName: res[i].CompanyName,
                                    ContactPerson: res[i].ContactPerson,
                                    TotalConverted: res[i].TotalConverted,
                                    TotalRegistered: res[i].TotalRegistered,
                                    TotalRerrals: res[i].TotalRerrals,
                                    TotalSalesAgents: res[i].TotalSalesAgents,
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
                console.log(err);
            })
        $scope.pageChange = function() {
            console.log($scope.page_number);
            $scope.totalpages = 0;
            $scope.isDataLoading = true;
            $scope.companies = [];
            User.getCompaniesCount('0ns', '0ns').success(function(res) {
                    console.log(res)
                    $scope.totalpages = parseInt(res / $scope.page_number);
                    User.getCompanies($scope.inc_dec, $scope.page_number).success(function(res) {
                            console.log('All companies', res);
                            if (res != null || res != "") {
                                // $scope.companies = res;
                                for (var i = 0; i < res.length; i++) {
                                    $scope.companies.push({
                                        Id: res[i].Id,
                                        AccountStatus: res[i].AccountStatus,
                                        CompanyName: res[i].CompanyName,
                                        ContactPerson: res[i].ContactPerson,
                                        TotalConverted: res[i].TotalConverted,
                                        TotalRegistered: res[i].TotalRegistered,
                                        TotalRerrals: res[i].TotalRerrals,
                                        TotalSalesAgents: res[i].TotalSalesAgents,
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
                    console.log(err);
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
                    User.getCompanies($scope.inc_dec, $scope.page_number).success(function(res) {
                            // console.log('All Customers', res);
                            $scope.companies=[];
                            if (res != null || res != "") {
                                // $scope.customers = res;
                                // console.log(res)
                                for (var i = 0; i < res.length; i++) {
                                    $scope.companies.push({
                                        Id: res[i].Id,
                                        AccountStatus: res[i].AccountStatus,
                                        CompanyName: res[i].CompanyName,
                                        ContactPerson: res[i].ContactPerson,
                                        TotalConverted: res[i].TotalConverted,
                                        TotalRegistered: res[i].TotalRegistered,
                                        TotalRerrals: res[i].TotalRerrals,
                                        TotalSalesAgents: res[i].TotalSalesAgents,
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
                User.getCompanies($scope.inc_dec, $scope.page_number).success(function(res) {
                        // console.log('All Customers', res);
                        $scope.companies = [];
                        if (res != null || res != "") {
                            $scope.customers = res;
                            $scope.mobileAppCustomers = [];
                            console.log('increment', res)
                            for (var i = 0; i < res.length; i++) {
                                $scope.companies.push({
                                    Id: res[i].Id,
                                    AccountStatus: res[i].AccountStatus,
                                    CompanyName: res[i].CompanyName,
                                    ContactPerson: res[i].ContactPerson,
                                    TotalConverted: res[i].TotalConverted,
                                    TotalRegistered: res[i].TotalRegistered,
                                    TotalRerrals: res[i].TotalRerrals,
                                    TotalSalesAgents: res[i].TotalSalesAgents,
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


        $scope.exportToCsv = function() {
            var data = $scope.companies;
            var csvContent = "data:text/csv;charset=utf-8,";
            data.forEach(function(infoArray, index) {

                dataString = infoArray.join(",");
                csvContent += index < data.length ? dataString + "\n" : dataString;

            });
            var encodedUri = encodeURI(csvContent);
            window.open(encodedUri);
        }

        $scope.downloadCSV = function(args) {
            var data, filename, link;
            var csv = convertArrayOfObjectsToCSV({
                data: $scope.companies
            });
            if (csv == null) return;

            filename = args.filename || 'export.csv';

            if (!csv.match(/^data:text\/csv/i)) {
                csv = 'data:text/csv;charset=utf-8,' + csv;
            }
            data = encodeURI(csv);

            link = document.createElement('a');
            link.setAttribute('href', data);
            link.setAttribute('download', filename);
            link.click();
        }

        function convertArrayOfObjectsToCSV(args) {
            var result, ctr, keys, columnDelimiter, lineDelimiter, data;

            data = args.data || null;
            if (data == null || !data.length) {
                return null;
            }

            columnDelimiter = args.columnDelimiter || ',';
            lineDelimiter = args.lineDelimiter || '\n';

            keys = Object.keys(data[0]);

            result = '';
            result += keys.join(columnDelimiter);
            result += lineDelimiter;

            data.forEach(function(item) {
                ctr = 0;
                keys.forEach(function(key) {
                    if (ctr > 0) result += columnDelimiter;

                    result += item[key];
                    ctr++;
                });
                result += lineDelimiter;
            });

            return result;
        }
        $scope.getSingleCompany = function(id) {
                $state.go('companydetail', { id: id });
            }
            //----------Add Company Function---------

        $scope.addCompany = {};
        $scope.registerCompany = function() {
                console.log($scope.addCompany)
                $scope.switchBool = function(value) {
                    $scope[value] = !$scope[value];
                };
                $scope.loaderr = true;
                $scope.showSuccessAlert = false;
                $scope.showErrorAlert = false;
                $scope.errorText = "";
                var errors = [];


                $scope.getStatus = function(value2) {
                    if ($scope.addCompany.CompanyStatus == "Active") {
                        $scope.addCompany.CompanyStatus = true;
                    } else {
                        $scope.addCompany.CompanyStatus = false;
                    }
                }
                $scope.getComissionType = function(value3) {
                    if ($scope.addCompany.CompanyCommissionType == "Percentage") {
                        $scope.addCompany.CompanyCommissionType = true;
                    } else {
                        $scope.addCompany.CompanyCommissionType = false;
                    }
                }

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
                    // $scope.addCompany.CompanyUserName = $scope.addCompany.Contact;
                    $scope.Companycustom = {
                        "CompanyName": $scope.addCompany.NameEn,
                        "CompanyNameInArabic": $scope.addCompany.NameAr,
                        "PhoneNumber": $scope.addCompany.Contact,
                        "EmailAddress": $scope.addCompany.Email,
                        "Address": $scope.addCompany.Address,
                        "IsActive": $scope.addCompany.CompanyStatus,
                        "ERPReference": $scope.addCompany.CompanyErpRerence,
                        "Contacts": [{
                            "PersonName": $scope.addCompany.PrimaryContactPerson,
                            "TelephoneNumber": $scope.addCompany.PrimaryPhone,
                            "EmailAddress": $scope.addCompany.PrimaryEmail,
                            "OtherContactDetails": $scope.addCompany.PrimaryOtherContact
                        }, {
                            "PersonName": $scope.addCompany.SecondaryContactPerson,
                            "TelephoneNumber": $scope.addCompany.SecondaryPhone,
                            "EmailAddress": $scope.addCompany.SecondaryEmail,
                            "OtherContactDetails": $scope.addCompany.OtherContact
                        }],
                        "ComissionDetails": [{
                            "CommissionRate": $scope.addCompany.CompanyCommission,
                            "IsPercentage": $scope.addCompany.CompanyCommissionType,
                            "PaymentMethod": $scope.addCompany.OtherPaymentMethods,
                            "BankDetails": $scope.addCompany.BankDetails
                        }]
                    }

                    console.log($scope.Companycustom)
                        //.User= $scope.user
                    var url = "http://autotecauth.azurewebsites.net/identity/connect/token";
                    $http.post(url, params, {
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
                        }).success(function(result) {
                            $http.post('http://autotecapi.azurewebsites.net/api/Companies', $scope.Companycustom, {
                                    headers: {
                                        'Authorization': "Bearer" + " " + result.access_token
                                    }
                                }).success(function(res) {
                                    console.log(res);
                                    $scope.loaderr = false;
                                    $scope.showSuccessAlert = true;
                                    console.log('Company added success')
                                })
                                .error(function(err) {
                                    // var error = [{ message: err.Message }]
                                    $scope.loaderr = false
                                    $scope.errorText = err.Message;
                                    $scope.showErrorAlert = true;
                                    console.log(err);
                                })
                        })
                        .error(function(error) {
                            console.log(err)
                            console.log(err);
                            $ionicLoading.hide();
                        })


                }
            }
            //-------Add Company Function Ends-------------


        //------- Search Single Company Starts----------
        $scope.searchCompanyByParemeter = function(CompanyName, ContactPerson) {
                if ($scope.searchCompanyName != "") {
                    User.searchSingleCompany($scope.searchCompanyName, "0ns", $scope.inc_dec, $scope.page_number).success(function(res) {
                            $scope.companies = [];
                            if (res != null || res != "") {
                                $scope.customers = res;
                                for (var i = 0; i < res.length; i++) {
                                    $scope.companies.push({
                                        Id: res[i].Id,
                                        AccountStatus: res[i].AccountStatus,
                                        CompanyName: res[i].CompanyName,
                                        ContactPerson: res[i].ContactPerson,
                                        TotalConverted: res[i].TotalConverted,
                                        TotalRegistered: res[i].TotalRegistered,
                                        TotalRerrals: res[i].TotalRerrals,
                                        TotalSalesAgents: res[i].TotalSalesAgents,
                                    })
                                }
                            }
                        })
                        .error(function(err) {
                            console.log(err);
                        })
                } else if ($scope.searchContactPerson != "") {
                    User.searchSingleCompany("0ns", $scope.searchContactPerson, $scope.inc_dec, $scope.page_number).success(function(res) {
                            $scope.companies = [];
                            if (res != null || res != "") {
                                $scope.customers = res;
                                for (var i = 0; i < res.length; i++) {
                                    $scope.companies.push({
                                        Id: res[i].Id,
                                        AccountStatus: res[i].AccountStatus,
                                        CompanyName: res[i].CompanyName,
                                        ContactPerson: res[i].ContactPerson,
                                        TotalConverted: res[i].TotalConverted,
                                        TotalRegistered: res[i].TotalRegistered,
                                        TotalRerrals: res[i].TotalRerrals,
                                        TotalSalesAgents: res[i].TotalSalesAgents,
                                    })
                                }
                            }
                        })
                        .error(function(err) {
                            console.log(err);
                        })
                } else {
                    User.searchSingleCompany("0ns", "0ns", $scope.inc_dec, $scope.page_number).success(function(res) {
                            $scope.companies = [];
                            if (res != null || res != "") {
                                $scope.customers = res;
                                for (var i = 0; i < res.length; i++) {
                                    $scope.companies.push({
                                        Id: res[i].Id,
                                        AccountStatus: res[i].AccountStatus,
                                        CompanyName: res[i].CompanyName,
                                        ContactPerson: res[i].ContactPerson,
                                        TotalConverted: res[i].TotalConverted,
                                        TotalRegistered: res[i].TotalRegistered,
                                        TotalRerrals: res[i].TotalRerrals,
                                        TotalSalesAgents: res[i].TotalSalesAgents,
                                    })
                                }
                            }
                        })
                        .error(function(err) {
                            console.log(err);
                        })
                }
            }
            //------- Search Single Company Ends----------
    })