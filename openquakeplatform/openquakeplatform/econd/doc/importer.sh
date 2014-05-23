#!/bin/bash
set -x
DIR=$PWD/indir
PSQLARGS=-e
OUTDIR=out
a=""
LIST_LOOKUP="lookupassetclass lookupassettype lookupassetsubtype lookupassetconstruction lookupcityscalecode lookupdateofconstruction lookupdetailcode lookupductility lookupfloormaterial lookupfloortype lookupheight lookuphorizontalirregularity lookupintensityzone lookupirregularityqualifier lookupirregularitytype lookuploadresistingsystem lookupmagnitudeunit lookupmasonrymortartype lookupmasonryreinforcement lookupmaterialtechnology lookupmaterialtype lookupmetric lookupoccupancy lookupoccupancydetail lookuporientationcode lookupphotographerprofessioncode lookupphotoqualitycode lookupqualitymetric lookupregion lookuproofmaterial lookuprooftype lookupsoilclass lookupstatus lookupsteelconnectiontype lookupstudytype lookupsubjectmastercode lookupsubjectsubcode lookuptimeofdaycode lookuptypeofdamage lookuptypeofstructurecode lookupunit lookupverticalirregularity"

# LIST_TABLES="lookupmasonryreinforcement lookupmasonrymortartype lookupmaterialtechnology lookupmaterialtype inventoryclass unifiedcasualtylevel casualtylevel unifieddamagelevel damagelevel lookupmetric lookupintensityzone lookupsoilclass lookupregion lookupstudytype lookupmagnitudeunit lookupstatus lookupqualitymetric geobase event study location surveyvalue socioeconomicstudy tsunamistudy slopefailurestudy firefollowingstudy liquefactionstudy"
LIST_TABLES="$LIST_LOOKUP inventoryclass unifiedcasualtylevel casualtylevel unifieddamagelevel damagelevel geobase event study location surveyvalue socioeconomicstudy tsunamistudy slopefailurestudy firefollowingstudy liquefactionstudy weblib_weblibphoto weblib_page weblib_link weblib_document" # geobase_yogyakarta geobase_laquila"

if [ "$1" = "-c" ]; then
    ct=0
    for i in $LIST_TABLES; do
        ct=$((ct + 1))
    done
    echo "$ct tables"
    exit 0
fi
for i in $LIST_TABLES; do
    # if [ "$i" = "lookupcityscalecode" -o "$i" = "lookupdetailcode" -o "$i" = "lookuporientationcode" -o "$i" = "lookupphotographerprofessioncode" ]; then
    #     continue
    # fi
    # if [ "$i" = "lookupphotoqualitycode" -o "$i" = "lookupsubjectmastercode" -o "$i" = "lookupsubjectsubcode" -o "$i" = "lookuptimeofdaycode" ]; then
    #     continue
    # fi
    # if [ "$i" = "lookuptypeofstructurecode" ]; then
    #    continue
    # fi
    if [ "${i}" = "weblib_weblibphoto" -o "$i" = "weblib_page" -o "$i" = "weblib_link" -o "$i" = "weblib_document" -o "$i" = "geobase_yogyakarta" -o "$i" = "geobase_laquila" ]; then
        a="${a}${comma}${i}"
    else
        a="${a}${comma}econd__${i}"
    fi
    comma=", "
done

echo "truncate ${a};" | sudo -u postgres psql $PSQLARGS oqplatform >/dev/null
LIST_TABLES="${LIST_TABLES} geobase_yogyakarta geobase_laquila"
# exit 123
if [ "$1" = "-d" ]; then
    for i in $LIST_TABLES; do
        echo "\\copy (select * from econd__${i}) to '/tmp/tempore.csv' with CSV HEADER DELIMITER ','" | sudo -u postgres psql $PSQLARGS oqplatform
        cat /tmp/tempore.csv | sed "s/\(.*\)/echo \"\\\\\\\\copy (select \1 from econd.${i}) to '${OUTDIR}\/econd__${i}.csv' with CSV HEADER DELIMITER ','\" | psql \$PSQLARGS \$MACHINE/g"
    done
    exit 0
fi

for i in $LIST_TABLES; do
    if [ "${i}" = "weblib_weblibphoto" -o "$i" = "weblib_page" -o "$i" = "weblib_link" -o "$i" = "weblib_document" -o "$i" = "geobase_yogyakarta" -o "$i" = "geobase_laquila" ]; then
        prefix=""
    else
        prefix="econd__"
    fi
    echo "copy ${prefix}${i} FROM '${DIR}/${prefix}${i}.csv' (FORMAT CSV, HEADER TRUE, DELIMITER ',') " | sudo -u postgres psql $PSQLARGS oqplatform
done

