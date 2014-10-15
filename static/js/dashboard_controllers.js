"use strict";

//CONTROLLERS
function DashboardController($scope, dashboardServices, DTOptionsBuilder) {
    dashboardServices.initResizer();

    $scope.UIActions = dashboardServices.UIActions;
    $scope.UITitles = dashboardServices.UITitles;
    $scope.gridOptions = dashboardServices.gridOptions;
    $scope.title = $scope.UITitles.dashboard;
    dashboardServices.resizeMargins("0px");
    $scope.searchText = dashboardServices.searchText;
    $scope.UIActions.showDashboard = true;
    $scope.UIActions.showHosts = false;
    $scope.UIActions.showJobs = false;
    $scope.loading = true;

    var jobidPromise = dashboardServices.getRaceData(); //grab from services
    jobidPromise.then(function (data) {
        $scope.raceData = data[0];
//        $scope.dtOptions = DTOptionsBuilder.fromSource($scope.raceData);
    });

    $scope.loading = false;
    $scope.contextMenu = {
        visable: true
    };

    $scope.showHosts = function () {
        dashboardServices.resizeMargins("0px");
        $scope.UIActions.showJobs = false;
        $scope.UIActions.showHosts = true;
        $scope.UIActions.showDashboard = false;
        $scope.title = $scope.UITitles.hosts;
    };

    $scope.showJobs = function () {
//        dashboardServices.resizeMargins("525px");
        $scope.UIActions.showHosts = false;
        $scope.UIActions.showJobs = true;
        $scope.UIActions.showDashboard = false;
        $scope.title = $scope.UITitles.jobs;
    };

    $scope.showDashboard = function () {
        dashboardServices.resizeMargins("0px");
        $scope.UIActions.showHosts = false;
        $scope.UIActions.showJobs = false;
        $scope.UIActions.showDashboard = true;
        $scope.title = $scope.UITitles.dashboard;
    };

    //function called from directive ui-selectable
    //is selections changes this fucntion is called
    $scope.showFrameInfo = function(selections) {
        $scope.frameObj = selections[0];

    };

    $scope.filterState = function (state) {
        $scope.searchText["state"] = state;

    }


}
