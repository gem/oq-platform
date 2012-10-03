# encoding: utf-8
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models

class Migration(SchemaMigration):

    def forwards(self, orm):
        
        # Deleting field 'FaultSection.slip_r_com'
        db.delete_column('observations_faultsection', 'slip_r_com')

        # Deleting field 'FaultSection.slip_r_pref'
        db.delete_column('observations_faultsection', 'slip_r_pref')

        # Deleting field 'FaultSection.slip_r_max'
        db.delete_column('observations_faultsection', 'slip_r_max')

        # Deleting field 'FaultSection.slip_r_min'
        db.delete_column('observations_faultsection', 'slip_r_min')

        # Adding field 'FaultSection.dip_slip_rate_min'
        db.add_column('observations_faultsection', 'dip_slip_rate_min', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSection.dip_slip_rate_pref'
        db.add_column('observations_faultsection', 'dip_slip_rate_pref', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSection.dip_slip_rate_max'
        db.add_column('observations_faultsection', 'dip_slip_rate_max', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSection.strike_slip_rate_min'
        db.add_column('observations_faultsection', 'strike_slip_rate_min', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSection.strike_slip_rate_max'
        db.add_column('observations_faultsection', 'strike_slip_rate_max', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSection.strike_slip_rate_pref'
        db.add_column('observations_faultsection', 'strike_slip_rate_pref', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSection.vertical_slip_rate_min'
        db.add_column('observations_faultsection', 'vertical_slip_rate_min', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSection.vertical_slip_rate_max'
        db.add_column('observations_faultsection', 'vertical_slip_rate_max', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSection.vertical_slip_rate_pref'
        db.add_column('observations_faultsection', 'vertical_slip_rate_pref', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSection.hv_ratio'
        db.add_column('observations_faultsection', 'hv_ratio', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSection.net_slip_rate_min'
        db.add_column('observations_faultsection', 'net_slip_rate_min', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSection.net_slip_rate_max'
        db.add_column('observations_faultsection', 'net_slip_rate_max', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSection.net_slip_rate_pref'
        db.add_column('observations_faultsection', 'net_slip_rate_pref', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSection.rake'
        db.add_column('observations_faultsection', 'rake', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSection.slip_rate_category'
        db.add_column('observations_faultsection', 'slip_rate_category', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True), keep_default=False)

        # Adding field 'FaultSection.dis_total'
        db.add_column('observations_faultsection', 'dis_total', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSection.dis_category'
        db.add_column('observations_faultsection', 'dis_category', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True), keep_default=False)

        # Adding field 'FaultSection.horizontal_displacement'
        db.add_column('observations_faultsection', 'horizontal_displacement', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSection.vertical_displacement'
        db.add_column('observations_faultsection', 'vertical_displacement', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSection.net_displacement'
        db.add_column('observations_faultsection', 'net_displacement', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSection.historical_earthquake'
        db.add_column('observations_faultsection', 'historical_earthquake', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSection.pre_historical_earthquake'
        db.add_column('observations_faultsection', 'pre_historical_earthquake', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSection.marker_age'
        db.add_column('observations_faultsection', 'marker_age', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSection.re_int_category'
        db.add_column('observations_faultsection', 're_int_category', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True), keep_default=False)

        # Adding field 'FaultSection.mov_category'
        db.add_column('observations_faultsection', 'mov_category', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True), keep_default=False)

        # Changing field 'FaultSection.slip_type'
        db.alter_column('observations_faultsection', 'slip_type', self.gf('django.db.models.fields.CharField')(max_length=255, null=True))

        # Deleting field 'FaultSource.slip_r_max'
        db.delete_column('observations_faultsource', 'slip_r_max')

        # Deleting field 'FaultSource.slip_r_com'
        db.delete_column('observations_faultsource', 'slip_r_com')

        # Deleting field 'FaultSource.slip_r_pref'
        db.delete_column('observations_faultsource', 'slip_r_pref')

        # Deleting field 'FaultSource.slip_r_min'
        db.delete_column('observations_faultsource', 'slip_r_min')

        # Adding field 'FaultSource.dip_slip_rate_min'
        db.add_column('observations_faultsource', 'dip_slip_rate_min', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSource.dip_slip_rate_pref'
        db.add_column('observations_faultsource', 'dip_slip_rate_pref', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSource.dip_slip_rate_max'
        db.add_column('observations_faultsource', 'dip_slip_rate_max', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSource.strike_slip_rate_min'
        db.add_column('observations_faultsource', 'strike_slip_rate_min', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSource.strike_slip_rate_max'
        db.add_column('observations_faultsource', 'strike_slip_rate_max', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSource.strike_slip_rate_pref'
        db.add_column('observations_faultsource', 'strike_slip_rate_pref', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSource.vertical_slip_rate_min'
        db.add_column('observations_faultsource', 'vertical_slip_rate_min', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSource.vertical_slip_rate_max'
        db.add_column('observations_faultsource', 'vertical_slip_rate_max', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSource.vertical_slip_rate_pref'
        db.add_column('observations_faultsource', 'vertical_slip_rate_pref', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSource.hv_ratio'
        db.add_column('observations_faultsource', 'hv_ratio', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSource.net_slip_rate_min'
        db.add_column('observations_faultsource', 'net_slip_rate_min', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSource.net_slip_rate_max'
        db.add_column('observations_faultsource', 'net_slip_rate_max', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSource.net_slip_rate_pref'
        db.add_column('observations_faultsource', 'net_slip_rate_pref', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSource.rake'
        db.add_column('observations_faultsource', 'rake', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSource.slip_rate_category'
        db.add_column('observations_faultsource', 'slip_rate_category', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True), keep_default=False)

        # Adding field 'FaultSource.dis_total'
        db.add_column('observations_faultsource', 'dis_total', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSource.dis_category'
        db.add_column('observations_faultsource', 'dis_category', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True), keep_default=False)

        # Adding field 'FaultSource.horizontal_displacement'
        db.add_column('observations_faultsource', 'horizontal_displacement', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSource.vertical_displacement'
        db.add_column('observations_faultsource', 'vertical_displacement', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSource.net_displacement'
        db.add_column('observations_faultsource', 'net_displacement', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSource.historical_earthquake'
        db.add_column('observations_faultsource', 'historical_earthquake', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSource.pre_historical_earthquake'
        db.add_column('observations_faultsource', 'pre_historical_earthquake', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSource.marker_age'
        db.add_column('observations_faultsource', 'marker_age', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSource.re_int_category'
        db.add_column('observations_faultsource', 're_int_category', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True), keep_default=False)

        # Adding field 'FaultSource.mov_category'
        db.add_column('observations_faultsource', 'mov_category', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True), keep_default=False)

        # Changing field 'FaultSource.slip_type'
        db.alter_column('observations_faultsource', 'slip_type', self.gf('django.db.models.fields.CharField')(max_length=255, null=True))

        # Adding field 'Trace.geomorphic_expression'
        db.add_column('observations_trace', 'geomorphic_expression', self.gf('django.db.models.fields.CharField')(default='No trace', max_length=255), keep_default=False)

        # Adding field 'SlipRate.slip_com'
        db.add_column('observations_sliprate', 'slip_com', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True), keep_default=False)

        # Adding field 'SlipRate.aseis_slip'
        db.add_column('observations_sliprate', 'aseis_slip', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'SlipRate.aseis_com'
        db.add_column('observations_sliprate', 'aseis_com', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True), keep_default=False)

        # Deleting field 'Fault.slip_r_com'
        db.delete_column('observations_fault', 'slip_r_com')

        # Deleting field 'Fault.slip_r_pref'
        db.delete_column('observations_fault', 'slip_r_pref')

        # Deleting field 'Fault.slip_r_max'
        db.delete_column('observations_fault', 'slip_r_max')

        # Deleting field 'Fault.slip_r_min'
        db.delete_column('observations_fault', 'slip_r_min')

        # Adding field 'Fault.dip_slip_rate_min'
        db.add_column('observations_fault', 'dip_slip_rate_min', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'Fault.dip_slip_rate_pref'
        db.add_column('observations_fault', 'dip_slip_rate_pref', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'Fault.dip_slip_rate_max'
        db.add_column('observations_fault', 'dip_slip_rate_max', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'Fault.strike_slip_rate_min'
        db.add_column('observations_fault', 'strike_slip_rate_min', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'Fault.strike_slip_rate_max'
        db.add_column('observations_fault', 'strike_slip_rate_max', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'Fault.strike_slip_rate_pref'
        db.add_column('observations_fault', 'strike_slip_rate_pref', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'Fault.vertical_slip_rate_min'
        db.add_column('observations_fault', 'vertical_slip_rate_min', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'Fault.vertical_slip_rate_max'
        db.add_column('observations_fault', 'vertical_slip_rate_max', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'Fault.vertical_slip_rate_pref'
        db.add_column('observations_fault', 'vertical_slip_rate_pref', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'Fault.hv_ratio'
        db.add_column('observations_fault', 'hv_ratio', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'Fault.net_slip_rate_min'
        db.add_column('observations_fault', 'net_slip_rate_min', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'Fault.net_slip_rate_max'
        db.add_column('observations_fault', 'net_slip_rate_max', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'Fault.net_slip_rate_pref'
        db.add_column('observations_fault', 'net_slip_rate_pref', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'Fault.rake'
        db.add_column('observations_fault', 'rake', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'Fault.slip_rate_category'
        db.add_column('observations_fault', 'slip_rate_category', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True), keep_default=False)

        # Adding field 'Fault.dis_total'
        db.add_column('observations_fault', 'dis_total', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'Fault.dis_category'
        db.add_column('observations_fault', 'dis_category', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True), keep_default=False)

        # Adding field 'Fault.horizontal_displacement'
        db.add_column('observations_fault', 'horizontal_displacement', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'Fault.vertical_displacement'
        db.add_column('observations_fault', 'vertical_displacement', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'Fault.net_displacement'
        db.add_column('observations_fault', 'net_displacement', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'Fault.historical_earthquake'
        db.add_column('observations_fault', 'historical_earthquake', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True), keep_default=False)

        # Adding field 'Fault.pre_historical_earthquake'
        db.add_column('observations_fault', 'pre_historical_earthquake', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True), keep_default=False)

        # Adding field 'Fault.marker_age'
        db.add_column('observations_fault', 'marker_age', self.gf('django.db.models.fields.IntegerField')(null=True, blank=True), keep_default=False)

        # Adding field 'Fault.re_int_category'
        db.add_column('observations_fault', 're_int_category', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True), keep_default=False)

        # Adding field 'Fault.mov_category'
        db.add_column('observations_fault', 'mov_category', self.gf('django.db.models.fields.CharField')(max_length=255, null=True, blank=True), keep_default=False)

        # Changing field 'Fault.slip_type'
        db.alter_column('observations_fault', 'slip_type', self.gf('django.db.models.fields.CharField')(max_length=255, null=True))


    def backwards(self, orm):
        
        # Adding field 'FaultSection.slip_r_com'
        db.add_column('observations_faultsection', 'slip_r_com', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSection.slip_r_pref'
        db.add_column('observations_faultsection', 'slip_r_pref', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSection.slip_r_max'
        db.add_column('observations_faultsection', 'slip_r_max', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSection.slip_r_min'
        db.add_column('observations_faultsection', 'slip_r_min', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Deleting field 'FaultSection.dip_slip_rate_min'
        db.delete_column('observations_faultsection', 'dip_slip_rate_min')

        # Deleting field 'FaultSection.dip_slip_rate_pref'
        db.delete_column('observations_faultsection', 'dip_slip_rate_pref')

        # Deleting field 'FaultSection.dip_slip_rate_max'
        db.delete_column('observations_faultsection', 'dip_slip_rate_max')

        # Deleting field 'FaultSection.strike_slip_rate_min'
        db.delete_column('observations_faultsection', 'strike_slip_rate_min')

        # Deleting field 'FaultSection.strike_slip_rate_max'
        db.delete_column('observations_faultsection', 'strike_slip_rate_max')

        # Deleting field 'FaultSection.strike_slip_rate_pref'
        db.delete_column('observations_faultsection', 'strike_slip_rate_pref')

        # Deleting field 'FaultSection.vertical_slip_rate_min'
        db.delete_column('observations_faultsection', 'vertical_slip_rate_min')

        # Deleting field 'FaultSection.vertical_slip_rate_max'
        db.delete_column('observations_faultsection', 'vertical_slip_rate_max')

        # Deleting field 'FaultSection.vertical_slip_rate_pref'
        db.delete_column('observations_faultsection', 'vertical_slip_rate_pref')

        # Deleting field 'FaultSection.hv_ratio'
        db.delete_column('observations_faultsection', 'hv_ratio')

        # Deleting field 'FaultSection.net_slip_rate_min'
        db.delete_column('observations_faultsection', 'net_slip_rate_min')

        # Deleting field 'FaultSection.net_slip_rate_max'
        db.delete_column('observations_faultsection', 'net_slip_rate_max')

        # Deleting field 'FaultSection.net_slip_rate_pref'
        db.delete_column('observations_faultsection', 'net_slip_rate_pref')

        # Deleting field 'FaultSection.rake'
        db.delete_column('observations_faultsection', 'rake')

        # Deleting field 'FaultSection.slip_rate_category'
        db.delete_column('observations_faultsection', 'slip_rate_category')

        # Deleting field 'FaultSection.dis_total'
        db.delete_column('observations_faultsection', 'dis_total')

        # Deleting field 'FaultSection.dis_category'
        db.delete_column('observations_faultsection', 'dis_category')

        # Deleting field 'FaultSection.horizontal_displacement'
        db.delete_column('observations_faultsection', 'horizontal_displacement')

        # Deleting field 'FaultSection.vertical_displacement'
        db.delete_column('observations_faultsection', 'vertical_displacement')

        # Deleting field 'FaultSection.net_displacement'
        db.delete_column('observations_faultsection', 'net_displacement')

        # Deleting field 'FaultSection.historical_earthquake'
        db.delete_column('observations_faultsection', 'historical_earthquake')

        # Deleting field 'FaultSection.pre_historical_earthquake'
        db.delete_column('observations_faultsection', 'pre_historical_earthquake')

        # Deleting field 'FaultSection.marker_age'
        db.delete_column('observations_faultsection', 'marker_age')

        # Deleting field 'FaultSection.re_int_category'
        db.delete_column('observations_faultsection', 're_int_category')

        # Deleting field 'FaultSection.mov_category'
        db.delete_column('observations_faultsection', 'mov_category')

        # Changing field 'FaultSection.slip_type'
        db.alter_column('observations_faultsection', 'slip_type', self.gf('django.db.models.fields.CharField')(max_length=30, null=True))

        # Adding field 'FaultSource.slip_r_max'
        db.add_column('observations_faultsource', 'slip_r_max', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSource.slip_r_com'
        db.add_column('observations_faultsource', 'slip_r_com', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSource.slip_r_pref'
        db.add_column('observations_faultsource', 'slip_r_pref', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'FaultSource.slip_r_min'
        db.add_column('observations_faultsource', 'slip_r_min', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Deleting field 'FaultSource.dip_slip_rate_min'
        db.delete_column('observations_faultsource', 'dip_slip_rate_min')

        # Deleting field 'FaultSource.dip_slip_rate_pref'
        db.delete_column('observations_faultsource', 'dip_slip_rate_pref')

        # Deleting field 'FaultSource.dip_slip_rate_max'
        db.delete_column('observations_faultsource', 'dip_slip_rate_max')

        # Deleting field 'FaultSource.strike_slip_rate_min'
        db.delete_column('observations_faultsource', 'strike_slip_rate_min')

        # Deleting field 'FaultSource.strike_slip_rate_max'
        db.delete_column('observations_faultsource', 'strike_slip_rate_max')

        # Deleting field 'FaultSource.strike_slip_rate_pref'
        db.delete_column('observations_faultsource', 'strike_slip_rate_pref')

        # Deleting field 'FaultSource.vertical_slip_rate_min'
        db.delete_column('observations_faultsource', 'vertical_slip_rate_min')

        # Deleting field 'FaultSource.vertical_slip_rate_max'
        db.delete_column('observations_faultsource', 'vertical_slip_rate_max')

        # Deleting field 'FaultSource.vertical_slip_rate_pref'
        db.delete_column('observations_faultsource', 'vertical_slip_rate_pref')

        # Deleting field 'FaultSource.hv_ratio'
        db.delete_column('observations_faultsource', 'hv_ratio')

        # Deleting field 'FaultSource.net_slip_rate_min'
        db.delete_column('observations_faultsource', 'net_slip_rate_min')

        # Deleting field 'FaultSource.net_slip_rate_max'
        db.delete_column('observations_faultsource', 'net_slip_rate_max')

        # Deleting field 'FaultSource.net_slip_rate_pref'
        db.delete_column('observations_faultsource', 'net_slip_rate_pref')

        # Deleting field 'FaultSource.rake'
        db.delete_column('observations_faultsource', 'rake')

        # Deleting field 'FaultSource.slip_rate_category'
        db.delete_column('observations_faultsource', 'slip_rate_category')

        # Deleting field 'FaultSource.dis_total'
        db.delete_column('observations_faultsource', 'dis_total')

        # Deleting field 'FaultSource.dis_category'
        db.delete_column('observations_faultsource', 'dis_category')

        # Deleting field 'FaultSource.horizontal_displacement'
        db.delete_column('observations_faultsource', 'horizontal_displacement')

        # Deleting field 'FaultSource.vertical_displacement'
        db.delete_column('observations_faultsource', 'vertical_displacement')

        # Deleting field 'FaultSource.net_displacement'
        db.delete_column('observations_faultsource', 'net_displacement')

        # Deleting field 'FaultSource.historical_earthquake'
        db.delete_column('observations_faultsource', 'historical_earthquake')

        # Deleting field 'FaultSource.pre_historical_earthquake'
        db.delete_column('observations_faultsource', 'pre_historical_earthquake')

        # Deleting field 'FaultSource.marker_age'
        db.delete_column('observations_faultsource', 'marker_age')

        # Deleting field 'FaultSource.re_int_category'
        db.delete_column('observations_faultsource', 're_int_category')

        # Deleting field 'FaultSource.mov_category'
        db.delete_column('observations_faultsource', 'mov_category')

        # Changing field 'FaultSource.slip_type'
        db.alter_column('observations_faultsource', 'slip_type', self.gf('django.db.models.fields.CharField')(max_length=30, null=True))

        # Deleting field 'Trace.geomorphic_expression'
        db.delete_column('observations_trace', 'geomorphic_expression')

        # Deleting field 'SlipRate.slip_com'
        db.delete_column('observations_sliprate', 'slip_com')

        # Deleting field 'SlipRate.aseis_slip'
        db.delete_column('observations_sliprate', 'aseis_slip')

        # Deleting field 'SlipRate.aseis_com'
        db.delete_column('observations_sliprate', 'aseis_com')

        # Adding field 'Fault.slip_r_com'
        db.add_column('observations_fault', 'slip_r_com', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'Fault.slip_r_pref'
        db.add_column('observations_fault', 'slip_r_pref', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'Fault.slip_r_max'
        db.add_column('observations_fault', 'slip_r_max', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Adding field 'Fault.slip_r_min'
        db.add_column('observations_fault', 'slip_r_min', self.gf('django.db.models.fields.FloatField')(null=True, blank=True), keep_default=False)

        # Deleting field 'Fault.dip_slip_rate_min'
        db.delete_column('observations_fault', 'dip_slip_rate_min')

        # Deleting field 'Fault.dip_slip_rate_pref'
        db.delete_column('observations_fault', 'dip_slip_rate_pref')

        # Deleting field 'Fault.dip_slip_rate_max'
        db.delete_column('observations_fault', 'dip_slip_rate_max')

        # Deleting field 'Fault.strike_slip_rate_min'
        db.delete_column('observations_fault', 'strike_slip_rate_min')

        # Deleting field 'Fault.strike_slip_rate_max'
        db.delete_column('observations_fault', 'strike_slip_rate_max')

        # Deleting field 'Fault.strike_slip_rate_pref'
        db.delete_column('observations_fault', 'strike_slip_rate_pref')

        # Deleting field 'Fault.vertical_slip_rate_min'
        db.delete_column('observations_fault', 'vertical_slip_rate_min')

        # Deleting field 'Fault.vertical_slip_rate_max'
        db.delete_column('observations_fault', 'vertical_slip_rate_max')

        # Deleting field 'Fault.vertical_slip_rate_pref'
        db.delete_column('observations_fault', 'vertical_slip_rate_pref')

        # Deleting field 'Fault.hv_ratio'
        db.delete_column('observations_fault', 'hv_ratio')

        # Deleting field 'Fault.net_slip_rate_min'
        db.delete_column('observations_fault', 'net_slip_rate_min')

        # Deleting field 'Fault.net_slip_rate_max'
        db.delete_column('observations_fault', 'net_slip_rate_max')

        # Deleting field 'Fault.net_slip_rate_pref'
        db.delete_column('observations_fault', 'net_slip_rate_pref')

        # Deleting field 'Fault.rake'
        db.delete_column('observations_fault', 'rake')

        # Deleting field 'Fault.slip_rate_category'
        db.delete_column('observations_fault', 'slip_rate_category')

        # Deleting field 'Fault.dis_total'
        db.delete_column('observations_fault', 'dis_total')

        # Deleting field 'Fault.dis_category'
        db.delete_column('observations_fault', 'dis_category')

        # Deleting field 'Fault.horizontal_displacement'
        db.delete_column('observations_fault', 'horizontal_displacement')

        # Deleting field 'Fault.vertical_displacement'
        db.delete_column('observations_fault', 'vertical_displacement')

        # Deleting field 'Fault.net_displacement'
        db.delete_column('observations_fault', 'net_displacement')

        # Deleting field 'Fault.historical_earthquake'
        db.delete_column('observations_fault', 'historical_earthquake')

        # Deleting field 'Fault.pre_historical_earthquake'
        db.delete_column('observations_fault', 'pre_historical_earthquake')

        # Deleting field 'Fault.marker_age'
        db.delete_column('observations_fault', 'marker_age')

        # Deleting field 'Fault.re_int_category'
        db.delete_column('observations_fault', 're_int_category')

        # Deleting field 'Fault.mov_category'
        db.delete_column('observations_fault', 'mov_category')

        # Changing field 'Fault.slip_type'
        db.alter_column('observations_fault', 'slip_type', self.gf('django.db.models.fields.CharField')(max_length=30, null=True))


    models = {
        'observations.displacement': {
            'Meta': {'object_name': 'Displacement'},
            'accuracy': ('django.db.models.fields.BigIntegerField', [], {}),
            'dis_category': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'dis_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dis_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dis_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dis_total': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'fault_section': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['observations.FaultSection']", 'null': 'True', 'blank': 'True'}),
            'geom': ('django.contrib.gis.db.models.fields.PointField', [], {}),
            'horizontal_displacement': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'net_displacement': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'notes': ('django.db.models.fields.TextField', [], {}),
            's_feature': ('django.db.models.fields.CharField', [], {'max_length': '30'}),
            'scale': ('django.db.models.fields.BigIntegerField', [], {}),
            'vertical_displacement': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'})
        },
        'observations.event': {
            'Meta': {'object_name': 'Event'},
            'accuracy': ('django.db.models.fields.BigIntegerField', [], {}),
            'fault_section': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['observations.FaultSection']", 'null': 'True', 'blank': 'True'}),
            'geom': ('django.contrib.gis.db.models.fields.PointField', [], {}),
            'historical_earthquake': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'marker_age': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'mov_category': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'mov_max': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'mov_min': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'mov_pref': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'notes': ('django.db.models.fields.TextField', [], {}),
            'pre_historical_earthquake': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            're_int_category': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            're_int_max': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            're_int_min': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            're_int_pref': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            's_feature': ('django.db.models.fields.CharField', [], {'max_length': '30'}),
            'scale': ('django.db.models.fields.BigIntegerField', [], {})
        },
        'observations.fault': {
            'Meta': {'object_name': 'Fault'},
            'all_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'aseis_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'aseis_slip': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'compiler': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '30', 'null': 'True', 'blank': 'True'}),
            'contrib': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '30', 'null': 'True', 'blank': 'True'}),
            'created': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'dip_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_dir': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_max': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_min': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_pref': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_slip_rate_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dip_slip_rate_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dip_slip_rate_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dis_category': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'dis_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dis_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dis_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dis_total': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'down_thro': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'episodic_behaviour': ('django.db.models.fields.CharField', [], {'max_length': '30', 'null': 'True', 'blank': 'True'}),
            'fault_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'null': 'True', 'blank': 'True'}),
            'historical_earthquake': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'horizontal_displacement': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'hv_ratio': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'length_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'length_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'length_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_com': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'marker_age': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'mov_category': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'mov_max': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'mov_min': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'mov_pref': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'net_displacement': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'net_slip_rate_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'net_slip_rate_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'net_slip_rate_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'pre_historical_earthquake': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'rake': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            're_int_category': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            're_int_max': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            're_int_min': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            're_int_pref': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'simple_geom': ('django.contrib.gis.db.models.fields.MultiLineStringField', [], {'null': 'True', 'blank': 'True'}),
            'slip_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'slip_rate_category': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'slip_type': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'strike': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'strike_slip_rate_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'strike_slip_rate_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'strike_slip_rate_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_com': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'vertical_displacement': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'vertical_slip_rate_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'vertical_slip_rate_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'vertical_slip_rate_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'})
        },
        'observations.faultgeometry': {
            'Meta': {'object_name': 'FaultGeometry'},
            'accuracy': ('django.db.models.fields.BigIntegerField', [], {}),
            'dip_dir': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'down_thro': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'fault_section': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['observations.FaultSection']", 'null': 'True', 'blank': 'True'}),
            'geom': ('django.contrib.gis.db.models.fields.PointField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'notes': ('django.db.models.fields.TextField', [], {}),
            's_feature': ('django.db.models.fields.CharField', [], {'max_length': '30'}),
            'scale': ('django.db.models.fields.BigIntegerField', [], {}),
            'strike': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'surface_dip': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'})
        },
        'observations.faultsection': {
            'Meta': {'object_name': 'FaultSection'},
            'all_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'aseis_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'aseis_slip': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'compiler': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '30', 'null': 'True', 'blank': 'True'}),
            'contrib': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '30', 'null': 'True', 'blank': 'True'}),
            'created': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'dip_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_dir': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_max': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_min': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_pref': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_slip_rate_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dip_slip_rate_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dip_slip_rate_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dis_category': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'dis_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dis_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dis_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dis_total': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'down_thro': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'episodic_behaviour': ('django.db.models.fields.CharField', [], {'max_length': '30', 'null': 'True', 'blank': 'True'}),
            'fault': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['observations.Fault']", 'symmetrical': 'False'}),
            'geom': ('django.contrib.gis.db.models.fields.MultiLineStringField', [], {'null': 'True', 'blank': 'True'}),
            'historical_earthquake': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'horizontal_displacement': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'hv_ratio': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'length_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'length_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'length_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_com': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'marker_age': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'mov_category': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'mov_max': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'mov_min': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'mov_pref': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'net_displacement': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'net_slip_rate_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'net_slip_rate_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'net_slip_rate_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'pre_historical_earthquake': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'rake': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            're_int_category': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            're_int_max': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            're_int_min': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            're_int_pref': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'sec_name': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'slip_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'slip_rate_category': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'slip_type': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'strike': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'strike_slip_rate_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'strike_slip_rate_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'strike_slip_rate_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_com': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'vertical_displacement': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'vertical_slip_rate_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'vertical_slip_rate_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'vertical_slip_rate_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'})
        },
        'observations.faultsource': {
            'Meta': {'object_name': 'FaultSource'},
            'all_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'area_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'area_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'area_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'aseis_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'aseis_slip': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'compiler': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '30', 'null': 'True', 'blank': 'True'}),
            'contrib': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '30', 'null': 'True', 'blank': 'True'}),
            'created': ('django.db.models.fields.DateField', [], {'null': 'True', 'blank': 'True'}),
            'dip_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_dir': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_max': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_min': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_pref': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'dip_slip_rate_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dip_slip_rate_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dip_slip_rate_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dis_category': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'dis_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dis_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dis_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dis_total': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'fault': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['observations.Fault']"}),
            'fault_name': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'geom': ('django.contrib.gis.db.models.fields.PolygonField', [], {'dim': '3'}),
            'historical_earthquake': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'horizontal_displacement': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'hv_ratio': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'length_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'length_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'length_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_com': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'low_d_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mag_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mag_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mag_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'marker_age': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'mom_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mom_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mom_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'mov_category': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'mov_max': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'mov_min': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'mov_pref': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'net_displacement': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'net_slip_rate_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'net_slip_rate_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'net_slip_rate_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'pre_historical_earthquake': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'rake': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            're_int_category': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            're_int_max': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            're_int_min': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            're_int_pref': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'slip_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'slip_rate_category': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'slip_type': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'source_nm': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'strike_slip_rate_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'strike_slip_rate_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'strike_slip_rate_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_com': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'u_sm_d_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'vertical_displacement': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'vertical_slip_rate_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'vertical_slip_rate_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'vertical_slip_rate_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'width_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'width_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'width_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'})
        },
        'observations.sliprate': {
            'Meta': {'object_name': 'SlipRate'},
            'accuracy': ('django.db.models.fields.BigIntegerField', [], {}),
            'aseis_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'aseis_slip': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dip_slip_rate_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dip_slip_rate_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'dip_slip_rate_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'fault_section': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['observations.FaultSection']", 'null': 'True', 'blank': 'True'}),
            'geom': ('django.contrib.gis.db.models.fields.PointField', [], {}),
            'hv_ratio': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'net_slip_rate_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'net_slip_rate_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'net_slip_rate_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'notes': ('django.db.models.fields.TextField', [], {}),
            'rake': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            's_feature': ('django.db.models.fields.CharField', [], {'max_length': '30'}),
            'scale': ('django.db.models.fields.BigIntegerField', [], {}),
            'slip_com': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'slip_rate_category': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'slip_type': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'strike_slip_rate_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'strike_slip_rate_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'strike_slip_rate_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'vertical_slip_rate_max': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'vertical_slip_rate_min': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'vertical_slip_rate_pref': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'})
        },
        'observations.trace': {
            'Meta': {'object_name': 'Trace'},
            'accuracy': ('django.db.models.fields.BigIntegerField', [], {}),
            'fault_section': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['observations.FaultSection']", 'symmetrical': 'False'}),
            'geom': ('django.contrib.gis.db.models.fields.MultiLineStringField', [], {}),
            'geomorphic_expression': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'loc_meth': ('django.db.models.fields.CharField', [], {'max_length': '30'}),
            'notes': ('django.db.models.fields.TextField', [], {}),
            'scale': ('django.db.models.fields.BigIntegerField', [], {})
        }
    }

    complete_apps = ['observations']
