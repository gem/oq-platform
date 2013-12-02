__author__ = 'Simon Ruffle, CAR'

from django.db import models

# Static lookup tables
from econd.static_lookup_models import *

from econd.study_models import *

###############
# Event level Models
###############


class Event(models.Model):
      id = models.AutoField(primary_key=True, null=False, help_text='Primary Key: Internal database id for the event', unique=True, blank=True, )
      usgsshakemapid = models.CharField(max_length=50, null=True, blank=True, verbose_name='Event ID', help_text='USGS ID number for the earthquake event, eg 197005312023', default='undefined', unique=True, )
      name = models.CharField(max_length=50, null=False, default='untitled', verbose_name='Event name', help_text='The name of the event', unique=True, )
      country = models.CharField(max_length=50, null=True, blank=True, verbose_name='Country', help_text='The country or countries affected by the event. Separate multiple countries with commas.', )
      region = models.CharField(max_length=50, null=True, blank=True, verbose_name='Region in the country', help_text='The region or regions inside the country or countries affected by the event. Separate multiple countries with commas.', )
      regioncode = models.ForeignKey(Lookupregion, db_column='regioncode', related_name='+', max_length=50, null=False, default='0', verbose_name='World region', help_text='The region of the world where the event occurred', blank=True, )
      location = models.CharField(max_length=50, null=True, blank=True, verbose_name='Epicentral coordinates (long/lat)', help_text='The epicentral coordinates in WKT GIS format eg POINT (long lat)', )
      partner = models.CharField(max_length=255, null=True, blank=True, verbose_name='GEMECD contributing partner', help_text='The name of the GEMECD partner who developed this event overview', )
      eventnarrative = models.TextField(null=True, blank=True, verbose_name='Event narrative', help_text='Descriptive text.', )
      eventdate = models.DateTimeField(null=True, blank=True, verbose_name='Date of occurrence (UTC)', help_text='The date of the event in UTC, eg 1970-05-31', )
      eventtime = models.DateTimeField(null=True, blank=True, verbose_name='Time of occurrence (UTC)', help_text='The time of the event in UTC, eg 20:23', )
      eventdatelocal = models.DateTimeField(null=True, blank=True, verbose_name='Date of occurrence (local)', help_text='The date of the event in local time, eg 1970-05-31', )
      eventtimelocal = models.DateTimeField(null=True, blank=True, verbose_name='Time of occurrence (local)', help_text='The time of the event in local time, eg 15:23', )
      yearint = models.IntegerField(null=True, default='0', verbose_name='Event year', help_text='Year as a number for sorting purposes', blank=True, )
      dayofweeklocal = models.CharField(max_length=10, null=True, blank=True, verbose_name='Day of the week (local)', help_text='The day of the week (local) eg Sunday', )
      wasaholiday = models.ForeignKey(Lookupyesno, db_column='wasaholiday', related_name='+', null=False, default='0', verbose_name='was it a holiday', help_text='was it a holiday', max_length=10, blank=True, )
      enddate = models.DateTimeField(null=True, blank=True, verbose_name='End date of event (optional)', help_text='The date that the event ended, for events that have a duration over days, eg 1970-05-31', )
      magnitude = models.FloatField(null=True, blank=True, verbose_name='Magnitude', help_text='Magnitude', )
      magnitudeunitcode = models.ForeignKey(Lookupmagnitudeunit, db_column='magnitudeunitcode', related_name='+', max_length=10, null=True, default='0', verbose_name='Magnitude units', help_text='The units of the magnitude', blank=True, )
      depth = models.FloatField(verbose_name='Focal depth', help_text='The focal depth of the event, km', null=True, blank=True, )
      seismologicaldata_s = models.CharField(max_length=255, null=True, blank=True, verbose_name='Seismological data: source', help_text='The source of the event-level seismological data', )
      seismologicaldata_c = models.TextField(null=True, blank=True, verbose_name='Seismological data: comment', help_text='A comment on the event-level seismological data', )
      overallimpact = models.TextField(null=True, blank=True, verbose_name='Overall impact', help_text='Overall socio economic impact (all hazards)', )
      peopleinjured = models.IntegerField(verbose_name='People injured', help_text='Total people injured in event (all hazards)', null=True, blank=True, )
      peopleinjured_s = models.CharField(max_length=255, null=True, blank=True, verbose_name='People injured: source', help_text='The source of the data', )
      peopleinjured_c = models.TextField(null=True, blank=True, verbose_name='People injured: comment', help_text='A comment on the data', )
      peopleinjured_q = models.ForeignKey(Lookupstatus, db_column='peopleinjured_q', related_name='+', max_length=10, null=False, default='0', verbose_name='People injured: status', help_text='The status of the data', blank=True, blank=True, )
      peopleseriouslyinjured = models.IntegerField(verbose_name='People seriously injured', help_text='Total people seriously injured and/or hospitalised', null=True, blank=True, )
      peopleseriouslyinjured_s = models.CharField(max_length=255, null=True, blank=True, verbose_name='People seriously injured: source', help_text='The source of the data', )
      peopleseriouslyinjured_c = models.TextField(null=True, blank=True, verbose_name='People seriously injured: comment', help_text='A comment on the data', )
      peopleseriouslyinjured_q = models.ForeignKey(Lookupstatus, db_column='peopleseriouslyinjured_q', related_name='+', max_length=10, null=False, default='0', verbose_name='People seriously injured: status', help_text='The status of the data', blank=True, blank=True, )
      peoplemissing = models.IntegerField(verbose_name='People missing', help_text='Total people missing in event (all hazards)', null=True, blank=True, )
      peoplemissing_s = models.CharField(max_length=255, null=True, blank=True, verbose_name='People missing: source', help_text='The source of the data', )
      peoplemissing_c = models.TextField(null=True, blank=True, verbose_name='People missing: comment', help_text='A comment on the data', )
      peoplemissing_q = models.ForeignKey(Lookupstatus, db_column='peoplemissing_q', related_name='+', max_length=10, null=False, default='0', verbose_name='People missing: status', help_text='The status of the data', blank=True, blank=True, )
      peoplekilled = models.IntegerField(verbose_name='People killed', help_text='Total people killed in event (all hazards)', null=True, blank=True, )
      peoplekilled_s = models.CharField(max_length=255, null=True, blank=True, verbose_name='People killed: source', help_text='The source of the data', )
      peoplekilled_c = models.TextField(null=True, blank=True, verbose_name='People killed: comment', help_text='A comment on the data', )
      peoplekilled_q = models.ForeignKey(Lookupstatus, db_column='peoplekilled_q', related_name='+', max_length=10, null=False, default='0', verbose_name='People killed: status', help_text='The status of the data', blank=True, blank=True, )
      peopledyingpostcatastrophe = models.IntegerField(verbose_name='People dying post catastrophe', help_text='People dying after time has passed but their deaths related to the original catastrophe (all hazards)', null=True, blank=True, )
      peopledyingpostcatastrophe_s = models.CharField(max_length=255, null=True, blank=True, verbose_name='People dying post catastrophe: source', help_text='The source of the data', )
      peopledyingpostcatastrophe_c = models.TextField(null=True, blank=True, verbose_name='People dying post catastrophe: comment', help_text='A comment on the data', )
      peopledyingpostcatastrophe_q = models.ForeignKey(Lookupstatus, db_column='peopledyingpostcatastrophe_q', related_name='+', max_length=10, null=False, default='0', verbose_name='People dying post catastrophe: status', help_text='The status of the data', blank=True, blank=True, )
      peoplemissingduetoshake = models.IntegerField(verbose_name='People missing due to ground shaking', help_text='People missing due to ground shaking', null=True, blank=True, )
      peoplemissingduetoshake_s = models.CharField(max_length=255, null=True, blank=True, verbose_name='People missing due to ground shaking: source', help_text='The source of the data', )
      peoplemissingduetoshake_c = models.TextField(null=True, blank=True, verbose_name='People missing due to ground shaking: comment', help_text='A comment on the data', )
      peoplemissingduetoshake_q = models.ForeignKey(Lookupstatus, db_column='peoplemissingduetoshake_q', related_name='+', max_length=10, null=False, default='0', verbose_name='People missing due to ground shaking: status', help_text='The status of the data', blank=True, blank=True, )
      peoplekilledduetoshake = models.IntegerField(verbose_name='People killed due to ground shaking', help_text='People killed due to ground shaking', null=True, blank=True, )
      peoplekilledduetoshake_s = models.CharField(max_length=255, null=True, blank=True, verbose_name='People killed due to ground shaking: source', help_text='The source of the data', )
      peoplekilledduetoshake_c = models.TextField(null=True, blank=True, verbose_name='People killed due to ground shaking: comment', help_text='A comment on the data', )
      peoplekilledduetoshake_q = models.ForeignKey(Lookupstatus, db_column='peoplekilledduetoshake_q', related_name='+', max_length=10, null=False, default='0', verbose_name='People killed due to ground shaking: status', help_text='The status of the data', blank=True, blank=True, )
      peopledyingpostcatastropheshake = models.IntegerField(verbose_name='People dying post catastrophe due to shaking', help_text='People dying after time has passed but their deaths related to the original shaking', null=True, blank=True, )
      peopledyingpostcatastropheshake_s = models.CharField(max_length=255, null=True, blank=True, verbose_name='People dying post catastrophe due to shaking: source', help_text='The source of the data', )
      peopledyingpostcatastropheshake_c = models.TextField(null=True, blank=True, verbose_name='People dying post catastrophe due to shaking: comment', help_text='A comment on the data', )
      peopledyingpostcatastropheshake_q = models.ForeignKey(Lookupstatus, db_column='peopledyingpostcatastropheshake_q', related_name='+', max_length=10, null=False, default='0', verbose_name='People dying post catastrophe due to shaking: status', help_text='The status of the data', blank=True, blank=True, )
      peoplemissingduetotsunami = models.IntegerField(verbose_name='People missing due to tsunami', help_text='People missing due to tsunami', null=True, blank=True, )
      peoplemissingduetotsunami_s = models.CharField(max_length=255, null=True, blank=True, verbose_name='People missing due to tsunami: source', help_text='The source of the data', )
      peoplemissingduetotsunami_c = models.TextField(null=True, blank=True, verbose_name='People missing due to tsunami: comment', help_text='A comment on the data', )
      peoplemissingduetotsunami_q = models.ForeignKey(Lookupstatus, db_column='peoplemissingduetotsunami_q', related_name='+', null=False, default='0', verbose_name='People missing due to tsunami: status', help_text='The status of the data', blank=True, blank=True, )
      peoplekilledduetotsunami = models.IntegerField(verbose_name='People killed due to tsunami', help_text='People killed due to tsunami', null=True, blank=True, )
      peoplekilledduetotsunami_s = models.CharField(max_length=255, null=True, blank=True, verbose_name='People killed due to tsunami: source', help_text='The source of the data', )
      peoplekilledduetotsunami_c = models.TextField(null=True, blank=True, verbose_name='People killed due to tsunami: comment', help_text='A comment on the data', )
      peoplekilledduetotsunami_q = models.ForeignKey(Lookupstatus, db_column='peoplekilledduetotsunami_q', related_name='+', null=False, default='0', verbose_name='People killed due to tsunami: status', help_text='The status of the data', blank=True, blank=True, )
      peoplemissingduetofirefollowing = models.IntegerField(verbose_name='People missing due to fire following', help_text='People missing due to fire following', null=True, blank=True, )
      peoplemissingduetofirefollowing_s = models.CharField(max_length=255, null=True, blank=True, verbose_name='People missing due to fire following: source', help_text='The source of the data', )
      peoplemissingduetofirefollowing_c = models.TextField(null=True, blank=True, verbose_name='People missing due to fire following: comment', help_text='A comment on the data', )
      peoplemissingduetofirefollowing_q = models.ForeignKey(Lookupstatus, db_column='peoplemissingduetofirefollowing_q', related_name='+', null=False, default='0', verbose_name='People missing due to fire following: status', help_text='The status of the data', blank=True, blank=True, )
      peoplekilledduetofirefollowing = models.IntegerField(verbose_name='People killed due to fire following', help_text='People killed due to fire following', null=True, blank=True, )
      peoplekilledduetofirefollowing_s = models.CharField(max_length=255, null=True, blank=True, verbose_name='People killed due to fire following: source', help_text='The source of the data', )
      peoplekilledduetofirefollowing_c = models.TextField(null=True, blank=True, verbose_name='People killed due to fire following: comment', help_text='A comment on the data', )
      peoplekilledduetofirefollowing_q = models.ForeignKey(Lookupstatus, db_column='peoplekilledduetofirefollowing_q', related_name='+', null=False, default='0', verbose_name='People killed due to fire following: status', help_text='The status of the data', blank=True, blank=True, )
      peoplemissingduetoslopefailures = models.IntegerField(verbose_name='People missing due to slope failures', help_text='People missing due to slope failures', null=True, blank=True, )
      peoplemissingduetoslopefailures_s = models.CharField(max_length=255, null=True, blank=True, verbose_name='People missing due to slope failures: source', help_text='The source of the data', )
      peoplemissingduetoslopefailures_c = models.TextField(null=True, blank=True, verbose_name='People missing due to slope failures: comment', help_text='A comment on the data', )
      peoplemissingduetoslopefailures_q = models.ForeignKey(Lookupstatus, db_column='peoplemissingduetoslopefailures_q', related_name='+', null=False, default='0', verbose_name='People missing due to slope failures: status', help_text='The status of the data', blank=True, blank=True, )
      peoplekilledduetoslopefailures = models.IntegerField(verbose_name='People killed due to slope failures', help_text='People killed due to slope failures', null=True, blank=True, )
      peoplekilledduetoslopefailures_s = models.CharField(max_length=255, null=True, blank=True, verbose_name='People killed due to slope failures: source', help_text='The source of the data', )
      peoplekilledduetoslopefailures_c = models.TextField(null=True, blank=True, verbose_name='People killed due to slope failures: comment', help_text='A comment on the data', )
      peoplekilledduetoslopefailures_q = models.ForeignKey(Lookupstatus, db_column='peoplekilledduetoslopefailures_q', related_name='+', null=False, default='0', verbose_name='People killed due to slope failures: status', help_text='The status of the data', blank=True, blank=True, )
      numberofbuildingsdestroyed = models.IntegerField(verbose_name='Total number of buildings destroyed', help_text='Total number of buildings destroyed, collapsed or damaged beyond repair(all hazards)', null=True, blank=True, )
      numberofbuildingsdestroyed_s = models.CharField(max_length=255, null=True, blank=True, verbose_name='Total number of buildings destroyed: source', help_text='The source of the data', )
      numberofbuildingsdestroyed_c = models.TextField(null=True, blank=True, verbose_name='Total number of buildings destroyed: comment', help_text='A comment on the data', )
      numberofbuildingsdestroyed_q = models.ForeignKey(Lookupstatus, db_column='numberofbuildingsdestroyed_q', related_name='+', max_length=10, null=False, default='0', verbose_name='Total number of buildings destroyed: status', help_text='The status of the data', blank=True, blank=True, )
      numberofbuildingsdamaged = models.IntegerField(verbose_name='Number of buildings damaged', help_text='Total number of buildings damaged (all hazards)', null=True, blank=True, )
      numberofbuildingsdamaged_s = models.CharField(max_length=255, null=True, blank=True, verbose_name='Number of buildings damaged: source', help_text='The source of the data', )
      numberofbuildingsdamaged_c = models.TextField(null=True, blank=True, verbose_name='Number of buildings damaged: comment', help_text='A comment on the data', )
      numberofbuildingsdamaged_q = models.ForeignKey(Lookupstatus, db_column='numberofbuildingsdamaged_q', related_name='+', max_length=10, null=False, default='0', verbose_name='Number of buildings damaged: status', help_text='The status of the data', blank=True, blank=True, )
      numberofdwellingsdestroyed = models.IntegerField(verbose_name='Number of dwellings destroyed', help_text='Total number of dwelling units destroyed, collapsed or damaged beyond repair (all hazards)', null=True, blank=True, )
      numberofdwellingsdestroyed_s = models.CharField(max_length=255, null=True, blank=True, verbose_name='Number of dwellings destroyed: source', help_text='The source of the data', )
      numberofdwellingsdestroyed_c = models.TextField(null=True, blank=True, verbose_name='Number of dwellings destroyed: comment', help_text='A comment on the data', )
      numberofdwellingsdestroyed_q = models.ForeignKey(Lookupstatus, db_column='numberofdwellingsdestroyed_q', related_name='+', max_length=10, null=False, default='0', verbose_name='Number of dwellings destroyed: status', help_text='The status of the data', blank=True, blank=True, )
      numberofdwellingsdamaged = models.IntegerField(verbose_name='Number of dwellings damaged', help_text='Total number of dwelling units damaged (all hazards)', null=True, blank=True, )
      numberofdwellingsdamaged_s = models.CharField(max_length=255, null=True, blank=True, verbose_name='Number of dwellings damaged: source', help_text='The source of the data', )
      numberofdwellingsdamaged_c = models.TextField(null=True, blank=True, verbose_name='Number of dwellings damaged: comment', help_text='A comment on the data', )
      numberofdwellingsdamaged_q = models.ForeignKey(Lookupstatus, db_column='numberofdwellingsdamaged_q', related_name='+', max_length=10, null=False, default='0', verbose_name='Number of dwellings damaged: status', help_text='The status of the data', blank=True, blank=True, )
      numberofbuildingsdestroyedshake = models.IntegerField(verbose_name='Total number of buildings destroyed by shaking', help_text='Total number of buildings destroyed, collapsed or damaged beyond repair by shaking', null=True, blank=True, )
      numberofbuildingsdestroyedshake_s = models.CharField(max_length=255, null=True, blank=True, verbose_name='Total number of buildings destroyed by shaking: source', help_text='The source of the data', )
      numberofbuildingsdestroyedshake_c = models.TextField(null=True, blank=True, verbose_name='Total number of buildings destroyed by shaking: comment', help_text='A comment on the data', )
      numberofbuildingsdestroyedshake_q = models.ForeignKey(Lookupstatus, db_column='numberofbuildingsdestroyedshake_q', related_name='+', max_length=10, null=False, default='0', verbose_name='Total number of buildings destroyed by shaking: status', help_text='The status of the data', blank=True, blank=True, )
      numberofbuildingsdamagedshake = models.IntegerField(verbose_name='Number of buildings damaged by shaking', help_text='Total number of buildings damaged by shaking', null=True, blank=True, )
      numberofbuildingsdamagedshake_s = models.CharField(max_length=255, null=True, blank=True, verbose_name='Number of buildings damaged by shaking: source', help_text='The source of the data', )
      numberofbuildingsdamagedshake_c = models.TextField(null=True, blank=True, verbose_name='Number of buildings damaged by shaking: comment', help_text='A comment on the data', )
      numberofbuildingsdamagedshake_q = models.ForeignKey(Lookupstatus, db_column='numberofbuildingsdamagedshake_q', related_name='+', max_length=10, null=False, default='0', verbose_name='Number of buildings damaged by shaking: status', help_text='The status of the data', blank=True, blank=True, )
      numberofdwellingsdestroyedshake = models.IntegerField(verbose_name='Number of dwellings destroyed by shaking', help_text='Total number of dwelling units destroyed, collapsed or damaged beyond repair by shaking', null=True, blank=True, )
      numberofdwellingsdestroyedshake_s = models.CharField(max_length=255, null=True, blank=True, verbose_name='Number of dwellings destroyed by shaking: source', help_text='The source of the data', )
      numberofdwellingsdestroyedshake_c = models.TextField(null=True, blank=True, verbose_name='Number of dwellings destroyed by shaking: comment', help_text='A comment on the data', )
      numberofdwellingsdestroyedshake_q = models.ForeignKey(Lookupstatus, db_column='numberofdwellingsdestroyedshake_q', related_name='+', max_length=10, null=False, default='0', verbose_name='Number of dwellings destroyed by shaking: status', help_text='The status of the data', blank=True, blank=True, )
      numberofdwellingsdamagedshake = models.IntegerField(verbose_name='Number of dwellings damaged by shaking', help_text='Total number of dwelling units damaged by shaking', null=True, blank=True, )
      numberofdwellingsdamagedshake_s = models.CharField(max_length=255, null=True, blank=True, verbose_name='Number of dwellings damaged by shaking: source', help_text='The source of the data', )
      numberofdwellingsdamagedshake_c = models.TextField(null=True, blank=True, verbose_name='Number of dwellings damaged by shaking: comment', help_text='A comment on the data', )
      numberofdwellingsdamagedshake_q = models.ForeignKey(Lookupstatus, db_column='numberofdwellingsdamagedshake_q', related_name='+', max_length=10, null=False, default='0', verbose_name='Number of dwellings damaged by shaking: status', help_text='The status of the data', blank=True, blank=True, )
      peoplehomeless = models.IntegerField(verbose_name='People homeless', help_text='Total number of people homeless for a significant duration of time (all hazards)', null=True, blank=True, )
      peoplehomeless_s = models.CharField(max_length=255, null=True, blank=True, verbose_name='People homeless: source', help_text='The source of the data', )
      peoplehomeless_c = models.TextField(null=True, blank=True, verbose_name='People homeless: comment', help_text='A comment on the data', )
      peoplehomeless_q = models.ForeignKey(Lookupstatus, db_column='peoplehomeless_q', related_name='+', max_length=10, null=False, default='0', verbose_name='People homeless: status', help_text='The status of the data', blank=True, blank=True, )
      directeconomicloss = models.FloatField(verbose_name='Direct economic loss', help_text='Total estimated direct economic loss, million US$, contemporaneous. In absolute US$ value of the year of occurrence. Only includes direct effects. (all hazards)', null=True, blank=True, )
      directeconomicloss_s = models.CharField(max_length=255, null=True, blank=True, verbose_name='Direct economic loss: source', help_text='The source of the data', )
      directeconomicloss_c = models.TextField(null=True, blank=True, verbose_name='Direct economic loss: comment', help_text='A comment on the data', )
      directeconomicloss_q = models.ForeignKey(Lookupstatus, db_column='directeconomicloss_q', related_name='+', max_length=10, null=False, default='0', verbose_name='Direct economic loss: status', help_text='The status of the data', blank=True, blank=True, )
      indirecteconomicloss = models.FloatField(verbose_name='Indirect economic loss', help_text='Total estimated indirect economic loss, million US$, contemporaneous. In absolute US$ value of the year of occurrence. Only includes indirect effects. (all hazards)', null=True, blank=True, )
      indirecteconomicloss_s = models.CharField(max_length=255, null=True, blank=True, verbose_name='Indirect economic loss: source', help_text='The source of the data', )
      indirecteconomicloss_c = models.TextField(null=True, blank=True, verbose_name='Indirect economic loss: comment', help_text='A comment on the data', )
      indirecteconomicloss_q = models.ForeignKey(Lookupstatus, db_column='indirecteconomicloss_q', related_name='+', max_length=10, null=False, default='0', verbose_name='Indirect economic loss: status', help_text='The status of the data', blank=True, blank=True, )
      insuredloss = models.FloatField(verbose_name='Insured loss', help_text='Total insured losses, million US$, contemporaneous. In absolute US$ value of the year of occurrence.', null=True, blank=True, )
      insuredloss_s = models.CharField(max_length=255, null=True, blank=True, verbose_name='Insured loss: source', help_text='The source of the data', )
      insuredloss_c = models.TextField(null=True, blank=True, verbose_name='Insured loss: comment', help_text='A comment on the data', )
      insuredloss_q = models.ForeignKey(Lookupstatus, db_column='insuredloss_q', related_name='+', max_length=10, null=False, default='0', verbose_name='Insured loss: status', help_text='The status of the data', blank=True, blank=True, )
      peoplehomelessshake = models.IntegerField(verbose_name='People homeless due to shaking', help_text='Total number of people homeless for a significant duration of time (shaking)', null=True, blank=True, )
      peoplehomelessshake_s = models.CharField(max_length=255, null=True, blank=True, verbose_name='People homeless due to shaking: source', help_text='The source of the data', )
      peoplehomelessshake_c = models.TextField(null=True, blank=True, verbose_name='People homeless due to shaking: comment', help_text='A comment on the data', )
      peoplehomelessshake_q = models.ForeignKey(Lookupstatus, db_column='peoplehomelessshake_q', related_name='+', max_length=10, null=False, default='0', verbose_name='People homeless due to shaking: status', help_text='The status of the data', blank=True, blank=True, )
      directeconomiclossshake = models.IntegerField(verbose_name='Direct economic loss due to shaking', help_text='Total estimated direct economic loss due to shaking, million US$, contemporaneous. In absolute US$ value of the year of occurrence. Only includes direct effects.', null=True, blank=True, )
      directeconomiclossshake_s = models.CharField(max_length=255, null=True, blank=True, verbose_name='Direct economic loss due to shaking: source', help_text='The source of the data', )
      directeconomiclossshake_c = models.TextField(null=True, blank=True, verbose_name='Direct economic loss due to shaking: comment', help_text='A comment on the data', )
      directeconomiclossshake_q = models.ForeignKey(Lookupstatus, db_column='directeconomiclossshake_q', related_name='+', max_length=10, null=False, default='0', verbose_name='Direct economic loss due to shaking: status', help_text='The status of the data', blank=True, blank=True, )
      indirecteconomiclossshake = models.IntegerField(verbose_name='Indirect economic loss due to shaking', help_text='Total estimated indirect economic loss due to shaking, million US$, contemporaneous. In absolute US$ value of the year of occurrence. Only includes indirect effects. ', null=True, blank=True, )
      indirecteconomiclossshake_s = models.CharField(max_length=255, null=True, blank=True, verbose_name='Indirect economic loss due to shaking: source', help_text='The source of the data', )
      indirecteconomiclossshake_c = models.TextField(null=True, blank=True, verbose_name='Indirect economic loss due to shaking: comment', help_text='A comment on the data', )
      indirecteconomiclossshake_q = models.ForeignKey(Lookupstatus, db_column='indirecteconomiclossshake_q', related_name='+', max_length=10, null=False, default='0', verbose_name='Indirect economic loss due to shaking: status', help_text='The status of the data', blank=True, blank=True, )
      numberofhouseholds = models.IntegerField(verbose_name='Number of households', help_text='Total number of households in the affected countries (contemporaneous)', null=True, blank=True, )
      numberofhouseholds_s = models.CharField(max_length=255, null=True, blank=True, verbose_name='Number of households: source', help_text='The source of the data', )
      numberofhouseholds_c = models.TextField(null=True, blank=True, verbose_name='Number of households: comment', help_text='A comment on the data', )
      numberofhouseholds_q = models.ForeignKey(Lookupstatus, db_column='numberofhouseholds_q', related_name='+', max_length=10, null=False, default='0', verbose_name='Number of households: status', help_text='The status of the data', blank=True, blank=True, )
      totalnumberofbuildings = models.IntegerField(verbose_name='Total number of buildings', help_text='Total number of buildings in the affected countries (contemporaneous)', null=True, blank=True, )
      totalnumberofbuildings_s = models.CharField(max_length=255, null=True, blank=True, verbose_name='Total number of buildings: source', help_text='The source of the data', )
      totalnumberofbuildings_c = models.TextField(null=True, blank=True, verbose_name='Total number of buildings: comment', help_text='A comment on the data', )
      totalnumberofbuildings_q = models.ForeignKey(Lookupstatus, db_column='totalnumberofbuildings_q', related_name='+', max_length=10, null=False, default='0', verbose_name='Total number of buildings: status', help_text='The status of the data', blank=True, blank=True, )
      numberofhouseholdsshake = models.IntegerField(verbose_name='Number of households affected by shaking', help_text='Total number of households in the zone affected by shaking (contemporaneous)', null=True, blank=True, )
      numberofhouseholdsshake_s = models.CharField(max_length=255, null=True, blank=True, verbose_name='Number of households affected by shaking: source', help_text='The source of the data', )
      numberofhouseholdsshake_c = models.TextField(null=True, blank=True, verbose_name='Number of households affected by shaking: comment', help_text='A comment on the data', )
      numberofhouseholdsshake_q = models.ForeignKey(Lookupstatus, db_column='numberofhouseholdsshake_q', related_name='+', max_length=10, null=False, default='0', verbose_name='Number of households affected by shaking: status', help_text='The status of the data', blank=True, blank=True, )
      totalnumberofbuildingsshake = models.IntegerField(verbose_name='Total number of buildings affected by shaking', help_text='Total number of buildings in the zone affected by shaking (contemporaneous)', null=True, blank=True, )
      totalnumberofbuildingsshake_s = models.CharField(max_length=255, null=True, blank=True, verbose_name='Total number of buildings affected by shaking: source', help_text='The source of the data', )
      totalnumberofbuildingsshake_c = models.TextField(null=True, blank=True, verbose_name='Total number of buildings affected by shaking: comment', help_text='A comment on the data', )
      totalnumberofbuildingsshake_q = models.ForeignKey(Lookupstatus, db_column='totalnumberofbuildingsshake_q', related_name='+', max_length=10, null=False, default='0', verbose_name='Total number of buildings affected by shaking: status', help_text='The status of the data', blank=True, blank=True, )
      population = models.IntegerField(verbose_name='Population', help_text='Population in the affected countries (contemporaneous)', null=True, blank=True, )
      population_s = models.CharField(max_length=255, null=True, blank=True, verbose_name='Population: source', help_text='The source of the data', )
      population_c = models.TextField(null=True, blank=True, verbose_name='Population: comment', help_text='A comment on the data', )
      population_q = models.ForeignKey(Lookupstatus, db_column='population_q', related_name='+', max_length=10, null=False, default='0', verbose_name='Population: status', help_text='The status of the data', blank=True, blank=True, )
      contemporaneousdate = models.DateTimeField(null=True, blank=True, verbose_name='Base date', help_text='Base date for contemporaneous data, if not date of event, eg 1970-05-31', )
      geoarchive_flag = models.CharField(max_length=1, null=False, default='n', verbose_name='Geoarchive flag', help_text='Geoarchive flag', blank=True, )
      ownerid = models.IntegerField(null=False, default='1', verbose_name='Owner ID', help_text='ID of the creator/owner of the event', max_length=1, blank=True, )
      lastupdatebyid = models.IntegerField(null=False, default='1', verbose_name='Last update by ID', help_text='ID of the last person to update this record', max_length=1, blank=True, )
      lastupdate = models.DateTimeField(null=True, blank=True, help_text='Last record update date', )

      class Meta:
            db_table = u'econd\".\"event'

      def __unicode__(self):
            return self.name

