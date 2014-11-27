from django.contrib.gis.db import models

# WARNING: this model is unmanaged, custom SQL is used to create the table (look inside sql/*.sql)

# id|geom|accuracy|neotectonic_section_id|fault_summary_id|average_dip|is_active|is_episodic|surface_dip|name|aseismic_slip_factor|compiler_id|completion_id|contributor_id|dip_dir|disp|downthrown_side_id|last_movement|length|lower_sm_depth|recurrence_interval|net_slip_rate|slip_type_id|strike|strike_slip_rate|upper_sm_depth|vert_slip_rate|created_date|modified_date|fault_summary_id|aseismic_slip_factor|compiler_id|completion_id|contributor_id|average_dip|dip_dir|displacement|downthrown_side_id|is_active|is_episodic|is_section_summary|last_movement|length|lower_sm_depth|name|recurrence_interval|strike_slip_rate|slip_type_id|strike|upper_sm_depth|created_date|modified_date|net_slip_rate|vert_slip_rate|slip_type


class FaultTrace(models.Model):
    src_id = models.IntegerField(null=False, blank=False, default=-1)
    the_geom = models.LineStringField(srid=4326, dim=2, null=True, blank=True)
    accuracy = models.IntegerField(null=True, blank=True, default=-1)
    # gem.fearth_neotectonic_section
    ns_neotectonic_section_id = models.IntegerField(null=False, blank=False)
    ns_fault_summary_id = models.IntegerField(null=True, blank=True)
    ns_average_dip = models.CharField(max_length=64, default='', null=True, blank=True)
    ns_is_active = models.NullBooleanField()
    ns_is_episodic = models.NullBooleanField()
    ns_surface_dip = models.CharField(max_length=64, default='', null=True, blank=True)
    ns_name = models.CharField(max_length=96, default='', null=True, blank=True)
    ns_aseismic_slip_factor = models.DecimalField(max_digits=3, decimal_places=2, null=False, blank=False)
    ns_compiler_id = models.IntegerField(null=True, blank=True)
    ns_completion_id = models.IntegerField(null=True, blank=True)
    ns_contributor_id = models.IntegerField(null=True, blank=True)
    ns_dip_dir = models.IntegerField(null=True, blank=True)
    ns_disp = models.CharField(max_length=64, default='', null=True, blank=True)
    ns_downthrown_side_id = models.IntegerField(null=True, blank=True)
    ns_last_movement = models.CharField(max_length=64, default='', null=True, blank=True)
    ns_length = models.CharField(max_length=64, default='', null=True, blank=True)
    ns_lower_sm_depth = models.CharField(max_length=64, default='', null=True, blank=True)
    ns_recurrence_interval = models.CharField(max_length=64, default='', null=True, blank=True)
    ns_net_slip_rate = models.CharField(max_length=64, default='', null=True, blank=True)
    ns_slip_type_id = models.IntegerField(null=True, blank=True)
    ns_strike = models.IntegerField(null=True, blank=True)
    ns_strike_slip_rate = models.CharField(max_length=64, default='', null=True, blank=True)
    ns_upper_sm_depth = models.CharField(max_length=64, default='', null=True, blank=True)
    ns_vert_slip_rate = models.CharField(max_length=64, default='', null=True, blank=True)
    ns_created_date = models.DateTimeField(null=True, blank=True)
    ns_modified_date = models.DateTimeField(null=True, blank=True)
    # gem.fearth_fault_summary
    fs_fault_summary_id = models.IntegerField(null=False, blank=False)
    fs_aseismic_slip_factor = models.DecimalField(max_digits=3, decimal_places=2, null=False, blank=False)
    fs_compiler_id = models.IntegerField(null=True, blank=True)
    fs_completion_id = models.IntegerField(null=True, blank=True)
    fs_contributor_id = models.IntegerField(null=True, blank=True)
    fs_average_dip = models.CharField(max_length=64, default='', null=True, blank=True)
    fs_dip_dir = models.IntegerField(null=True, blank=True)
    fs_displacement = models.CharField(max_length=64, default='', null=True, blank=True)
    fs_downthrown_side_id = models.IntegerField(null=True, blank=True)
    fs_is_active = models.NullBooleanField()
    fs_is_episodic = models.NullBooleanField()
    fs_is_section_summary = models.NullBooleanField()
    fs_last_movement = models.CharField(max_length=64, default='', null=True, blank=True)
    fs_length = models.CharField(max_length=64, default='', null=True, blank=True)
    fs_lower_sm_depth = models.CharField(max_length=64, default='', null=True, blank=True)
    fs_name = models.CharField(max_length=96, default='', null=True, blank=True)
    fs_recurrence_interval = models.CharField(max_length=64, default='', null=True, blank=True)
    fs_strike_slip_rate = models.CharField(max_length=64, default='', null=True, blank=True)
    fs_slip_type_id = models.IntegerField(null=True, blank=True)
    fs_strike = models.IntegerField(null=True, blank=True)
    fs_upper_sm_depth = models.CharField(max_length=64, default='', null=True, blank=True)
    fs_created_date = models.DateTimeField(null=True, blank=True)
    fs_modified_date = models.DateTimeField(null=True, blank=True)
    fs_net_slip_rate = models.CharField(max_length=64, default='', null=True, blank=True)
    fs_vert_slip_rate = models.CharField(max_length=64, default='', null=True, blank=True)

    ns_net_slip_rate_comp = models.DecimalField(max_digits=10, decimal_places=4, null=True, blank=True)

    slip_type = models.CharField(max_length=64, default='', null=True, blank=True)

    class Meta:
        managed = False

    def __unicode__(self):
        return "%s" % (self.src_id)


class FaultSource(models.Model):
    src_id = models.IntegerField(null=False, blank=False, default=-1)
    fault_summary_id = models.IntegerField(null=True, blank=True)
    aseismic_slip_factor = models.CharField(max_length=64, default='', null=False, blank=False)
    compiler_id = models.IntegerField(null=False, blank=False)
    completion_id = models.IntegerField(null=True, blank=True)
    contributor_id = models.IntegerField(null=False, blank=False)
    dip = models.CharField(max_length=64, default='', null=False, blank=False)
    dip_dir = models.IntegerField(null=False, blank=False)
    last_movement = models.CharField(max_length=64, default='', null=True, blank=True)
    length = models.CharField(max_length=64, default='', null=True, blank=True)
    lower_sm_depth = models.CharField(max_length=64, default='', null=True, blank=True)
    magnitude = models.CharField(max_length=64, default='', null=False, blank=False)
    name = models.CharField(max_length=96, default='', null=False, blank=False)
    recurrence_interval = models.CharField(max_length=64, default='', null=True, blank=True)
    slip_rate = models.CharField(max_length=64, default='', null=False, blank=False)
    slip_type_id = models.IntegerField(null=False, blank=False)
    upper_sm_depth = models.CharField(max_length=64, default='', null=True, blank=True)
    created_date = models.DateTimeField(null=True, blank=True)
    modified_date = models.DateTimeField(null=True, blank=True)
    tectonic_region = models.CharField(max_length=96, default='', null=False, blank=False)
    area = models.CharField(max_length=64, default='', null=True, blank=True)
    width = models.CharField(max_length=64, default='', null=True, blank=True)
    the_geom = models.MultiPolygonField(srid=4326, dim=2, null=True, blank=True)

    compiler_name = models.CharField(max_length=64, default='', null=False, blank=False)
    contributor_name = models.CharField(max_length=64, default='', null=False, blank=False)

    pref_magnitude = models.FloatField(null=True, blank=True)
    pref_dip = models.IntegerField(null=True, blank=True)
    pref_slip_rate = models.FloatField(null=True, blank=True)
    pref_length = models.FloatField(null=True, blank=True)
    pref_width = models.FloatField(null=True, blank=True)
    pref_area = models.FloatField(null=True, blank=True)
    pref_lsd = models.FloatField(null=True, blank=True)
    pref_usd = models.FloatField(null=True, blank=True)
    pref_recint = models.IntegerField(null=True, blank=True)
    slip_type = models.CharField(max_length=64, default='', null=True, blank=True)

    class Meta:
        managed = False

    def __unicode__(self):
        return "%s" % (self.src_id)
