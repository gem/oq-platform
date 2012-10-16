# coding: utf-8
#
# Copyright (c) 2010-2011, GEM Foundation.
#
# OpenQuake is free software: you can redistribute it and/or modify
# it under the terms of the GNU Lesser General Public License version 3
# only, as published by the Free Software Foundation.
#
# OpenQuake is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Lesser General Public License version 3 for more details
# (a copy is included in the LICENSE file that accompanied this code).
#
# You should have received a copy of the GNU Lesser General Public License
# version 3 along with OpenQuake.  If not, see
# <http://www.gnu.org/licenses/lgpl-3.0.txt> for a copy of the LGPLv3 License
#

import math

import jpype
import shapely
from django.contrib.gis.geos.collections import Polygon
from django.conf import settings
import logging 
from geonode.observations import models
log = logging.getLogger("django.feeds.utils")


def fault_poly_from_mls(fault_source_geom, dip,
                        upp_seis_depth, low_seis_depth):
    """Given a fault source geometry (as a MultiLineString), dip, upper
    seismogenic depth, lower seismogenic depth, and grid spacing (in km),
    create a 3D polygon to represent the fault.

    :param fault_source_geom:
        :class:`django.contrib.gis.geos.collections.MultiLineString`
    :param float dip:
        Angle of dip, from 0.0 to 90.0 degrees (inclusive)
    :param float upp_seis_depth:
        Upper seismogenic depth
    :param float low_seis_depth:
        Lower seismogenic depth

    :returns:
        3D polygon representing the complete fault geometry
    :rtype:
        :class:`django.contrib.gis.geos.collections.Polygon`
    """
    # I take no responsibility for writing this

    #: Value is in kilometers
    GRID_SPACING = 1.0

    import logging
    log = logging.getLogger("django.feeds.utils")

    if not jpype.isJVMStarted():
        # start jvm once
        log.debug('starting jvm')
        jpype.startJVM(jpype.getDefaultJVMPath(),
                       "-Djava.ext.dirs=%s" % settings.GEOCLUDGE_JAR_PATH)

    if not jpype.isThreadAttachedToJVM():
        jpype.attachThreadToJVM()

    FT = jpype.JClass('org.opensha.sha.faultSurface.FaultTrace')
    LOC = jpype.JClass('org.opensha.commons.geo.Location')
    LOC_LIST = jpype.JClass('org.opensha.commons.geo.LocationList')
    SGS = jpype.JClass('org.opensha.sha.faultSurface.StirlingGriddedSurface')

    coords = fault_source_geom.coords

    fault_trace = FT('')

    for line_str in coords:
        for lon, lat in line_str:
            # warning: the ordering of lat/lon is switched here
            # be careful
            loc = LOC(lat, lon)
            fault_trace.add(loc)


    surface = SGS(fault_trace, float(dip),
                  float(upp_seis_depth), float(low_seis_depth),
                  GRID_SPACING)

    # now we make a polygon with the perimeter coords:
    poly_coords = []
    for per_loc in surface.getSurfacePerimeterLocsList():
        lon = per_loc.getLongitude()
        lat = per_loc.getLatitude()
        depth = per_loc.getDepth()

        poly_coords.append((lon, lat, depth))

    return Polygon(poly_coords)


def create_faultsource(fault):
    polygon = fault_poly_from_mls(
        fault.simple_geom, fault.dip_pref,
        fault.u_sm_d_pref, fault.low_d_pref
    )

    # these attributes are copied from the corresponding fault
    verbatim_attributes = """
    length_min length_max length_pref
    u_sm_d_min u_sm_d_max u_sm_d_pref u_sm_d_com
    low_d_min low_d_max low_d_pref low_d_com
    dip_min dip_max dip_pref dip_com dip_dir
    slip_type net_slip_rate_com
    dip_slip_rate_min dip_slip_rate_max dip_slip_rate_pref
    strike_slip_rate_min strike_slip_rate_max strike_slip_rate_pref
    vertical_slip_rate_min vertical_slip_rate_max vertical_slip_rate_pref
    net_slip_rate_min net_slip_rate_max net_slip_rate_pref
    aseis_slip aseis_com mov_min mov_max mov_pref
    fault_name contrib compiler created
    """.strip().split()

    # the variable a holds the attributes needed to create the fault
    # source. First we copy the verbatim attributes (attributes that
    # will be copied from the fault). Then, the autocomputed fields
    a = dict()
    for attrib_name in verbatim_attributes:
        if getattr(fault, attrib_name):
            a[attrib_name] = getattr(fault, attrib_name)
        else:
            if not attrib_name in ["aseis_com", "slip_type_com"]:
                return attrib_name
    
    faultsource = models.FaultSource.objects.create(
        fault=fault, source_nm="Fault created by from %s" % fault.fault_name, geom=polygon, **a)
    faultsource.update_autocomputed_fields()
    
    return None


def join_traces(traces, fault_section):
    for trace in traces:
        trace.fault_section.add(fault_section)
    fault_section.update_autocomputed_fields()

def join_fault_sections(fault_sections, fault_name):
    fault = models.Fault.objects.create(fault_name=fault_name)

    for fault_section in fault_sections:
        fault_section.fault.add(fault)
    fault.save()

