# encoding: utf-8
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models

class Migration(SchemaMigration):
    
    def forwards(self, orm):
        # fault section view
        db.execute("""CREATE VIEW gem.fault_section_view AS
SELECT
    observations_faultsection.id, observations_faultsection.sec_name,
    observations_faultsection.length_min, observations_faultsection.length_max,
    observations_faultsection.length_pre, observations_faultsection.strike,
    observations_faultsection.episodi_is, observations_faultsection.episodi_ac,
    observations_faultsection.u_sm_d_min, observations_faultsection.u_sm_d_max,
    observations_faultsection.u_sm_d_pre, observations_faultsection.u_sm_d_com,
    observations_faultsection.low_d_min, observations_faultsection.low_d_max,
    observations_faultsection.low_d_pref, observations_faultsection.low_d_com,
    observations_faultsection.dip_min, observations_faultsection.dip_max,
    observations_faultsection.dip_pref, observations_faultsection.dip_com,
    observations_faultsection.dip_dir, observations_faultsection.down_thro,
    observations_faultsection.slip_typ, observations_faultsection.slip_com,
    observations_faultsection.slip_r_min, observations_faultsection.slip_r_max,
    observations_faultsection.slip_r_pre, observations_faultsection.slip_r_com,
    observations_faultsection.aseis_slip, observations_faultsection.aseis_com,
    observations_faultsection.dis_min, observations_faultsection.dis_max,
    observations_faultsection.dis_pref, observations_faultsection.re_int_min,
    observations_faultsection.re_int_max, observations_faultsection.re_int_pre,
    observations_faultsection.mov_min,
    observations_faultsection.mov_max, observations_faultsection.mov_pref,
    observations_faultsection.all_com, observations_faultsection.compiler,
    observations_faultsection.contrib, observations_faultsection.created,
    ST_Multi(ST_Union(observations_trace.geom)) as geom
FROM gem.observations_faultsection
JOIN gem.observations_trace_fault_section ON observations_faultsection.id = observations_trace_fault_section.faultsection_id
JOIN gem.observations_trace ON observations_trace_fault_section.trace_id = observations_trace.id
GROUP BY
    observations_faultsection.id, observations_faultsection.sec_name,
    observations_faultsection.length_min, observations_faultsection.length_max,
    observations_faultsection.length_pre, observations_faultsection.strike,
    observations_faultsection.episodi_is, observations_faultsection.episodi_ac,
    observations_faultsection.u_sm_d_min, observations_faultsection.u_sm_d_max,
    observations_faultsection.u_sm_d_pre, observations_faultsection.u_sm_d_com,
    observations_faultsection.low_d_min, observations_faultsection.low_d_max,
    observations_faultsection.low_d_pref, observations_faultsection.low_d_com,
    observations_faultsection.dip_min, observations_faultsection.dip_max,
    observations_faultsection.dip_pref, observations_faultsection.dip_com,
    observations_faultsection.dip_dir, observations_faultsection.down_thro,
    observations_faultsection.slip_typ, observations_faultsection.slip_com,
    observations_faultsection.slip_r_min, observations_faultsection.slip_r_max,
    observations_faultsection.slip_r_pre, observations_faultsection.slip_r_com,
    observations_faultsection.aseis_slip, observations_faultsection.aseis_com,
    observations_faultsection.dis_min, observations_faultsection.dis_max,
    observations_faultsection.dis_pref, observations_faultsection.re_int_min,
    observations_faultsection.re_int_max, observations_faultsection.re_int_pre,
    observations_faultsection.mov_min,
    observations_faultsection.mov_max, observations_faultsection.mov_pref,
    observations_faultsection.all_com, observations_faultsection.compiler,
    observations_faultsection.contrib, observations_faultsection.created;
""")

        # fault section view update rule
        db.execute("""
CREATE RULE
    fault_section_view_update
AS ON UPDATE TO
    gem.fault_section_view
DO INSTEAD
UPDATE
    gem.observations_faultsection
SET
    sec_name = NEW.sec_name,
    length_min = NEW.length_min, length_max = NEW.length_max,
    length_pre = NEW.length_pre, strike = NEW.strike,
    episodi_is = NEW.episodi_is, episodi_ac = NEW.episodi_ac,
    u_sm_d_min = NEW.u_sm_d_min, u_sm_d_max = NEW.u_sm_d_max,
    u_sm_d_pre = NEW.u_sm_d_pre, u_sm_d_com = NEW.u_sm_d_com,
    low_d_min = NEW.low_d_min, low_d_max = NEW.low_d_max,
    low_d_pref = NEW.low_d_pref, low_d_com = NEW.low_d_com,
    dip_min = NEW.dip_min, dip_max = NEW.dip_max,
    dip_pref = NEW.dip_pref, dip_com = NEW.dip_com,
    dip_dir = NEW.dip_dir, down_thro = NEW.down_thro,
    slip_typ = NEW.slip_typ, slip_com = NEW.slip_com,
    slip_r_min = NEW.slip_r_min, slip_r_max = NEW.slip_r_max,
    slip_r_pre = NEW.slip_r_pre, slip_r_com = NEW.slip_r_com,
    aseis_slip = NEW.aseis_slip, aseis_com = NEW.aseis_com,
    dis_min = NEW.dis_min, dis_max = NEW.dis_max,
    dis_pref = NEW.dis_pref, re_int_min = NEW.re_int_min,
    re_int_max = NEW.re_int_max, re_int_pre = NEW.re_int_pre,
    mov_min = NEW.mov_min,
    mov_max = NEW.mov_max, mov_pref = NEW.mov_pref,
    all_com = NEW.all_com, compiler = NEW.compiler,
    contrib = NEW.contrib, created = NEW.created
WHERE
    id = OLD.id;
""")

        # fault view
        db.execute("""CREATE VIEW gem.fault_view AS
                SELECT observations_fault.id,
        observations_fault.fault_name, observations_fault.length_min,
        observations_fault.length_max, observations_fault.length_pre,
        observations_fault.strike, observations_fault.episodi_is,
        observations_fault.episodi_ac, observations_fault.u_sm_d_min,
        observations_fault.u_sm_d_max, observations_fault.u_sm_d_pre,
        observations_fault.u_sm_d_com, observations_fault.low_d_min,
        observations_fault.low_d_max, observations_fault.low_d_pref,
        observations_fault.low_d_com, observations_fault.dip_min,
        observations_fault.dip_max, observations_fault.dip_pref,
        observations_fault.dip_com, observations_fault.dip_dir,
        observations_fault.down_thro, observations_fault.slip_typ,
        observations_fault.slip_com, observations_fault.slip_r_min,
        observations_fault.slip_r_max, observations_fault.slip_r_pre,
        observations_fault.slip_r_com, observations_fault.aseis_slip,
        observations_fault.aseis_com, observations_fault.dis_min,
        observations_fault.dis_max, observations_fault.dis_pref,
        observations_fault.re_int_min, observations_fault.re_int_max,
        observations_fault.re_int_pre, observations_fault.mov_min,
        observations_fault.mov_max, observations_fault.mov_pref,
        observations_fault.all_com, observations_fault.compiler,
        observations_fault.contrib, observations_fault.created,
        St_Multi(St_Union(observations_trace.geom)) as geom
FROM gem.observations_fault
JOIN gem.observations_faultsection_fault ON
observations_fault.id = observations_faultsection_fault.fault_id
JOIN gem.observations_faultsection ON observations_faultsection.id =
observations_faultsection_fault.faultsection_id
JOIN gem.observations_trace_fault_section ON gem.observations_faultsection.id = observations_trace_fault_section.faultsection_id
JOIN gem.observations_trace ON gem.observations_trace.id = observations_trace_fault_section.trace_id
GROUP BY
        observations_fault.id,
        observations_fault.fault_name, observations_fault.length_min,
        observations_fault.length_max, observations_fault.length_pre,
        observations_fault.strike, observations_fault.episodi_is,
        observations_fault.episodi_ac, observations_fault.u_sm_d_min,
        observations_fault.u_sm_d_max, observations_fault.u_sm_d_pre,
        observations_fault.u_sm_d_com, observations_fault.low_d_min,
        observations_fault.low_d_max, observations_fault.low_d_pref,
        observations_fault.low_d_com, observations_fault.dip_min,
        observations_fault.dip_max, observations_fault.dip_pref,
        observations_fault.dip_com, observations_fault.dip_dir,
        observations_fault.down_thro, observations_fault.slip_typ,
        observations_fault.slip_com, observations_fault.slip_r_min,
        observations_fault.slip_r_max, observations_fault.slip_r_pre,
        observations_fault.slip_r_com, observations_fault.aseis_slip,
        observations_fault.aseis_com, observations_fault.dis_min,
        observations_fault.dis_max, observations_fault.dis_pref,
        observations_fault.re_int_min, observations_fault.re_int_max,
        observations_fault.re_int_pre, observations_fault.mov_min,
        observations_fault.mov_max, observations_fault.mov_pref,
        observations_fault.all_com, observations_fault.compiler,
        observations_fault.contrib, observations_fault.created""")

        # fault view update rule
        db.execute("""
CREATE RULE
    fault_view_update
AS ON UPDATE TO
    gem.fault_view
DO INSTEAD
UPDATE
    gem.observations_fault
SET
    fault_name = NEW.fault_name, length_min = NEW.length_min,
    length_max = NEW.length_max, length_pre = NEW.length_pre,
    strike = NEW.strike, episodi_is = NEW.episodi_is,
    episodi_ac = NEW.episodi_ac, u_sm_d_min = NEW.u_sm_d_min,
    u_sm_d_max = NEW.u_sm_d_max, u_sm_d_pre = NEW.u_sm_d_pre,
    u_sm_d_com = NEW.u_sm_d_com, low_d_min = NEW.low_d_min,
    low_d_max = NEW.low_d_max, low_d_pref = NEW.low_d_pref,
    low_d_com = NEW.low_d_com, dip_min = NEW.dip_min,
    dip_max = NEW.dip_max, dip_pref = NEW.dip_pref,
    dip_com = NEW.dip_com, dip_dir = NEW.dip_dir,
    down_thro = NEW.down_thro, slip_typ = NEW.slip_typ,
    slip_com = NEW.slip_com, slip_r_min = NEW.slip_r_min,
    slip_r_max = NEW.slip_r_max, slip_r_pre = NEW.slip_r_pre,
    slip_r_com = NEW.slip_r_com, aseis_slip = NEW.aseis_slip,
    aseis_com = NEW.aseis_com, dis_min = NEW.dis_min,
    dis_max = NEW.dis_max, dis_pref = NEW.dis_pref,
    re_int_min = NEW.re_int_min, re_int_max = NEW.re_int_max,
    re_int_pre = NEW.re_int_pre, mov_min = NEW.mov_min,
    mov_max = NEW.mov_max, mov_pref = NEW.mov_pref,
    all_com = NEW.all_com, compiler = NEW.compiler,
    contrib = NEW.contrib, created = NEW.created
WHERE
    id = OLD.id;
        """)

        # simple geometry view

        db.execute("""CREATE VIEW gem.simple_geom_view AS
                 SELECT f.id, f.fault_name, f.simple_geom
                 FROM gem.observations_fault f""")

        # "publish" the geometries into public.geometry_columns
        db.execute("""INSERT INTO public.geometry_columns VALUES ('', 'gem',
                'fault_section_view', 'geom', '2', 4326, 'MULTILINESTRING')""")
        
        db.execute("""INSERT INTO public.geometry_columns VALUES ('', 'gem',
        'fault_view', 'geom', 2, 4326, 'MULTILINESTRING')""")

        db.execute("""INSERT INTO public.geometry_columns VALUES ('', 'gem',
                'simple_geom_view', 'simple_geom', '2', 4326,
                'MULTILINESTRING')""")

    
    def backwards(self, orm):
        db.execute("DROP VIEW gem.fault_section_view")
        db.execute("DROP VIEW gem.fault_view")
        db.execute("DROP VIEW gem.simple_geom_view")
        db.execute("delete from public.geometry_columns where f_table_schema='gem' and f_table_name in ('fault_section_view', 'fault_view', 'simple_geom_view')")
    
    models = {
        'observations.fault': {
            'Meta': {'object_name': 'Fault'},
            'all_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'aseis_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'aseis_slip': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'compiler': ('django.db.models.fields.CharField', [], {'max_length': '30', 'null': 'True', 'blank': 'True'}),
            'contrib': ('django.db.models.fields.CharField', [], {'max_length': '30', 'null': 'True', 'blank': 'True'}),
            'created': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'dip_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_dir': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_max': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_min': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_pref': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dis_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dis_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dis_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'down_thro': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'episodi_ac': ('django.db.models.fields.CharField', [], {'max_length': '30', 'null': 'True', 'blank': 'True'}),
            'episodi_is': ('django.db.models.fields.CharField', [], {'max_length': '30', 'null': 'True', 'blank': 'True'}),
            'fault_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'length_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'length_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'length_pre': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_com': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mov_max': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'mov_min': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'mov_pref': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            're_int_max': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            're_int_min': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            're_int_pre': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'simple_geom': ('django.contrib.gis.db.models.fields.MultiLineStringField', [], {'null': 'True', 'blank': 'True'}),
            'slip_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'slip_r_com': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'slip_r_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'slip_r_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'slip_r_pre': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'slip_typ': ('django.db.models.fields.CharField', [], {'max_length': '30'}),
            'strike': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_com': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_pre': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'})
        },
        'observations.faultsection': {
            'Meta': {'object_name': 'FaultSection'},
            'all_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'aseis_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'aseis_slip': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'compiler': ('django.db.models.fields.CharField', [], {'max_length': '30', 'null': 'True', 'blank': 'True'}),
            'contrib': ('django.db.models.fields.CharField', [], {'max_length': '30', 'null': 'True', 'blank': 'True'}),
            'created': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'dip_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_dir': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_max': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_min': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_pref': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dis_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dis_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dis_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'down_thro': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'episodi_ac': ('django.db.models.fields.CharField', [], {'max_length': '30', 'null': 'True', 'blank': 'True'}),
            'episodi_is': ('django.db.models.fields.CharField', [], {'max_length': '30', 'null': 'True', 'blank': 'True'}),
            'fault': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['observations.Fault']", 'symmetrical': 'False'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'length_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'length_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'length_pre': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_com': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mov_max': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'mov_min': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'mov_pref': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            're_int_max': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            're_int_min': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            're_int_pre': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'sec_name': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'slip_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'slip_r_com': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'slip_r_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'slip_r_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'slip_r_pre': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'slip_typ': ('django.db.models.fields.CharField', [], {'max_length': '30'}),
            'strike': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_com': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_pre': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'})
        },
        'observations.faultsource': {
            'Meta': {'object_name': 'FaultSource'},
            'all_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'area_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'area_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'area_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'aseis_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'aseis_slip': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'compiler': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '30'}),
            'contrib': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '30'}),
            'created': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'dip_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_dir': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_max': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_min': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_pref': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dis_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dis_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dis_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'fault': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['observations.Fault']"}),
            'fault_name': ('django.db.models.fields.CharField', [], {'max_length': '30'}),
            'geom': ('django.contrib.gis.db.models.fields.PolygonField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'length_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'length_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'length_pre': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_com': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mag_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mag_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mag_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mom_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mom_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mom_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mov_max': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'mov_min': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'mov_pref': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            're_int_max': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            're_int_min': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            're_int_pre': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'slip_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'slip_r_com': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'slip_r_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'slip_r_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'slip_r_pre': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'slip_typ': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '30'}),
            'source_nm': ('django.db.models.fields.CharField', [], {'max_length': '30'}),
            'u_sm_d_com': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_pre': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'width_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'width_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'width_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'})
        },
        'observations.siteobservation': {
            'Meta': {'object_name': 'SiteObservation'},
            'accuracy': ('django.db.models.fields.BigIntegerField', [], {}),
            'fault_section': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['observations.FaultSection']", 'null': 'True', 'blank': 'True'}),
            'geom': ('django.contrib.gis.db.models.fields.PointField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'notes': ('django.db.models.fields.TextField', [], {}),
            's_feature': ('django.db.models.fields.CharField', [], {'max_length': '30'}),
            'scale': ('django.db.models.fields.BigIntegerField', [], {})
        },
        'observations.trace': {
            'Meta': {'object_name': 'Trace'},
            'accuracy': ('django.db.models.fields.BigIntegerField', [], {}),
            'fault_section': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['observations.FaultSection']", 'symmetrical': 'False'}),
            'geom': ('django.contrib.gis.db.models.fields.MultiLineStringField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'loc_meth': ('django.db.models.fields.CharField', [], {'max_length': '30'}),
            'notes': ('django.db.models.fields.TextField', [], {}),
            'scale': ('django.db.models.fields.BigIntegerField', [], {})
        }
    }
    
    complete_apps = ['observations']
