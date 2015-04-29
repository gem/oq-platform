#!/bin/bash
set -e
OUTPUT="$1/"
INPUT="oq-platform/openquakeplatform/openquakeplatform/isc_viewer/gs_data/"

# DROP LAYER
curl -v -s -o ${OUTPUT}layers_isc_viewer_measure.del.xml -D ${OUTPUT}layers_isc_viewer_measure.del.xml.hea -u admin:geoserver -XDELETE http://127.0.0.1:8080/geoserver/rest/layers/isc_viewer_measure.xml
curl -v -s -o ${OUTPUT}featuretypes_isc_viewer_measure.del.xml -D ${OUTPUT}featuretypes_isc_viewer_measure.del.xml.hea -u admin:geoserver -XDELETE http://127.0.0.1:8080/geoserver/rest/workspaces/oqplatform/datastores/oqplatform/featuretypes/isc_viewer_measure.xml


# RESTORE LAYER
curl -v -s -o ${OUTPUT}featuretypes_isc_viewer_measure.post.xml -D ${OUTPUT}featuretypes_isc_viewer_measure.post.xml.hea -u admin:geoserver -XPOST -H 'Content-type: text/xml' -T ${INPUT}featuretypes/isc_viewer_measure.xml http://127.0.0.1:8080/geoserver/rest/workspaces/oqplatform/datastores/oqplatform/featuretypes.xml
curl -v -s -o ${OUTPUT}featuretypes_isc_viewer_measure.post.xml -D ${OUTPUT}featuretypes_isc_viewer_measure.post.xml.hea -u admin:geoserver -XPUT -H 'Content-type: text/xml' -T ${INPUT}featuretypes/isc_viewer_measure.xml http://127.0.0.1:8080/geoserver/rest/workspaces/oqplatform/datastores/oqplatform/featuretypes/isc_viewer_measure.xml
curl -v -s -o ${OUTPUT}layers_isc_viewer_measure.post.xml -D ${OUTPUT}layers_isc_viewer_measure.post.xml.hea -u admin:geoserver -XPUT -H 'Content-type: text/xml' -T ${INPUT}layers/isc_viewer_measure.xml http://127.0.0.1:8080/geoserver/rest/layers/oqplatform:isc_viewer_measure.xml
curl -v -s -o ${OUTPUT}layers_isc_viewer_measure_style.post.xml -D ${OUTPUT}layers_isc_viewer_measure_style.post.xml.hea -u admin:geoserver -XPUT -H 'Content-type: text/xml' -d '<layer><defaultStyle><name>isc_viewer_measure</name></defaultStyle><enabled>true</enabled></layer>' http://127.0.0.1:8080/geoserver/rest/layers/oqplatform:isc_viewer_measure.xml

exit 0
