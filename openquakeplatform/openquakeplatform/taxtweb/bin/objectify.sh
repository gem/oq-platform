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


# occupancy
echo
echo "var occu_type = ["
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
echo "var occu_spec_grp = [];"
first_grp="true"
grp=0
for i in $(egrep 'var OccupancyCB2 = \[\];|OccupancyCB2\.push' $fin ; echo "THE END") ; do
    if echo "$i" | grep -q "var OccupancyCB2 = \[\];"; then
        if [ "$first_grp" != "true" ]; then
            echo
            echo "                  ];"
        fi
        echo "occu_spec_grp[$grp] = ["
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

# Position
echo
echo "var bupo_type = ["
comma=""
for i in $(grep 'PositionCB.push' $fin) ; do
    if [ "$comma" != "" ]; then
        echo "$comma"
    fi
    id="$(echo "$i" | sed 's@^[ /\*]\+@@g;s@[ /\*].*@@g')"
    desc="$(echo "$i" | sed "s@.*PositionCB\.push('@@g;s@');\$@@g")"
    echo "                 { id: '$id', desc: '$desc' }" | tr -d '\n'
    comma=","
done
echo
echo "               ];"

# PlanShape
echo
echo "var plsh_type = ["
comma=""
for i in $(grep 'PlanShapeCB.push' $fin) ; do
    if [ "$comma" != "" ]; then
        echo "$comma"
    fi
    id="$(echo "$i" | sed 's@^[ /\*]\+@@g;s@[ /\*].*@@g')"
    desc="$(echo "$i" | sed "s@.*PlanShapeCB\.push('@@g;s@');\$@@g")"
    echo "                 { id: '$id', desc: '$desc' }" | tr -d '\n'
    comma=","
done
echo
echo "               ];"

# structural irregularity
echo
echo "var stir_type = ["
comma=""
for i in $(grep 'RegularityCB1.push' $fin) ; do
    if [ "$comma" != "" ]; then
        echo "$comma"
    fi
    id="$(echo "$i" | sed 's@^[ /\*]\+@@g;s@[ /\*].*@@g')"
    desc="$(echo "$i" | sed "s@.*RegularityCB1\.push('@@g;s@');\$@@g")"
    echo "                 { id: '$id', desc: '$desc' }" | tr -d '\n'
    comma=","
done
echo
echo "               ];"

# plan structural irregularity
echo
echo "var plan_irre = ["
comma=""
for i in $(grep 'RegularityCB2.push' $fin) ; do
    if [ "$comma" != "" ]; then
        echo "$comma"
    fi
    id="$(echo "$i" | sed 's@^[ /\*]\+@@g;s@[ /\*].*@@g')"
    desc="$(echo "$i" | sed "s@.*RegularityCB2\.push('@@g;s@');\$@@g")"
    echo "                 { id: '$id', desc: '$desc' }" | tr -d '\n'
    comma=","
done
echo
echo "               ];"

# plan structural irregularity (secondary)
echo
echo "var plan_seco = ["
comma=""
for i in $(grep 'RegularityCB4.push' $fin) ; do
    if [ "$comma" != "" ]; then
        echo "$comma"
    fi
    id="$(echo "$i" | sed 's@^[ /\*]\+@@g;s@[ /\*].*@@g')"
    desc="$(echo "$i" | sed "s@.*RegularityCB4\.push('@@g;s@');\$@@g")"
    echo "                 { id: '$id', desc: '$desc' }" | tr -d '\n'
    comma=","
done
echo
echo "               ];"

# plan vertical irregularity
echo
echo "var vert_irre = ["
comma=""
for i in $(grep 'RegularityCB3.push' $fin) ; do
    if [ "$comma" != "" ]; then
        echo "$comma"
    fi
    id="$(echo "$i" | sed 's@^[ /\*]\+@@g;s@[ /\*].*@@g')"
    desc="$(echo "$i" | sed "s@.*RegularityCB3\.push('@@g;s@');\$@@g")"
    echo "                 { id: '$id', desc: '$desc' }" | tr -d '\n'
    comma=","
done
echo
echo "               ];"

# plan vertical irregularity (secondary)
echo
echo "var vert_seco = ["
comma=""
for i in $(grep 'RegularityCB5.push' $fin) ; do
    if [ "$comma" != "" ]; then
        echo "$comma"
    fi
    id="$(echo "$i" | sed 's@^[ /\*]\+@@g;s@[ /\*].*@@g')"
    desc="$(echo "$i" | sed "s@.*RegularityCB5\.push('@@g;s@');\$@@g")"
    echo "                 { id: '$id', desc: '$desc' }" | tr -d '\n'
    comma=","
done
echo
echo "               ];"

# walls
echo
echo "var wall_type = ["
comma=""
for i in $(grep 'WallsCB.push' $fin) ; do
    if [ "$comma" != "" ]; then
        echo "$comma"
    fi
    id="$(echo "$i" | sed 's@^[ /\*]\+@@g;s@[ /\*].*@@g')"
    desc="$(echo "$i" | sed "s@.*WallsCB\.push('@@g;s@');\$@@g")"
    echo "                 { id: '$id', desc: '$desc' }" | tr -d '\n'
    comma=","
done
echo
echo "               ];"


#
#  Roof
#

# shape
echo
echo "var roof_shap = ["
comma=""
for i in $(grep 'RoofCB1.push' $fin) ; do
    if [ "$comma" != "" ]; then
        echo "$comma"
    fi
    id="$(echo "$i" | sed 's@^[ /\*]\+@@g;s@[ /\*].*@@g')"
    desc="$(echo "$i" | sed "s@.*RoofCB1\.push('@@g;s@');\$@@g")"
    echo "                 { id: '$id', desc: '$desc' }" | tr -d '\n'
    comma=","
done
echo
echo "               ];"

# covering
echo
echo "var roof_cove = ["
comma=""
for i in $(grep 'RoofCB2.push' $fin) ; do
    if [ "$comma" != "" ]; then
        echo "$comma"
    fi
    id="$(echo "$i" | sed 's@^[ /\*]\+@@g;s@[ /\*].*@@g')"
    desc="$(echo "$i" | sed "s@.*RoofCB2\.push('@@g;s@');\$@@g")"
    echo "                 { id: '$id', desc: '$desc' }" | tr -d '\n'
    comma=","
done
echo
echo "               ];"

# material
echo
echo "var roof_mate = ["
comma=""
for i in $(grep 'RoofCB3.push' $fin) ; do
    if [ "$comma" != "" ]; then
        echo "$comma"
    fi
    id="$(echo "$i" | sed 's@^[ /\*]\+@@g;s@[ /\*].*@@g')"
    desc="$(echo "$i" | sed "s@.*RoofCB3\.push('@@g;s@');\$@@g")"
    echo "                 { id: '$id', desc: '$desc' }" | tr -d '\n'
    comma=","
done
echo
echo "               ];"

# Roof system
echo
echo "var roof_sys_grp = [];"
first_grp="true"
grp=0
for i in $(egrep 'var RoofCB4 = \[\];|RoofCB4\.push' $fin ; echo "THE END") ; do
    if echo "$i" | grep -q "var RoofCB4 = \[\];"; then
        if [ "$first_grp" != "true" ]; then
            echo
            echo "                  ];"
        fi
        echo "roof_sys_grp[$grp] = ["
        first_grp="false"
        comma=""
        grp=$((grp + 1))
    elif echo "$i" | grep -q "RoofCB4.push"; then
        if [ "$comma" != "" ]; then
            echo "$comma"
        fi
        id="$(echo "$i" | sed 's@^[ /\*]\+@@g;s@[ /\*].*@@g')"
        desc="$(echo "$i" | sed "s@.*RoofCB4\.push('@@g;s@');\$@@g")"
        echo "                    { id: '$id', desc: '$desc' }" | tr -d '\n'
        comma=","
    else
        echo
        echo "                  ];"
    fi
done



# connection
echo
echo "var roof_conn = ["
comma=""
for i in $(grep 'RoofCB5.push' $fin) ; do
    if [ "$comma" != "" ]; then
        echo "$comma"
    fi
    id="$(echo "$i" | sed 's@^[ /\*]\+@@g;s@[ /\*].*@@g')"
    desc="$(echo "$i" | sed "s@.*RoofCB5\.push('@@g;s@');\$@@g")"
    echo "                 { id: '$id', desc: '$desc' }" | tr -d '\n'
    comma=","
done
echo
echo "               ];"




#
#  Floor
#

# floor system material
echo
echo "var floo_syma = ["
comma=""
for i in $(grep 'FloorCB1.push' $fin) ; do
    if [ "$comma" != "" ]; then
        echo "$comma"
    fi
    id="$(echo "$i" | sed 's@^[ /\*]\+@@g;s@[ /\*].*@@g')"
    desc="$(echo "$i" | sed "s@.*FloorCB1\.push('@@g;s@');\$@@g")"
    echo "                 { id: '$id', desc: '$desc' }" | tr -d '\n'
    comma=","
done
echo
echo "               ];"


# floor connection
echo
echo "var floo_conn_grp = [];"
first_grp="true"
grp=0
for i in $(egrep 'var FloorCB2 = \[\];|FloorCB2\.push' $fin ; echo "THE END") ; do
    if echo "$i" | grep -q "var FloorCB2 = \[\];"; then
        if [ "$first_grp" != "true" ]; then
            echo
            echo "                  ];"
        fi
        echo "floo_conn_grp[$grp] = ["
        first_grp="false"
        comma=""
        grp=$((grp + 1))
    elif echo "$i" | grep -q "FloorCB2.push"; then
        if [ "$comma" != "" ]; then
            echo "$comma"
        fi
        id="$(echo "$i" | sed 's@^[ /\*]\+@@g;s@[ /\*].*@@g')"
        desc="$(echo "$i" | sed "s@.*FloorCB2\.push('@@g;s@');\$@@g")"
        echo "                    { id: '$id', desc: '$desc' }" | tr -d '\n'
        comma=","
    else
        echo
        echo "                  ];"
    fi
done

# floor system type
echo
echo "var floo_syty = ["
comma=""
for i in $(grep 'FloorCB3.push' $fin) ; do
    if [ "$comma" != "" ]; then
        echo "$comma"
    fi
    id="$(echo "$i" | sed 's@^[ /\*]\+@@g;s@[ /\*].*@@g')"
    desc="$(echo "$i" | sed "s@.*FloorCB3\.push('@@g;s@');\$@@g")"
    echo "                 { id: '$id', desc: '$desc' }" | tr -d '\n'
    comma=","
done
echo
echo "               ];"

#
#  foundations
#
echo
echo "var foun_type = ["
comma=""
for i in $(grep 'FoundationsCB.push' $fin) ; do
    if [ "$comma" != "" ]; then
        echo "$comma"
    fi
    id="$(echo "$i" | sed 's@^[ /\*]\+@@g;s@[ /\*].*@@g')"
    desc="$(echo "$i" | sed "s@.*FoundationsCB\.push('@@g;s@');\$@@g")"
    echo "                 { id: '$id', desc: '$desc' }" | tr -d '\n'
    comma=","
done
echo
echo "               ];"


