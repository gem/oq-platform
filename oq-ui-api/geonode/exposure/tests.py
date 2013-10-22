import mock
import unittest

from exposure import util
from exposure import views

from django.http import HttpResponse


class FakeUser(object):
    def __init__(self, authed):
        self.authed = authed

    def is_authenticated(self):
        return self.authed

class FakeHttpGetRequest(object):
    def __init__(self, get_dict):
        self.GET = get_dict
        self.META = dict()
        self.method = 'GET'
        self.user = FakeUser(True)

class FakeHttpPostRequest(object):
    def __init__(self, post_dict):
        self.POST = post_dict
        self.META = dict()
        self.method = 'POST'
        self.user = FakeUser(True)

class FakeHttpDeleteRequest(object):
    def __init__(self, del_dict):
        self.DELETE = del_dict
        self.META = dict()
        self.method = 'DELETE'
        self.user = FakeUser(True)


class ExportBuildingTestCase(unittest.TestCase):
    """
    Tests for the `export_building` view.
    """
    def setUp(self):
        self.get_dict = dict(lat1=8, lng1=45,
                             lat2=9, lng2=46,
                             outputType='nrml')

    def test_invalid_export_area(self):
        self.get_dict = dict(lat1=8, lng1=45,
                             lat2=10, lng2=47.001,
                             outputType='nrml')
        request = FakeHttpGetRequest(self.get_dict)

        with mock.patch('exposure.views._export_area_valid') as eav:
            eav.return_value = (False, 'Invalid area')
            response = views.export_building(request)

            self.assertEqual(1, eav.call_count)

            self.assertEqual(403, response.status_code)

    def test_export_building_invalid_output_type(self):
        self.get_dict['outputType'] = 'pdf'
        request = FakeHttpGetRequest(self.get_dict)

        with self.assertRaises(ValueError) as ar:
            views.export_building(request)

        expected_error = (
            "Unrecognized output type 'pdf', only 'nrml' and 'csv' are "
            "supported"
        )
        self.assertEqual(expected_error, ar.exception.message)

    def test_export_building_calls_csv(self):
        # Test that the `export_building` function calls the
        # `stream_building_exposure` with the correct arguments.
        # Also test that the HttpResponse `Content-Disposition` is correct.
        self.get_dict['outputType'] = 'csv'
        request = FakeHttpGetRequest(self.get_dict)

        sbe_path = 'exposure.views._stream_building_exposure'
        with mock.patch(sbe_path) as sbe_mock:
            response = views.export_building(request)

            # Check that the `_stream_building_exposure` is getting called:
            self.assertEqual(1, sbe_mock.call_count)
            # Check that the generator is being called with the correct output
            # type:
            self.assertEqual('csv', sbe_mock.call_args[0][1])

            self.assertEqual(response['Content-Disposition'],
                             'attachment; filename="exposure_export.csv"')
            self.assertEqual(response['Content-Type'], 'text/csv')
        sbe_mock.stop()

    def test_export_building_calls_nrml(self):
        request = FakeHttpGetRequest(self.get_dict)

        sbe_path = 'exposure.views._stream_building_exposure'
        with mock.patch(sbe_path) as sbe_mock:
            response = views.export_building(request)

            # Check that the `_stream_building_exposure` is getting called:
            self.assertEqual(1, sbe_mock.call_count)
            # Check that the generator is being called with the correct output
            # type:
            self.assertEqual('nrml', sbe_mock.call_args[0][1])

            self.assertEqual(response['Content-Disposition'],
                             'attachment; filename="exposure_export.xml"')
            self.assertEqual(response['Content-Type'], 'text/plain')
        sbe_mock.stop()


class ExportPopulationTestCase(unittest.TestCase):

    def setUp(self):
        request_params = dict(
            lat1=8, lng1=45,
            lat2=9, lng2=46,
            outputType='csv'
        )
        self.request = FakeHttpGetRequest(request_params)

    def test_invalid_output_type(self):
        self.request.GET['outputType'] = 'pdf'
        with self.assertRaises(ValueError) as ar:
            views.export_population(self.request)

        expected_error = (
            "Unrecognized output type 'pdf', only 'nrml' and 'csv' are "
            "supported"
        )
        self.assertEqual(expected_error, ar.exception.message)

    def test_calls_csv(self):
        with mock.patch('exposure.views._stream_population_exposure') as spe:
            response = views.export_population(self.request)

            self.assertEqual(1, spe.call_count)
            self.assertEqual('csv', spe.call_args[0][1])

            self.assertEqual(response['Content-Disposition'],
                             'attachment; filename="exposure_export.csv"')
            self.assertEqual(response['Content-Type'], 'text/csv')

    def test_calls_nrml(self):
        self.request.GET['outputType'] = 'nrml'

        with mock.patch('exposure.views._stream_population_exposure') as spe:
            response = views.export_population(self.request)

            self.assertEqual(1, spe.call_count)
            self.assertEqual('nrml', spe.call_args[0][1])

            self.assertEqual(response['Content-Disposition'],
                             'attachment; filename="exposure_export.xml"')
            self.assertEqual(response['Content-Type'], 'text/plain')


class StreamBuildingExposureTestCase(unittest.TestCase):
    """
    Tests for `_stream_building_exposure`.
    """

    def setUp(self):
        req_params = {
            'outputType': 'csv',
            'residential': 'res',
            'timeOfDay': 'day',
            'adminLevel': 'admin0',
            'lng1': '8.1',
            'lat1': '45.2',
            'lng2': '9.1',
            'lat2': '46.2',
        }
        self.request = FakeHttpGetRequest(req_params)

    def test_invalid_admin_level(self):
        self.request.GET['adminLevel'] = 'admin4'

        with mock.patch('exposure.util._get_subnational_exposure') as gse:
            gse.return_value = []

            with self.assertRaises(ValueError) as ar:
                list(views._stream_building_exposure(self.request, 'csv'))

            expected_error = (
                "Invalid 'adminLevel' selection: 'admin4'."
                " Expected 'admin0', 'admin1', 'admin2', or 'admin3'."
            )
            self.assertEqual(expected_error, ar.exception.message)

            self.assertEqual(0, gse.call_count)

    def test_invalid_residential(self):
        self.request.GET['residential'] = 'invalid'

        with self.assertRaises(ValueError) as ar:
            list(views._stream_building_exposure(self.request, 'nrml'))

        self.assertEqual("Invalid 'residential' selection: 'invalid'. "
                         "Expected 'res', 'non-res', or 'both'.",
                         ar.exception.message)

    def test_stream_admin_0_csv(self):
        self.request.GET['adminLevel'] = 'admin0'
        self.request.GET['outputType'] = 'csv'
        self.request.GET['residential'] = 'non-res'

        with mock.patch('exposure.util._get_national_exposure') as gne:
            # Fake query result data
            gne.return_value = [[1, 2, 3, 4, 5, 6, 7, 8, 9, None, 0.2, None],
                                [11, 12, 13, 14, 15, 16, 17, 18, 19, 0.4, 0.5,
                                 0.6],
                                [20, 21, 22, 23, 24, 25, 26, 27, 28, None,
                                 None, None]]

            result = list(views._stream_building_exposure(self.request, 'csv'))

            self.assertEqual(1, gne.call_count)
            self.assertEqual((('8.1', '45.2', '9.1', '46.2', 'day', [1]), {}),
                             gne.call_args)

            # 6 rows expected: copyright, csv header, and 4 data rows
            self.assertEqual(7, len(result))
            self.assertEqual('6,7.2,1,2,3,7,5,8,night\n', result[2])
            self.assertEqual('16,106.4,11,12,13,17,15,18,day\n', result[3])
            self.assertEqual('16,133.0,11,12,13,17,15,18,night\n', result[4])
            self.assertEqual('16,159.6,11,12,13,17,15,18,transit\n', result[5])
            self.assertEqual('25,23,20,21,22,26,24,27,\n', result[6])

    def test_stream_admin_0_nrml(self):
        self.request.GET['adminLevel'] = 'admin0'
        self.request.GET['outputType'] = 'nrml'
        self.request.GET['residential'] = 'non-res'

        with mock.patch('exposure.util._get_national_exposure') as gne:
            # Fake query result data
            gne.return_value = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 0.1, None, 0.3],
                                [11, 12, 13, 14, 15, 16, 17, 18, 19, 0.4, 0.5,
                                 0.6],
                                [20, 21, 22, 23, 24, 25, 26, 27, 28, None,
                                 None, None]]

            result = list(views._stream_building_exposure(self.request, 'nrml'))

            self.assertEqual(1, gne.call_count)
            self.assertEqual((('8.1', '45.2', '9.1', '46.2', 'day', [1]), {}),
                             gne.call_args)

            # 6 rows expected: xml header, copyright, nrml header,
            # two data rows, and nrml footer
            self.assertEqual(7, len(result))
            exp1 = """
            <asset id="1_8" number="10.8" taxonomy="8">
                <location lon="2" lat="3" />

                <occupancies>
                    <occupancy occupants="3.6" period="day" />
                    <occupancy occupants="10.8" period="transit" />
                </occupancies>
            </asset>"""
            self.assertEqual(exp1, result[3])
            exp2 = """
            <asset id="11_18" number="159.6" taxonomy="18">
                <location lon="12" lat="13" />

                <occupancies>
                    <occupancy occupants="106.4" period="day" />
                    <occupancy occupants="133.0" period="night" />
                    <occupancy occupants="159.6" period="transit" />
                </occupancies>
            </asset>"""
            self.assertEqual(exp2, result[4])
            exp3 = """
            <asset id="20_27" number="23" taxonomy="27">
                <location lon="21" lat="22" />
            </asset>"""
            self.assertEqual(exp3, result[5])

    def test_stream_admin_1_csv(self):
        self.request.GET['adminLevel'] = 'admin1'
        self.request.GET['outputType'] = 'csv'
        self.request.GET['residential'] = 'both'

        with mock.patch('exposure.util._get_subnational_exposure') as gse:
            gse.return_value = [[1, 2, 3, 4, 5, 6, 7, 8, 9],
                                [10, 11, 12, 13, 14, 15, 16, 17, 18]]

            result = list(views._stream_building_exposure(self.request, 'csv'))

            self.assertEqual(1, gse.call_count)
            self.assertEqual((('8.1', '45.2', '9.1', '46.2', [0, 1], 'admin1'),
                              {}),
                             gse.call_args)

            self.assertEqual(4, len(result))
            self.assertEqual('6,36,1,2,3,7,5,8\n', result[2])
            self.assertEqual('15,234,10,11,12,16,14,17\n', result[3])

    def test_stream_admin_1_nrml(self):
        self.request.GET['adminLevel'] = 'admin1'
        self.request.GET['outputType'] = 'nrml'
        self.request.GET['residential'] = 'both'

        with mock.patch('exposure.util._get_subnational_exposure') as gse:
            gse.return_value = [[1, 2, 3, 4, 5, 6, 7, 8, 9],
                                [10, 11, 12, 13, 14, 15, 16, 17, 18]]

            result = list(views._stream_building_exposure(self.request, 'nrml'))

            self.assertEqual(1, gse.call_count)
            self.assertEqual((('8.1', '45.2', '9.1', '46.2', [0, 1], 'admin1'),
                              {}),
                             gse.call_args)

            self.assertEqual(6, len(result))
            exp1 = """
            <asset id="1_8" number="36" taxonomy="8">
                <location lon="2" lat="3" />
            </asset>"""
            self.assertEqual(exp1, result[3])
            exp2 = """
            <asset id="10_17" number="234" taxonomy="17">
                <location lon="11" lat="12" />
            </asset>"""
            self.assertEqual(exp2, result[4])


class StreamPopulationExposureTestCase(unittest.TestCase):

    def setUp(self):
        req_params = {
            'outputType': 'csv',
            'lng1': '8.1',
            'lat1': '45.2',
            'lng2': '9.1',
            'lat2': '46.2',
        }
        self.request = FakeHttpGetRequest(req_params)

    def test_stream_csv(self):
        with mock.patch('exposure.util._get_population_exposure') as gpe:
            gpe.return_value = [[1, 2, 3, 4, 5],[6, 7, 8, 9, 10]]

            result = list(views._stream_population_exposure(self.request,
                                                            'csv'))
            self.assertEqual(1, gpe.call_count)
            self.assertEqual((('8.1', '45.2', '9.1', '46.2'), {}),
                             gpe.call_args)

            self.assertEqual(4, len(result))
            self.assertEqual('5,4,1,2,3\n', result[2])
            self.assertEqual('10,9,6,7,8\n', result[3])

    def test_stream_nrml(self):
        self.request.GET['outputType'] = 'nrml'

        with mock.patch('exposure.util._get_population_exposure') as gpe:
            gpe.return_value = [[1, 2, 3, 4, 5],[6, 7, 8, 9, 10]]

            result = list(views._stream_population_exposure(self.request,
                                                            'nrml'))

            self.assertEqual(1, gpe.call_count)
            self.assertEqual((('8.1', '45.2', '9.1', '46.2'), {}),
                             gpe.call_args)

            self.assertEqual(6, len(result))
            exp1 = """
            <asset id="1" number="4" taxonomy="">
                <location lon="2" lat="3" />
            </asset>"""
            self.assertEqual(exp1, result[3])
            exp2 = """
            <asset id="6" number="9" taxonomy="">
                <location lon="7" lat="8" />
            </asset>"""
            self.assertEqual(exp2, result[4])


class DecoratorUtilTestcase(unittest.TestCase):

    def test_allowed_methods(self):
        @util.allowed_methods(('GET', 'POST'))
        def fake_view(request):
            return HttpResponse(status=200)

        req = FakeHttpGetRequest(None)
        resp = fake_view(req)
        self.assertEqual(200, resp.status_code)

        req = FakeHttpPostRequest(None)
        resp = fake_view(req)
        self.assertEqual(200, resp.status_code)

        req = FakeHttpDeleteRequest(None)
        resp = fake_view(req)
        self.assertEqual(405, resp.status_code)

    def test_sign_in_required(self):
        @util.sign_in_required
        def fake_view(request):
            return HttpResponse(status=200)

        req = FakeHttpGetRequest(None)
        req.user.authed = False

        resp = fake_view(req)
        self.assertEqual(401, resp.status_code)

        req.user.authed = True
        resp = fake_view(req)
        self.assertEqual(200, resp.status_code)


class ExportAreaValidTestCase(unittest.TestCase):

    def test_valid(self):
        lat1 = '8'
        lng1 = '45'
        lat2 = '10'
        lng2 = '47'

        valid, _ = views._export_area_valid(lat1, lng1, lat2, lng2)
        self.assertTrue(valid)

    def test_invalid(self):
        lat1 = '8'
        lng1 = '45'
        lat2 = '10'
        lng2 = '47.001'

        valid, _ = views._export_area_valid(lat1, lng1, lat2, lng2)
        self.assertFalse(valid)


class ValidateExportTestCase(unittest.TestCase):

    def setUp(self):
        req_params = {
            'outputType': 'csv',
            'residential': 'res',
            'timeOfDay': 'day',
            'adminLevel': 'admin0',
            'lng1': '8.0',
            'lat1': '45.0',
            'lng2': '10.0',
            'lat2': '47.0',
        }
        self.request = FakeHttpGetRequest(req_params)

    def test_valid(self):
        resp = views.validate_export(self.request)
        self.assertEqual(200, resp.status_code)

    def test_invalid(self):
        self.request.GET['lat2'] = '47.001'
        resp = views.validate_export(self.request)
        self.assertEqual(403, resp.status_code)
