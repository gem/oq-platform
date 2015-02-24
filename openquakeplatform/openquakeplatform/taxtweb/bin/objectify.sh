#!/bin/bash
fin="$1"
ct=0
IFS='
'
echo
echo "var material = ["
comma=""
for i in $(grep 'MaterialCB11.push' $fin) ; do
    if [ "$comma" != "" ]; then
        echo "$comma"
    fi
    id="$(echo "$i" | sed 's@^[ /\*]\+@@g;s@[ /\*].*@@g')"
    desc="$(echo "$i" | sed "s@.*MaterialCB11\.push('@@g;s@');\$@@g")"
    echo "                 { id: '$id', desc: '$desc' }" | tr -d '\n'
    comma=","
done
echo
echo "               ];"

# Material Technology
echo
echo "var mat_tech_grp = [];"
first_grp="true"
grp=0
for i in $(egrep 'var MaterialCB21 = \[\];|MaterialCB21\.push' $fin ; echo "THE END") ; do
    if echo "$i" | grep -q "var MaterialCB21 = \[\];"; then
        if [ "$first_grp" != "true" ]; then
            echo
            echo "                  ];"
        fi
        echo "mat_tech_grp[$grp] = ["
        first_grp="false"
        comma=""
        grp=$((grp + 1))
    elif echo "$i" | grep -q "MaterialCB21.push"; then
        if [ "$comma" != "" ]; then
            echo "$comma"
        fi
        id="$(echo "$i" | sed 's@^[ /\*]\+@@g;s@[ /\*].*@@g')"
        desc="$(echo "$i" | sed "s@.*MaterialCB21\.push('@@g;s@');\$@@g")"
        echo "                    { id: '$id', desc: '$desc' }" | tr -d '\n'
        comma=","
    else
        echo
        echo "                  ];"
    fi
done

# Material Properties
echo
echo "var mat_prop_grp = [];"
first_grp="true"
grp=0
for i in $(egrep 'var MaterialCB31 = \[\];|MaterialCB31\.push' $fin ; echo "THE END") ; do
    if echo "$i" | grep -q "var MaterialCB31 = \[\];"; then
        if [ "$first_grp" != "true" ]; then
            echo
            echo "                  ];"
        fi
        echo "mat_prop_grp[$grp] = ["
        first_grp="false"
        comma=""
        grp=$((grp + 1))
    elif echo "$i" | grep -q "MaterialCB31.push"; then
        if [ "$comma" != "" ]; then
            echo "$comma"
        fi
        id="$(echo "$i" | sed 's@^[ /\*]\+@@g;s@[ /\*].*@@g')"
        desc="$(echo "$i" | sed "s@.*MaterialCB31\.push('@@g;s@');\$@@g")"
        echo "                    { id: '$id', desc: '$desc' }" | tr -d '\n'
        comma=","
    else
        echo
        echo "                  ];"
    fi
done

# Material technology (additional)
echo
echo "var mat_tead_grp = [];"
first_grp="true"
grp=0
for i in $(egrep 'var MaterialCB41 = \[\];|MaterialCB41\.push' $fin ; echo "THE END") ; do
    if echo "$i" | grep -q "var MaterialCB41 = \[\];"; then
        if [ "$first_grp" != "true" ]; then
            echo
            echo "                  ];"
        fi
        echo "mat_tead_grp[$grp] = ["
        first_grp="false"
        comma=""
        grp=$((grp + 1))
    elif echo "$i" | grep -q "MaterialCB41.push"; then
        if [ "$comma" != "" ]; then
            echo "$comma"
        fi
        id="$(echo "$i" | sed 's@^[ /\*]\+@@g;s@[ /\*].*@@g')"
        desc="$(echo "$i" | sed "s@.*MaterialCB41\.push('@@g;s@');\$@@g")"
        echo "                    { id: '$id', desc: '$desc' }" | tr -d '\n'
        comma=","
    else
        echo
        echo "                  ];"
    fi
done


# Lateral load-resisting system
echo
echo "var llrs_type_grp = [];"
first_grp="true"
grp=0
for i in $(egrep 'var SystemCB11 = \[\];|SystemCB11\.push' $fin ; echo "THE END") ; do
    if echo "$i" | grep -q "var SystemCB11 = \[\];"; then
        if [ "$first_grp" != "true" ]; then
            echo
            echo "                  ];"
        fi
        echo "llrs_type_grp[$grp] = ["
        first_grp="false"
        comma=""
        grp=$((grp + 1))
    elif echo "$i" | grep -q "SystemCB11.push"; then
        if [ "$comma" != "" ]; then
            echo "$comma"
        fi
        id="$(echo "$i" | sed 's@^[ /\*]\+@@g;s@[ /\*].*@@g')"
        desc="$(echo "$i" | sed "s@.*SystemCB11\.push('@@g;s@');\$@@g")"
        echo "                    { id: '$id', desc: '$desc' }" | tr -d '\n'
        comma=","
    else
        echo
        echo "                  ];"
    fi
done


# Lateral load-resisting system ductility
echo
echo "var llrs_duct_grp = [];"
first_grp="true"
grp=0
for i in $(egrep 'var SystemCB21 = \[\];|SystemCB21\.push' $fin ; echo "THE END") ; do
    if echo "$i" | grep -q "var SystemCB21 = \[\];"; then
        if [ "$first_grp" != "true" ]; then
            echo
            echo "                  ];"
        fi
        echo "llrs_duct_grp[$grp] = ["
        first_grp="false"
        comma=""
        grp=$((grp + 1))
    elif echo "$i" | grep -q "SystemCB21.push"; then
        if [ "$comma" != "" ]; then
            echo "$comma"
        fi
        id="$(echo "$i" | sed 's@^[ /\*]\+@@g;s@[ /\*].*@@g')"
        desc="$(echo "$i" | sed "s@.*SystemCB21\.push('@@g;s@');\$@@g")"
        echo "                    { id: '$id', desc: '$desc' }" | tr -d '\n'
        comma=","
    else
        echo
        echo "                  ];"
    fi
done

# Height
declare -a h_names
h_names=("notused" "h_aboveground" "h_belowground" "h_abovegrade" "h_slope")
for n in 1 2 3 4; do
    first_grp="true"
    grp=0
    for i in $(egrep "var HeightCB${n} = \[\];|HeightCB${n}\.push" $fin ; echo "THE END") ; do
        if echo "$i" | grep -q "var HeightCB${n} = \[\];"; then
            if [ "$first_grp" != "true" ]; then
                echo
                echo "                  ];"
            fi
            echo
            echo "var ${h_names[$n]} = ["
            first_grp="false"
            comma=""
            grp=$((grp + 1))
        elif echo "$i" | grep -q "HeightCB${n}.push"; then
            if [ "$comma" != "" ]; then
                echo "$comma"
            fi
            id="$(echo "$i" | sed 's@^[ /\*]\+@@g;s@[ /\*].*@@g')"
            desc="$(echo "$i" | sed "s@.*HeightCB${n}\.push('@@g;s@');\$@@g")"
            echo "                    { id: '$id', desc: '$desc' }" | tr -d '\n'
            comma=","
        else
            echo
            echo "                  ];"
        fi
    done
done

# date
echo
echo "var date_type = ["
comma=""
for i in $(grep 'DateCB1.push' $fin) ; do
    if [ "$comma" != "" ]; then
        echo "$comma"
    fi
    id="$(echo "$i" | sed 's@^[ /\*]\+@@g;s@[ /\*].*@@g')"
    desc="$(echo "$i" | sed "s@.*DateCB1\.push('@@g;s@');\$@@g")"
    echo "                 { id: '$id', desc: '$desc' }" | tr -d '\n'
    comma=","
done
echo
echo "               ];"


# date
echo
echo "var occupancy = ["
comma=""
for i in $(grep 'OccupancyCB1.push' $fin) ; do
    if [ "$comma" != "" ]; then
        echo "$comma"
    fi
    id="$(echo "$i" | sed 's@^[ /\*]\+@@g;s@[ /\*].*@@g')"
    desc="$(echo "$i" | sed "s@.*OccupancyCB1\.push('@@g;s@');\$@@g")"
    echo "                 { id: '$id', desc: '$desc' }" | tr -d '\n'
    comma=","
done
echo
echo "               ];"

# Lateral load-resisting system ductility
echo
echo "var occupancy_spec_grp = [];"
first_grp="true"
grp=0
for i in $(egrep 'var OccupancyCB2 = \[\];|OccupancyCB2\.push' $fin ; echo "THE END") ; do
    if echo "$i" | grep -q "var OccupancyCB2 = \[\];"; then
        if [ "$first_grp" != "true" ]; then
            echo
            echo "                  ];"
        fi
        echo "occupancy_spec_grp[$grp] = ["
        first_grp="false"
        comma=""
        grp=$((grp + 1))
    elif echo "$i" | grep -q "OccupancyCB2.push"; then
        if [ "$comma" != "" ]; then
            echo "$comma"
        fi
        id="$(echo "$i" | sed 's@^[ /\*]\+@@g;s@[ /\*].*@@g')"
        desc="$(echo "$i" | sed "s@.*OccupancyCB2\.push('@@g;s@');\$@@g")"
        echo "                    { id: '$id', desc: '$desc' }" | tr -d '\n'
        comma=","
    else
        echo
        echo "                  ];"
    fi
done
