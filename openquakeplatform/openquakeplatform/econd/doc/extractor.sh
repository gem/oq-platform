#!/bin/bash
set -x
OUTDIR=out
MACHINE=gemecd2
PSQLARGS=
# remove test with error inside
echo "UPDATE econd.location SET parenttype = '' WHERE parenttype is null;" | psql $PSQLARGS $MACHINE
echo "UPDATE econd.location SET location_c = '' WHERE location_c is null;" | psql $PSQLARGS $MACHINE
echo "UPDATE econd.study SET reliabilitydataqualitycode = '0' WHERE reliabilitydataqualitycode = '';" | psql $PSQLARGS $MACHINE
echo "UPDATE econd.study SET reliabilitylocationalcode = '0' WHERE reliabilitylocationalcode = '';" | psql $PSQLARGS $MACHINE
echo "UPDATE econd.study SET reliabilitydocumentationqualitycode = '0' WHERE reliabilitydocumentationqualitycode = '';" | psql $PSQLARGS $MACHINE
echo "DELETE FROM econd.study WHERE parentid = 3 OR parentid = 29;" | psql $PSQLARGS $MACHINE
echo "DELETE FROM econd.study WHERE name = 'untitled';" | psql $PSQLARGS $MACHINE

echo "DELETE FROM econd.socioeconomicstudy WHERE name = 'untitled';" | psql $PSQLARGS $MACHINE
echo "DELETE FROM econd.socioeconomicstudy WHERE parentid = 9;" | psql $PSQLARGS $MACHINE
echo "DELETE FROM econd.tsunamistudy WHERE name = 'untitled';" | psql $PSQLARGS $MACHINE
echo "DELETE FROM econd.tsunamistudy WHERE parentid = 9;" | psql $PSQLARGS $MACHINE
echo "DELETE FROM econd.tsunamistudy WHERE parentid = 3;" | psql $PSQLARGS $MACHINE
echo "DELETE FROM econd.slopefailurestudy WHERE name = 'untitled';" | psql $PSQLARGS $MACHINE
echo "DELETE FROM econd.slopefailurestudy WHERE parentid = 9;" | psql $PSQLARGS $MACHINE
echo "DELETE FROM econd.slopefailurestudy WHERE geobaseid=165;" | psql $PSQLARGS $MACHINE
echo "DELETE FROM econd.firefollowingstudy WHERE name = 'untitled';" | psql $PSQLARGS $MACHINE
echo "DELETE FROM econd.firefollowingstudy WHERE parentid = 9;" | psql $PSQLARGS $MACHINE
echo "DELETE FROM econd.liquefactionstudy WHERE name = 'untitled';" | psql $PSQLARGS $MACHINE
echo "DELETE FROM econd.liquefactionstudy WHERE parentid = 9;" | psql $PSQLARGS $MACHINE

echo "DELETE FROM econd.event WHERE id = 29;"  | psql $PSQLARGS $MACHINE
echo "update econd.event set peopleinjured_q = '0' where peopleinjured_q = '';
update econd.event set peoplemissing_q = '0' where peoplemissing_q = '';
update econd.event set peoplekilled_q = '0' where peoplekilled_q = '';
update econd.event set peopledyingpostcatastrophe_q = '0' where peopledyingpostcatastrophe_q = '';
update econd.event set numberofbuildingsdestroyed_q = '0' where numberofbuildingsdestroyed_q = '';
update econd.event set numberofbuildingsdamaged_q = '0' where numberofbuildingsdamaged_q = '';
update econd.event set numberofdwellingsdestroyed_q = '0' where numberofdwellingsdestroyed_q = '';
update econd.event set numberofdwellingsdamaged_q = '0' where numberofdwellingsdamaged_q = '';
update econd.event set peoplehomeless_q = '0' where peoplehomeless_q = '';
update econd.event set directeconomicloss_q = '0' where directeconomicloss_q = '';
update econd.event set indirecteconomicloss_q = '0' where indirecteconomicloss_q = '';
update econd.event set numberofhouseholds_q = '0' where numberofhouseholds_q = '';
update econd.event set totalnumberofbuildings_q = '0' where totalnumberofbuildings_q = '';
update econd.event set peopleinjuredduetoshake_q = '0' where peopleinjuredduetoshake_q = '';
update econd.event set peoplemissingduetoshake_q = '0' where peoplemissingduetoshake_q = '';
update econd.event set peoplekilledduetoshake_q = '0' where peoplekilledduetoshake_q = '';
update econd.event set peopledyingpostcatastropheshake_q = '0' where peopledyingpostcatastropheshake_q = '';
update econd.event set numberofbuildingsdestroyedshake_q = '0' where numberofbuildingsdestroyedshake_q = '';
update econd.event set numberofbuildingsdamagedshake_q = '0' where numberofbuildingsdamagedshake_q = '';
update econd.event set numberofdwellingsdestroyedshake_q = '0' where numberofdwellingsdestroyedshake_q = '';
update econd.event set numberofdwellingsdamagedshake_q = '0' where numberofdwellingsdamagedshake_q = '';
update econd.event set peoplehomelessshake_q = '0' where peoplehomelessshake_q = '';
update econd.event set directeconomiclossshake_q = '0' where directeconomiclossshake_q = '';
update econd.event set indirecteconomiclossshake_q = '0' where indirecteconomiclossshake_q = '';
update econd.event set numberofhouseholdsshake_q = '0' where numberofhouseholdsshake_q = '';
update econd.event set totalnumberofbuildingsshake_q = '0' where totalnumberofbuildingsshake_q = '';
-- update econd.event set peopleinjuredduetotsunami_q = '0' where peopleinjuredduetotsunami_q = '';
-- update econd.event set peopleinjuredduetoslopefailures_q = '0' where peopleinjuredduetoslopefailures_q = '';
-- update econd.event set peopleinjuredduetofirefollowing_q = '0' where peopleinjuredduetofirefollowing_q = '';
update econd.event set population_q = '0' where population_q = '';
update econd.event set peopleseriouslyinjured_q = '0' where peopleseriouslyinjured_q = '';
update econd.event set peoplemissingduetotsunami_q = '0' where peoplemissingduetotsunami_q = '';
update econd.event set peoplekilledduetotsunami_q = '0' where peoplekilledduetotsunami_q = '';
update econd.event set peoplemissingduetoslopefailures_q = '0' where peoplemissingduetoslopefailures_q = '';
update econd.event set peoplekilledduetoslopefailures_q = '0' where peoplekilledduetoslopefailures_q = '';
update econd.event set peoplemissingduetofirefollowing_q = '0' where peoplemissingduetofirefollowing_q = '';
update econd.event set peoplekilledduetofirefollowing_q = '0' where peoplekilledduetofirefollowing_q = '';
update econd.event set insuredloss_q = '0' where insuredloss_q = '';" | psql $PSQLARGS $MACHINE

# echo "DELETE FROM econd.surveyvalue WHERE parentid = 3 OR parentid = 222 OR parentid = 155 OR parentid = 10 OR parentid = 4 OR parentid = 369 OR parentid = 109 OR parentid = 5 OR parentid = 6 OR parentid = 7 OR parentid = 115;" | psql $PSQLARGS $MACHINE
# for i in unifieddamagelevel damagelevel lookupmetric lookupsoilclass lookupintensityzone lookupqualitymetric lookupstudytype lookupregion lookupmagnitudeunit lookupstatus location ; do
#   echo "\\copy (select * from econd.${i}) to '${OUTDIR}/econd__${i}.csv' with CSV HEADER DELIMITER ','" | psql $PSQLARGS $MACHINE
# done

source /home/nastasi/oq-stuff/oq-platform/openquakeplatform/copy_list.sql


