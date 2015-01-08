=== PRODUCTION ENVIRONMENT: HOW TO DUMP ECD DATASET FROM EXISTING INSTALLATION ===

$ sudo -i
# openquakeplatform dumpdata --indent=4 econd --exclude econd.photos --exclude econd.geoarchivemasteroverview --exclude econd.geoarchivelocations --exclude econd.geoarchivelocationsforjson --exclude econd.geoarchiveevents --exclude econd.geoarchiveeventsquick --exclude econd.geoarchivedamagelevels --exclude econd.geoarchivedamagelevelsquick --exclude econd.geoarchiveinventoryclasses --exclude econd.geoarchiveassetclasses --exclude econd.geoarchiveassetclassesquick --exclude econd.geoarchiveoverviewfull --exclude econd.eventsquick --exclude econd.locationsforjson --exclude econd.locationsforjsonaggregated --exclude econd.locations --exclude econd.locationsquick | bzip2 > econd.json.bz2
# openquakeplatform dumpdata --indent=4 photologue | bzip2 > photologue.json.bz2
# openquakeplatform dumpdata --indent=4 weblib | bzip2 > weblib.json.bz2


=== PRODUCTION ENVIRONMENT: CLEAN THE DATABASE TO INSERT NEW DATASET ===

$ sudo -i
# echo "--- reset database schema ---"
# export SRC_BASEDIR="<the_repository_source_basepath>"
# cat $RC_BASEDIR/oq-platform/openquakeplatform/openquakeplatform/econd/doc/drop_gemecd_views.sql  | openquakeplatform dbshell
# openquakeplatform sqlclear weblib | openquakeplatform dbshell
# openquakeplatform sqlclear photologue | openquakeplatform dbshell
# openquakeplatform sqlclear econd | openquakeplatform dbshell
# openquakeplatform syncdb --no-initial-data
# openquakeplatform sql photologue | openquakeplatform dbshell
# cat $SRC_BASEDIR/oq-platform/openquakeplatform/openquakeplatform/econd/sql.d/001-gemecd-views.sql  | openquakeplatform dbshell
# cat $SRC_BASEDIR/oq-platform/openquakeplatform/openquakeplatform/econd/sql.d/002-geobase-events.sql  | openquakeplatform dbshell


=== PRODUCTION ENVIRONMENT: IMPORT NEW DATASET ===

$ sudo -i
# export DATA_BASEDIR="<where json files are located>"
# openquakeplatform loaddata "$DATA_BASEDIR/econd.json.bz2"
# openquakeplatform loaddata "$DATA_BASEDIR/photologue.json.bz2"
# openquakeplatform loaddata "$DATA_BASEDIR/weblib.json.bz2"
