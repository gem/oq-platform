#!/bin/bash
fname="$1"
imgname="$2"
outpath="$3"

if [ ! -d "$outpath" ]; then
    mkdir -p "$outpath"
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

    convert "$imgname" -geometry "${geom}!" "${outpath}/${name}"
done
