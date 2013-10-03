# -*- coding: utf-8 -*-
# vim: tabstop=4 shiftwidth=4 softtabstop=4

# Copyright (c) 2013, GEM Foundation.
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public
# License along with this program. If not, see
# <https://www.gnu.org/licenses/agpl.html>.

import json
import mock
import StringIO
import unittest
import urllib2

from openquakeplatform.icebox import views
from openquakeplatform.icebox import models

from django.core.exceptions import ObjectDoesNotExist
from django.test.client import RequestFactory


class BaseViewTestCase(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.factory = RequestFactory()


class GetBaseURLTestCase(BaseViewTestCase):
    """
    Tests for :func:`icebox.views._get_base_url` utility func.
    """

    def setUp(self):
        self.request = self.factory.get('does not matter')

    def test_http(self):
        self.request.is_secure = lambda: False
        self.request.META['HTTP_HOST'] = 'www.openquake.org:8080'
        self.assertEqual('http://www.openquake.org:8080',
                         views._get_base_url(self.request))

    def test_https(self):
        self.request.is_secure = lambda: True
        self.request.META['HTTP_HOST'] = 'www.openquake.org'
        self.assertEqual('https://www.openquake.org',
                         views._get_base_url(self.request))


class ListArtifactsTestCase(BaseViewTestCase):
    """
    Tests for :func:`icebox.views.list_artifacts` view.
    """
    def test(self):
        req = self.factory.get('icebox/artifacts')
        req.META['HTTP_HOST'] = 'www.openquake.org'
        with mock.patch(
                'openquakeplatform.icebox.models.Artifact.objects.all'
                ) as arts:
            arts.return_value = [
                models.Artifact(id=6,
                                artifact_type='hazard_map',
                                content_type='geojson',
                                name='hazard map 1',
                                artifact_data='fake haz map data'),
                models.Artifact(id=7,
                                artifact_type='loss_map',
                                content_type='geojson',
                                name='loss map 1',
                                artifact_data='fake loss map data'),
            ]
            resp = views.list_artifacts(req)

        self.assertEqual(1, arts.call_count)

        self.assertEqual(200, resp.status_code)
        self.assertEqual(('Content-Type', 'application/json'),
                         resp._headers['content-type'])
        exp_content = [
            {u'url': u'http://www.openquake.org/icebox/artifact/6',
             u'artifact_type': u'hazard_map', u'name': u'hazard map 1',
             u'content_type': u'geojson', u'id': 6},
            {u'url': u'http://www.openquake.org/icebox/artifact/7',
             u'artifact_type': u'loss_map', u'name': u'loss map 1',
             u'content_type': u'geojson', u'id': 7},
        ]
        self.assertEqual(exp_content, json.loads(resp.content))


class GetArtifactTestCase(BaseViewTestCase):
    """
    Tests for the :func:`icebox.views.get_artifact` view.
    """

    def test_object_exists(self):
        req = self.factory.get('icebox/artifact/848')
        with mock.patch(
                'openquakeplatform.icebox.models.Artifact.objects.get') as get:
            get.return_value = models.Artifact(
                id=848,
                artifact_type='whatever',
                content_type='whatever',
                name='whatever',
                artifact_data='blob',
            )
            resp = views.get_artifact(req, 848)

        self.assertEqual(1, get.call_count)
        self.assertEqual(((), {'id': 848}), get.call_args)

        self.assertEqual(200, resp.status_code)
        self.assertEqual(('Content-Type', 'text/plain'),
                         resp._headers['content-type'])
        self.assertEqual('blob', resp.content)

    def test_objects_does_not_exist(self):
        req = self.factory.get('icebox/artifact/848')
        with mock.patch(
                'openquakeplatform.icebox.models.Artifact.objects.get') as get:
            get.side_effect = ObjectDoesNotExist
            resp = views.get_artifact(req, 848)

        self.assertEqual(1, get.call_count)
        self.assertEqual(((), {'id': 848}), get.call_args)

        self.assertEqual(404, resp.status_code)


class ImportArtifactsTestCase(BaseViewTestCase):

    def setUp(self):
        self.req = self.factory.post(
            'icebox/artifacts/import',
            {'import_url': ('http://oqengineserver.openquake.org/'
                            'v1/calc/hazard/1/results'),
             'owner': 'jdoe'}
        )

    def test_missing_required_params(self):
        req = self.factory.post('icebox/artifacts/import', {})

        resp = views.import_artifacts(req)
        self.assertEqual(404, resp.status_code)
        self.assertEqual(
            'POST requires the following parameters: "import_url", "owner"',
            resp.content
        )

    def test_user_not_found(self):
        with mock.patch('django.contrib.auth.models.User.objects.get') as get:
            get.side_effect = ObjectDoesNotExist

            resp = views.import_artifacts(self.req)

        self.assertEqual(1, get.call_count)
        self.assertEqual(((), {'username': 'jdoe'}), get.call_args)

        self.assertEqual(404, resp.status_code)
        self.assertEqual('Specified `owner` "jdoe" not found', resp.content)

    def test_bad_import_url(self):
        def make_http_error(*args, **kwargs):
            error = urllib2.HTTPError(
                'http://foo.com', 405, 'METHOD NOT ALLOWED', None,
                StringIO.StringIO()
            )
            raise error

        with mock.patch('django.contrib.auth.models.User.objects.get'):
            with mock.patch('urllib2.urlopen') as urlopen:
                urlopen.side_effect = make_http_error
                resp = views.import_artifacts(self.req)

        self.assertEqual(404, resp.status_code)
        self.assertEqual(
            'Unable to import artifacts from '
            'http://oqengineserver.openquake.org/v1/calc/hazard/1/results',
            resp.content
        )

    def test_successful_case(self):
        base_url = 'http://oqengineserver.openquake.org'
        error_404 = urllib2.HTTPError(
            ('%s/v1/calc/hazard/result/77?export_type=geojson' % base_url),
            404, 'NOT FOUND', None, StringIO.StringIO()
        )
        calc_summary_url = (
            'http://oqengineserver.openquake.org/v1/calc/hazard/1'
        )

        fake_user = mock.Mock()
        # Fake oq-engine-server results data list:
        fake_oqes_data = [
            dict(url="%s/v1/calc/hazard/result/78" % base_url,
                 type="hazard_map", name="hazard map 1", id=78),
            dict(url="%s/v1/calc/hazard/result/79" % base_url,
                 type="hazard_map", name="hazard map 2", id=79),
            dict(url="%s/v1/calc/hazard/result/77" % base_url,
                 type="hazard_curve", name="hazard curves 1", id=77),
        ]

        haz_map_1 = {'fake': 'haz_map_1'}
        haz_map_2 = {'fake': 'haz_map_2'}
        haz_curve_1 = {'fake': 'haz_curve_1'}

        url_data = iter([fake_oqes_data, haz_map_1, haz_map_2, haz_curve_1])

        fake_url = mock.Mock()
        read_count = dict(count=0)

        def fake_read():
            read_count['count'] += 1
            if read_count['count'] == 4:
                # raise a 404 when we attempt to export the hazard curve,
                # to simulate a case where we cannot export a result as geojson
                raise error_404
            else:
                return json.dumps(url_data.next())
        fake_url.read = fake_read
        fake_url.close = mock.Mock()

        with mock.patch('django.contrib.auth.models'
                        '.User.objects.get') as user_get:
            with mock.patch('urllib2.urlopen') as urlopen:
                with mock.patch('openquakeplatform.icebox.views'
                                '._do_import_artifacts') as do_import:
                    user_get.return_value = fake_user
                    urlopen.return_value = fake_url
                    do_import.return_value = 4  # 1 calc summary, 3 haz maps

                    resp = views.import_artifacts(self.req)

        # First, test mocks:
        self.assertEqual(1, do_import.call_count)
        self.assertEqual(
            (fake_oqes_data, calc_summary_url, fake_user),
            do_import.call_args[0]
        )

        self.assertEqual(1, user_get.call_count)

        self.assertEqual(1, urlopen.call_count)
        exp_urlopen_call_args = [
            ((u'%s/v1/calc/hazard/1/results' % base_url, ), {}),
        ]
        self.assertEqual(exp_urlopen_call_args, urlopen.call_args_list)

        self.assertEqual(1, fake_url.close.call_count)

        # Then test the actual view response:
        self.assertEqual(200, resp.status_code)
        self.assertEqual(
            '4 items imported from %s/v1/calc/hazard/1/results' % base_url,
            resp.content
        )

    def test__do_import_artifacts(self):
        base_url = 'http://oqengineserver.openquake.org'
        artifacts = [
            dict(url="%s/v1/calc/hazard/result/78" % base_url,
                 type="hazard_map", name="hazard map 1", id=78),
            dict(url="%s/v1/calc/hazard/result/79" % base_url,
                 type="hazard_map", name="hazard map 2", id=79),
            dict(url="%s/v1/calc/hazard/result/77" % base_url,
                 type="hazard_curve", name="hazard curves 1", id=77),
        ]

        fake_user = mock.Mock()

        fake_map_data = [
            {'artifact_data': '{"fake": "haz_map_1"}',
             'artifact_type': u'hazard_map',
             'name': u'hazard map 1',
             'content_type': 'geojson',
             'user': 'fake_user'},
            {'artifact_data': '{"fake": "haz_map_2"}',
             'artifact_type': u'hazard_map',
             'name': u'hazard map 2',
             'content_type': 'geojson',
             'user': 'fake_user'},
            {'artifact_data': '{"fake": "haz_curves_1"}',
             'artifact_type': u'hazard_curve',
             'name': u'hazard curves 1',
             'content_type': 'geojson',
             'user': 'fake_user'},
        ]

        calculation_url = (
            'http://oqengineserver.openquake.org/v1/calc/hazard/1'
        )

        url_open_vals = iter([
            '{"description": "Test Calc"}',
            json.dumps(fake_map_data[0]),
            json.dumps(fake_map_data[1]),
            json.dumps(fake_map_data[2]),
        ])

        fake_url = mock.Mock()
        read_count = dict(count=0)

        def fake_read():
            read_count['count'] += 1
            return url_open_vals.next()
        fake_url.read = fake_read
        fake_url.close = mock.Mock()

        fake_ag = mock.Mock()
        fake_art = mock.Mock()

        with mock.patch('urllib2.urlopen') as urlopen:
            with mock.patch('openquakeplatform.icebox.models'
                            '.ArtifactGroup.objects.create') as ag_create:
                with mock.patch('openquakeplatform.icebox.models'
                                '.Artifact.objects.create') as art_create:
                    with mock.patch(
                            'openquakeplatform.icebox.models'
                            '.ArtifactGroupLink.objects.create') as agl_create:
                        urlopen.return_value = fake_url
                        ag_create.return_value = fake_ag
                        art_create.return_value = fake_art

                        views._do_import_artifacts(
                            artifacts, calculation_url, fake_user
                        )

        self.assertEqual(1, ag_create.call_count)
        self.assertEqual(4, art_create.call_count)
        self.assertEqual(4, agl_create.call_count)

        self.assertEqual(
            dict(user=fake_user, group_type='calculation', name='Test Calc'),
            ag_create.call_args[1]
        )

        self.assertEqual(
            [dict(artifact_group=fake_ag, artifact=fake_art),
             dict(artifact_group=fake_ag, artifact=fake_art),
             dict(artifact_group=fake_ag, artifact=fake_art),
             dict(artifact_group=fake_ag, artifact=fake_art)],
            [x[1] for x in agl_create.call_args_list]
        )

        self.assertEqual(
            [{'artifact_data': '{"description": "Test Calc"}',
              'artifact_type': 'calculation',
              'name': u'Test Calc',
              'content_type': 'application/json',
              'user': fake_user},
             {'artifact_data': '{"artifact_data": "{\\"fake\\": '
                               '\\"haz_map_1\\"}", "artifact_type": '
                               '"hazard_map", "name": "hazard map 1", '
                               '"content_type": "geojson", "user": '
                               '"fake_user"}',
              'artifact_type': 'hazard_map',
              'name': 'hazard map 1',
              'content_type': 'geojson',
              'user': fake_user},
             {'artifact_data': '{"artifact_data": "{\\"fake\\": '
                               '\\"haz_map_2\\"}", "artifact_type": '
                               '"hazard_map", "name": "hazard map 2", '
                               '"content_type": "geojson", "user": '
                               '"fake_user"}',
              'artifact_type': 'hazard_map',
              'name': 'hazard map 2',
              'content_type': 'geojson',
              'user': fake_user},
             {'artifact_data': '{"artifact_data": "{\\"fake\\": '
                               '\\"haz_curves_1\\"}", "artifact_type": '
                               '"hazard_curve", "name": "hazard curves 1", '
                               '"content_type": "geojson", "user": '
                               '"fake_user"}',
              'artifact_type': 'hazard_curve',
              'name': 'hazard curves 1',
              'content_type': 'geojson',
              'user': fake_user}],
            [x[1] for x in art_create.call_args_list]
        )


class ListArtifactGroupsTestCase(BaseViewTestCase):

    def setUp(self):
        self.req = self.factory.get('/icebox/artifact_groups')
        self.req.META['HTTP_HOST'] = 'www.openquake.org:8080'

        self.group1 = mock.Mock()
        self.group2 = mock.Mock()

        self.group1.id = 1
        self.group1.name = 'Sample Calculation'
        self.group1.group_type = 'calculation'

        self.group2.id = 2
        self.group2.name = 'Sample Map'
        self.group2.group_type = 'map'

    def test_list_artifact_groups(self):
        with mock.patch('openquakeplatform.icebox.models'
                        '.ArtifactGroup.objects') as ag:
            ag.all.return_value = [self.group1, self.group2]
            resp = views.list_artifact_groups(self.req)

        self.assertEqual(200, resp.status_code)
        expected_content = [
            {u'group_type': u'calculation',
             u'id': 1,
             u'name': u'Sample Calculation',
             u'url': u'http://www.openquake.org:8080/icebox/artifact_group/1'},
            {u'group_type': u'map',
             u'id': 2,
             u'name': u'Sample Map',
             u'url': u'http://www.openquake.org:8080/icebox/artifact_group/2'},
        ]
        self.assertEqual(expected_content, json.loads(resp.content))

    def test_list_artifact_groups_with_group_type_param(self):
        req = self.factory.get('/icebox/artifact_groups',
                               dict(group_type='calculation'))
        req.META['HTTP_HOST'] = 'www.openquake.org:8080'

        ag_result = mock.Mock()
        ag_result.filter.return_value = [self.group1]

        with mock.patch('openquakeplatform.icebox.models'
                        '.ArtifactGroup.objects') as ag:
            ag.all.return_value = ag_result
            resp = views.list_artifact_groups(req)

        self.assertEqual(
            dict(group_type='calculation'),
            ag_result.filter.call_args[1]
        )
        self.assertEqual(200, resp.status_code)
        expected_content = [
            {u'group_type': u'calculation',
             u'id': 1,
             u'name': u'Sample Calculation',
             u'url': u'http://www.openquake.org:8080/icebox/artifact_group/1'},
        ]
        self.assertEqual(expected_content, json.loads(resp.content))


    def test_list_artifact_groups_404(self):
        with mock.patch('openquakeplatform.icebox.models'
                        '.ArtifactGroup.objects.all') as ag:
            ag.return_value = []
            resp = views.list_artifact_groups(self.req)

        self.assertEqual(404, resp.status_code)


class GetArtifactGroupTestCase(BaseViewTestCase):

    def test_get_artifact_group(self):
        req = self.factory.get('/icebox/artifact_group/666')
        req.META['HTTP_HOST'] = 'www.openquake.org'
        art_group = mock.Mock()
        art_group.id = 666
        art_group.group_type = 'map'
        art_group.name = 'Sample Map'

        art1 = mock.Mock()
        art1.id = 1234
        art1.name = 'Sample Artifact 1'
        art1.content_type = 'xml'
        art1.artifact_type = 'hazard_map'

        art2 = mock.Mock()
        art2.id = 5678
        art2.name = 'Sample Artifact 2'
        art2.content_type = 'xml'
        art2.artifact_type = 'hazard_curve'

        with mock.patch('openquakeplatform.icebox.models'
                        '.ArtifactGroup.objects.get') as ag_get:
            with mock.patch('openquakeplatform.icebox.models'
                            '.Artifact.objects.filter') as art_filter:
                ag_get.return_value = art_group
                art_filter.return_value = [art1, art2]

                resp = views.get_artifact_group(req, 666)

        expected_content = {
            u'id': 666,
            u'name': u'Sample Map',
            u'group_type': u'map',
            u'artifacts': [
                {u'artifact_type': u'hazard_map',
                 u'content_type': u'xml',
                 u'id': 1234,
                 u'name': u'Sample Artifact 1',
                 u'url': u'http://www.openquake.org/icebox/artifact/1234'},
                {u'artifact_type': u'hazard_curve',
                 u'content_type': u'xml',
                 u'id': 5678,
                 u'name': u'Sample Artifact 2',
                 u'url': u'http://www.openquake.org/icebox/artifact/5678'},
            ],
        }

        self.assertEqual(200, resp.status_code)
        self.assertEqual(expected_content, json.loads(resp.content))
