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


from openquakeplatform.faulted_earth import models


def create_faultsource(fault):
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
    aseis_slip aseis_com mov_min mov_max mov_pref
    contrib compiler created
    """.strip().split()

    optional_fields = ["contrib", "compiler", "created",
                       "length_min", "length_pref", "length_max",
                       "dip_slip_rate_min", "dip_slip_rate_max", "dip_slip_rate_pref",
                       "strike_slip_rate_min", "strike_slip_rate_pref", "strike_slip_rate_max",
                       "vertical_slip_rate_min", "vertical_slip_rate_pref", "vertical_slip_rate_max",
                       "net_slip_rate_com", "slip_type_com",
                       "dis_min", "dis_pref", "dis_max",
                       "mov_min", "mov_pref", "mov_max"]

    # the variable a holds the attributes needed to create the fault
    # source. First we copy the verbatim attributes (attributes that
    # will be copied from the fault). Then, the autocomputed fields
    a = dict()
    for attrib_name in verbatim_attributes:
        if (getattr(fault, attrib_name) is not None or
            attrib_name in optional_fields):
            a[attrib_name] = getattr(fault, attrib_name)
        elif not attrib_name in ["aseis_com", "slip_type_com"]:
            return attrib_name

    faultsource = models.FaultSource.objects.create(fault=fault, fault_source_name=fault.fault_name, **a)
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
    fault.update_autocomputed_fields()

