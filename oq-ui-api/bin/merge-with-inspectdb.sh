#!/bin/bash
#set -x
NL='
'
TB='	'
IFS='
'

declare -a anticirc

function find_anticirc () {
    local needle="$1"

    for value in "${anticirc[@]}"; do
        echo "CHECK [$value]" >&2
        if [ "$value" = "$needle" ]; then
            return 0
        fi
    done

    return 1
}

findimport () 
{
    declare -a list=("$@")
    local fname post

    for fname in "${list[@]}"; do
        echo "xxx PATH: [$fname] xxx" >&2

        if [ ! -f "$fname" ]; then
            continue
        fi
        if find_anticirc "$fname"; then
            continue
        else
            anticirc+=("$fname")
        fi

        for post in $(egrep '^from |^import ' "$fname"); do
            if echo "$post" | grep -q '^from ' ; then
                echo FROM $post >&2
                pt="$(echo "$post" | sed 's/^from //g;s/ .*//g;s@\.@/@g;s/$/.py/g')"
                findimport "$pt"
            elif echo "$post" | grep -q '^import ' ; then
                echo "WARNING: IMPORT $post" >&2
            else
                echo "ERROR $post" >&2
                exit 1
            fi
        done
    done
}

k2v () {
    declare -a k_arr=("${!1}") v_arr=("${!2}")
    local i key="$3"

    for i in $(seq 0 $(( ${#k_arr[@]} - 1 )) ); do
        if [ "${k_arr[$i]}" = "$key" -o "${k_arr[$i]}" = "'${key}'" -o "${k_arr[$i]}" = "\"${key}\"" -o "'${k_arr[$i]}'" = "${key}" -o "\"${k_arr[$i]}\"" = "${key}" ]; then
            echo "${v_arr[$i]}"
            return 0
        fi
    done
    return 1
}


pars2kv () {
    local kvname="$1" in_s="$2"
    local c pt key value

    pt="BEGIN"
    key=""
    value=""
    unset karr varr
    declare -a karr varr
                  
    for i in $(seq 0 $((${#in_s} - 1)) ); do
        c="${in_s:$i:1}"
        case "$pt" in
            "BEGIN")
                if [ "$c" != " " -a "$c" != "$TB" -a "$c" != "," ]; then
                    pt="KEY"
                    key="$c"
                fi
                ;;
            "KEY")
                if [ "$c" = "=" ]; then
                    pt="VAL"
                    value=""
                    del=""
                elif [ "$c" = "," ]; then
                    # kv[$key]=""
                    karr+=("$key")
                    varr+=("")
                    pt="BEGIN"
                elif [ "$c" != " " -a "$c" != "$TB" ]; then
                    key="${key}${c}"
                fi
                ;;
            "VAL")
                if [ -z "$value" ]; then
                    if [ "$c" = "'" -o "$c" = '"' ]; then
                        pt="VAL_DEL"
                        del="$c"
                    elif [ "$c" != " " -a "$c" != "$TB" ]; then
                        value="${value}${c}"
                    fi
                elif [ "$c" = "," ]; then
                    # end key=val
                    # kv[$key]="${del}${value}${del}"
                    karr+=("$key")
                    varr+=("${del}${value}${del}")
                    pt="BEGIN"
                else
                    value="${value}${c}"
                fi
                ;;
            "VAL_DEL")
                if [ "$c" = "$del" ]; then
                    # end key=val
                    # kv[$key]="${del}${value}${del}"
                    karr+=("$key")
                    varr+=("${del}${value}${del}")
                    pt="BEGIN"
                else
                    value="${value}${c}"
                fi
                ;;
        esac
        # echo "{$c}${pt}"
    done

    if [ "$pt" = "VAL" -a -n "$key" ]; then
        # kv[$key]="${del}${value}${del}"
        karr+=("$key")
        varr+=("${del}${value}${del}")
    fi
    # for K in "${!kv[@]}"; do
    #     echo "[$K] --- [${kv[$K]}]"
    # done

    for i in $( seq 0 $((${#karr[@]} - 1)) ); do
        eval "${kvname}_k[$i]=\"$(echo "${karr[$i]}" | sed 's/"/\\"/g')\""
        eval "${kvname}_v[$i]=\"$(echo "${varr[$i]}" | sed 's/"/\\"/g')\""
    done
}

#
#  MAIN
#
declare -a claskip

claskip=('Lookupyesnonull' 'Lookupsubjectmastercode' 'Lookupsubjectsubcode' 'Lookuptypeofstructurecode' 'Lookupcityscalecode' 'Pagetype' 'Page' 'ResourceConnection' 'Document' 'DownloadLog' )

OUTDIR=merged
# INSPFILE=~/inspectdb_result.py
INSPFILE=~/mydump_econd.py

findimport econd/models.py weblib/models.py

if [ -d "$OUTDIR" ]; then
    rm -rf "$OUTDIR"
fi
mkdir "$OUTDIR"

DBG=""
DBG2=""

for pyname in "${anticirc[@]}"; do
    echo "=== FILE: $pyname ===" >&2
    mkdir -p "${OUTDIR}/$(dirname "$pyname")"
    touch "${OUTDIR}/$pyname"
    st="BEGIN"
IFS='
'
    for plin in $(cat $pyname | sed 's/$/X/g'); do
        lin="$(echo "$plin" | sed 's/X$//g')"
        # echo "LIN: [$lin]"
        case "$st" in

#class LocationsForJSON ( models.Model ):
#        db_table = u'econd\".\"gemecdlocationsforjson'     #note this is a VIEW


            "BEGIN")
                if echo "$lin" | grep -q '^class '; then
                    st="ATTRS"
                    # "class WebLibPhoto(ImageModel):"
                    class_name="$(echo "$lin" | sed 's/class \+//g;s/ *(.*//g')"
                    test "$DBG" && echo "#---- CLASS: [$class_name] ($lin)" 
                    test "$DBG" && echo "# CLASSNAME: [$class_name]" >> "${OUTDIR}/$pyname"

                    table_name="$(sed -n "/class ${class_name} *(/,/^class /p" "$pyname" | grep " *db_table *= *" | sed 's/["'"'"'][^"'"'"']*$//g' | sed 's/.*["'"'"']\([^"]\+\)/\1/g')" # us '
                    if [ "$table_name" != "" ]; then
                        table_name="$(echo "${table_name^}" | sed 's/_\([a-z]\)/\u\1/g')"
                    else
                        table_name="$class_name"
                    fi
                    test "$DBG" && echo "#TABLE_NAME: [$table_name]"

                    missing_class=""
                    skipped=""
                    if ! sed -n "/class ${table_name}(/,/^[^=]*$/p" "$INSPFILE" | grep -q "class $table_name"; then
                        missing_class=y
                        for sky in "${claskip[@]}"; do
                            if [ "$sky" = "$class_name" ]; then
                                skipped=y
                                break
                            fi
                        done
                        if [ "$skipped" != "y" ]; then
                            echo "#WARNING: CLASS $class_name NOT FOUND (from $pyname)"
                        fi
                    fi
                fi
                if [ "$DBG2" ]; then
                    sst="$st: "
                    if [ "$st" = "ATTRS" ]; then
                        sst="CLASS: "
                    fi
                fi
                echo "$sst$lin" >> "${OUTDIR}/$pyname"
                ;;
            "ATTRS")
                if  echo "$lin" | grep -q '^ *#.*'; then
                    test "$DBG2" && sst="$st: "
                    echo "$sst$lin" >> "${OUTDIR}/$pyname"
                    
                    
                elif echo "$lin" | grep -q ' *= *'; then
                    # st="ATTRS"
                    if [ -z "$missing_class" ]; then
                        attr_name="$(echo "$lin" | sed 's/^[ 	]*//g;s/ *=.*//g')"
                        test "$DBG" && echo "ATTR_NAME: $attr_name ($lin)" >&2
                        test "$DBG" && echo "# ATTRNAME: [$attr_name]" >> "${OUTDIR}/$pyname"

                        pars="$(echo "$lin" | sed 's/^[^(]*(//g;s/)[^)]*$//g')"
                        test "$DBG" && echo "PARS: [$pars]"
                        kvname_cur="kv_orig"
                        unset "${kvname_cur}_k"  "${kvname_cur}_v"; declare -a "${kvname_cur}_k" "${kvname_cur}_v"
                        pars2kv "$kvname_cur" "$pars"

                        for i in $(seq 0 $((${#kv_orig_k[@]} - 1)) ); do
                            test "$DBG" && echo "kv_orig [${kv_orig_k[$i]}] => [${kv_orig_v[$i]}]" >&2
                        done
#    exit 123
                        verbose_name="$(k2v kv_orig_k[@] kv_orig_v[@] 'verbose_name')"
                        help_text="$(k2v kv_orig_k[@] kv_orig_v[@] 'help_text')"
                        db_column="$(k2v kv_orig_k[@] kv_orig_v[@] 'db_column')"
                        if [ -z "$db_column" ]; then
                            db_column="$attr_name"
                        fi

                        test "$DBG" && echo "# VERBNAME: [$verbose_name]" >> "${OUTDIR}/$pyname"
                        test "$DBG" && echo "# HELPTEXT: [$help_text]" >> "${OUTDIR}/$pyname"
                        test "$DBG" && echo "# DB_COLUM: [$db_column]" >> "${OUTDIR}/$pyname"
# exit 123
                        
                        test "$DBG2" && sst="$st: "
                        
                        reline="$(sed -n "/class ${table_name}(/,/^[^=]*$/p" "$INSPFILE" | grep "^[ ${TB}]*$db_column[ ${TB}]=.*")"
                        reline_args="$(echo "$reline" | sed 's/^[^(]*(//g;s/)[^)]*$//g')"

                        test "$DBG" && echo "RELINE: [$reline] RELINE_ARGS: [$reline_args]" >&2

                        kvname_cur="kv_reli"
                        unset "${kvname_cur}_k"  "${kvname_cur}_v"; declare -a "${kvname_cur}_k" "${kvname_cur}_v"
                        pars2kv "$kvname_cur" "$reline_args"

                        # for i in $(seq 0 $(( ${#kv_reli_k[@]} - 1)) ); do
                        #    test "$DBG" && echo "kv_reli [${kv_reli_k[$i]}] => [${kv_reli_v[$i]}]" >&2
                        #done

                        # exit 123
                        #if [ $? -ne 0 ]; then
                        #    echo "WARNING ${pyname}:${class_name}.${attr_name} not found ($lin)"
                        #    if [ "$class_name" = "Lookupyesnonull" ]; then
                        #        echo "vvvvvvvvvvvvv"
                        #    sed -n "/class ${class_name}(/,/^[^=]*$/p" "$INSPFILE"
                        #    echo "^^^^^^^^^^^^^"
                        #    fi
                        #fi
                        test "$DBG" && echo "# RELIN: $reline" >> "${OUTDIR}/$pyname"
                        # echo "$sst$lin" >> "${OUTDIR}/$pyname"

                        echo "$lin" | sed 's/\(^[^(]*(\).*/\1/g' | tr -d '\n' >> "${OUTDIR}/$pyname"

                        for i in $(seq 0 $((${#kv_orig_k[@]} - 1)) ); do
                            v_reli="$(k2v kv_reli_k[@] kv_reli_v[@] "${kv_orig_k[$i]}")"
                            if [ $? -eq 0 ]; then
                                echo "${kv_orig_k[$i]}" | tr -d '\n' >> "${OUTDIR}/$pyname"
                                if [ "${v_reli}" ]; then
                                    echo "=${v_reli}" | tr -d '\n' >> "${OUTDIR}/$pyname"
                                fi
                                
                            else
                                echo "${kv_orig_k[$i]}" | tr -d '\n' >> "${OUTDIR}/$pyname"
                                if [ "${kv_orig_v[$i]}" ]; then
                                    echo "=${kv_orig_v[$i]}" | tr -d '\n' >> "${OUTDIR}/$pyname"
                                fi
                            fi
                            echo ", " | tr -d '\n' >> "${OUTDIR}/$pyname"
                        done
                        for i in $(seq 0 $((${#kv_reli_k[@]} - 1)) ); do
                            v_reli="$(k2v kv_orig_k[@] kv_orig_v[@] "${kv_reli_k[$i]}")"
                            if [ $? -ne 0 ]; then
                                echo "${kv_reli_k[$i]}" | tr -d '\n' >> "${OUTDIR}/$pyname"
                                if [ "${kv_reli_v[$i]}" ]; then
                                    echo "=${kv_reli_v[$i]}" | tr -d '\n' >> "${OUTDIR}/$pyname"
                                fi
                                echo ", " | tr -d '\n' >> "${OUTDIR}/$pyname"
                            fi
                        done
                        echo "$lin" | sed 's/.*\().*\)/\1/g' >> "${OUTDIR}/$pyname"
                        
                    else
                        echo "$sst$lin" >> "${OUTDIR}/$pyname"
                    fi
                else
                    st="BEGIN"
                    test "$DBG2" && sst="$st: "
                    echo "$sst$lin" >> "${OUTDIR}/$pyname"
                fi
                ;;
            *)
                ;;
        esac
    done
done

