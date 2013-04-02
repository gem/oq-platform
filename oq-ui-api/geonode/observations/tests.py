# -*- coding: utf-8 -*-
# vim: tabstop=4 shiftwidth=4 softtabstop=4

# Copyright (c) 2010-2012, GEM Foundation.
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Affero General Public License as
#    published by the Free Software Foundation, either version 3 of the
#    License, or (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Affero General Public License for more details.
#
#    You should have received a copy of the GNU Affero General Public License
#    along with this program.  If not, see <https://www.gnu.org/licenses/agpl.html>.

"""
Run this test with manage.py test observations/tests.py
"""

from django.test import TestCase
from observations import models, utils

class FaultSourceAutoComputedTest(TestCase):
    def setUp(self):
        self.expected_trace_geom = 'MULTILINESTRING ((10.0000000000000000 10.0000000000000000, 20.0000000000000000 20.0000000000000000, 10.0000000000000000 40.0000000000000000), (40.0000000000000000 40.0000000000000000, 30.0000000000000000 30.0000000000000000, 40.0000000000000000 20.0000000000000000, 30.0000000000000000 10.0000000000000000))'
        self.trace = models.Trace(loc_meth="GPS Survey",
                                  geomorphic_expression="Surface trace",
                                  scale=10,
                                  accuracy=20,
                                  geom=self.expected_trace_geom)
        self.trace.save()

        self.fault_section = models.FaultSection(
            fault_section_name="Test Section",
            strike_slip_rate_min=10., strike_slip_rate_max=30., strike_slip_rate_pref=20., 
            dip_slip_rate_min=10., dip_slip_rate_max=30., dip_slip_rate_pref=20., 
            length_min=10., length_pref=20., length_max=30.,
            low_d_min=1., low_d_pref=2., low_d_max=3.,
            u_sm_d_min=4., u_sm_d_pref=5., u_sm_d_max=6.,
            dip_min=7., dip_pref=8., dip_max=9.,
            strike=20, surface_dip=10, episodic_behaviour="test behavior", down_thro='N',
            u_sm_d_com=1, low_d_com=1, dip_com=1, dip_dir_com=1, net_slip_rate_com=2)
        self.fault_section.save()

    def _join_traces(self):
        utils.join_traces([self.trace], self.fault_section)
        self.fault_section = models.FaultSection.objects.get(pk=self.fault_section.pk)

    def _join_fault_sections(self, name="Test fault"):
        utils.join_fault_sections([self.fault_section], name)
        return self.fault_section.fault.all()[0]

    def test_join_traces(self):
        self._join_traces()
        self.assertEqual(self.expected_trace_geom, self.fault_section.geom.wkt)
        self.assertAlmostEqual(14.142135623731, self.fault_section.net_slip_rate_min)
        self.assertEqual(28.2842712474619, self.fault_section.net_slip_rate_pref)
        self.assertEqual(42.4264068711929, self.fault_section.net_slip_rate_max)
        self.assertEqual(1, self.fault_section.all_com)

    def test_join_fault_sections(self):
        self._join_traces()

        expected_name = "Test fault"
        fault = self._join_fault_sections(expected_name)

        self.assertEqual(expected_name, fault.fault_name)
        self.assertEqual(self.expected_trace_geom, fault.simple_geom.wkt)

    def _populate_fault(self, fault):
        fault.strike_slip_rate_min = 3
        fault.dip_slip_rate_min = 4

        fault.strike_slip_rate_pref = 5
        fault.dip_slip_rate_pref = 12

        fault.strike_slip_rate_max = 7
        fault.dip_slip_rate_max = 24

        fault.u_sm_d_com = 3
        fault.low_d_com = 3
        fault.dip_com = 3
        fault.dip_dir_com = 3
        fault.net_slip_rate_com = 2

        fault.save()

        fault.update_autocomputed_fields()
        return models.Fault.objects.get(pk=fault.pk)

    def test_autocompute_fields_fault(self):
        self._join_traces()
        fault = self._populate_fault(self._join_fault_sections())

        self.assertAlmostEqual(5, fault.net_slip_rate_min)
        self.assertAlmostEqual(13, fault.net_slip_rate_pref)
        self.assertAlmostEqual(25, fault.net_slip_rate_max)
        self.assertEqual(2, fault.all_com)

    def test_create_faultsource(self):
        self._join_traces()
        fault = self._populate_fault(self._join_fault_sections())
        ret = utils.create_faultsource(fault)
        
        self.assertEqual('u_sm_d_min', ret)

        fault.u_sm_d_min = 10
        fault.u_sm_d_pref = 20
        fault.u_sm_d_max = 30

        fault.low_d_min = 100
        fault.low_d_pref = 200
        fault.low_d_max = 300
        
        fault.dip_min = 10
        fault.dip_max = 30
        fault.dip_pref = 20

        fault.dip_dir = 20
        fault.slip_type = 'reverse'
        fault.aseis_slip = 10

        fault.save()

        ret = utils.create_faultsource(fault)
        
        self.assertEqual(None, ret)
