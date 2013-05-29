import mock
import unittest

from exposure import views


class FakeHttpGetRequest(object):
    def __init__(self, get_dict):
        self.GET = get_dict
        self.META = dict()
        self.method = 'get'


class ExportExposureTestCase(unittest.TestCase):
    """
    Tests for the `export_exposure` view.
    """

    def test_export_exposure_invalid_output_type(self):

        request = FakeHttpGetRequest(dict(outputType='pdf'))

        with self.assertRaises(ValueError) as ar:
            views.export_exposure(request)

        expected_error = (
            "Unrecognized output type 'pdf', only 'nrml' and 'csv' are "
            "supported"
        )
        self.assertEqual(expected_error, ar.exception.message)

    def test_export_exposure_calls_csv(self):
        # Test that the `export_exposure` function calls the
        # `stream_response_generator` with the correct arguments.
        # Also test that the HttpResponse `Content-Disposition` is correct.
        request = FakeHttpGetRequest(dict(outputType='csv'))

        srg_path = 'exposure.views.stream_response_generator'
        with mock.patch(srg_path) as srg_mock:
            response = views.export_exposure(request)

            # Check that the `stream_response_generator` is getting called:
            self.assertEqual(1, srg_mock.call_count)
            # Check that the generator is being called with the correct output
            # type:
            self.assertEqual('csv', srg_mock.call_args[0][1])

            self.assertEqual(response['Content-Disposition'],
                             'attachment; filename="exposure_export.csv"')
            self.assertEqual(response['Content-Type'], 'text/csv')
        srg_mock.stop()

    def test_export_exposure_calls_nrml(self):
        request = FakeHttpGetRequest(dict(outputType='nrml'))

        srg_path = 'exposure.views.stream_response_generator'
        with mock.patch(srg_path) as srg_mock:
            response = views.export_exposure(request)

            # Check that the `stream_response_generator` is getting called:
            self.assertEqual(1, srg_mock.call_count)
            # Check that the generator is being called with the correct output
            # type:
            self.assertEqual('nrml', srg_mock.call_args[0][1])

            self.assertEqual(response['Content-Disposition'],
                             'attachment; filename="exposure_export.xml"')
            self.assertEqual(response['Content-Type'], 'text/plain')
        srg_mock.stop()


class GetRegCodesPopRatiosTestCase(unittest.TestCase):
    """
    Tests for the `_get_reg_codes_pop_ratios` function.
    """

    def setUp(self):
        self.region_codes = [1, 2, 3]
        self.occupancy = [0, 1]

    def test_tod_off(self):
        tod = 'off'

        result = views._get_reg_codes_pop_ratios(self.region_codes,
                                                 tod,
                                                 self.occupancy)
        expected = [(1, 1), (2, 1), (3, 1)]
        self.assertEqual(expected, result)

    def test_tod_all(self):
        tod = 'all'

        with mock.patch('exposure.util.exec_query') as eq:
            result = views._get_reg_codes_pop_ratios(self.region_codes,
                                                     tod,
                                                     self.occupancy)

            self.assertEqual(1, eq.call_count)

            expected_query = """
        SELECT
            geographic_region_id AS region_code,
            (day_pop_ratio + night_pop_ratio + transit_pop_ratio) AS pop_ratio,
            is_urban
        FROM ged2.pop_allocation
        WHERE geographic_region_id IN (1, 2, 3)
        AND occupancy_id IN (0, 1)""".strip()
            actual_query = eq.call_args[0][1]
            actual_query = actual_query.strip()
            self.assertEqual(expected_query, actual_query)

    def test_tod_day_night_transit(self):
        with mock.patch('exposure.util.exec_query') as eq:
            for i, tod in enumerate(('day', 'night', 'transit')):
                result = views._get_reg_codes_pop_ratios(self.region_codes,
                                                         tod,
                                                         self.occupancy)

                self.assertEqual(i + 1, eq.call_count)

                expected_query = """
        SELECT
            geographic_region_id AS region_code,
            %s_pop_ratio AS pop_ratio,
            is_urban
        FROM ged2.pop_allocation
        WHERE geographic_region_id IN (1, 2, 3)
        AND occupancy_id IN (0, 1)""".strip()

                expected_query %= tod
                actual_query = eq.call_args[0][1]
                actual_query = actual_query.strip()
                self.assertEqual(expected_query, actual_query)

    def test_invalid_tod(self):
        tod = 'tea_time'
        with self.assertRaises(ValueError) as ar:
            views._get_reg_codes_pop_ratios(self.region_codes,
                                            tod,
                                            self.occupancy)

        expected_error = ("Invalid time of day: 'tea_time'. "
                          "Expected 'day', 'night', 'transit', 'all', or "
                          "'off'")
        self.assertEqual(expected_error, ar.exception.message)


class StreamResponseGeneratorTestCase(unittest.TestCase):
    """
    Tests for `stream_response_generator`.
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

        self.adm_lvl_reg_patch = mock.patch(
            'exposure.views._get_admin_level_ids_region_ids'
        )
        self.adm_lvl_reg_mock = self.adm_lvl_reg_patch.start()
        self.adm_lvl_reg_mock.return_value = ['fake_admin_lvl_ids',
                                              'fake_region_ids']

        self.pop_patch = mock.patch('exposure.views._get_pop_table')
        self.pop_mock = self.pop_patch.start()

        self.grcpr_patch = mock.patch('exposure.views.'
                                      '_get_reg_codes_pop_ratios')
        self.grcpr_mock = self.grcpr_patch.start()

        self.df_patch = mock.patch('exposure.views._get_dwelling_fractions')
        self.df_mock = self.df_patch.start()

        self.ag_patch = mock.patch('exposure.views._asset_generator')
        self.ag_mock = self.ag_patch.start()
        self.ag_mock.return_value = []

        self.patches = [self.adm_lvl_reg_patch, self.pop_patch,
                        self.grcpr_patch, self.df_patch, self.ag_patch]
        self.mocks = [self.adm_lvl_reg_mock, self.pop_mock, self.grcpr_mock,
                      self.df_mock, self.ag_mock]

    def tearDown(self):
        for p in self.patches:
            p.stop()

    def test_invalid_output_type(self):
        with self.assertRaises(ValueError) as ar:
            list(views.stream_response_generator(None, 'pdf'))

        expected_error = ("Unrecognized output type 'pdf', only 'nrml' and "
                          "'csv' are supported")
        self.assertEqual(expected_error, ar.exception.message)

    def test_query_func_calls_residential(self):
        # Test that the proper arguments are passed to the various DB query
        # helper functions.
        # 'Residential' selection is 'res'
        self.request.GET['adminLevel'] = 'admin0'

        # The list cast is done here to exhause the generator
        # (since all function calls happen in the context of a generator,
        # which is lazy)
        list(views.stream_response_generator(self.request, 'csv'))
        for m in self.mocks:
            self.assertEqual(1, m.call_count)

        self.assertEqual(('8.1', '45.2', '9.1', '46.2', 'gadm_country_id'),
                         self.adm_lvl_reg_mock.call_args[0])
        self.assertEqual(('8.1', '45.2', '9.1', '46.2', 'gadm_country_id'),
                         self.pop_mock.call_args[0])
        self.assertEqual(('fake_region_ids', 'day', [0]),
                         self.grcpr_mock.call_args[0])
        self.assertEqual(('fake_admin_lvl_ids', [0], 'gadm_country_id'),
                         self.df_mock.call_args[0])

    def test_query_func_calls_non_residential(self):
        # Test that the proper arguments are passed to the various DB query
        # helper functions.
        # 'Residential' selection is 'non-res'
        self.request.GET['adminLevel'] = 'admin1'
        self.request.GET['residential'] = 'non-res'

        list(views.stream_response_generator(self.request, 'csv'))
        for m in self.mocks:
            self.assertEqual(1, m.call_count)

        self.assertEqual(('8.1', '45.2', '9.1', '46.2', 'gadm_admin_1_id'),
                         self.adm_lvl_reg_mock.call_args[0])
        self.assertEqual(('8.1', '45.2', '9.1', '46.2', 'gadm_admin_1_id'),
                         self.pop_mock.call_args[0])
        self.assertEqual(('fake_region_ids', 'day', [1]),
                         self.grcpr_mock.call_args[0])
        self.assertEqual(('fake_admin_lvl_ids', [1], 'gadm_admin_1_id'),
                         self.df_mock.call_args[0])

    def test_query_func_calls_both(self):
        # Test that the proper arguments are passed to the various DB query
        # helper functions.
        # 'Residential' selection is 'both'
        self.request.GET['adminLevel'] = 'admin3'
        self.request.GET['residential'] = 'both'

        list(views.stream_response_generator(self.request, 'nrml'))
        for m in self.mocks:
            self.assertEqual(1, m.call_count)

        self.assertEqual(('8.1', '45.2', '9.1', '46.2', 'gadm_admin_3_id'),
                         self.adm_lvl_reg_mock.call_args[0])
        self.assertEqual(('8.1', '45.2', '9.1', '46.2', 'gadm_admin_3_id'),
                         self.pop_mock.call_args[0])
        self.assertEqual(('fake_region_ids', 'day', [0, 1]),
                         self.grcpr_mock.call_args[0])
        self.assertEqual(('fake_admin_lvl_ids', [0, 1], 'gadm_admin_3_id'),
                         self.df_mock.call_args[0])


    def test_invalid_residential(self):
        self.request.GET['residential'] = 'invalid'

        with self.assertRaises(ValueError) as ar:
            list(views.stream_response_generator(self.request, 'nrml'))

        self.assertEqual("Invalid 'residential' selection: 'invalid'. "
                         "Expected 'res', 'non-res', or 'both'.",
                         ar.exception.message)
