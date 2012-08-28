#!/bin/bash


cpt2hexval () {
    local fname val tot

    fname="$1"
    val="$2"
    tot="$3"

    grep -q '#[ 	]*COLOR_MODEL[ 	]=' fullsatur.cpt 
    if [ $? -eq 0 ]; then
        grep -q '#[ 	]*COLOR_MODEL[ 	]=[ 	]RGB' fullsatur.cpt 
        if [ $? -ne 0 ]; then
            return 1
        fi
    fi
    IFS='
'
    mn=1000000000
    mx=-1000000000
    for i in $(egrep -v '^#|^[A-Za-z]' "$fname"); do
        le="$(echo "$i" | awk '{ print $1; }')"
        ri="$(echo "$i" | awk '{ print $5; }')"
        if [ $(echo "$mn > $le" | bc -l) -eq 1 ]; then 
            mn="$le"
        fi
        if [ $(echo "$mx < $ri" | bc -l) -eq 1 ]; then
            mx="$ri"
        fi
    done

    # echo "MIN: $mn  MAX: $mx"

    # v : tot = x : (mx - mn)
    norm="$(echo "$mn + ($val * ($mx - $mn))  / $tot" | bc -l)"
    for i in $(egrep -v '^#|^[A-Za-z]' "$fname"); do
        le="$(echo "$i" | awk '{ print $1; }')"
        ri="$(echo "$i" | awk '{ print $5; }')"
        if [ $(echo "$norm >= $le && $norm < $ri" | bc -l) -eq 1 ]; then
            le_r="$(echo "$i" | awk '{ print $2; }')"
            le_g="$(echo "$i" | awk '{ print $3; }')"
            le_b="$(echo "$i" | awk '{ print $4; }')"
            ri_r="$(echo "$i" | awk '{ print $6; }')"
            ri_g="$(echo "$i" | awk '{ print $7; }')"
            ri_b="$(echo "$i" | awk '{ print $8; }')"
            printf "%02s" $(echo "ibase=10 ; obase=16 ; (1.0 - (($norm - $le) / ($ri - $le))) * $le_r + (($norm - $le) / ($ri - $le)) * $ri_r" | bc -l | sed 's/\..*//g') | sed 's/ /0/g'
            printf "%02s" $(echo "ibase=10 ; obase=16 ; (1.0 - (($norm - $le) / ($ri - $le))) * $le_g + (($norm - $le) / ($ri - $le)) * $ri_g" | bc -l | sed 's/\..*//g') | sed 's/ /0/g'
            printf "%02s\n" $(echo "ibase=10 ; obase=16 ; (1.0 - (($norm - $le) / ($ri - $le))) * $le_b + (($norm - $le) / ($ri - $le)) * $ri_b" | bc -l | sed 's/\..*//g') | sed 's/ /0/g'
            return 0
        fi
    done
    echo "OUTOFRANGE"
    return 1
}

#
#  MAIN
scale[1]='<MaxScaleDenominator>17471330</MaxScaleDenominator>'
scale[2]='<MinScaleDenominator>17471330</MinScaleDenominator>
       <MaxScaleDenominator>69885320</MaxScaleDenominator>'
scale[3]='<MinScaleDenominator>69885320</MinScaleDenominator>'

# 
# TEST FOR cpt2hexval
#
# for i in $(seq 0 5); do
#     cpt2hexval "fullsatur.cpt" $i 6
#     echo
# done
# exit 123

m_le[1]=inf ; m_ri[1]=4   ; m_desc[1]="        mw &lt;= 4"    ; m_sz[1]=1
m_le[2]=4   ; m_ri[2]=5   ; m_desc[2]="    4 &lt; mw &lt;= 5" ; m_sz[2]=2
m_le[3]=5   ; m_ri[3]=6   ; m_desc[3]="    5 &lt; mw &lt;= 6" ; m_sz[3]=3
m_le[4]=6   ; m_ri[4]=7   ; m_desc[4]="    6 &lt; mw &lt;= 7" ; m_sz[4]=4
m_le[5]=7   ; m_ri[5]=8   ; m_desc[5]="    7 &lt; mw &lt;= 8" ; m_sz[5]=5
m_le[6]=8   ; m_ri[6]=9   ; m_desc[6]="    8 &lt; mw &lt;= 9" ; m_sz[6]=6
m_le[7]=9   ; m_ri[7]=inf ; m_desc[7]="    9 &lt; mw     "    ; m_sz[7]=7

d_le[1]=inf ; d_ri[1]=15  ; d_desc[1]="        depth &lt;=  15 km" ; d_col[1]=$(cpt2hexval "fullsatur.cpt" 0 6)
d_le[2]=15  ; d_ri[2]=35  ; d_desc[2]=" 15km &lt; depth &lt;=  35 km" ; d_col[2]=$(cpt2hexval "fullsatur.cpt" 1 6)
d_le[3]=35  ; d_ri[3]=70  ; d_desc[3]=" 35km &lt; depth &lt;=  70 km" ; d_col[3]=$(cpt2hexval "fullsatur.cpt" 2 6)
d_le[4]=70  ; d_ri[4]=150 ; d_desc[4]=" 70km &lt; depth &lt;= 150 km" ; d_col[4]=$(cpt2hexval "fullsatur.cpt" 3 6)
d_le[5]=150 ; d_ri[5]=300 ; d_desc[5]="150km &lt; depth &lt;= 300 km" ; d_col[5]=$(cpt2hexval "fullsatur.cpt" 4 6)
d_le[6]=300 ; d_ri[6]=inf ; d_desc[6]="300km &lt; depth          " ; d_col[6]=$(cpt2hexval "fullsatur.cpt" 5 6)


cat <<EOF
<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor version="1.0.0" 
    xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" 
    xmlns="http://www.opengis.net/sld" 
    xmlns:ogc="http://www.opengis.net/ogc" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <NamedLayer>
    <Name>Attribute-based point</Name>
    <UserStyle>
      <Title>GeoServer SLD Cook Book: Attribute-based point</Title>
      <FeatureTypeStyle>
EOF

for z in 1 2 3; do
for d in $(seq 1 6); do

    cd_le=""
    cd_ri=""
    sz_null=$((1 + 6*(5 - z)))
    #
    # depth
    if [ "${d_le[$d]}" != "inf" ]; then
        cd_le="<ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>${d_le[$d]}</ogc:Literal>
               </ogc:PropertyIsGreaterThan>"
    fi
    if [ "${d_ri[$d]}" != "inf" ]; then
        cd_ri="<ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>${d_ri[$d]}</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>"
    fi
    title="$(echo "unknown mag AND ${d_desc[$d]}" | sed 's/ \+/ /g')"

    cat <<EOF
     <Rule>
       <Name>$title</Name>
       <Title>$title</Title>
       <ogc:Filter>
         <ogc:And>
           <ogc:PropertyIsNull>
             <ogc:PropertyName>mw</ogc:PropertyName>
           </ogc:PropertyIsNull>
           $cd_le
           $cd_ri
         </ogc:And>
       </ogc:Filter>
       ${scale[$z]}
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>triangle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#${d_col[$d]}</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">2</CssParameter>
             </Stroke>
           </Mark>
           <Size>$sz_null</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
EOF

for m in $(seq 1 7); do
    title="$(echo "${m_desc[$m]} AND ${d_desc[$d]}" | sed 's/ \+/ /g')"
    const_n=0

    cm_le=""
    cm_ri=""
    cd_le=""
    cd_ri=""
    #
    # magnitude
    if [ "${m_le[$m]}" != "inf" ]; then
        cm_le="<ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>${m_le[$m]}</ogc:Literal>
               </ogc:PropertyIsGreaterThan>"
        const_n=$((const_n + 1))
    fi
    if [ "${m_ri[$m]}" != "inf" ]; then
        cm_ri="<ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>${m_ri[$m]}</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>"
        const_n=$((const_n + 1))
    fi

    #
    # depth
    if [ "${d_le[$d]}" != "inf" ]; then
        cd_le="<ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>${d_le[$d]}</ogc:Literal>
               </ogc:PropertyIsGreaterThan>"
        const_n=$((const_n + 1))
    fi
    if [ "${d_ri[$d]}" != "inf" ]; then
        cd_ri="<ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>depth</ogc:PropertyName>
               <ogc:Literal>${d_ri[$d]}</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>"
        const_n=$((const_n + 1))
    fi
    if [ $const_n -gt 1 ]; then
        and_open="<ogc:And>"
        and_close="</ogc:And>"
    else
        and_open=""
        and_close=""
    fi

    # sz=$((1 + ii*(5-z)))
    sz=$((1 + m_sz[$m] * (5 - z)))

#        ${scale[$z]}

    cat <<EOF
     <Rule>
       <Name>$title</Name>
       <Title>$title</Title>
       <ogc:Filter>
         $and_open
           $cm_le
           $cm_ri
           $cd_le
           $cd_ri
         $and_close
       </ogc:Filter>
       ${scale[$z]}
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>circle</WellKnownName>
             <Fill>
               <CssParameter name="fill">#${d_col[$d]}</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">2</CssParameter>
             </Stroke>
           </Mark>
           <Size>$sz</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
EOF
done
done

for m in $(seq 1 7); do
    const_n=0

    cm_le=""
    cm_ri=""
    title="$(echo "${m_desc[$m]} AND unknown depth" | sed 's/ \+/ /g')"
    #
    # magnitude
    if [ "${m_le[$m]}" != "inf" ]; then
        cm_le="<ogc:PropertyIsGreaterThan>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>${m_le[$m]}</ogc:Literal>
               </ogc:PropertyIsGreaterThan>"
        const_n=$((const_n + 1))
    fi
    if [ "${m_ri[$m]}" != "inf" ]; then
        cm_ri="<ogc:PropertyIsLessThanOrEqualTo>
               <ogc:PropertyName>mw</ogc:PropertyName>
               <ogc:Literal>${m_ri[$m]}</ogc:Literal>
               </ogc:PropertyIsLessThanOrEqualTo>"
        const_n=$((const_n + 1))
    fi


    sz_null=$((1 + m_sz[$m] * (5 - z)))

    cat <<EOF
     <Rule>
       <Name>$title</Name>
       <Title>$title</Title>
       <ogc:Filter>
           <ogc:And>
             <ogc:PropertyIsNull>
               <ogc:PropertyName>depth</ogc:PropertyName>
             </ogc:PropertyIsNull>
             $cm_le
             $cm_ri
           </ogc:And>
       </ogc:Filter>
       ${scale[$z]}
       <PointSymbolizer>
         <Graphic>
           <Mark>
             <WellKnownName>square</WellKnownName>
             <Fill>
               <CssParameter name="fill">#606060</CssParameter>
               <CssParameter name="fill-opacity">0.5</CssParameter>
             </Fill>
             <Stroke>
               <CssParameter name="stroke">#000000</CssParameter>
               <CssParameter name="stroke-width">2</CssParameter>
             </Stroke>
           </Mark>
           <Size>$sz_null</Size>
         </Graphic>
       </PointSymbolizer>
     </Rule>
EOF

done
done

cat <<EOF
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>
EOF