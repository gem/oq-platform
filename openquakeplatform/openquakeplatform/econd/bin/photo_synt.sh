#!/bin/bash
# set -x
fname="$1"
imgname="$2"
outpath="$3"
cachepath="$3/tmp"

if [ ! -d "$outpath" ]; then
    mkdir -p "$outpath"
fi
if [ ! -d "$cachepath" ]; then
    mkdir -p "$cachepath"
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

    if [ -f "${cachepath}/${geom}" ]; then
        cp "${cachepath}/${geom}" "${outpath}/${name}"
    else
        convert "$imgname" -geometry "${geom}!" "${outpath}/${name}"
        cp "${outpath}/${name}" "${cachepath}/${geom}"
    fi
done
rm -rf "${cachepath}"
