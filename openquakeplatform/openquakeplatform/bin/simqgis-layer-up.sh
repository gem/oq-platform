#!/bin/bash
if [ $GEM_SET_DEBUG ]; then
    set -x
fi
set -e
username="admin"
password="admin"
sitename="http://localhost:8000"
datadir="openquakeplatform/svir/dev_data/irmt-data"
TMPDIR="/tmp"

usage () {
cat >&2 << EOF

USAGE
    $0 [-u|--username <username>] [-p|--password <password>] [-s|--sitename <sitename>] [-d|--datadir]

    DEFAULTS
        username: $username
        password: $password
        sitename: $sitename
        datadir:  $datadir

EOF
    exit $1
}

while [ $# -gt 0 ]; do
    case $1 in
      -u|--username)
	username="$2"
	shift
	;;
      -p|--password)
        password="$2"
        shift
        ;;
      -s|--sitename)
        sitename="$2"
        shift
        ;;
      -d|--datadir)
        datadir="$2"
        shift
        ;;
      *)
	usage 1
        ;;
    esac
    shift
done

curl -s -c "$TMPDIR/virt-cookie.$$.jar" -X POST --data "username=$username" --data "password=$password" "$sitename/account/ajax_login"
curl -s -b "$TMPDIR/virt-cookie.$$.jar" -c "$TMPDIR/virt-cookie.$$.jar" -o "$TMPDIR/virtual-qgis.$$.out" -L --post302 --max-redirs 5 -X POST -F "layer_title=qgis_irmt_dev" -F "base_file=@$datadir/qgis_irmt_dev.shp" -F "dbf_file=@$datadir/qgis_irmt_dev.dbf" -F "shx_file=@$datadir/qgis_irmt_dev.shx" -F "prj_file=@$datadir/qgis_irmt_dev.prj" -F "xml_file=@$datadir/qgis_irmt_dev.xml" -F "charset=UTF-8" -F permissions='{"authenticated": "_none", "users": [["'"$username"'", "layer_readwrite"], ["'"$username"'", "layer_admin"]], "anonymous": "_none"}' "$sitename/layers/upload"
layer_name="$(cat "$TMPDIR/virtual-qgis.$$.out" | python -c 'import json,sys;data=json.load(sys.stdin);print data["url"]' | sed 's/.*://g')"
style_name="$(echo "$layer_name" | sed 's/-/_/g')"
cat "$datadir/qgis_irmt_dev.sld.tmpl" | sed "s/#NAMED_LAYER#/$style_name/g;s/#USER_STYLE#/$style_name/g;s/#TITLE#/$style_name/g" > "$TMPDIR/qgis_irmt_dev.$$.sld"
# echo "LAYER_NAME: $layer_name"
# echo "STYLE_NAME: $style_name"
curl -s -b "$TMPDIR/virt-cookie.$$.jar" -c "$TMPDIR/virt-cookie.$$.jar" -L --post302 --max-redirs 5 -X PUT -H 'Content-Type: application/vnd.ogc.sld+xml' -T "$TMPDIR/qgis_irmt_dev.$$.sld" "$sitename/gs/rest/styles/$layer_name"
rm -f "$TMPDIR/virt-cookie.$$.jar" "$TMPDIR/virtual-qgis.$$.out" "$TMPDIR/qgis_irmt_dev.$$.sld"
