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
Run this test with manage.py test observations
"""

from django.test import TestCase
from observations.models import FaultSource

class FaultSourceAutoComputedTest(TestCase):
    def setUp(self):
        self.fault_source, _ = FaultSource.objects.get_or_create(
            fault_name="test fault name", source_nm = "test source name",
            length_min=10., width_min=20., 
            length_max=30., width_max=30.,
            length_pref=20., width_pref=25.,
            low_d_min=1., low_d_pref=2., low_d_max=3.,
            u_sm_min=4., u_sm_pref=5., u_sm_max=6.,
            dip_min=7., dip_pref=8., dip_max=9.,
            geom="POLYGON ((174.6608247161522343 -41.3325857017038274 0.0, 174.6754120322273991 -41.3357535360505040 0.0, 174.6705494358949409 -41.3346977959105359 0.0, 174.6656869971967012 -41.3336418511235664 0.0, 174.6608247161522343 -41.3325857017038274 0.0))")
                                                       
    def test_update_width(self):
        self.fault_source._update_width()
        self.assertAlmostEqual(200, self.fault_source.width_min)
        self.assertAlmostEqual(500, self.fault_source.width_pref)
        self.assertAlmostEqual(900, self.fault_source.width_max)

    def tearDown(self):
        if self.fault_source:
            self.fault_source.delete()
