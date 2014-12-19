import mock
import unittest

from openquakeplatform import utils
from openquakeplatform.exposure import views

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


class DecoratorUtilTestcase(unittest.TestCase):

    def test_allowed_methods(self):
        @utils.allowed_methods(('GET', 'POST'))
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
        @utils.sign_in_required
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
