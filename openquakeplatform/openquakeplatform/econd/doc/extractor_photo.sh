#!/bin/bash
OUTDIR=out_photo
MACHINE=gemecd2
PSQLARGS=

for i in ph_originalsurveyreference timeofdaystring photographerorganisation photographername description_c copyright_c caption tags gpsdirectioncode subjectcode photographercontactinfo; do
    echo "UPDATE econd.photologue_photo SET $i = '' WHERE $i is null;" | psql $PSQLARGS $MACHINE
done
echo "UPDATE econd.photologue_photo SET title = concat(title, '_', id) WHERE title = 'untitled';" | psql $PSQLARGS $MACHINE
echo "UPDATE econd.photologue_photo SET title_slug = concat(title_slug, '_', id) WHERE title_slug = 'untitled';" | psql $PSQLARGS $MACHINE

echo "--                                  x                                                  x 
update econd.photologue_photo SET title = 'Izmit,xcr.in infill pan.s ofLat.wall(D''Ayala).jpg' where id = 11641;
update econd.photologue_photo SET title = 'Holiday res. near Yalova,wallOfB.ing1(Teymur).jpg' where id = 11640;
update econd.photologue_photo SET title = 'Overt. and pancake collap. in Derince(D''Ayala).jpg' where id = 11651;
update econd.photologue_photo SET title = 'Adapazari,2 storey highschool,roof dmg(Teymur).jpg' where id = 11623;
update econd.photologue_photo SET title = 'Adapazari, light weigth roof failure (D''Ayala).jpg' where id = 11602;
update econd.photologue_photo SET title = 'Holiday res. near Yalova, det. of dmg(Teymur).jpg' where id = 11639;
update econd.photologue_photo SET title = 'Adapazari,Cark Str fail. of mas.infill(Teymur).jpg' where id = 11594;
update econd.photologue_photo SET title = 'General view of Cark Str in Adapazari (Teymur).jpg' where id = 11630;
update econd.photologue_photo SET title = 'Adapazari city centre, Papuccular Cd (Doyle).jpg' where id = 11598;
update econd.photologue_photo SET title = 'Adapazari CityCntr, overt. building (D''Ayala).jpg' where id = 11597;
update econd.photologue_photo SET title = 'Adapazari, Cark cad Softstory failure (Teymur).jpg' where id = 11599;
update econd.photologue_photo SET title = 'Adapazari city centre det.of hotel b.ding(May).jpg' where id = 11596;
update econd.photologue_photo SET title = 'X-crack observed in a hosp. in Izmit (Teymur).jpg' where id = 11659;
update econd.photologue_photo SET title = 'Golcuk petrolstat., failure of canopy (Teymur).jpg' where id = 11633;
update econd.photologue_photo SET title = 'Golcuk Mosque over fault, back view (Teymur).jpg' where id = 11632;
update econd.photologue_photo SET title = 'Golcuk Mosque over fault, side view (Teymur).jpg' where id = 11631;
update econd.photologue_photo SET title = 'Adapazari, Cark Str ground floor col. failure.jpg' where id = 11600;
update econd.photologue_photo SET title = 'Landsl.obs.near theFord-Otosan Fact.in Golcuk.jpg' where id = 11468;
update econd.photologue_photo SET title = 'Slope fail. obs. near Toyota Fact.in Adapazari.jpg' where id = 11469;
update econd.photologue_photo SET title = 'Adapazari Cark Str, ground floor failure.jpg' where id = 11595;
update econd.photologue_photo SET title = 'Adapazari, high school, general view (D''Ayala).jpg' where id = 11601;
" | psql $PSQLARGS $MACHINE

for i in subjectsubcode cityscalecode; do
    echo "UPDATE econd.photologue_photo SET $i = 0 WHERE $i is null;" | psql $PSQLARGS $MACHINE
done
# echo "DELETE FROM econd.liquefactionstudy WHERE parentid = 9;" | psql $PSQLARGS $MACHINE
# 
# echo "DELETE FROM econd.event WHERE id = 29;"  | psql $PSQLARGS $MACHINE
# echo "update econd.event set peopleinjured_q = '0' where peopleinjured_q = '';
# update econd.event set peoplemissing_q = '0' where peoplemissing_q = '';
# update econd.event set peoplekilled_q = '0' where peoplekilled_q = '';
# update econd.event set peopledyingpostcatastrophe_q = '0' where peopledyingpostcatastrophe_q = '';
# update econd.event set numberofbuildingsdestroyed_q = '0' where numberofbuildingsdestroyed_q = '';
# update econd.event set numberofbuildingsdamaged_q = '0' where numberofbuildingsdamaged_q = '';
# update econd.event set numberofdwellingsdestroyed_q = '0' where numberofdwellingsdestroyed_q = '';
# update econd.event set numberofdwellingsdamaged_q = '0' where numberofdwellingsdamaged_q = '';
# update econd.event set peoplehomeless_q = '0' where peoplehomeless_q = '';
# update econd.event set directeconomicloss_q = '0' where directeconomicloss_q = '';
# update econd.event set indirecteconomicloss_q = '0' where indirecteconomicloss_q = '';
# update econd.event set numberofhouseholds_q = '0' where numberofhouseholds_q = '';
# update econd.event set totalnumberofbuildings_q = '0' where totalnumberofbuildings_q = '';
# update econd.event set peopleinjuredduetoshake_q = '0' where peopleinjuredduetoshake_q = '';
# update econd.event set peoplemissingduetoshake_q = '0' where peoplemissingduetoshake_q = '';
# update econd.event set peoplekilledduetoshake_q = '0' where peoplekilledduetoshake_q = '';
# update econd.event set peopledyingpostcatastropheshake_q = '0' where peopledyingpostcatastropheshake_q = '';
# update econd.event set numberofbuildingsdestroyedshake_q = '0' where numberofbuildingsdestroyedshake_q = '';
# update econd.event set numberofbuildingsdamagedshake_q = '0' where numberofbuildingsdamagedshake_q = '';
# update econd.event set numberofdwellingsdestroyedshake_q = '0' where numberofdwellingsdestroyedshake_q = '';
# update econd.event set numberofdwellingsdamagedshake_q = '0' where numberofdwellingsdamagedshake_q = '';
# update econd.event set peoplehomelessshake_q = '0' where peoplehomelessshake_q = '';
# update econd.event set directeconomiclossshake_q = '0' where directeconomiclossshake_q = '';
# update econd.event set indirecteconomiclossshake_q = '0' where indirecteconomiclossshake_q = '';
# update econd.event set numberofhouseholdsshake_q = '0' where numberofhouseholdsshake_q = '';
# update econd.event set totalnumberofbuildingsshake_q = '0' where totalnumberofbuildingsshake_q = '';
# -- update econd.event set peopleinjuredduetotsunami_q = '0' where peopleinjuredduetotsunami_q = '';
# -- update econd.event set peopleinjuredduetoslopefailures_q = '0' where peopleinjuredduetoslopefailures_q = '';
# -- update econd.event set peopleinjuredduetofirefollowing_q = '0' where peopleinjuredduetofirefollowing_q = '';
# update econd.event set population_q = '0' where population_q = '';
# update econd.event set peopleseriouslyinjured_q = '0' where peopleseriouslyinjured_q = '';
# update econd.event set peoplemissingduetotsunami_q = '0' where peoplemissingduetotsunami_q = '';
# update econd.event set peoplekilledduetotsunami_q = '0' where peoplekilledduetotsunami_q = '';
# update econd.event set peoplemissingduetoslopefailures_q = '0' where peoplemissingduetoslopefailures_q = '';
# update econd.event set peoplekilledduetoslopefailures_q = '0' where peoplekilledduetoslopefailures_q = '';
# update econd.event set peoplemissingduetofirefollowing_q = '0' where peoplemissingduetofirefollowing_q = '';
# update econd.event set peoplekilledduetofirefollowing_q = '0' where peoplekilledduetofirefollowing_q = '';
# update econd.event set insuredloss_q = '0' where insuredloss_q = '';" | psql $PSQLARGS $MACHINE
# 
# echo "DELETE FROM econd.surveyvalue WHERE parentid = 3 OR parentid = 222 OR parentid = 155 OR parentid = 10 OR parentid = 4 OR parentid = 369 OR parentid = 109 OR parentid = 5 OR parentid = 6 OR parentid = 7 OR parentid = 115;" | psql $PSQLARGS $MACHINE
# for i in unifieddamagelevel damagelevel lookupmetric lookupsoilclass lookupintensityzone lookupqualitymetric lookupstudytype lookupregion lookupmagnitudeunit lookupstatus location ; do
#   echo "\\copy (select * from econd.${i}) to '${OUTDIR}/econd__${i}.csv' with CSV HEADER DELIMITER ','" | psql $PSQLARGS $MACHINE
# done

source /home/nastasi/oq-stuff/oq-platform/openquakeplatform/copy_list_photo.sql


