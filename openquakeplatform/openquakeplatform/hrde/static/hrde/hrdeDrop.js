/*
   Copyright (c) 2014, GEM Foundation.

      This program is free software: you can redistribute it and/or modify
      it under the terms of the GNU Affero General Public License as
      published by the Free Software Foundation, either version 3 of the
      License, or (at your option) any later version.

      This program is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU Affero General Public License for more details.

      You should have received a copy of the GNU Affero General Public License
      along with this program.  If not, see <https://www.gnu.org/licenses/agpl.html>.
*/

var app = angular.module('hrdeApp', []);

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

function SpectrumDropdown($scope) {
    $scope.spectrums=[
        {}
    ];
}

function RiskLossCurvesDropdown($scope) {
    $scope.losses=[
        {}
    ];
}
