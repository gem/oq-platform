#!/bin/bash
# set -x
DIR=$PWD/indir_photo
PSQLARGS=-e
OUTDIR=out_photo
a=""
LIST_TABLES_IN="econd.photologue_gallery_photos econd.photologue_photosize econd.photologue_photosize econd.lookupyesnonull econd.photologue_photoeffect econd.photologue_photo econd.photologue_photo"
LIST_TABLES_OU="photologue_gallery_photos photologue_photosize weblib_photologuephotosize econd__lookupyesnonull photologue_photoeffect photologue_photo weblib_weblibphoto"
LIST_TABLES_TRUNCATE="weblib_page weblib_link weblib_document"

if [ "$1" = "-c" ]; then
    ct=0
    for o in $LIST_TABLES_OU; do
        ct=$((ct + 1))
    done
    echo "$ct tables"
    exit 0
fi

if [ "$1" = "-d" ]; then
    rm -f copy_list_photo.sql
    ct=1
    for i in $LIST_TABLES_IN; do
        o="$(echo "$LIST_TABLES_OU" | cut -d ' ' -f $ct)"
        echo "\\copy (select * from ${o}) to '/tmp/tempore.csv' with CSV HEADER DELIMITER ','" | sudo -u postgres psql $PSQLARGS oqplatform
        head -n 1 /tmp/tempore.csv | sed "s/\(.*\)/echo \"\\\\\\\\copy (select \1 from ${i}) to '${OUTDIR}\/${o}.csv' with CSV HEADER DELIMITER ','\" | psql \$PSQLARGS \$MACHINE/g" >>copy_list_photo.sql
        ct=$((ct + 1))
    done
    sed -i 's/photo_ptr_id/id/g;s/photosize_ptr_id/id/g;' copy_list_photo.sql
    exit 0
fi

ct=1
comma=""
for i in $LIST_TABLES_IN; do
    o="$(echo "$LIST_TABLES_OU" | cut -d ' ' -f $ct)"
    a="${a}${comma}${o}"
    comma=", "
    ct=$((ct + 1))
done

for o in $LIST_TABLES_TRUNCATE ; do
    a="${a}${comma}${o}"
done

echo "truncate ${a};" 
echo "truncate ${a};" | sudo -u postgres psql $PSQLARGS oqplatform >/dev/null
ct=1
for i in $LIST_TABLES_IN; do
    o="$(echo "$LIST_TABLES_OU" | cut -d ' ' -f $ct)"
    echo "copy ${o} FROM '${DIR}/${o}.csv' (FORMAT CSV, HEADER TRUE, DELIMITER ',') " | sudo -u postgres psql $PSQLARGS oqplatform
    ct=$((ct + 1))
done
