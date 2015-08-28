

///////////////////////////////////////////
// Unit Test for the IRV web application //
///////////////////////////////////////////

// Test the createRiskIndicator function

describe("Get all layers from GeoServer", function() {
    // object to house the SVIR attribute project defs pairs
    var SVIRPairs = {};

    var SVIRLayerNames = [];

    beforeAll(function(done) {
        var url = "/geoserver/ows?service=WFS&version=1.0.0&REQUEST=GetCapabilities&SRSNAME=EPSG:4326&outputFormat=json&format_options=callback:getJson";
        // Get layers from GeoServer and populate the layer selection menu
        $.ajax({
            url: url,
            //contentType: 'application/json',
            success: function(xml) {
                console.log('xml:');
                console.log(xml);
                //convert XML to JSON
                var xmlText = new XMLSerializer().serializeToString(xml);
                var x2js = new X2JS();

                var jsonElement = x2js.xml_str2json(xmlText);

                var featureType = jsonElement.WFS_Capabilities.FeatureTypeList.FeatureType;

                // Find the SVIR keywords
                var stringToLookFor = 'SVIR_QGIS_Plugin';

                // TODO probably remove this
                // Reload if the api call was incomplete
                if (featureType.length === undefined) {
                    getGeoServerLayers();
                    return;
                }

                for (var i = 0; i < featureType.length; i++) {
                    if (featureType[i].Keywords.indexOf(stringToLookFor) > -1) {
                        SVIRLayerNames.push(featureType[i].Name);
                    }
                }

                var layerAttributesArray = [];


                // Alert Jasmine that the AJAX call is done
                done();
            },
            error: function() {
                // TOSO deal with this
            }
        });
    });


    it("an ajax call", function() {
        // The above ajax call populates a the SVIRLayerNames array with layer names
        // which are used here
        console.log('SVIRLayerNames:');
        console.log(SVIRLayerNames);

        // Capture the number of iterations to be used in mySyncFunction
        var totRecords = SVIRLayerNames.length;

        // This function will be executed once for each layer name in SVIRLayerNames
        // This function will execute first the getAttributeInfoRequest function
        // and then the getLayerInfoRequest function.
        // During each iteration it will create an object pairs of the layer attributes
        // and the project definition.
        // Insparation for this function:
        // http://stackoverflow.com/questions/22978843/how-to-make-for-loop-wait-until-async-call-was-successful-before-to-continue
        var mySyncFunction = function (counter, totRecord) {
            console.log('counter:');
            console.log(counter);
            if(counter === undefined)
                counter = 0;
            if(counter >=totRecords) return;

            // Set the layer neme
            var layerName = SVIRLayerNames[counter];
            console.log('layerName:');
            console.log(layerName);

            // Execute the getAttributeInfoRequest function and pass it the layer neme
            var attributeRequest = getAttributeInfoRequest(layerName);

            // we need to execute the getLayerInfoRequest function after the
            // getAttributeInfoRequest function is completed
            attributeRequest.then(function(attributeResponse) {
                console.log('layerName:');
                console.log(layerName);
                var layerRequest = getLayerInfoRequest(layerName);

                layerRequest.then(function(layerResponse) {

                    console.log('layerResponse:');
                    console.log(layerResponse);
                });
                layerRequest.done(function() {
                    // Once this (second / nested ajax call) is complete
                    // we trigger the next iteration of this function (for each layer name)
                    mySyncFunction(counter + 1, totRecords);
                });
            });
        };

        mySyncFunction(0,totRecords);

        // TODO tests go here...
    });
});


describe("Test Create Risk Indicator Function", function() {
    it("The index was created", function() {
        var selectedRegion = 'COUNTRY_NA';
        var layerAttributes = '[{"type":"Feature","id":"qgis_svir_c0d75859_78e4_4dcb_bcd1_fbd9e0013aa9.1","geometry":{"type":"MultiPolygon","coordinates":[[[[-66.30249786376953,-55.01680374145508],[-66.30361175537098,-55.01680374145508],[-66.30416870117173,-55.01652908325197],[-66.3047256469726,-55.016250610351584]]]]},"geometry_name":"the_geom","properties":{"ISO":"VEN","COUNTRY_NA":"Venezuela","ECOEACGUS":14.187,"ECOIDPGIN":7.604,"EDUEOCEYS":11430.238,"HEAHSTLEX":74.402,"GNIPCAP":0.588281660535996,"GINI":0.166146645865835,"EXPYSCHOOL":0.778839072507755,"LIFEEXPEC":0.622620380739082,"SVI":-0.34141510001530717,"RI":0,"IRI":-0.17070755000765359,"LOSS_PTS":0,"SUM_field_":0,"AVG_field_":0,"SVI_1":null,"RI_1":5722.2125,"IRI_1":null}}]';
        var index = '[{"field":"ECOEACGUS","type":"Risk Indicator","name":"ECOEACGUS","weight":0.5,"level":"3.0","depth":2,"parent":"undefined","x":165.7142857142857,"y":360,"id":3,"x0":165.7142857142857,"y0":360},{"field":"EDUEOCEYS","type":"Risk Indicator","name":"EDUEOCEYS","weight":0.5,"level":"3.0","depth":2,"parent":"undefined","x":331.4285714285714,"y":360,"id":2,"x0":331.4285714285714,"y0":360}]';
        layerAttributes = JSON.parse(layerAttributes);
        index = JSON.parse(index);

        expect(createRiskIndicator(layerAttributes, index, selectedRegion)[0]).toEqual(jasmine.objectContaining({
            region: "Venezuela",
            ECOEACGUS: 14.187,
            EDUEOCEYS: 11430.238
        }));
    });
});

// Test the combineIndicators function
describe("Test Combine Indicators Function", function() {

        var themeObjRiAndSvi = '[{"region":"Argentina","test":5272.775000000001,"test2":38.4505},{"region":"Colombia","test":3586.3125,"test2":37.074831581713084},{"region":"Bolivia","test":1185.1055000000001,"test2":33.54087073042564},{"region":"Brazil","test":6048.0925,"test2":36.98401576458224},{"region":"Chile","test":7010.768,"test2":39.92127167630058},{"region":"Peru","test":2913.793,"test2":37.12098528638991},{"region":"Ecuador","test":2225.068,"test2":38.083472411981084},{"region":"Paraguay","test":1840.1505000000002,"test2":36.25426458223857},{"region":"Guyana","test":1523.7024999999999,"test2":34.9635},{"region":"Suriname","test":4371.5585,"test2":35.36794245927483},{"region":"Uruguay","test":6465.9400000000005,"test2":38.97044534944824},{"region":"Venezuela","test":5722.2125,"test2":37.495140830268}]';
        var JSONthemesRiAndSvi = '[{"name":"test","weight":0.5,"level":"3.0","field":"TEST_1","operator":"Weighted sum","type":"Social Vulnerability Theme","children":[{"field":"ECOEACGUS","type":"Social Vulnerability Indicator","name":"ECOEACGUS","weight":0.5,"level":"4.0","depth":3,"parent":"undefined","x":193.33333333333331,"y":540,"id":5,"x0":193.33333333333331,"y0":540},{"field":"EDUEOCEYS","type":"Social Vulnerability Indicator","name":"EDUEOCEYS","weight":0.5,"level":"4.0","depth":3,"parent":"undefined","x":270.6666666666667,"y":540,"id":4,"x0":270.6666666666667,"y0":540}],"depth":2,"parent":"undefined","x":232,"y":360,"id":6,"x0":232,"y0":360},{"name":"test2","weight":0.5,"level":"3.0","field":"TEST2","operator":"Weighted sum","type":"Social Vulnerability Theme","children":[{"field":"GNIPCAP","type":"Social Vulnerability Indicator","name":"GNIPCAP","weight":0.5,"level":"4.1","depth":3,"parent":"undefined","x":425.3333333333333,"y":540,"id":2,"x0":425.3333333333333,"y0":540},{"field":"HEAHSTLEX","type":"Social Vulnerability Indicator","name":"HEAHSTLEX","weight":0.5,"level":"4.1","depth":3,"parent":"undefined","x":502.6666666666667,"y":540,"id":1,"x0":502.6666666666667,"y0":540}],"depth":2,"parent":"undefined","x":464,"y":360,"id":3,"x0":464,"y0":360}]';
        var themeObjRiOnly = '[{"region":"Argentina","ECOEACGUS":15.754,"EDUEOCEYS":10529.796},{"region":"Colombia","ECOEACGUS":13.648,"EDUEOCEYS":7158.977},{"region":"Bolivia","ECOEACGUS":13.713,"EDUEOCEYS":2356.498},{"region":"Brazil","ECOEACGUS":13.775,"EDUEOCEYS":12082.41},{"region":"Chile","ECOEACGUS":14.698,"EDUEOCEYS":14006.838},{"region":"Peru","ECOEACGUS":12.907,"EDUEOCEYS":5814.679},{"region":"Ecuador","ECOEACGUS":13.984,"EDUEOCEYS":4436.152},{"region":"Paraguay","ECOEACGUS":12.068,"EDUEOCEYS":3668.233},{"region":"Guyana","ECOEACGUS":11.948,"EDUEOCEYS":3035.457},{"region":"Suriname","ECOEACGUS":12.606,"EDUEOCEYS":8730.511},{"region":"Uruguay","ECOEACGUS":15.51,"EDUEOCEYS":12916.37},{"region":"Venezuela","ECOEACGUS":14.187,"EDUEOCEYS":11430.238}]';
        var JSONthemesRiOnly = '[{"field":"ECOEACGUS","type":"Risk Indicator","name":"ECOEACGUS","weight":0.5,"level":"3.0","depth":2,"parent":"undefined","x":165.7142857142857,"y":360,"id":3,"x0":165.7142857142857,"y0":360},{"field":"EDUEOCEYS","type":"Risk Indicator","name":"EDUEOCEYS","weight":0.5,"level":"3.0","depth":2,"parent":"undefined","x":331.4285714285714,"y":360,"id":2,"x0":331.4285714285714,"y0":360}]';
        var nameLookUpRi = 'RI';
        var nameLookUpSvi = 'SVI';

        themeObjRiAndSvi = JSON.parse(themeObjRiAndSvi);
        JSONthemesRiAndSvi = JSON.parse(JSONthemesRiAndSvi);
        themeObjRiOnly = JSON.parse(themeObjRiOnly);
        JSONthemesRiOnly = JSON.parse(JSONthemesRiOnly);

    it("The RI indicator was combined correctly using the 'Simple sum (ignore weights)' operator", function() {
        var operator = "Simple sum (ignore weights)";
        var testSessionProjectDefRi = '{"license":"CC BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0/)","name":"IRI","weight":1,"title":"SVIR analysis result SA test","zone_label_field":"COUNTRY_NA","level":"1.0","field":"IRI_1","operator":"Weighted sum","svir_plugin_version":"1.5.0","type":"Integrated Risk Index","children":[{"name":"RI","weight":0.5,"level":"2.0","field":"RI_1","operator":"'+operator+'","type":"Risk Index","children":[{"field":"ECOEACGUS","type":"Risk Indicator","name":"ECOEACGUS","weight":0.5,"level":"3.0","depth":2,"parent":"undefined","x":165.7142857142857,"y":360,"id":3,"x0":165.7142857142857,"y0":360},{"field":"EDUEOCEYS","type":"Risk Indicator","name":"EDUEOCEYS","weight":0.5,"level":"3.0","depth":2,"parent":"undefined","x":331.4285714285714,"y":360,"id":2,"x0":331.4285714285714,"y0":360}],"depth":1,"parent":"undefined","x":248.57142857142856,"y":180,"id":4,"x0":248.57142857142856,"y0":180},{"field":"SVI_1","type":"Social Vulnerability Index","name":"SVI","weight":0.5,"level":"2.0","depth":1,"parent":"undefined","x":414.2857142857143,"y":180,"id":1,"x0":414.2857142857143,"y0":180}],"description":"","x0":331.4285714285714,"y0":0,"depth":0,"x":331.4285714285714,"y":0,"id":5}';

        testSessionProjectDefRi = JSON.parse(testSessionProjectDefRi);

        expect(combineIndicators(nameLookUpRi, themeObjRiOnly, JSONthemesRiOnly, testSessionProjectDefRi)).toEqual(jasmine.objectContaining({
            Argentina: 10545.550000000001,
            Colombia: 7172.625,
            Bolivia: 2370.2110000000002,
            Brazil: 12096.185,
            Chile: 14021.536,
            Peru: 5827.586,
            Ecuador: 4450.136,
            Paraguay: 3680.3010000000004,
            Guyana: 3047.4049999999997,
            Suriname: 8743.117,
            Uruguay: 12931.880000000001,
            Venezuela: 11444.425
        }));
    });

    it("The RI indicator was combined correctly using the 'weighted sum' operator", function() {
        var operator = "Weighted sum";
        var testSessionProjectDefRi = '{"license":"CC BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0/)","name":"IRI","weight":1,"title":"SVIR analysis result SA test","zone_label_field":"COUNTRY_NA","level":"1.0","field":"IRI_1","operator":"Weighted sum","svir_plugin_version":"1.5.0","type":"Integrated Risk Index","children":[{"name":"RI","weight":0.5,"level":"2.0","field":"RI_1","operator":"'+operator+'","type":"Risk Index","children":[{"field":"ECOEACGUS","type":"Risk Indicator","name":"ECOEACGUS","weight":0.5,"level":"3.0","depth":2,"parent":"undefined","x":165.7142857142857,"y":360,"id":3,"x0":165.7142857142857,"y0":360},{"field":"EDUEOCEYS","type":"Risk Indicator","name":"EDUEOCEYS","weight":0.5,"level":"3.0","depth":2,"parent":"undefined","x":331.4285714285714,"y":360,"id":2,"x0":331.4285714285714,"y0":360}],"depth":1,"parent":"undefined","x":248.57142857142856,"y":180,"id":4,"x0":248.57142857142856,"y0":180},{"field":"SVI_1","type":"Social Vulnerability Index","name":"SVI","weight":0.5,"level":"2.0","depth":1,"parent":"undefined","x":414.2857142857143,"y":180,"id":1,"x0":414.2857142857143,"y0":180}],"description":"","x0":331.4285714285714,"y0":0,"depth":0,"x":331.4285714285714,"y":0,"id":5}';

        testSessionProjectDefRi = JSON.parse(testSessionProjectDefRi);

        expect(combineIndicators(nameLookUpRi, themeObjRiOnly, JSONthemesRiOnly, testSessionProjectDefRi)).toEqual(jasmine.objectContaining({
            Argentina: 5272.775000000001,
            Colombia: 3586.3125,
            Bolivia: 1185.1055000000001,
            Brazil: 6048.0925,
            Chile: 7010.768,
            Peru: 2913.793,
            Ecuador: 2225.068,
            Paraguay: 1840.1505000000002,
            Guyana: 1523.7024999999999,
            Suriname: 4371.5585,
            Uruguay: 6465.9400000000005,
            Venezuela: 5722.2125
        }));
    });

    it("The RI indicator was combined correctly using the 'Average (ignore weights)' operator", function() {
        var operator = "Average (ignore weights)";
        var testSessionProjectDefRi = '{"license":"CC BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0/)","name":"IRI","weight":1,"title":"SVIR analysis result SA test","zone_label_field":"COUNTRY_NA","level":"1.0","field":"IRI_1","operator":"Weighted sum","svir_plugin_version":"1.5.0","type":"Integrated Risk Index","children":[{"name":"RI","weight":0.5,"level":"2.0","field":"RI_1","operator":"'+operator+'","type":"Risk Index","children":[{"field":"ECOEACGUS","type":"Risk Indicator","name":"ECOEACGUS","weight":0.5,"level":"3.0","depth":2,"parent":"undefined","x":165.7142857142857,"y":360,"id":3,"x0":165.7142857142857,"y0":360},{"field":"EDUEOCEYS","type":"Risk Indicator","name":"EDUEOCEYS","weight":0.5,"level":"3.0","depth":2,"parent":"undefined","x":331.4285714285714,"y":360,"id":2,"x0":331.4285714285714,"y0":360}],"depth":1,"parent":"undefined","x":248.57142857142856,"y":180,"id":4,"x0":248.57142857142856,"y0":180},{"field":"SVI_1","type":"Social Vulnerability Index","name":"SVI","weight":0.5,"level":"2.0","depth":1,"parent":"undefined","x":414.2857142857143,"y":180,"id":1,"x0":414.2857142857143,"y0":180}],"description":"","x0":331.4285714285714,"y0":0,"depth":0,"x":331.4285714285714,"y":0,"id":5}';

        testSessionProjectDefRi = JSON.parse(testSessionProjectDefRi);

        expect(combineIndicators(nameLookUpRi, themeObjRiOnly, JSONthemesRiOnly, testSessionProjectDefRi)).toEqual(jasmine.objectContaining({
            Argentina: 5272.775000000001,
            Colombia: 3586.3125,
            Bolivia: 1185.1055000000001,
            Brazil: 6048.0925,
            Chile: 7010.768,
            Peru: 2913.793,
            Ecuador: 2225.068,
            Paraguay: 1840.1505000000002,
            Guyana: 1523.7024999999999,
            Suriname: 4371.5585,
            Uruguay: 6465.9400000000005,
            Venezuela: 5722.2125
        }));
    });

    it("The RI indicator was combined correctly using the 'Simple multiplication (ignore weights)' operator", function() {
        var operator = "Simple multiplication (ignore weights)";
        var testSessionProjectDefRi = '{"license":"CC BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0/)","name":"IRI","weight":1,"title":"SVIR analysis result SA test","zone_label_field":"COUNTRY_NA","level":"1.0","field":"IRI_1","operator":"Weighted sum","svir_plugin_version":"1.5.0","type":"Integrated Risk Index","children":[{"name":"RI","weight":0.5,"level":"2.0","field":"RI_1","operator":"'+operator+'","type":"Risk Index","children":[{"field":"ECOEACGUS","type":"Risk Indicator","name":"ECOEACGUS","weight":0.5,"level":"3.0","depth":2,"parent":"undefined","x":165.7142857142857,"y":360,"id":3,"x0":165.7142857142857,"y0":360},{"field":"EDUEOCEYS","type":"Risk Indicator","name":"EDUEOCEYS","weight":0.5,"level":"3.0","depth":2,"parent":"undefined","x":331.4285714285714,"y":360,"id":2,"x0":331.4285714285714,"y0":360}],"depth":1,"parent":"undefined","x":248.57142857142856,"y":180,"id":4,"x0":248.57142857142856,"y0":180},{"field":"SVI_1","type":"Social Vulnerability Index","name":"SVI","weight":0.5,"level":"2.0","depth":1,"parent":"undefined","x":414.2857142857143,"y":180,"id":1,"x0":414.2857142857143,"y0":180}],"description":"","x0":331.4285714285714,"y0":0,"depth":0,"x":331.4285714285714,"y":0,"id":5}';

        testSessionProjectDefRi = JSON.parse(testSessionProjectDefRi);

        expect(combineIndicators(nameLookUpRi, themeObjRiOnly, JSONthemesRiOnly, testSessionProjectDefRi)).toEqual(jasmine.objectContaining({
            Argentina: 165886.406184,
            Colombia: 97705.718096,
            Bolivia: 32314.657074,
            Brazil: 166435.19775,
            Chile: 205872.504924,
            Peru: 75050.061853,
            Ecuador: 62035.149568,
            Paraguay: 44268.235844,
            Guyana: 36267.640236,
            Suriname: 110056.821666,
            Uruguay: 200332.89870000002,
            Venezuela: 162160.78650599997
        }));
    });

    it("The RI indicator was combined correctly using the 'Weighted multiplication' operator", function() {
        var operator = "Weighted multiplication";
        var testSessionProjectDefRi = '{"license":"CC BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0/)","name":"IRI","weight":1,"title":"SVIR analysis result SA test","zone_label_field":"COUNTRY_NA","level":"1.0","field":"IRI_1","operator":"Weighted sum","svir_plugin_version":"1.5.0","type":"Integrated Risk Index","children":[{"name":"RI","weight":0.5,"level":"2.0","field":"RI_1","operator":"'+operator+'","type":"Risk Index","children":[{"field":"ECOEACGUS","type":"Risk Indicator","name":"ECOEACGUS","weight":0.5,"level":"3.0","depth":2,"parent":"undefined","x":165.7142857142857,"y":360,"id":3,"x0":165.7142857142857,"y0":360},{"field":"EDUEOCEYS","type":"Risk Indicator","name":"EDUEOCEYS","weight":0.5,"level":"3.0","depth":2,"parent":"undefined","x":331.4285714285714,"y":360,"id":2,"x0":331.4285714285714,"y0":360}],"depth":1,"parent":"undefined","x":248.57142857142856,"y":180,"id":4,"x0":248.57142857142856,"y0":180},{"field":"SVI_1","type":"Social Vulnerability Index","name":"SVI","weight":0.5,"level":"2.0","depth":1,"parent":"undefined","x":414.2857142857143,"y":180,"id":1,"x0":414.2857142857143,"y0":180}],"description":"","x0":331.4285714285714,"y0":0,"depth":0,"x":331.4285714285714,"y":0,"id":5}';

        testSessionProjectDefRi = JSON.parse(testSessionProjectDefRi);

        expect(combineIndicators(nameLookUpRi, themeObjRiOnly, JSONthemesRiOnly, testSessionProjectDefRi)).toEqual(jasmine.objectContaining({
            Argentina: 41471.601546,
            Colombia: 24426.429524,
            Bolivia: 8078.6642685,
            Brazil: 41608.7994375,
            Chile: 51468.126231,
            Peru: 18762.51546325,
            Ecuador: 15508.787392,
            Paraguay: 11067.058961,
            Guyana: 9066.910059,
            Suriname: 27514.2054165,
            Uruguay: 50083.224675000005,
            Venezuela: 40540.196626499994
        }));
    });

    it("The RI indicator was combined correctly using the 'Geometric mean (ignore weights)' operator", function() {
        var operator = "Geometric mean (ignore weights)";
        var testSessionProjectDefRi = '{"license":"CC BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0/)","name":"IRI","weight":1,"title":"SVIR analysis result SA test","zone_label_field":"COUNTRY_NA","level":"1.0","field":"IRI_1","operator":"Weighted sum","svir_plugin_version":"1.5.0","type":"Integrated Risk Index","children":[{"name":"RI","weight":0.5,"level":"2.0","field":"RI_1","operator":"'+operator+'","type":"Risk Index","children":[{"field":"ECOEACGUS","type":"Risk Indicator","name":"ECOEACGUS","weight":0.5,"level":"3.0","depth":2,"parent":"undefined","x":165.7142857142857,"y":360,"id":3,"x0":165.7142857142857,"y0":360},{"field":"EDUEOCEYS","type":"Risk Indicator","name":"EDUEOCEYS","weight":0.5,"level":"3.0","depth":2,"parent":"undefined","x":331.4285714285714,"y":360,"id":2,"x0":331.4285714285714,"y0":360}],"depth":1,"parent":"undefined","x":248.57142857142856,"y":180,"id":4,"x0":248.57142857142856,"y0":180},{"field":"SVI_1","type":"Social Vulnerability Index","name":"SVI","weight":0.5,"level":"2.0","depth":1,"parent":"undefined","x":414.2857142857143,"y":180,"id":1,"x0":414.2857142857143,"y0":180}],"description":"","x0":331.4285714285714,"y0":0,"depth":0,"x":331.4285714285714,"y":0,"id":5}';

        testSessionProjectDefRi = JSON.parse(testSessionProjectDefRi);

        expect(combineIndicators(nameLookUpRi, themeObjRiOnly, JSONthemesRiOnly, testSessionProjectDefRi)).toEqual(jasmine.objectContaining({
            Argentina: 407.29154936482536,
            Colombia: 312.5791389328469,
            Bolivia: 179.762780001868,
            Brazil: 407.96470159806717,
            Chile: 453.73175437035485,
            Peru: 273.9526635260187,
            Ecuador: 249.06856398991826,
            Paraguay: 210.4001802375654,
            Guyana: 190.44064754143218,
            Suriname: 331.7481298605917,
            Uruguay: 447.5856328123145,
            Venezuela: 402.69192505686027
        }));
    });

    it("The SVI indicator was combined correctly using the 'Simple sum (ignore weights)' operator", function() {
        var operator = "Simple sum (ignore weights)";
        var testSessionProjectDefRiAndSvi = '{"license":"CC BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0/)","name":"IRI","weight":1,"title":"BMW TEST 2","zone_label_field":"COUNTRY_NA","level":"1.0","field":"IRI_4","operator":"Weighted sum","svir_plugin_version":"1.6.3","type":"Integrated Risk Index","children":[{"name":"RI","weight":0.5,"level":"2.0","field":"RI_4","operator":"Weighted sum","type":"Risk Index","children":[{"field":"LOSS_PTS","type":"Risk Indicator","name":"LOSS_PTS","weight":1,"level":"3.1","depth":2,"parent":"undefined","x":77.33333333333333,"y":360,"id":8,"x0":77.33333333333333,"y0":360}],"depth":1,"parent":"undefined","x":77.33333333333333,"y":180,"id":9,"x0":77.33333333333333,"y0":180},{"name":"SVI","weight":0.5,"level":"2.0","field":"SVI_4","operator":"'+operator+'","type":"Social Vulnerability Index","children":[{"name":"test","weight":0.5,"level":"3.0","field":"TEST_1","operator":"Weighted sum","type":"Social Vulnerability Theme","children":[{"field":"ECOEACGUS","type":"Social Vulnerability Indicator","name":"ECOEACGUS","weight":0.5,"level":"4.0","depth":3,"parent":"undefined","x":193.33333333333331,"y":540,"id":5,"x0":193.33333333333331,"y0":540},{"field":"EDUEOCEYS","type":"Social Vulnerability Indicator","name":"EDUEOCEYS","weight":0.5,"level":"4.0","depth":3,"parent":"undefined","x":270.6666666666667,"y":540,"id":4,"x0":270.6666666666667,"y0":540}],"depth":2,"parent":"undefined","x":232,"y":360,"id":6,"x0":232,"y0":360},{"name":"test2","weight":0.5,"level":"3.0","field":"TEST2","operator":"Weighted sum","type":"Social Vulnerability Theme","children":[{"field":"GNIPCAP","type":"Social Vulnerability Indicator","name":"GNIPCAP","weight":0.5,"level":"4.1","depth":3,"parent":"undefined","x":425.3333333333333,"y":540,"id":2,"x0":425.3333333333333,"y0":540},{"field":"HEAHSTLEX","type":"Social Vulnerability Indicator","name":"HEAHSTLEX","weight":0.5,"level":"4.1","depth":3,"parent":"undefined","x":502.6666666666667,"y":540,"id":1,"x0":502.6666666666667,"y0":540}],"depth":2,"parent":"undefined","x":464,"y":360,"id":3,"x0":464,"y0":360}],"depth":1,"parent":"undefined","x":348,"y":180,"id":7,"x0":348,"y0":180}],"description":"","x0":212.66666666666666,"y0":0,"depth":0,"x":212.66666666666666,"y":0,"id":10}';

        testSessionProjectDefRiAndSvi = JSON.parse(testSessionProjectDefRiAndSvi);

        expect(combineIndicators(nameLookUpSvi, themeObjRiAndSvi, JSONthemesRiAndSvi, testSessionProjectDefRiAndSvi)).toEqual(jasmine.objectContaining({
            Argentina: 5311.2255000000005,
            Colombia: 3623.387331581713,
            Bolivia: 1218.6463707304258,
            Brazil: 6085.076515764582,
            Chile: 7050.6892716763,
            Peru: 2950.91398528639,
            Ecuador: 2263.151472411981,
            Paraguay: 1876.4047645822388,
            Guyana: 1558.666,
            Suriname: 4406.926442459275,
            Uruguay: 6504.910445349448,
            Venezuela: 5759.707640830267
        }));
    });

    it("The SVI indicator was combined correctly using the 'Weighted sum' operator", function() {
        var operator = "Weighted sum";
        var testSessionProjectDefRiAndSvi = '{"license":"CC BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0/)","name":"IRI","weight":1,"title":"BMW TEST 2","zone_label_field":"COUNTRY_NA","level":"1.0","field":"IRI_4","operator":"Weighted sum","svir_plugin_version":"1.6.3","type":"Integrated Risk Index","children":[{"name":"RI","weight":0.5,"level":"2.0","field":"RI_4","operator":"Weighted sum","type":"Risk Index","children":[{"field":"LOSS_PTS","type":"Risk Indicator","name":"LOSS_PTS","weight":1,"level":"3.1","depth":2,"parent":"undefined","x":77.33333333333333,"y":360,"id":8,"x0":77.33333333333333,"y0":360}],"depth":1,"parent":"undefined","x":77.33333333333333,"y":180,"id":9,"x0":77.33333333333333,"y0":180},{"name":"SVI","weight":0.5,"level":"2.0","field":"SVI_4","operator":"'+operator+'","type":"Social Vulnerability Index","children":[{"name":"test","weight":0.5,"level":"3.0","field":"TEST_1","operator":"Weighted sum","type":"Social Vulnerability Theme","children":[{"field":"ECOEACGUS","type":"Social Vulnerability Indicator","name":"ECOEACGUS","weight":0.5,"level":"4.0","depth":3,"parent":"undefined","x":193.33333333333331,"y":540,"id":5,"x0":193.33333333333331,"y0":540},{"field":"EDUEOCEYS","type":"Social Vulnerability Indicator","name":"EDUEOCEYS","weight":0.5,"level":"4.0","depth":3,"parent":"undefined","x":270.6666666666667,"y":540,"id":4,"x0":270.6666666666667,"y0":540}],"depth":2,"parent":"undefined","x":232,"y":360,"id":6,"x0":232,"y0":360},{"name":"test2","weight":0.5,"level":"3.0","field":"TEST2","operator":"Weighted sum","type":"Social Vulnerability Theme","children":[{"field":"GNIPCAP","type":"Social Vulnerability Indicator","name":"GNIPCAP","weight":0.5,"level":"4.1","depth":3,"parent":"undefined","x":425.3333333333333,"y":540,"id":2,"x0":425.3333333333333,"y0":540},{"field":"HEAHSTLEX","type":"Social Vulnerability Indicator","name":"HEAHSTLEX","weight":0.5,"level":"4.1","depth":3,"parent":"undefined","x":502.6666666666667,"y":540,"id":1,"x0":502.6666666666667,"y0":540}],"depth":2,"parent":"undefined","x":464,"y":360,"id":3,"x0":464,"y0":360}],"depth":1,"parent":"undefined","x":348,"y":180,"id":7,"x0":348,"y0":180}],"description":"","x0":212.66666666666666,"y0":0,"depth":0,"x":212.66666666666666,"y":0,"id":10}';

        testSessionProjectDefRiAndSvi = JSON.parse(testSessionProjectDefRiAndSvi);

        expect(combineIndicators(nameLookUpSvi, themeObjRiAndSvi, JSONthemesRiAndSvi, testSessionProjectDefRiAndSvi)).toEqual(jasmine.objectContaining({
            Argentina: 2655.6127500000002,
            Colombia: 1811.6936657908566,
            Bolivia: 609.3231853652129,
            Brazil: 3042.538257882291,
            Chile: 3525.34463583815,
            Peru: 1475.456992643195,
            Ecuador: 1131.5757362059906,
            Paraguay: 938.2023822911194,
            Guyana: 779.333,
            Suriname: 2203.4632212296374,
            Uruguay: 3252.455222674724,
            Venezuela: 2879.8538204151337
        }));
    });

    it("The SVI indicator was combined correctly using the 'Average (ignore weights)' operator", function() {
        var operator = "Average (ignore weights)";
        var testSessionProjectDefRiAndSvi = '{"license":"CC BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0/)","name":"IRI","weight":1,"title":"BMW TEST 2","zone_label_field":"COUNTRY_NA","level":"1.0","field":"IRI_4","operator":"Weighted sum","svir_plugin_version":"1.6.3","type":"Integrated Risk Index","children":[{"name":"RI","weight":0.5,"level":"2.0","field":"RI_4","operator":"Weighted sum","type":"Risk Index","children":[{"field":"LOSS_PTS","type":"Risk Indicator","name":"LOSS_PTS","weight":1,"level":"3.1","depth":2,"parent":"undefined","x":77.33333333333333,"y":360,"id":8,"x0":77.33333333333333,"y0":360}],"depth":1,"parent":"undefined","x":77.33333333333333,"y":180,"id":9,"x0":77.33333333333333,"y0":180},{"name":"SVI","weight":0.5,"level":"2.0","field":"SVI_4","operator":"'+operator+'","type":"Social Vulnerability Index","children":[{"name":"test","weight":0.5,"level":"3.0","field":"TEST_1","operator":"Weighted sum","type":"Social Vulnerability Theme","children":[{"field":"ECOEACGUS","type":"Social Vulnerability Indicator","name":"ECOEACGUS","weight":0.5,"level":"4.0","depth":3,"parent":"undefined","x":193.33333333333331,"y":540,"id":5,"x0":193.33333333333331,"y0":540},{"field":"EDUEOCEYS","type":"Social Vulnerability Indicator","name":"EDUEOCEYS","weight":0.5,"level":"4.0","depth":3,"parent":"undefined","x":270.6666666666667,"y":540,"id":4,"x0":270.6666666666667,"y0":540}],"depth":2,"parent":"undefined","x":232,"y":360,"id":6,"x0":232,"y0":360},{"name":"test2","weight":0.5,"level":"3.0","field":"TEST2","operator":"Weighted sum","type":"Social Vulnerability Theme","children":[{"field":"GNIPCAP","type":"Social Vulnerability Indicator","name":"GNIPCAP","weight":0.5,"level":"4.1","depth":3,"parent":"undefined","x":425.3333333333333,"y":540,"id":2,"x0":425.3333333333333,"y0":540},{"field":"HEAHSTLEX","type":"Social Vulnerability Indicator","name":"HEAHSTLEX","weight":0.5,"level":"4.1","depth":3,"parent":"undefined","x":502.6666666666667,"y":540,"id":1,"x0":502.6666666666667,"y0":540}],"depth":2,"parent":"undefined","x":464,"y":360,"id":3,"x0":464,"y0":360}],"depth":1,"parent":"undefined","x":348,"y":180,"id":7,"x0":348,"y0":180}],"description":"","x0":212.66666666666666,"y0":0,"depth":0,"x":212.66666666666666,"y":0,"id":10}';

        testSessionProjectDefRiAndSvi = JSON.parse(testSessionProjectDefRiAndSvi);

        expect(combineIndicators(nameLookUpSvi, themeObjRiAndSvi, JSONthemesRiAndSvi, testSessionProjectDefRiAndSvi)).toEqual(jasmine.objectContaining({
            Argentina: 2655.6127500000002,
            Colombia: 1811.6936657908566,
            Bolivia: 609.3231853652129,
            Brazil: 3042.538257882291,
            Chile: 3525.34463583815,
            Peru: 1475.456992643195,
            Ecuador: 1131.5757362059906,
            Paraguay: 938.2023822911194,
            Guyana: 779.333,
            Suriname: 2203.4632212296374,
            Uruguay: 3252.455222674724,
            Venezuela: 2879.8538204151337
        }));
    });

    it("The SVI indicator was combined correctly using the 'Simple multiplication (ignore weights)' operator", function() {
        var operator = "Simple multiplication (ignore weights)";
        var testSessionProjectDefRiAndSvi = '{"license":"CC BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0/)","name":"IRI","weight":1,"title":"BMW TEST 2","zone_label_field":"COUNTRY_NA","level":"1.0","field":"IRI_4","operator":"Weighted sum","svir_plugin_version":"1.6.3","type":"Integrated Risk Index","children":[{"name":"RI","weight":0.5,"level":"2.0","field":"RI_4","operator":"Weighted sum","type":"Risk Index","children":[{"field":"LOSS_PTS","type":"Risk Indicator","name":"LOSS_PTS","weight":1,"level":"3.1","depth":2,"parent":"undefined","x":77.33333333333333,"y":360,"id":8,"x0":77.33333333333333,"y0":360}],"depth":1,"parent":"undefined","x":77.33333333333333,"y":180,"id":9,"x0":77.33333333333333,"y0":180},{"name":"SVI","weight":0.5,"level":"2.0","field":"SVI_4","operator":"'+operator+'","type":"Social Vulnerability Index","children":[{"name":"test","weight":0.5,"level":"3.0","field":"TEST_1","operator":"Weighted sum","type":"Social Vulnerability Theme","children":[{"field":"ECOEACGUS","type":"Social Vulnerability Indicator","name":"ECOEACGUS","weight":0.5,"level":"4.0","depth":3,"parent":"undefined","x":193.33333333333331,"y":540,"id":5,"x0":193.33333333333331,"y0":540},{"field":"EDUEOCEYS","type":"Social Vulnerability Indicator","name":"EDUEOCEYS","weight":0.5,"level":"4.0","depth":3,"parent":"undefined","x":270.6666666666667,"y":540,"id":4,"x0":270.6666666666667,"y0":540}],"depth":2,"parent":"undefined","x":232,"y":360,"id":6,"x0":232,"y0":360},{"name":"test2","weight":0.5,"level":"3.0","field":"TEST2","operator":"Weighted sum","type":"Social Vulnerability Theme","children":[{"field":"GNIPCAP","type":"Social Vulnerability Indicator","name":"GNIPCAP","weight":0.5,"level":"4.1","depth":3,"parent":"undefined","x":425.3333333333333,"y":540,"id":2,"x0":425.3333333333333,"y0":540},{"field":"HEAHSTLEX","type":"Social Vulnerability Indicator","name":"HEAHSTLEX","weight":0.5,"level":"4.1","depth":3,"parent":"undefined","x":502.6666666666667,"y":540,"id":1,"x0":502.6666666666667,"y0":540}],"depth":2,"parent":"undefined","x":464,"y":360,"id":3,"x0":464,"y0":360}],"depth":1,"parent":"undefined","x":348,"y":180,"id":7,"x0":348,"y0":180}],"description":"","x0":212.66666666666666,"y0":0,"depth":0,"x":212.66666666666666,"y":0,"id":10}';

        testSessionProjectDefRiAndSvi = JSON.parse(testSessionProjectDefRiAndSvi);

        expect(combineIndicators(nameLookUpSvi, themeObjRiAndSvi, JSONthemesRiAndSvi, testSessionProjectDefRiAndSvi)).toEqual(jasmine.objectContaining({
            Argentina: 202740.83513750002,
            Colombia: 132961.93193689242,
            Bolivia: 39749.470377416445,
            Brazil: 223682.74836565158,
            Chile: 279878.77398751443,
            Peru: 108162.86708058591,
            Ecuador: 84738.31579278194,
            Paraguay: 66713.3030981386,
            Guyana: 53273.97235875,
            Suriname: 154613.0294853538,
            Uruguay: 251980.56140281138,
            Venezuela: 214555.16354821992
        }));
    });

    it("The SVI indicator was combined correctly using the 'Weighted multiplication' operator", function() {
        var operator = "Weighted multiplication";
        var testSessionProjectDefRiAndSvi = '{"license":"CC BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0/)","name":"IRI","weight":1,"title":"BMW TEST 2","zone_label_field":"COUNTRY_NA","level":"1.0","field":"IRI_4","operator":"Weighted sum","svir_plugin_version":"1.6.3","type":"Integrated Risk Index","children":[{"name":"RI","weight":0.5,"level":"2.0","field":"RI_4","operator":"Weighted sum","type":"Risk Index","children":[{"field":"LOSS_PTS","type":"Risk Indicator","name":"LOSS_PTS","weight":1,"level":"3.1","depth":2,"parent":"undefined","x":77.33333333333333,"y":360,"id":8,"x0":77.33333333333333,"y0":360}],"depth":1,"parent":"undefined","x":77.33333333333333,"y":180,"id":9,"x0":77.33333333333333,"y0":180},{"name":"SVI","weight":0.5,"level":"2.0","field":"SVI_4","operator":"'+operator+'","type":"Social Vulnerability Index","children":[{"name":"test","weight":0.5,"level":"3.0","field":"TEST_1","operator":"Weighted sum","type":"Social Vulnerability Theme","children":[{"field":"ECOEACGUS","type":"Social Vulnerability Indicator","name":"ECOEACGUS","weight":0.5,"level":"4.0","depth":3,"parent":"undefined","x":193.33333333333331,"y":540,"id":5,"x0":193.33333333333331,"y0":540},{"field":"EDUEOCEYS","type":"Social Vulnerability Indicator","name":"EDUEOCEYS","weight":0.5,"level":"4.0","depth":3,"parent":"undefined","x":270.6666666666667,"y":540,"id":4,"x0":270.6666666666667,"y0":540}],"depth":2,"parent":"undefined","x":232,"y":360,"id":6,"x0":232,"y0":360},{"name":"test2","weight":0.5,"level":"3.0","field":"TEST2","operator":"Weighted sum","type":"Social Vulnerability Theme","children":[{"field":"GNIPCAP","type":"Social Vulnerability Indicator","name":"GNIPCAP","weight":0.5,"level":"4.1","depth":3,"parent":"undefined","x":425.3333333333333,"y":540,"id":2,"x0":425.3333333333333,"y0":540},{"field":"HEAHSTLEX","type":"Social Vulnerability Indicator","name":"HEAHSTLEX","weight":0.5,"level":"4.1","depth":3,"parent":"undefined","x":502.6666666666667,"y":540,"id":1,"x0":502.6666666666667,"y0":540}],"depth":2,"parent":"undefined","x":464,"y":360,"id":3,"x0":464,"y0":360}],"depth":1,"parent":"undefined","x":348,"y":180,"id":7,"x0":348,"y0":180}],"description":"","x0":212.66666666666666,"y0":0,"depth":0,"x":212.66666666666666,"y":0,"id":10}';

        testSessionProjectDefRiAndSvi = JSON.parse(testSessionProjectDefRiAndSvi);

        expect(combineIndicators(nameLookUpSvi, themeObjRiAndSvi, JSONthemesRiAndSvi, testSessionProjectDefRiAndSvi)).toEqual(jasmine.objectContaining({
            Argentina: 50685.208784375005,
            Colombia: 33240.482984223105,
            Bolivia: 9937.367594354111,
            Brazil: 55920.687091412896,
            Chile: 69969.69349687861,
            Peru: 27040.71677014648,
            Ecuador: 21184.578948195485,
            Paraguay: 16678.32577453465,
            Guyana: 13318.4930896875,
            Suriname: 38653.25737133845,
            Uruguay: 62995.140350702844,
            Venezuela: 53638.79088705498
        }));
    });

    it("The SVI indicator was combined correctly using the 'Geometric mean (ignore weights)' operator", function() {
        var operator = "Geometric mean (ignore weights)";
        var testSessionProjectDefRiAndSvi = '{"license":"CC BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0/)","name":"IRI","weight":1,"title":"BMW TEST 2","zone_label_field":"COUNTRY_NA","level":"1.0","field":"IRI_4","operator":"Weighted sum","svir_plugin_version":"1.6.3","type":"Integrated Risk Index","children":[{"name":"RI","weight":0.5,"level":"2.0","field":"RI_4","operator":"Weighted sum","type":"Risk Index","children":[{"field":"LOSS_PTS","type":"Risk Indicator","name":"LOSS_PTS","weight":1,"level":"3.1","depth":2,"parent":"undefined","x":77.33333333333333,"y":360,"id":8,"x0":77.33333333333333,"y0":360}],"depth":1,"parent":"undefined","x":77.33333333333333,"y":180,"id":9,"x0":77.33333333333333,"y0":180},{"name":"SVI","weight":0.5,"level":"2.0","field":"SVI_4","operator":"'+operator+'","type":"Social Vulnerability Index","children":[{"name":"test","weight":0.5,"level":"3.0","field":"TEST_1","operator":"Weighted sum","type":"Social Vulnerability Theme","children":[{"field":"ECOEACGUS","type":"Social Vulnerability Indicator","name":"ECOEACGUS","weight":0.5,"level":"4.0","depth":3,"parent":"undefined","x":193.33333333333331,"y":540,"id":5,"x0":193.33333333333331,"y0":540},{"field":"EDUEOCEYS","type":"Social Vulnerability Indicator","name":"EDUEOCEYS","weight":0.5,"level":"4.0","depth":3,"parent":"undefined","x":270.6666666666667,"y":540,"id":4,"x0":270.6666666666667,"y0":540}],"depth":2,"parent":"undefined","x":232,"y":360,"id":6,"x0":232,"y0":360},{"name":"test2","weight":0.5,"level":"3.0","field":"TEST2","operator":"Weighted sum","type":"Social Vulnerability Theme","children":[{"field":"GNIPCAP","type":"Social Vulnerability Indicator","name":"GNIPCAP","weight":0.5,"level":"4.1","depth":3,"parent":"undefined","x":425.3333333333333,"y":540,"id":2,"x0":425.3333333333333,"y0":540},{"field":"HEAHSTLEX","type":"Social Vulnerability Indicator","name":"HEAHSTLEX","weight":0.5,"level":"4.1","depth":3,"parent":"undefined","x":502.6666666666667,"y":540,"id":1,"x0":502.6666666666667,"y0":540}],"depth":2,"parent":"undefined","x":464,"y":360,"id":3,"x0":464,"y0":360}],"depth":1,"parent":"undefined","x":348,"y":180,"id":7,"x0":348,"y0":180}],"description":"","x0":212.66666666666666,"y0":0,"depth":0,"x":212.66666666666666,"y":0,"id":10}';

        testSessionProjectDefRiAndSvi = JSON.parse(testSessionProjectDefRiAndSvi);

        expect(combineIndicators(nameLookUpSvi, themeObjRiAndSvi, JSONthemesRiAndSvi, testSessionProjectDefRiAndSvi)).toEqual(jasmine.objectContaining({
            Argentina: 450.2675150813125,
            Colombia: 364.63945471779715,
            Bolivia: 199.37269215571234,
            Brazil: 472.95110568181525,
            Chile: 529.0357019970528,
            Peru: 328.88123552520585,
            Ecuador: 291.09846408523345,
            Paraguay: 258.2891850196957,
            Guyana: 230.81155161462348,
            Suriname: 393.2086335335909,
            Uruguay: 501.9766542408236,
            Venezuela: 463.2009969205808
        }));
    });
});
/*
describe("Mock Post New Project Definition", function () {
	var selectedLayer = "Layer Name";
    var projectDefStg = {"some values" : Math.random()};

    it("Should post to GeoServer", function () {
    	// call andCallFake so that it calls the success function.
        spyOn($, "ajax").and.callFake( function(params) {
        	return {
        		done: function() {
        			return {
        				fail: function() {}
        			};
        		}
        	};
        });

        addProjectDefinition.send(selectedLayer, projectDefStg);

        expect($.ajax).toHaveBeenCalledWith({
        	method: "POST",
        	url: "../svir/add_project_definition",
        	data: [selectedLayer, projectDefStg]
        });
    });

	it("does correct ajax requests", function () {
        spyOn($, 'ajax').and.callFake(function(params) {

            return {
        		done: function() {
        			return {
        				fail: function() {}
        			};
        		}
        	};
        });

		addProjectDefinition.send(selectedLayer, projectDefStg);

		expect($.ajax).toHaveBeenCalledWith({
        	method: "POST",
        	url: "../svir/add_project_definition",
        	data: [selectedLayer, projectDefStg]
        });
    });
});
*/
