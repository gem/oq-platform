/*
   Copyright (c) 2015, GEM Foundation.

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

////////////////////////////////////////////////
// Unit Test for the exposure web application //
////////////////////////////////////////////////

// Test the JSON structure and required fields
describe("mocking service http call", function() {

    // Load the service's module
    beforeEach(module('exposureApp'));

    var ExposureCountryList, $scope;

    describe('test the getAllStudies factory', function() {
        beforeEach(inject(function($controller, $rootScope, myService) {
            $scope = $rootScope.$new();

            spyOn(myService, 'getAllStudies').and.callFake(function() {
                return {
                    success: function(callback) {
                        callback({
                            country_name: "Afghanistan",
                            has_nonres: "yes",
                            iso: "AFG",
                            num_l1_names: 0,
                            num_l2_names: 0,
                            num_studies: 1,
                            study_id: 1,
                            study_name: "PAGER national study"
                        });
                    }
                };
            });

            ExposureCountryList = $controller('ExposureCountryList', { $scope: $scope, myService: myService });
        }));

        it('should set $scope.nationalData to "a single national record"', function() {
            console.log('$scope.nationalData:');
            console.log($scope.nationalData);
            expect($scope.nationalData).toEqual({
                country_name: "Afghanistan",
                has_nonres: "yes",
                iso: "AFG",
                num_l1_names: 0,
                num_l2_names: 0,
                num_studies: 1,
                study_id: 1,
                study_name: "PAGER national study"
            });
        });
    });

});

