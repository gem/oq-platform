#!/bin/bash
if [ $GEM_SET_DEBUG ]; then
    set -x
fi
set -e
# export PS4='+${BASH_SOURCE}:${LINENO}:${FUNCNAME[0]}: '
export PS4='+${LINENO}:${FUNCNAME[0]}: '
#
#  TODO
#    - investigate default workspace
#
#  global vars
# === experimental geoserver 2.0 ===
# GEM_USER=here-your-user
GEM_USER=admin
# GEM_PASS=here-your-pass
GEM_PASS=geoserver
# GEM_HOST=oq-platform-mn.gem.lan
GEM_HOST=127.0.0.1
# GEM_PROTO=http
GEM_PROTO=http

if [ ! "$GEM_GEONODE_PORT" ]; then
    GEM_GEONODE_PORT=8000
fi
if [ ! "$GEM_GEOSERVER_PORT" ]; then
    GEM_GEOSERVER_PORT=8080
fi
GEM_PORT=":$GEM_GEOSERVER_PORT"

GEM_SITE="${GEM_PROTO}://${GEM_HOST}${GEM_PORT}"

GEM_EXIT_ON_ERROR=false
#
#  private vars
OUTDIR=output/
RESTDIR=output.restore/
# CURL_OUT=/dev/null
CURL_OUT=${OUTDIR}/tmp/curl.log
TB='	'
NL='
'

#
#  web_command
web_cmd () {
    local webtool="$1" cmd="$2" fname="$3" url="$4" expt="$5"
    local webret ret oldifs dname

    local -a opt_args=("${!6}")

    dname="$(dirname "$fname")/"
    fname="$(basename "$fname")"

    if [ -n "$dname" ]; then
        if [ ! -d "$dname" ]; then
            mkdir -p "${OUTDIR}$dname"
            if [ $? -ne 0 ]; then
                echo "Directory creation [${OUTDIR}$dname] failed"
                exit 1
            fi
        fi
    fi

    # urlencoding of space char
    url="$(echo "$url" | sed 's/ /%20/g')"

    $webtool -v -s -o "${OUTDIR}${dname}${fname}" -D "${OUTDIR}${dname}${fname}.hea" -u $GEM_USER:$GEM_PASS -X$cmd "${opt_args[@]}" "$url"  >>${CURL_OUT} 2>&1
    webret=$?

    if [ $webret -ne 0 ]; then
        ret=$webret
    else
        webret="$(cat "${OUTDIR}${dname}${fname}.hea" | grep '^HTTP' | tail -n 1 | cut -d ' ' -f 2)"
        if [ "$webret" != "$expt" ]; then
            ret="$webret"
        else
            ret=0
        fi
    fi
    if [ $ret -ne 0 ] ; then
        if [ "$GEM_EXIT_ON_ERROR" = "true" ]; then
            exit $ret
        else
            echo "WARNING:"  $webtool -v -s -o "${OUTDIR}${dname}${fname}" -D "${OUTDIR}${dname}${fname}.hea" -u $GEM_USER:$GEM_PASS -X$cmd "${opt_args[@]}" "$url"
            echo "WARNING: web_cmd $webtool $cmd $fname $others $url $expt"
            echo "         expect $expt, receive $ret (log into: ${OUTDIR}${dname}${fname}[.hea])"
        fi
    fi

    return $ret
}

web_get () {
    local fname="$1" url="$2" expt="$3"
    local -a arr

    # local webtool="$1" cmd="$2" fname="$3" url="$4" expt="$5"
    web_cmd curl GET "$fname" "$url" "$expt" arr[@]
}

web_del () {
    local fname="$1" url="$2" expt="$3"
    local -a arr

    # touch "${OUTDIR}${fname}"
    # echo web_cmd ...
    web_cmd curl DELETE "$fname" "$url" "$expt" arr[@]
}


# Examples: 
#   curl -v -s -o output/ws.ged.post.xml -u <user>:<password> -XPOST -H Content-type: text/xml -d '<workspace><name>ged</name></workspace>' ${GEM_PROTO}://oq-platform2-mn.gem.lan${GEM_PORT}/geoserver/rest/workspaces
#   curl -v -s -o output/ws.ged.post.xml -u <user>:<password> -H Content-type: text/xml -d '<workspace><name>ged</name></workspace>' -XPOST ${GEM_PROTO}://oq-platform2-mn.gem.lan${GEM_PORT}/geoserver/rest/workspaces
web_post_and_put () {
    local cmd="$1" fname="$2" typ="$3" cont="$4" upfile="$5" url="$6" expt="$7"
    local declare arr arr_ct=0

    if [ "$typ" ]; then
        arr[$arr_ct]="-H"
        arr_ct=$((arr_ct + 1))
        arr[$arr_ct]="Content-type: $typ"
        arr_ct=$((arr_ct + 1))
    fi
    if [ "$cont" ]; then
        arr[$arr_ct]="-d"
        arr_ct=$((arr_ct + 1))
        arr[$arr_ct]="$cont"
        arr_ct=$((arr_ct + 1))
    fi

    if [ "$upfile" ]; then
        arr[$arr_ct]="-T"
        arr_ct=$((arr_ct + 1))
        arr[$arr_ct]="$upfile"
        arr_ct=$((arr_ct + 1))
    fi

    web_cmd curl "$cmd" "$fname" "$url" "$expt" arr[@]
}

web_post () {
    web_post_and_put POST "$@"
}

web_put () {
    web_post_and_put PUT "$@"
}

#
#  coverage_manage: Remove or dump coverate for a coverageStore
coverage_manage ()
{
    local is_drop="$1" ws_name="$2" cs_name="$3" co_list_url="$4"

    fname="tmp/workspaces/${ws_name}/coveragestores/${cs_name}/coverages-list.get.xml"
    web_get "$fname" "$co_list_url" 200

    co_urls="$( xmlstarlet sel -N atom="http://www.w3.org/2005/Atom" -t -m "/coverages/coverage" -v "concat(name, '|', atom:link/@href, '$NL')" ${OUTDIR}${fname} | sed "s@^https\?://@@g;s@^[^/]\+/@${GEM_SITE}/@g")" || true

    for co_line in $co_urls; do
        co_name="$(echo "$co_line" | cut -d '|' -f 1)"
        co_url="$(echo "$co_line" | cut -d '|' -f 2)"
        # echo "    CO_NAME: $co_name"
        # echo "    CO_URL: $co_url"

        fname="workspaces/${ws_name}/coveragestores/${cs_name}/coverages/${co_name}.xml"
        web_get "$fname" "$co_url" 200

        if [ "$is_drop" = "true" ]; then
            fname="tmp/workspaces/${ws_name}/coveragestores/${cs_name}/coverages/${co_name}.del.xml"
            web_del "$fname" "$co_url" 200

            echo "    Coverage [$co_name] removed."
        else
            echo "    Coverage [$co_name] dumped."
        fi
    done

    return 0
    }
#
#  coveragestore_manage: Remove or dump all coverageStores for a workspaces
coveragestore_manage () {
    local is_drop="$1" ws_name="$2" cs_list_url="$3"
    local cs_url cs_urls fname

    fname="tmp/workspaces/${ws_name}/coveragestores-list.get.xml"
    web_get "$fname" "$cs_list_url" 200

    cs_urls="$( xmlstarlet sel -N atom="http://www.w3.org/2005/Atom" -t -m "/coverageStores/coverageStore" -v "concat(name, '|', atom:link/@href, '$NL')" ${OUTDIR}${fname} | sed "s@^https\?://@@g;s@^[^/]\+/@${GEM_SITE}/@g")" || true

    for cs_line in $cs_urls; do
        cs_name="$(echo "$cs_line" | cut -d '|' -f 1)"
        cs_url="$(echo "$cs_line" | cut -d '|' -f 2)"
        # echo "  CS_NAME: $cs_name"
        # echo "  CS_URL: $cs_url"

        fname="workspaces/${ws_name}/coveragestores/${cs_name}.xml"
        web_get "$fname" "$cs_url" 200

        co_list_url="$( xmlstarlet sel -N atom="http://www.w3.org/2005/Atom" -t -m "/coverageStore/coverages" -v "concat(atom:link/@href, '$NL')" ${OUTDIR}${fname} | sed "s@^https\?://@@g;s@^[^/]\+/@${GEM_SITE}/@g" )" || true

        coverage_manage "$is_drop" "$ws_name" "$cs_name" "$co_list_url"

        if [ "$is_drop" = "true" ]; then
            fname="tmp/workspaces/${ws_name}/coveragestores/${cs_name}.xml"
            web_del "$fname" "$cs_url" 200

            echo "  CoverageStore [$cs_name] removed."
        else
            echo "  CoverageStore [$cs_name] dumped."
        fi
    done

    return 0
}

#
#  layer_manage: Remove or dump a layer
layer_manage() {
    local is_drop="$1" la_name="$2"

    fname="layers/${la_name}.xml"
    web_get "$fname" "${GEM_SITE}/geoserver/rest/layers/${la_name}.xml" 200

    if [ "$is_drop" = "true" ]; then
        fname="tmp/layers/${la_name}.del.xml"
        web_del "$fname" "${GEM_SITE}/geoserver/rest/layers/${la_name}.xml" 200

        echo "Layer [$la_name] removed."
    else
        echo "Layer [$la_name] dumped."
    fi

    return 0
}

#
#  styles_manage: Remove or dump all styles from a workspaces
styles_manage () {
    local is_drop="$1" ws_name="$2" st_list_urls="$3"
    local fname

    fname="tmp/workspaces/${ws_name}/styles-list.get.xml"
    for st_list_url in $st_list_urls; do
        web_get "$fname" "$st_list_url" 200

        st_urls="$( xmlstarlet sel -N atom="http://www.w3.org/2005/Atom" -t -m "/styles/style" -v "concat(name, '|', atom:link/@href, '$NL')" ${OUTDIR}${fname} | sed "s@^https\?://@@g;s@^[^/]\+/@${GEM_SITE}/@g" )" || true

        for st_line in $st_urls; do
            st_name="$(echo "$st_line" | cut -d '|' -f 1)"
            st_url="$(echo "$st_line" | cut -d '|' -f 2)"
            echo "  ST_NAME: $st_name"
            echo "  ST_URL: $st_url"

            style_manage "$is_drop" "$ws_name" "$st_name"
        done
    done
    return 0
    }

layergroup_manage() {
    local is_drop="$1" lg_name="$2" lg_url="$3"

    fname="layergroups/${lg_name}.xml"
    web_get "$fname" "$lg_url" 200

    if [ "$is_drop" = "true" ]; then
        fname="tmp/layergroups/${lg_name}.del.xml"
        web_del "$fname" "$lg_url" 200

        echo "LayerGroup [$lg_name] removed."
    else
        echo "LayerGroup [$lg_name] dumped."
    fi

    return 0
    }

#
#  featuretype_manage: Remove all featureTypes from a dataStore
featuretype_manage () {
    local is_drop="$1" ws_name="$2" ds_name="$3" ft_name="$4" ft_list_urls="$5"

    for ft_list_url in $ft_list_urls; do
        fname="workspaces/${ws_name}/datastores/${ds_name}/featuretypes/${ft_name}.xml"
        web_get "$fname" "$ft_list_url" 200

        if [ "$is_drop" = "true" ]; then
            fname="tmp/workspaces/${ws_name}/datastores/${ds_name}/featuretypes/${ft_name}.del.xml"
            web_del "$fname" "$ft_list_url" 200

            echo "    FeatureType [$ft_name] removed."
        else
            echo "    FeatureType [$ft_name] dumped."
        fi
    done

    return 0
}

#
#  featuretypes_manage: Remove or dump all featureTypes from a dataStore
featuretypes_manage () {
    local is_drop="$1" ws_name="$2" ds_name="$3" fts_list_urls="$4"
    local fname ft_url

    fname="tmp/workspaces/${ws_name}/datastores/${ds_name}/featuretypes-list.get.xml"
    for fts_list_url in $fts_list_urls; do
        web_get "$fname" "$fts_list_url" 200

        ft_urls="$( xmlstarlet sel -N atom="http://www.w3.org/2005/Atom" -t -m "/featureTypes/featureType" -v "concat(name, '|', atom:link/@href, '$NL')" ${OUTDIR}${fname})" || true

        for ft_line in $ft_urls; do
            ft_name="$(echo "$ft_line" | cut -d '|' -f 1)"
            ft_url="$(echo "$ft_line" | cut -d '|' -f 2 | sed "s@^https\?://@@g;s@^[^/]\+/@${GEM_SITE}/@g")"
            # echo "  FT_NAME: $ft_name"
            # echo "  FT_URL: $ft_url"

            fname="workspaces/${ws_name}/datastores/${ds_name}/featuretypes/${ft_name}.xml"
            web_get "$fname" "$ft_url" 200

            if [ "$is_drop" = "true" ]; then
                fname="tmp/workspaces/${ws_name}/datastores/${ds_name}/featuretypes/${ft_name}.del.xml"
                web_del "$fname" "$ft_url" 200

                echo "    FeatureType [$ft_name] removed."
            else
                echo "    FeatureType [$ft_name] dumped."
            fi
        done
    done
    return 0
    }

#
#  datastore_manage: Remove or dump all dataStores for a workspace
datastore_manage () {
    local is_drop="$1" ws_name="$2" ds_list_url="$3"
    local ds_url ds_urls ft_list_url fname

    fname="tmp/workspaces/${ws_name}/datastores-list.get.xml"
    web_get "$fname" "$ds_list_url" 200

    ds_urls="$( xmlstarlet sel -N atom="http://www.w3.org/2005/Atom" -t -m "/dataStores/dataStore" -v "concat(name, '|', atom:link/@href, '$NL')" ${OUTDIR}${fname})" || true

    for ds_line in $ds_urls; do
        ds_name="$(echo "$ds_line" | cut -d '|' -f 1)"
        ds_url="$(echo "$ds_line" | cut -d '|' -f 2 | sed "s@^https\?://@@g;s@^[^/]\+/@${GEM_SITE}/@g")"
        # echo "  DS_NAME: $ds_name"
        # echo "  DS_URL: $ds_url"

        fname="workspaces/${ws_name}/datastores/${ds_name}.xml"
        web_get "$fname" "$ds_url" 200

        ft_list_url="$( xmlstarlet sel -N atom="http://www.w3.org/2005/Atom" -t -m "/dataStore/featureTypes" -v "concat(atom:link/@href, '$NL')" ${OUTDIR}${fname} | sed "s@^https\?://@@g;s@^[^/]\+/@${GEM_SITE}/@g" )" || true

        featuretypes_manage "$is_drop" "$ws_name" "$ds_name" "$ft_list_url"

        if [ "$is_drop" = "true" ]; then
            fname="tmp/workspaces/${ws_name}/datastores/${ds_name}.del.xml"
            web_del "$fname" "$ds_url" 200

            echo "  DataStore [$ds_name] removed."
        else
            echo "  DataStore [$ds_name] dumped."
        fi

    done

    return 0
}

#
#  style_manage_old: Remove or dump a style
style_manage_old () {
    local is_drop="$1" st_name="$2"
    local ret fname descfiles descfile ext noext already_drop

    fname="styles/${st_name}.xml"
    web_get "$fname" "${GEM_SITE}/geoserver/rest/styles/${st_name}.xml" 200

    # retrieve description file
    descfiles="$( xmlstarlet sel -t -m "/style" -v "concat(filename, '$NL')" ${OUTDIR}${fname} )" || true
    already_drop=0
    for descfile in $descfiles; do
        ext="$(echo "$descfile" | sed 's/.*\.//g')"
        case $ext in
            sld)
                fname="styles/${descfile}"
                web_get "$fname" "${GEM_SITE}/geoserver/rest/styles/${st_name}.sld" 200
                if [ "$is_drop" = "true" ]; then
                    noext="$(basename "$descfile" .sld)"
                    fname="tmp/styles/${noext}.del.sld"
                    web_del "$fname" "${GEM_SITE}/geoserver/rest/styles/${st_name}.sld?purge=true" 200
                    if [ $? -eq 0 ]; then
                        already_drop=1
                    else
                        exit 5
                    fi
                    echo "  Style descriptor [$descfile] removed."
                else
                    echo "  Style descriptor [$descfile] dumped."
                fi
                ;;
            *)
                echo "Style description file [$ext] not yet supported"
                exit 4
                ;;
        esac
    done



    if [ "$is_drop" = "true" ]; then
        if [ $already_drop -eq 0 ]; then
            fname="tmp/styles/${st_name}.del.xml"
            web_del "$fname" "${GEM_SITE}/geoserver/rest/styles/${st_name}.xml" 200
        fi

        echo "Style [$st_name] removed."
    else
        echo "Style [$st_name] dumped."
    fi

    return 0
}

#
#  style_manage: Remove or dump a style
style_manage () {
    local is_drop="$1" ws_name="$2" st_name="$3"
    local ret fname descfiles descfile ext noext already_drop

    fname="workspaces/${ws_name}/styles/${st_name}.xml"
    web_get "$fname" "${GEM_SITE}/geoserver/rest/workspaces/${ws_name}/styles/${st_name}.xml" 200

    # retrieve description file
    descfiles="$( xmlstarlet sel -t -m "/style" -v "concat(filename, '$NL')" ${OUTDIR}${fname} )" || true
    already_drop=0
    for descfile in $descfiles; do
        ext="$(echo "$descfile" | sed 's/.*\.//g')"
        case $ext in
            sld)
                fname="workspaces/${ws_name}/styles/${descfile}"
                web_get "$fname" "${GEM_SITE}/geoserver/rest/workspaces/${ws_name}/styles/${st_name}.sld" 200
                if [ "$is_drop" = "true" ]; then
                    noext="$(basename "$descfile" .sld)"
                    fname="tmp/styles/${noext}.del.sld"
                    fname="workspaces/${ws_name}/styles/${noext}.del.sld"
                    web_del "$fname" "${GEM_SITE}/geoserver/rest/workspaces/${ws_name}/styles/${st_name}.sld?purge=true" 200
                    if [ $? -eq 0 ]; then
                        already_drop=1
                    else
                        exit 6
                    fi
                    echo "  Style descriptor [$descfile] removed."
                else
                    echo "  Style descriptor [$descfile] dumped."
                fi
                ;;
            *)
                echo "Style description file [$ext] not yet supported"
                exit 4
                ;;
        esac
    done



    if [ "$is_drop" = "true" ]; then
        if [ $already_drop -eq 0 ]; then
            fname="tmp/styles/${st_name}.del.xml"
            web_del "$fname" "${GEM_SITE}/geoserver/rest/styles/${st_name}.xml" 200
        fi

        echo "Style [$st_name] removed."
    else
        echo "Style [$st_name] dumped."
    fi

    return 0
}

#
#  workspace_manage: Remove or dump all workspaces
workspace_manage () {
    local is_drop="$1" ws_name="$2"
    local fname cs_url ds_url

    fname="workspaces/${ws_name}.xml"
    web_get "$fname" "${GEM_SITE}/geoserver/rest/workspaces/${ws_name}.xml" 200

    cs_url="$(xmlstarlet sel -N atom="http://www.w3.org/2005/Atom" -t -m "/workspace/coverageStores/atom:link" -v "concat(@href, '$NL')"  ${OUTDIR}${fname} | sed "s@^https\?://@@g;s@^[^/]\+/@${GEM_SITE}/@g")" || true
    coveragestore_manage "$is_drop" "$ws_name" "$cs_url"

    ds_url="$(xmlstarlet sel -N atom="http://www.w3.org/2005/Atom" -t -m "/workspace/dataStores/atom:link" -v "concat(@href, '$NL')"  ${OUTDIR}${fname} | sed "s@^https\?://@@g;s@^[^/]\+/@${GEM_SITE}/@g")" || true
    datastore_manage "$is_drop" "$ws_name" "$ds_url"

    st_url="${GEM_SITE}/geoserver/rest/workspaces/${ws_name}/styles.xml"

    styles_manage "$is_drop" "$ws_name" "$st_url"

    if [ "$is_drop" = "true" ]; then
        fname="tmp/workspaces/${ws_name}.del.xml"
        web_del "$fname" "${GEM_SITE}/geoserver/rest/workspaces/${ws_name}.xml" 200

        echo "Workspace [$ws_name] removed."
    fi

    return 0
}

all_data_drop() {
    all_data_manage true
    }

all_data_dump() {
    mkdir -p "${OUTDIR}tmp" 
    all_data_manage false
    rm -rf "${OUTDIR}tmp"
    find "${OUTDIR}" -name '*.hea' -exec rm {} \;
    }

#
#  all_data_manage: remove all geoserver data
all_data_manage() {
    local is_drop="$1"
    local oldifs LG LA ST

    oldifs="$IFS"

    IFS="$NL"

    fname="tmp/reset.post.xml"
    web_post "$fname" "text/xml" "" "" "${GEM_SITE}/geoserver/rest/reset.xml" 200
    #
    # manage layergroups
    fname="tmp/layergroups-list.get.xml"
    web_get "$fname" "${GEM_SITE}/geoserver/rest/layergroups.xml" 200
    LG="$( xmlstarlet sel -N atom="http://www.w3.org/2005/Atom" -t -m "/layerGroups/layerGroup" -v "concat(name, '|', atom:link/@href, '$NL')" ${OUTDIR}${fname} )" || true

    for lg_line in $LG; do
        lg_name="$(echo "$lg_line" | cut -d '|' -f 1)"
        lg_url="$(echo "$lg_line" | cut -d '|' -f 2 | sed "s@^https\?://@@g;s@^[^/]\+/@${GEM_SITE}/@g")"
        layergroup_manage "$is_drop" "$lg_name" "$lg_url"
    done

    #
    # manage layers
    fname="tmp/layers-list.get.xml"
    web_get "$fname" "${GEM_SITE}/geoserver/rest/layers.xml" 200

    LA="$(xmlstarlet sel -t -m "/layers/layer" -v "concat(name, '$NL')" ${OUTDIR}${fname})" || true

    for la in $LA; do
        layer_manage "$is_drop" "$la"
    done

    #
    # manage workspaces
    fname="workspaces_default.xml"
    web_get "$fname" "${GEM_SITE}/geoserver/rest/workspaces/default.xml" 200 || echo "no default workspace"

    fname="tmp/workspaces-list.get.xml"
    web_get "$fname" "${GEM_SITE}/geoserver/rest/workspaces.xml" 200

    WS="$(xmlstarlet sel -t -m "/workspaces/workspace" -v "concat(name, '$NL')" ${OUTDIR}${fname})" || true

    for ws in $WS; do
        workspace_manage "$is_drop" "$ws"
        echo
    done

    #
    # delete styles
    fname="tmp/styles-list.get.xml"
    web_get "$fname" "${GEM_SITE}/geoserver/rest/styles.xml" 200

    ST="$(xmlstarlet sel -t -m "/styles/style" -v "concat(name, '$NL')" ${OUTDIR}${fname})" || true

    for st in $ST; do
        style_manage_old "$is_drop" "$st"
    done

    IFS="$oldifs"
    return 0
}
#
#  RESTORE STUFF
#


featuretype_restore () {
    local ws_name="$1" ds_name="$2" ft_name="$3"
    local ret ft_list ft

    fname="tmp/workspaces/${ws_name}/datastores/${ds_name}/featuretypes/${ft_name}.post.xml"
    web_post "$fname" "text/xml" "" "${RESTDIR}/workspaces/${ws_name}/datastores/${ds_name}/featuretypes/${ft_name}.xml" "${GEM_SITE}/geoserver/rest/workspaces/${ws_name}/datastores/${ds_name}/featuretypes.xml" 201
    ret=$?
    if [ $ret -eq 0 ]; then
        echo "    FeatureType [$ft_name] restored."
    fi

    return $ret
    }


datastore_restore () {
    local ws_name="$1" ds_name="$2"
    local ret ft_list ft

    xmlstarlet ed -d '/dataStore/featureTypes' "${RESTDIR}/workspaces/${ws_name}/datastores/${ds_name}.xml" > ${OUTDIR}temp.ds.xml

    fname="tmp/workspaces/${ws_name}/datastores/${ds_name}.post.xml"
    web_post "$fname" "text/xml" "" "${OUTDIR}temp.ds.xml" "${GEM_SITE}/geoserver/rest/workspaces/${ws_name}/datastores.xml" 201
    ret=$?
    if [ $ret -eq 0 ]; then
        echo "  DataStore [$ds_name] restored."

        ft_list="$(ls ${RESTDIR}/workspaces/${ws_name}/datastores/${ds_name}/featuretypes/*.xml 2>/dev/null)" || true
        for ft in $ft_list; do
            ft_name="$(xmlstarlet sel -t -m "/featureType" -v "concat(name, '$NL')" "$ft")" || true
            featuretype_restore "$ws_name" "$ds_name" "$ft_name"
            ret=$?
            if [ $ret -ne 0 ]; then
                break
            fi
        done
    fi

    return $ret
    }

coverage_restore () {
    local ws_name="$1" cs_name="$2" co_name="$3"
    local ret

    fname="tmp/workspaces/${ws_name}/coveragestores/${cs_name}/coverages/${co_name}.post.xml"
    # set -x
    web_post "$fname" "text/xml" "" "${RESTDIR}/workspaces/${ws_name}/coveragestores/${cs_name}/coverages/${co_name}.xml" "${GEM_SITE}/geoserver/rest/workspaces/${ws_name}/coveragestores/${cs_name}/coverages.xml" 201
    # set +x
    ret=$?
    if [ $ret -eq 0 ]; then
        echo "    Coverage [$co_name] restored."
    fi

    return $ret
    }


coveragestore_restore () {
    local ws_name="$1" cs_name="$2"
    local ret co_list co

    xmlstarlet ed -d '/coverageStore/coverages' "${RESTDIR}/workspaces/${ws_name}/coveragestores/${cs_name}.xml" > ${OUTDIR}tmp/temp.cs.xml

    fname="tmp/workspaces/${ws_name}/coveragestores/${cs_name}.post.xml"

    web_post "$fname" "text/xml" "<coverageStore><name>${cs_name}</name><workspace>${ws_name}</workspace></coverageStore>" "" "${GEM_SITE}/geoserver/rest/workspaces/${ws_name}/coveragestores.xml" 201
    ret=$?
    if [ $ret -eq 0 ]; then
        web_put "$fname" "text/xml" "" "${OUTDIR}tmp/temp.cs.xml" "${GEM_SITE}/geoserver/rest/workspaces/${ws_name}/coveragestores/${cs_name}.xml" 200
        ret=$?
        if [ $ret -eq 0 ]; then
            echo "  CoverageStore [$cs_name] restored."

            co_list="$(ls ${RESTDIR}/workspaces/${ws_name}/coveragestores/${cs_name}/coverages/*.xml 2>/dev/null)" || true
            for co in $co_list; do
                co_name="$(xmlstarlet sel -t -m "/coverage" -v "concat(name, '$NL')" "$co")" || true
                coverage_restore "$ws_name" "$cs_name" "$co_name"
                ret=$?
                if [ $ret -ne 0 ]; then
                    break
                fi
            done
        fi
    fi

    return $ret
    }

layergroup_restore () {
    local lg_name="$1"
    local ret

    fname="tmp/layergroups/${lg_name}.post.xml"
    web_post "$fname" "text/xml" "" "${RESTDIR}/layergroups/${lg_name}.xml" "${GEM_SITE}/geoserver/rest/layergroups.xml" 201
    ret=$?
    if [ $ret -eq 0 ]; then
        echo "  LayerGroup [$lg_name] restored."
    fi

    return $ret
    }

style_restore_old () {
    local st_name="$1"
    local ret fname descfiles descfile ext noext

    fname="tmp/styles/${st_name}.post.xml"
    web_post "$fname" "text/xml" "" "${RESTDIR}/styles/${st_name}.xml" "${GEM_SITE}/geoserver/rest/styles.xml" 201
    ret=$?
    if [ $ret -eq 0 ]; then
        echo "  Style [$st_name] restored."
    fi

    # retrieve description file
    descfiles="$( xmlstarlet sel -t -m "/style" -v "concat(filename, '$NL')" ${RESTDIR}/styles/${st_name}.xml )" || true
    for descfile in $descfiles; do
        ext="$(echo "$descfile" | sed 's/.*\.//g')"
        case $ext in
            sld)
                noext="$(basename "$descfile" .sld)"
                fname="tmp/styles/${noext}.put.sld"
                # set -x
                web_put "$fname" "application/vnd.ogc.sld+xml" "@${RESTDIR}/styles/${descfile}" "" "${GEM_SITE}/geoserver/rest/styles/${st_name}.sld" 200
                # set +x
                echo "  Style descriptor [$descfile] restored."
                ;;
            *)
                echo "Style description file [$ext] not yet supported"
                exit 4
                ;;
        esac
    done


    return $ret
    }

style_restore () {
    local ws_name="$1" st_name="$2"
    local ret fname descfiles descfile ext noext

    fname="tmp/styles/${st_name}.post.xml"
    web_post "$fname" "text/xml" "" "${RESTDIR}/styles/${st_name}.xml" "${GEM_SITE}/geoserver/rest/${ws_name}:styles.xml" 201
    ret=$?
    if [ $ret -eq 0 ]; then
        echo "  Style [$st_name] restored."
    fi

    # retrieve description file
    descfiles="$( xmlstarlet sel -t -m "/style" -v "concat(filename, '$NL')" ${RESTDIR}/styles/${st_name}.xml )" || true
    for descfile in $descfiles; do
        ext="$(echo "$descfile" | sed 's/.*\.//g')"
        case $ext in
            sld)
                noext="$(basename "$descfile" .sld)"
                fname="tmp/styles/${noext}.put.sld"
                # set -x
                web_put "$fname" "application/vnd.ogc.sld+xml" "@${RESTDIR}/styles/${descfile}" "" "${GEM_SITE}/geoserver/rest/styles/${ws_name}:${st_name}.sld" 200
                # set +x
                echo "  Style descriptor [$descfile] restored."
                ;;
            *)
                echo "Style description file [$ext] not yet supported"
                exit 4
                ;;
        esac
    done


    return $ret
    }

style_ws_restore () {
    local ws_name="$1" st_name="$2"
    local ret fname descfiles descfile ext noext

    fname="tmp/workspaces/${ws_name}/styles/${st_name}.post.xml"
    web_post "$fname" "text/xml" "" "${RESTDIR}/workspaces/${ws_name}/styles/${st_name}.xml" "${GEM_SITE}/geoserver/rest/workspaces/${ws_name}/styles.xml" 201
    ret=$?
    if [ $ret -eq 0 ]; then
        echo "  Style [$st_name] restored."
    fi

    # retrieve description file
    descfiles="$( xmlstarlet sel -t -m "/style" -v "concat(filename, '$NL')" ${RESTDIR}/workspaces/${ws_name}/styles/${st_name}.xml )" || true
    for descfile in $descfiles; do
        ext="$(echo "$descfile" | sed 's/.*\.//g')"
        case $ext in
            sld)
                noext="$(basename "$descfile" .sld)"
                fname="tmp/workspaces/${ws_name}/styles/${noext}.put.sld"
                # set -x
                web_put "$fname" "application/vnd.ogc.sld+xml" "@${RESTDIR}/workspaces/${ws_name}/styles/${descfile}" "" "${GEM_SITE}/geoserver/rest/workspaces/${ws_name}/styles/${st_name}.sld" 200
                # set +x
                echo "  Style descriptor [$descfile] restored."
                ;;
            *)
                echo "Style description file [$ext] not yet supported"
                exit 4
                ;;
        esac
    done


    return $ret
    }

layer_restore () {
    local ws_name="$1" la_name="$2"
    local ret

    fname="tmp/layers/${la_name}.${iter}.post.xml"
    # set -x
    web_put "$fname" "text/xml" "" "${RESTDIR}/layers/${la_name}.xml" "${GEM_SITE}/geoserver/rest/layers/${ws_name}:${la_name}.xml" 200
    # set +x
    ret=$?
    if [ $ret -eq 0 ]; then
        echo "  Layer [${ws_name}:$la_name] restored ($iter)."
    else
        break
    fi

    # hack to set explicitly the default style for this layer
    stylename="$(xmlstarlet sel -t -m "/layer/defaultStyle" -v "concat(name, '')" "${RESTDIR}/layers/${la_name}.xml")"
    if [ "$stylename" != "" ]; then
        fname="tmp/layers/${la_name}/styles.post.xml"
        web_put "$fname" "text/xml" "<layer><defaultStyle><name>$stylename</name></defaultStyle><enabled>true</enabled></layer>" "" "${GEM_SITE}/geoserver/rest/layers/${ws_name}:${la_name}.xml" 200
    fi

    return $ret
    }

workspace_restore () {
    local ws_name="$1"
    local ret ds ds_list ds_name cs cs_list cs_name lg lg_list lg_name

    fname="tmp/workspaces/${ws_name}.post.xml"
    web_post "$fname" "text/xml" "<workspace><name>$ws_name</name></workspace>" "" "${GEM_SITE}/geoserver/rest/workspaces" 201
    ret=$?
    if [ $ret -eq 0 ]; then
        echo "Workspace [$ws_name] restored."

        ds_list="$(ls ${RESTDIR}/workspaces/${ws_name}/datastores/*.xml 2>/dev/null)" || true
        for ds in $ds_list; do
            ds_name="$(xmlstarlet sel -t -m "/dataStore" -v "concat(name, '$NL')" "$ds")" || true
            datastore_restore "$ws_name" "$ds_name"
            ret=$?
            if [ $ret -ne 0 ]; then
                break
            fi
        done
    fi

    if [ $ret -eq 0 ]; then
        cs_list="$(ls ${RESTDIR}/workspaces/${ws_name}/coveragestores/*.xml 2>/dev/null)" || true
        for cs in $cs_list; do
            cs_name="$(xmlstarlet sel -t -m "/coverageStore" -v "concat(name, '$NL')" "$cs")" || true
            coveragestore_restore "$ws_name" "$cs_name"
            ret=$?
            if [ $ret -ne 0 ]; then
                break
            fi
        done
    fi

    if [ $ret -eq 0 ]; then
        st_list="$(ls ${RESTDIR}/workspaces/${ws_name}/styles/*.xml 2>/dev/null)" || true
        for st in $st_list; do
            st_name="$(xmlstarlet sel -t -m "/style" -v "concat(name, '$NL')" "$st")" || true
            style_ws_restore "$ws_name" "$st_name"
            ret=$?
            if [ $ret -ne 0 ]; then
                break
            fi
        done
    fi


    return $ret
}

all_data_restore () {
    local ws_list ret oldifs

    oldifs="$IFS"
    IFS="$NL"

    RESTDIR="$1"
    ret=0

    echo "Styles"

    st_list="$(ls ${RESTDIR}/styles/*.xml 2>/dev/null)" || true
    for st in $st_list; do
        st_name="$(xmlstarlet sel -t -m "/style" -v "concat(name, '$NL')" "$st")" || true
        style_restore_old "$st_name"
        ret=$?
        if [ $ret -ne 0 ]; then
            break
        fi
    done

    if [ $ret -ne 0 ]; then
        return "$ret"
    fi
    defa_name="$(xmlstarlet sel -t -m "/workspace" -v "concat(name, '$NL')" "${RESTDIR}/workspaces_default.xml")" || true
    ws_list="$(ls ${RESTDIR}/workspaces/*.xml 2>/dev/null)" || true
    for iter in 1 2; do
        for ws in $ws_list; do
            ws_name="$(xmlstarlet sel -t -m "/workspace" -v "concat(name, '$NL')" "$ws")" || true
            # workaround to set the default workspace
            if [ $iter -eq 1 -a "$ws_name" != "$defa_name" ]; then
                continue
            fi
            if [ $iter -eq 2 -a "$ws_name" = "$defa_name" ]; then
                continue
            fi
            workspace_restore "$ws_name"
            ret=$?
            if [ $ret -ne 0 ]; then
                break
            fi
            echo
        done
    done

    if [ $ret -ne 0 ]; then
        return "$ret"
    fi
    echo "Layers"
    la_list="$(ls ${RESTDIR}/layers/*.xml 2>/dev/null)" || true
    for la in $la_list; do
        la_name="$(xmlstarlet sel -t -m "/layer" -v "concat(name, '$NL')" "$la")" || true
        layer_restore "oqplatform" "$la_name"
        ret=$?
        if [ $ret -ne 0 ]; then
            break
        fi
    done
    if [ $ret -ne 0 ]; then
        return "$ret"
    fi

#    set -x
    echo "LayerGroups"
    lg_list="$(ls ${RESTDIR}/layergroups/*.xml 2>/dev/null)" || true
    for lg in $lg_list; do
        lg_name="$(xmlstarlet sel -t -m "/layerGroup" -v "concat(name, '$NL')" "$lg")" || true
        layergroup_restore "$lg_name"
        ret=$?
        if [ $ret -ne 0 ]; then
            break
        fi
    done
#    set +x

    IFS="$oldifs"

    return $ret
}

#
#
geoserver_population () {
    local srcdir="$1" dstdir="$2" bindir="$3"
#    local workspace_name="$GEM_GS_WS_NAME" datastore_name="$GEM_GS_DS_NAME"
    local workspace_name_default="$4" datastore_name_default="$5"
    local db_name="$6" db_user="$7" db_pass="$8" gs_datadir="$9"
    shift 7
    declare -a gem_app_list=("$@")
    local workspace_name datastore_name

    # moved outside rm -rf "$dstdir/build-gs-tree"
    mkdir -p "$dstdir/build-gs-tree"
    mkdir -p "$dstdir/build-gs-tree/styles"
    mkdir -p "$dstdir/build-gs-tree/layers"
    mkdir -p "$dstdir/build-gs-tree/workspaces"
    mkdir -p "$dstdir/build-gs-tree/workspaces/${workspace_name_default}/datastores"
    featuretypes_dir="workspaces/${workspace_name_default}/datastores/${datastore_name_default}/featuretypes"
    mkdir -p "$dstdir/build-gs-tree/${featuretypes_dir}"
    cp -rn "$srcdir/common/gs_data/"* "$dstdir/build-gs-tree"
    for app in "${gem_app_list[@]}"; do
        workspace_name="$workspace_name_default"
        if [ ! -d "${srcdir}/${app}/gs_data" ]; then
            continue
        fi
        if [ -d "${srcdir}/${app}/gs_data/datastores" ]; then
            cp "${srcdir}/${app}/gs_data/datastores/"* "$dstdir/build-gs-tree/workspaces/${workspace_name}/datastores"
            datastore_name="$(basename "${srcdir}/${app}/gs_data/datastores/"* .xml)"
        else
            datastore_name="$datastore_name_default"
        fi
        featuretypes_dir="workspaces/${workspace_name}/datastores/${datastore_name}/featuretypes"
        if [ ! -d "$featuretypes_dir" ]; then
            mkdir -p "$dstdir/build-gs-tree/${featuretypes_dir}"
        fi

        if [ -d "${srcdir}/${app}/gs_data/layers" ]; then
            cp -rn "${srcdir}/${app}/gs_data/layers/"*       "${dstdir}/build-gs-tree/layers"
        fi
        if [ -d "${srcdir}/${app}/gs_data/styles" ]; then
            cp -rn "${srcdir}/${app}/gs_data/styles/"*       "${dstdir}/build-gs-tree/styles"
        fi
        if [ -d "${srcdir}/${app}/gs_data/featuretypes" ]; then
            cp -rn "${srcdir}/${app}/gs_data/featuretypes/"* "${dstdir}/build-gs-tree/${featuretypes_dir}"
        fi
        if [ -d "${srcdir}/${app}/gs_data/"tmpl ]; then
            mkdir -p "${dstdir}/build-gs-tree/tmpl/${app}"
            cp -rn "${srcdir}/${app}/gs_data/tmpl/"* "${dstdir}/build-gs-tree/tmpl/${app}"
        fi
    done

    sed -i "s@#DB_NAME#@$db_name@g;s@#DB_USER#@$db_user@g;s@#DB_PASS#@$db_pass@g" $(find "${dstdir}/build-gs-tree" -name '*.xml')
    sed -i "s@localhost:8000@localhost:$GEM_GEONODE_PORT@g;s@127\.0\.0\.1:8080@127.0.0.1:$GEM_GEOSERVER_PORT@g" $(find "${dstdir}/build-gs-tree" -name '*.xml')

    rm -rf output
    ${bindir}/oq-gs-builder.sh drop
    ${bindir}/oq-gs-builder.sh restore "${dstdir}/build-gs-tree"

    #
    #  post population
    for app in "${gem_app_list[@]}"; do
        if [ -d "${dstdir}/build-gs-tree/tmpl/${app}/datastore" ]; then
            cp -rn "${dstdir}/build-gs-tree/tmpl/${app}/datastore/"* "${gs_datadir}/workspaces/${workspace_name}/"
        fi
    done
}


usage () {
    echo "$0 dump"
    echo "$0 drop"
    echo "$0 restore <dirname>"
    echo "$0 populate <srcdir> <dstdir> <bindir> <workspace_name_def> <datastore_name_def> <db_name> <db_user> <db_pass> <gs_datadir> <app1> [<app2> [...]]"
    }

#
#   MAIN
#

act="$1"
case $act in
    dump)
        all_data_dump
        ;;

    drop)
        all_data_drop
        ;;

    restore)
        all_data_restore "$2"
        ;;
    populate)
        shift
        geoserver_population "$@"
        ;;
    *)
        usage $0
        exit 1
        ;;
esac


exit 0
