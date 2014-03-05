#!/bin/bash
fname="$1"
imgname="$2"
outpath="$3"

if [ ! -d "$outpath" ]; then
    mkdir -p "$outpath"
fi
if [ ! -d "$outpath/tmp" ]; then
    mkdir -p "$outpath/tmp"
fi

IFS='
'
for i in $(cat "$fname"); do
    name="$(echo "$i" | cut -d '|' -f 1)"
    geom="$(echo "$i" | cut -d '|' -f 2)"

    echo "name [$name]   geom [$geom]"
    dname="$(dirname ${outpath}/${name})"
    if [ ! -d "$dname" ]; then
        mkdir -p "$dname"
    fi

    if [ -f "$outpath/tmp/${geom}" ]; then
        cp "$outpath/tmp/${geom}" "${outpath}/${name}"
    else
        convert "$imgname" -geometry "${geom}!" "${outpath}/${name}"
        cp "${outpath}/${name}" "${outpath}/tmp/${geom}"
    fi
    rm -rf "$outpath/tmp"
done
