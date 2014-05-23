#!/bin/bash
# set -x
IFS='
'
inputlist="$1"
rm -f missing.csv
rm -rf GeoArchive/*
mkdir -p GeoArchive/cache
rm -f imageslist.txt
for i in $(cat "$inputlist" ); do
    if [ -f "../GeoArchive/GeoArchive/$i" ]; then
        cp "../GeoArchive/GeoArchive/$i" ./GeoArchive/
        sz="$(identify -format "%[fx:w]x%[fx:h]" "../GeoArchive/GeoArchive/$i")"
        bname="$(basename "../GeoArchive/GeoArchive/$i" .jpg)"
        echo "GeoArchive/${bname}.jpg|$sz" >> imageslist.txt

        for ext in _overview_grid _photopage_large; do 
            if [ "$ext" = "_photopage_large" ]; then
                echo "${bname}${ext}.jpg"
                if [ -f "../GeoArchive/GeoArchive/cache/${bname}${ext}.jpg" ]; then
                    echo FOUND
                fi
            fi
            if [ -f "../GeoArchive/GeoArchive/cache/${bname}${ext}.jpg" ]; then
                cp "../GeoArchive/GeoArchive/cache/${bname}${ext}.jpg" "GeoArchive/cache/${bname}${ext}.jpg"
                sz="$(identify -format "%[fx:w]x%[fx:h]" "../GeoArchive/GeoArchive/cache/${bname}${ext}.jpg")"
                echo "GeoArchive/cache/${bname}${ext}.jpg|$sz" >> imageslist.txt
            fi
        done
    else
        echo "$i" >> missing.csv
    fi
done
for i in $(cat missing.csv); do
    bname="$(basename "../GeoArchive/GeoArchive/$i" .jpg)"
    echo "GeoArchive/${bname}.jpg|2736x3648" >> imageslist.txt
    echo "GeoArchive/cache/${bname}_overview_grid.jpg|90x120" >> imageslist.txt
done
