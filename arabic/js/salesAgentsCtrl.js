app.controller('salesAgentsCtrl', function($state, $scope, User) {
        console.log("sales agents controller called")
        $scope.searchAgentName = "";
        $scope.searchAgentCompany = "";
        $scope.searchAgentNumber = "";
        $scope.filterMonth = "";
        $scope.inc_dec = 0;
        $scope.page_number = 10;
        $scope.salesAgents = [];

        $scope.limits = [{
            value: '10',
            text: '10'
        }, {
            value: '20',
            text: '20'
        }];

        var pageNumber = 0;
        var pageSize = 4;
        $scope.totalpages = 0;
        $scope.isDataLoading = true;
        User.saleAgentsCount('0ns', '0ns', '0ns')
            .success(function(res) {
                console.log("ress", res)
                $scope.totalpages = parseInt(res / $scope.page_number);


                User.getSalesAgents($scope.inc_dec, $scope.page_number).success(function(res) {
                        console.log('All Sales Agents', res);
                        if (res != null || res != "") {
                            $scope.customers = res;
                            console.log("agents")

                            for (var i = 0; i < res.length; i++) {
                                $scope.salesAgents.push({
                                    Id: res[i].Id,
                                    FirstName: res[i].FirstName,
                                    CompanyName: res[i].CompanyName,
                                    LastName: res[i].LastName,
                                    ContactNumber: res[i].ContactNumber,
                                    EmailAddress: res[i].EmailAddress,
                                    TotalConverted: res[i].TotalConverted,
                                    TotalReferrals: res[i].TotalReferrals,
                                    TotalRegistered: res[i].TotalRegistered,
                                    Type: res[i].Type,
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

            })
        $scope.dec_value = function(inc_dec) {

            if ($scope.totalpages != 0) {
                if (inc_dec => $scope.totalpages) {
                    $scope.inc_dec--;
                    $scope.isDataLoading = true;
                    $scope.salesAgents = [];
                    User.getSalesAgents($scope.inc_dec, $scope.page_number).success(function(res) {
                            // console.log('All Customers', res);

                            if (res != null || res != "") {
                                $scope.customers = res;
                                // console.log(res)
                                for (var i = 0; i < res.length; i++) {
                                    $scope.salesAgents.push({
                                        Id: res[i].Id,
                                        FirstName: res[i].FirstName,
                                        CompanyName: res[i].CompanyName,
                                        LastName: res[i].LastName,
                                        ContactNumber: res[i].ContactNumber,
                                        EmailAddress: res[i].EmailAddress,
                                        TotalConverted: res[i].TotalConverted,
                                        TotalReferrals: res[i].TotalReferrals,
                                        TotalRegistered: res[i].TotalRegistered,
                                        Type: res[i].Type,
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
                User.getSalesAgents($scope.inc_dec, $scope.page_number).success(function(res) {
                        // console.log('All Customers', res);
                        if (res != null || res != "") {
                            $scope.customers = res;
                            $scope.salesAgents = [];
                            console.log('increment', res)
                            for (var i = 0; i < res.length; i++) {
                                $scope.salesAgents.push({
                                    Id: res[i].Id,
                                    FirstName: res[i].FirstName,
                                    CompanyName: res[i].CompanyName,
                                    LastName: res[i].LastName,
                                    ContactNumber: res[i].ContactNumber,
                                    EmailAddress: res[i].EmailAddress,
                                    TotalConverted: res[i].TotalConverted,
                                    TotalReferrals: res[i].TotalReferrals,
                                    TotalRegistered: res[i].TotalRegistered,
                                    Type: res[i].Type,
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

        $scope.downloadCSV = function(args) {
            var data, filename, link;
            var csv = convertArrayOfObjectsToCSV({
                data: $scope.salesAgents
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
        $scope.pageChange = function() {
            console.log($scope.page_number);
            $scope.totalpages = 0;
            $scope.isDataLoading = true;
            $scope.salesAgents = [];
            User.saleAgentsCount('0ns', '0ns', '0ns')
                .success(function(res) {
                    console.log("ress", res)
                    $scope.totalpages = parseInt(res / $scope.page_number);


                    User.getSalesAgents($scope.inc_dec, $scope.page_number).success(function(res) {
                            console.log('All Sales Agents', res);
                            if (res != null || res != "") {
                                $scope.customers = res;
                                console.log("agents")

                                for (var i = 0; i < res.length; i++) {
                                    $scope.salesAgents.push({
                                        Id: res[i].Id,
                                        FirstName: res[i].FirstName,
                                        CompanyName: res[i].CompanyName,
                                        LastName: res[i].LastName,
                                        ContactNumber: res[i].ContactNumber,
                                        EmailAddress: res[i].EmailAddress,
                                        TotalConverted: res[i].TotalConverted,
                                        TotalReferrals: res[i].TotalReferrals,
                                        TotalRegistered: res[i].TotalRegistered,
                                        Type: res[i].Type,
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

                })
        }
        $scope.pageChangeValue = function(inc_dec) {
            $scope.salesAgents = [];


        }
        $scope.getMonth = function() {
            console.log($scope.filterMonth);
        }

        $scope.filterByMonth = function() {
            User.getReport($scope.filterMonth).success(function(res) {
                    // console.log('reportsss',res)
                    $scope.salesAgents = [];
                    $scope.salesAgents.length = 0;
                    if (res != null || res != "") {
                        for (var i = 0; i < res.length; i++) {
                            $scope.salesAgents.push({
                                Id: res[i].Id,
                                FirstName: res[i].FirstName,
                                CurrentCommission: res[i].CurrentCommission,
                                CompanyName: res[i].CompanyName,
                                LastName: res[i].LastName,
                                ContactNumber: res[i].ContactNumber,
                                EmailAddress: res[i].EmailAddress,
                                TotalConverted: res[i].TotalConverted,
                                TotalReferrals: res[i].TotalReferrals,
                                TotalRegistered: res[i].TotalRegistered,
                                Type: res[i].Type,
                            })
                        }
                    }
                })
                .error(function(err) {
                    console.log(err);
                })
        }

        $scope.user_registration_page = function(_type) {
            console.log("This is user_registration_page controller");
            $state.go('registration_page');
        }
        $scope.fieldsReset = function() {
            $scope.searchAgentName = "";
            $scope.searchAgentCompany = "";
            $scope.searchAgentNumber = "";
        }

        $scope.getSingleSaleAgent = function(id) {
            $state.go('saleAgentdetail', { id: id });
        }


        //-------Search Single Company Starts----------
        $scope.searchAgentByParamter = function(searchAgentName, searchAgentCompany, searchAgentNumber) {

            $scope.isDataLoading = true;
            if ($scope.searchAgentName != "") {
                User.searchSingleAgent($scope.searchAgentName, "0ns", "0ns", $scope.inc_dec, $scope.page_number).success(function(res) {
                    $scope.salesAgents = [];
                    if (res != null || res != "") {
                        for (var i = 0; i < res.length; i++) {
                            $scope.salesAgents.push({
                                Id: res[i].Id,
                                FirstName: res[i].FirstName,
                                CompanyName: res[i].CompanyName,
                                LastName: res[i].LastName,
                                ContactNumber: res[i].ContactNumber,
                                EmailAddress: res[i].EmailAddress,
                                TotalConverted: res[i].TotalConverted,
                                TotalReferrals: res[i].TotalReferrals,
                                TotalRegistered: res[i].TotalRegistered,
                                Type: res[i].Type,
                            })
                        }
                    }
                    $scope.isDataLoading = false;
                })
            } else if ($scope.searchAgentCompany != "") {
                User.searchSingleAgent("0ns", $scope.searchAgentCompany, "0ns", $scope.inc_dec, $scope.page_number).success(function(res) {
                    $scope.salesAgents = [];
                    if (res != null || res != "") {
                        for (var i = 0; i < res.length; i++) {
                            $scope.salesAgents.push({
                                Id: res[i].Id,
                                FirstName: res[i].FirstName,
                                CompanyName: res[i].CompanyName,
                                LastName: res[i].LastName,
                                ContactNumber: res[i].ContactNumber,
                                EmailAddress: res[i].EmailAddress,
                                TotalConverted: res[i].TotalConverted,
                                TotalReferrals: res[i].TotalReferrals,
                                TotalRegistered: res[i].TotalRegistered,
                                Type: res[i].Type,
                            })
                        }
                    }
                    $scope.isDataLoading = false;
                })
            } else if ($scope.searchAgentNumber != "") {
                User.searchSingleAgent("0ns", "0ns", $scope.searchAgentNumber, $scope.inc_dec, $scope.page_number).success(function(res) {
                    $scope.salesAgents = [];
                    if (res != null || res != "") {
                        for (var i = 0; i < res.length; i++) {
                            $scope.salesAgents.push({
                                Id: res[i].Id,
                                FirstName: res[i].FirstName,
                                CompanyName: res[i].CompanyName,
                                LastName: res[i].LastName,
                                ContactNumber: res[i].ContactNumber,
                                EmailAddress: res[i].EmailAddress,
                                TotalConverted: res[i].TotalConverted,
                                TotalReferrals: res[i].TotalReferrals,
                                TotalRegistered: res[i].TotalRegistered,
                                Type: res[i].Type,
                            })
                        }
                    }
                    $scope.isDataLoading = false;
                })
            } else {
                User.searchSingleAgent("0ns", "0ns", "0ns", $scope.inc_dec, $scope.page_number).success(function(res) {
                    $scope.salesAgents = [];
                    if (res != null || res != "") {
                        for (var i = 0; i < res.length; i++) {
                            $scope.salesAgents.push({
                                Id: res[i].Id,
                                FirstName: res[i].FirstName,
                                CompanyName: res[i].CompanyName,
                                LastName: res[i].LastName,
                                ContactNumber: res[i].ContactNumber,
                                EmailAddress: res[i].EmailAddress,
                                TotalConverted: res[i].TotalConverted,
                                TotalReferrals: res[i].TotalReferrals,
                                TotalRegistered: res[i].TotalRegistered,
                                Type: res[i].Type,
                            })
                        }
                    }
                    $scope.isDataLoading = false;
                })
            }
        }

        //-------Search Single Company Ends----------

    })