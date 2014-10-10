
var app = angular.module('testApp', []);

// start with empty dropdown menus
function HazardMapDropdown($scope) {
    $scope.maps=[
        {}
    ];
}

function HazardInputDropdown($scope) {
    $scope.inputs=[
        {}
    ];
}

function HazardCurveDropdown($scope) {
    $scope.curves=[
        {}
    ];
}

function UhsDropdown($scope) {
    $scope.uhss=[
        {}
    ];
}

function RiskLossCurvesDropdown($scope) {
    $scope.losses=[
        {}
    ];
}
