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
            (day_pop_ratio + night_pop_ratio + transit_pop_ratio) AS pop_ratio
        FROM ged2.pop_allocation
        WHERE geographic_region_id IN (1, 2, 3)
        AND is_urban
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
            %s_pop_ratio AS pop_ratio
        FROM ged2.pop_allocation
        WHERE geographic_region_id IN (1, 2, 3)
        AND is_urban
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

    def test_invalid_output_type(self):
        with self.assertRaises(RuntimeError) as ar:
            list(views.stream_response_generator(None, 'pdf'))

        expected_error = ("Unrecognized output type 'pdf', only 'nrml' and "
                          "'csv' are supported")
        self.assertEqual(expected_error, ar.exception.message)
