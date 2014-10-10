"use strict";

//CONTROLLERS
function RaceViewController($scope, raceviewServices, DTOptionsBuilder) {
    raceviewServices.initResizer();

    $scope.UIActions = raceviewServices.UIActions;
    $scope.UITitles = raceviewServices.UITitles;
    $scope.gridOptions = raceviewServices.gridOptions;
    $scope.title = $scope.UITitles.dashboard;
    raceviewServices.resizeMargins("0px");
    $scope.searchText = raceviewServices.searchText;
    $scope.UIActions.showDashboard = true;
    $scope.UIActions.showHosts = false;
    $scope.UIActions.showJobs = false;
    $scope.loading = true;

    var jobidPromise = raceviewServices.getRaceData(); //grab from services
    jobidPromise.then(function (data) {
        $scope.raceData = data[0];
//        $scope.dtOptions = DTOptionsBuilder.fromSource($scope.raceData);
    });

    $scope.loading = false;
    $scope.contextMenu = {
        visable: true
    };

    $scope.showHosts = function () {
        raceviewServices.resizeMargins("0px");
        $scope.UIActions.showJobs = false;
        $scope.UIActions.showHosts = true;
        $scope.UIActions.showDashboard = false;
        $scope.title = $scope.UITitles.hosts;
    };

    $scope.showJobs = function () {
//        raceviewServices.resizeMargins("525px");
        $scope.UIActions.showHosts = false;
        $scope.UIActions.showJobs = true;
        $scope.UIActions.showDashboard = false;
        $scope.title = $scope.UITitles.jobs;
    };

    $scope.showDashboard = function () {
        raceviewServices.resizeMargins("0px");
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
